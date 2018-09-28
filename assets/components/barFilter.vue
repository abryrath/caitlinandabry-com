<template>
    <div class="bar-filter">
        <div class="controls">
        </div>
        <ul>
            <li v-for="bar in $store.getters.filteredBars" class="bar-container">
                <div class="title">
                    {{ bar.title }}
                </div>
            </li>
        </ul>
    </div>
</template>
<script src="./barFilter.js"></script>
