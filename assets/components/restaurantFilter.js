import Vue from 'vue';
import mapGetters from 'vuex';
import SortUtil from '../util/sort.js';

export default Vue.component('restaurant-filter', {
    props: ['restaurants', 'cuisines', 'costs'],
    computed: {
        all() {
            const cuisines = this.$store.getters.selectedCuisines;
            return cuisines.length && cuisines.includes('all');
        },
        sortCriteria() {
            return this.$store.state.restaurants.sort;
        },
        selectedCost() {
            console.log('selectedCost()');
            return this.$store.state.restaurantCosts.selected;
        },
        // filteredRestaurants() {
            
        //     console.log('restaurantFilter::filteredRestaurants()');
        //     const restaurants = this.$store.state.restaurants.all;
        //     let filtered = [];

        //     // Cuisine
        //     if (this.$store.state.cuisines.selected.length === 0
        //         || this.$store.state.cuisines.selected.includes('all')) {
        //         return restaurants;
        //     }

        //     const selected = this.$store.state.cuisines.selected;
                
        //     filtered = restaurants.filter(t => {
        //         // console.log(t);
        //         for (var key in t.cuisines) {
        //             //console.log(key);
        //             //if (parseInt(key)) {
        //                 //console.log('value: ' + t.cuisines[key].value + ' selected: ', selected);
        //                 if (selected.includes(t.cuisines[key].value)) {
        //                     return true;
        //                 }
        //             //}
        //         }
        //         return false;
        //     });
            
        //     //Cost
        //     const cost = this.selectedCost;
        //     console.log(cost);
        //     if (cost.length > 0) {
        //         filtered = restaurants.filter(t => {
        //             for (var key in t.cost) {
        //                 console.log(key);
        //             }
        //         });
        //     }

        //     // Sort
        //     console.log('sorting');
            
        //     filtered = SortUtil.restaurantSort(filtered, this.$store.state.restaurants.sort, this.$store.state.restaurants.sortDir);
            
        //     return filtered;
        // }
    },
    data() {
        return {
            filteredRestaurants: this.restaurants,
        }
    },
    mounted() {
        console.log('restaurant-filter mounted');
        if (this.restaurants) {
            this.$store.commit('setRestaurants', {
                restaurants: this.restaurants
            });
            this.$store.commit('setCuisines', {
                cuisines: this.cuisines
            });
            this.$store.commit('setRestaurantCosts', {
                costs: this.costs
            });
        }
    },
    methods: {
        updateCuisineFilter(cuisine) {
            console.log('updateCuisinesFilter');
            this.$store.commit('setSelectedCuisine', {
                cuisine
            });

            document.querySelectorAll('[data-label]').forEach(label => {
                label.classList.remove('active');
            });
            
            this.$store.getters.selectedCuisines.forEach(selected => {
                document.querySelectorAll("[data-label='"+selected+"']").forEach(label => {
                    
                    //const value = label.dataset.label;
                    //if (selected.includes(label.dataset.label)) {
                        label.classList.add('active');
                    //} else {
                        //label.classList.remove('active');
                    //}
                });
            });
            this.getRestaurants();
        },
        updateRestaurantCostFilter(cost) {
            console.log('updateRestaurantCostFilter');
            this.$store.commit('setSelectedRestaurantCost', {
                cost
            });
            this.getRestaurants();
        },
        updateRestaurantSort(sort) {
            console.log('updateRestaurantSort');
            this.$store.commit('setSelectedRestaurantSort', {
                sort
            });

            this.getRestaurants();
        },
        getRestaurants() {
            let cuisines = '';
            this.$store.state.cuisines.selected.forEach(c => {
                if (cuisines.length) {
                    cuisines += ',';
                }
                cuisines += c;
            });
            const cost = this.$store.state.restaurantCosts.selected;
            const sort = this.$store.state.restaurants.sort;
            const sortDir = this.$store.state.restaurants.sortDir;
            fetch('/restaurants?cuisines='+cuisines+'&cost='+cost+'&sort='+sort+'&sortDir='+sortDir)
                .then(t => t.json())
                .then(j => {
                    this.filteredRestaurants = j;
                });
            
        }
    }
});
