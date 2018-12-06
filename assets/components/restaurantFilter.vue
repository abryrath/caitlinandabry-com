<template>
    <div class="restaurant-filter">
        <div class="controls-container">
            <table>
                <tr>
                    <td class="header">Filters</td>
                </tr>
                <tr>
                    <td class="controls cuisine">
                        <label 
                        v-for="cuisine in $store.getters.allCuisines" 
                        @click="updateCuisineFilter(cuisine.key)" 
                        v-bind:key="cuisine.key"
                        :data-label="cuisine.key">
                            {{ cuisine.value }}
                        </label>
                    </td>
                </tr>
                <tr>
                    <td class="controls">
                        <label 
                        v-for="cost in $store.getters.restaurantCosts" 
                        @click="updateRestaurantCostFilter(cost.key)" 
                        v-bind:key="cost.key"
                        :data-cost="cost.key">
                            {{ cost.value }}
                        </label>
                    </td>
                </tr>
                <tr>
                    <td class="header">Sort</td>
                </tr>
                <tr>
                    <td class="controls">
                        <label @click="updateRestaurantSort('alpha')" data-sort="alpha">Alphabetic</label>
                        <label @click="updateRestaurantSort('cost')" data-sort="cost">Cost</label>
                    </td>
                </tr>
            </table>
        </div>
        <div v-if="filteredRestaurants.length">
            <p>
                Click on a restaurant for more information
            </p>
            
            <ul class="restaurant-list">
                <restaurant
                    v-for="restaurant in filteredRestaurants"
                    :restaurant="restaurant"
                    :key="restaurant.id"
                ></restaurant>
            </ul>
        </div>
        <div v-else>
            No results
        </div>
    </div>
</template>
<script src="./restaurantFilter.js"></script> 
