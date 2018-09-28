<template>
    <div class="attraction-filter">
        <div class="controls">
        </div>
        <ul>
            <li v-for="attraction in $store.getters.filteredAttractions" class="attraction-container">
                <div class="title">{{ attraction.title }}</div>
            </li>
        </ul>
    </div>
</template>
<script src="./attractionFilter.js"></script>
