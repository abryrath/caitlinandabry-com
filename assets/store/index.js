import Vue from 'vue';
import Vuex from 'vuex';

import SortUtil from '../util/sort.js';
import menu from '../data/menu.js';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        menu: {
            active: 'home',
            items: menu,
            open: null,
            mobile: false,
        },
        sort: {
            sort: 'alpha',
            dir: 'asc',
        },
        restaurants: {
            all: [],
            filters: [],
        },
        cuisines: {
            all: [],
            selected: ['all']
        },
        restaurantCosts: {
            all: [],
            selected: ''
        },
        bars: {
            all: [],
            filtered: [],
        },
        attractions: {
            all: [],
            filtered: []
        },
    },
    mutations: {
        setActive(state, payload) {
            state.menu.active = payload.item;
        },
        setOpen(state, payload) {
            state.menu.open = payload.item;
        },
        setMobileMenu(state, payload) {
            state.menu.mobile = payload.open;
        },
        setRestaurants(state, payload) {
            state.restaurants.all = payload.restaurants;
        },
        setRestaurantCosts(state, payload) {
            console.log('setRestaurantCosts');
            state.restaurantCosts.all = payload.costs;
        },
        setCuisines(state, payload) {
            const cuisines = payload.cuisines;
            cuisines.all = 'All';
            state.cuisines.all = cuisines;
        },
        setSelectedCuisine(state, payload) {
            if (payload.cuisine == 'all') {
                state.cuisines.selected = ['all'];
                return;
            }
            if (state.cuisines.selected.includes(payload.cuisine)) {
                let cuisines = state.cuisines.selected;
                const index = cuisines.indexOf(payload.cuisine);
                cuisines.splice(index, 1);
                state.cuisines.selected = cuisines;
            } else {
                let cuisines = state.cuisines.selected;
                if (cuisines.includes('all')) {
                    cuisines.splice(cuisines.indexOf('all'), 1);
                }
                cuisines.push(payload.cuisine);
                state.cuisines.selected = cuisines;
            }

            if (state.cuisines.selected.length === 0) {
                state.cuisines.selected = ['all'];
            }
        },
        setSelectedRestaurantCost(state, payload) {
            console.log('setSelectedRestaurantCost');
            if (state.restaurantCosts.selected == payload.cost) {
                state.restaurantCosts.selected = '';
                return;
            }
            state.restaurantCosts.selected = payload.cost;
        },
        setSort(state, payload) {
            if (state.sort.sort === payload.sort) {
                state.sort.dir = state.sort.dir === 'asc' ? 'desc' : 'asc';
            } else {
                state.sort.dir = 'asc';
            } 
            state.sort.sort = payload.sort;
        },
        setBars(state, payload) {
            state.bars.all = payload.bars;
            state.bars.filtered = payload.bars;
        },
        setAttractions(state, payload) {
            state.attractions.all = payload.attractions;
            state.attractions.filtered = payload.attractions;
        },
    },
    getters: {
        allRestaurants(state) {
            return state.restaurants.all;
        },
        allCuisines(state) {
            let cuisines = [];
            for (var k in state.cuisines.all) {
                cuisines.push({
                    key: k,
                    value: state.cuisines.all[k]
                });
            }
            cuisines.sort((a,b) => {
                if (a.key > b.key) {
                    return 1;
                } else if (a.key < b.key) {
                    return -1;
                }
                return 0;
            });
            
            return cuisines;
        },
        restaurantCosts(state) {
            let costs = [];
            for (var k in state.restaurantCosts.all) {
                costs.push({
                    key: k,
                    value: state.restaurantCosts.all[k]
                });
            }
            return costs;
        },
        selectedCuisines(state) {
            return state.cuisines.selected;
        },
        filteredBars(state) {
            return state.bars.all;
        },
        filteredAttractions(state) {
            return state.attractions.all;
        }
    }
});

export default store;
