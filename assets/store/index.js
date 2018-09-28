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
            selected: ['all']
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
            state.restaurants.filtered = payload.restaurants;
        },
        setCuisines(state, payload) {
            const cuisines = payload.cuisines;
            cuisines.all = 'All';
            state.cuisines.all = cuisines;
        },
        setSelectedCuisine(state, payload) {
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
        filteredRestaurants(state) {
            const restaurants = state.restaurants.all;
            let filtered = [];
            // Cuisine
            if (state.cuisines.selected.length === 0 || state.cuisines.selected.includes('all')) {
                return restaurants;
            }

            const selected = state.cuisines.selected;

            filtered = restaurants.filter(t => {
                for (var key in t.cuisines) {
                    if (parseInt(key)) {
                        if (selected.includes(t.cuisines[key].value)) {
                            return true;
                        }
                    }
                }
                return false;
            });
            return filtered;
        },
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
