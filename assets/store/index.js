import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        menu: {
            active: 'home',
            items: [
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
            ],
            open: null,
            mobile: false,
        },
        restaurants: {
            all: [],
            filtered: [],
            filters: [],
        },
        cuisines: {
            all: [],
            selected: []
        }
    },
    mutations: {
        setActive(state, payload) {
            console.log('setActive: ', payload);
            state.menu.active = payload.item;
        },
        setOpen(state, payload) {
            console.log('setOpen: ', payload);
            
            state.menu.open = payload.item;
        },
        setMobileMenu(state, payload) {
            state.menu.mobile = payload.open;
        },
        setRestaurants(state, payload) {
            state.restaurants.all = payload.restaurants;
            state.restaurants.filtered = payload.restaurants;
        },
        setCuisines(state, payload) {
            state.cuisines.all = payload.cuisines;
        },
        setSelectedCuisine(state, payload) {
            state.cuisines.selected = payload.cuisine;
        },
    },
    getters: {
        filteredRestaurants(state) {
            return state.restaurants.filtered;
        },
        allRestaurants(state) {
            return state.restaurants.all;
        },
        allCuisines(state) {
            return state.cuisines.all;
        },
    }
});

export default store;
