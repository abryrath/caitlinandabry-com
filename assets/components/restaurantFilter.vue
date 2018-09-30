<template>
    <div class="restaurant-filter">
        <div class="controls" id="filters">
            <div id="cuisines-label">
                <label v-for="cuisine in $store.getters.allCuisines" @click="updateCuisineFilter(cuisine.key)" :data-label="cuisine.key">
                    {{ cuisine.value }}
                    </label>
            </div>
            <div id="cost-label">
                <label v-for="cost in $store.getters.restaurantCosts" @click="updateRestaurantCostFilter(cost.key)" :data-cost="cost.key">
                    {{ cost.value }}
                </label>
            </div>
            <div class="controls" id="sort">
                <div>
                    <label @click="updateRestaurantSort('alpha')" data-sort="alpha">Alphabetic</label>
                </div>
                <div>
                    <label @click="updateRestaurantSort('cost')" data-sort="cost">Cost</label>
                </div>
            </div>
        </div>
        <ul class="restaurant-list">
            <restaurant
                v-for="restaurant in filteredRestaurants"
                :restaurant="restaurant"
                :key="restaurant.id"
            ></restaurant>
        </ul>
    </div>
</template>
<script src="./restaurantFilter.js"></script> 
