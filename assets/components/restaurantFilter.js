import Vue from 'vue';

export default Vue.component('restaurant-filter', {
    props: ['restaurants', 'cuisines'],
    computed: {
        all() {
            const cuisines = this.$store.getters.selectedCuisines;
            return cuisines.length && cuisines.includes('all');
        },
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
            this.$store.commit('setSelectedCuisine', {
                cuisine
            });
            
            this.$store.getters.selectedCuisines.forEach(selected => {
                document.querySelectorAll('[data-label]').forEach(label => {
                    const value = label.dataset.label;
                    if (selected.includes(label.dataset.label)) {
                        label.classList.add('active');
                    } else {
                        label.classList.remove('active');
                    }
                });
            });
        },
    }
});
