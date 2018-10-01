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
    },
    data() {
        return {
            filteredRestaurants: this.getRestaurants(),
        };
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
                    label.classList.add('active');
                });
            });

            this.getRestaurants();
        },
        updateRestaurantCostFilter(cost) {
            console.log('updateRestaurantCostFilter');
            this.$store.commit('setSelectedRestaurantCost', {
                cost
            });

            document.querySelectorAll("[data-cost='"+cost+"']").forEach(label => {
                label.classList.remove('active');
            });

            
            const active = document.querySelector("[data-cost='"+this.$store.state.restaurantCosts.selected+"']");
            if (active) {
                active.classList.add('active');
            }
            
            this.getRestaurants();
        },
        updateRestaurantSort(sort) {
            this.$store.commit('setSort', {
                sort
            });

            document.querySelectorAll('[data-sort]').forEach(label => {
                label.classList.remove('active');
            });

            document.querySelector('[data-sort=\''+sort+'\']').classList.add('active');
            
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
            const sort = this.$store.state.sort.sort;
            const sortDir = this.$store.state.sort.dir;
            fetch('/restaurants?cuisines='+cuisines+'&cost='+cost+'&sort='+sort+'&sortDir='+sortDir)
                .then(t => t.json())
                .then(j => {
                    this.filteredRestaurants = j;
                });
        }
    }
});
