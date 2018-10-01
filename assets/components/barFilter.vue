<template>
    <div class="bar-filter">
        <div class="controls-container">
            <table>
                <tr>
                    <td class="header">Sort</td>
                </tr>
                <tr>
                    <td class="controls">
                        <label @click="updateBarSort('alpha')" data-sort="alpha">Alphabetic</label>
                    </td>
                </tr>
            </table>
        </div>
        <div v-if="filteredBars.length">
            <ul>
                <li v-for="bar in filteredBars" class="bar-container">
                    <div class="title">
                        {{ bar.title }}
                    </div>
                </li>
            </ul>
        </div>
        <div v-else>
            No results
        </div>
    </div>
</template>
<script src="./barFilter.js"></cript>
