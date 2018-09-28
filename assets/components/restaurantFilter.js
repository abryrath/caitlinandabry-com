import Vue from 'vue';

export default Vue.component('restaurant-filter', {
    props: ['restaurants', 'cuisines'],
    data() {
        return {
            i: 1
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
        }
    },
    methods: {
        updateCuisineFilter(cuisine) {
            const label = document.querySelector('[data-label="' + cuisine + '"]');
            if (label.classList.contains('active')) {
                label.classList.remove('active');
            } else {
                label.classList.add('active');
            }

            this.$store.commit('setSelectedCuisine', {
                cuisine
            });
        },
    }
});
