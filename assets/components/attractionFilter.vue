<template>
    <div class="attraction-filter">
        <div class="controls-container">
            <table>
                <tr>
                    <td class="header">Filters</td>
                </tr>
                <tr>
                    <td class="controls">
                    </td>
                </tr>
                <tr>
                    <td class="controls">
                    </td>
                </tr>
                <tr>
                    <td class="header">Sort</td>
                </tr>
                <tr>
                    <td class="controls">
                        <label @click="updateAttractionSort('alpha')" data-sort="alpha">Alphabetic</label>
                        <label @click="updateAttractionSort('cost')" data-sort="cost">Cost</label>
                    </td>
                </tr>
            </table>
        </div>
        <div v-if="filteredAttractions.length">
            <ul>
                <li v-for="attraction in filteredAttractions" class="attraction-container">
                    <div class="title">{{ attraction.title }}</div>
                </li>
            </ul>
        </div>
        <div v-else>
            No results
        </div>
    </div>
</template>
<script src="./attractionFilter.js"></script>
