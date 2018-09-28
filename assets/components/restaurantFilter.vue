<template>
    <div class="restaurant-filter">
        <div class="controls">
            <label v-for="(label, cuisine) in $store.getters.allCuisines" @click="updateCuisineFilter(cuisine)" :data-label="cuisine">
                {{ label }}
            </label>
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
