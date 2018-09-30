<template>
    <div class="bar-filter">
        <div class="controls" id="sort">
            <div>
                <label @click="updateBarSort('alpha')" data-sort="alpha">Alphabetic</label>
            </div>
        </div>
        <ul>
            <li v-for="bar in filteredBars" class="bar-container">
                <div class="title">
                    {{ bar.title }}
                </div>
            </li>
        </ul>
    </div>
</template>
<script src="./barFilter.js"></script>
