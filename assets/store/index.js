import Vue from 'vue';
import Vuex from 'vuex';

import SortUtil from '../util/sort.js';

Vue.use(Vuex);
const menu = [
    {display: 'home', link: true, url: '/'},
    {display: 'our story', link: true, url: '/our-story'},
    {display: 'details', link: true, url: '/details'},
    {display: 'travel & accommodations', link: true, url: '/travel-accommodations'},
    {display: 'things to do', link: false,
     children: [
         {display: 'dine', link: true, url: '/things-to-do/dine'},
         {display: 'drink', link: true, url: '/things-to-do/drink'},
         {display: 'explore', link: true, url: '/things-to-do/explore'},
     ],
     submenuId: '#things-to-do-nav-submenu'
    },
    {display: 'wedding party', link: true, url: '/wedding-party'},
    {display: 'registry', link: true, url: '#'},
    {display: 'photos', link: true, url: '/photos'},
];

const store = new Vuex.Store({
    state: {
        menu: {
            active: 'home',
            items: menu,
            open: null,
            mobile: false,
        },
        restaurants: {
            all: [],
            filters: [],
            sort: 'alpha',
            sortDir: 'asc',
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
            filtered: []
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
        setSelectedRestaurantSort(state, payload) {
            if (state.restaurants.sort === payload.sort) {
                state.restaurants.sortDir = state.restaurants.sortDir === 'asc' ? 'desc' : 'asc';
            } else {
                state.restaurants.sortDir = 'asc';
            } 
            state.restaurants.sort = payload.sort;
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
