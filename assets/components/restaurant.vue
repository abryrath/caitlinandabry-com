<template>
    <li
        class="restaurant-container"
        @click="showModal()">
            <div class="title">
                {{ restaurant.title }}
            </div>
            <div class="cuisine-container">
                <ul class="cuisine-list">
                    <li v-for="cuisine in restaurant.cuisines">{{ cuisine.label }}</li>
                </ul>
            </div>
            <div v-html="restaurant.desc"></div>
            <div v-html="restaurant.address"></div>
            <restaurant-modal :id="restaurant.id"></restaurant-modal> 
    </li>
</template>
<script src="./restaurant.js"></script>
