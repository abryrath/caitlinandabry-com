import Vue from 'vue';

export default Vue.component('attraction-filter', {
    props: ['attractions'],
    mounted() {
        if (this.attractions) {
            this.$store.commit('setAttractions', {
                attractions: this.attractions
            });
        }
    }
});
