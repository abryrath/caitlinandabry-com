<template>
    <div class="restaurant-filter">
        <div class="controls">
            <div id="cuisines-label">
                <label v-for="cuisine in $store.getters.allCuisines" @click="updateCuisineFilter(cuisine.key)" :data-label="cuisine.key">
                    {{ cuisine.value }}
                </label>
            </div>
            <div id="cost-label">
                <label v-for="cost in $store.getters.restaurantCosts" @click="updateRestaurantCostFilter(cost.key)" :data-cost="cost.value">
                    {{ cost.value }}
                </label>
            </div>
        </div>
        <ul>
            <li v-for="restaurant in $store.getters.filteredRestaurants" class="restaurant-container">
                <div class="title">
                    {{ restaurant.title }}
                </div>
                <div class="cuisine-container">
                    <ul class="cuisine-list">
                        <li v-for="cuisine in restaurant.cuisine">{{ cuisine.label }}</li>
                    </ul>
                </div>
                <div v-html="restaurant.desc"></div>
            </li>
        </ul>
    </div>
</template>
<script src="./restaurantFilter.js"></script> 
