import Vue from 'vue';

export default Vue.component('attraction-filter', {
    props: ['attractions'],
    mounted() {
        if (this.attractions) {
            this.$store.commit('setAttractions', {
                attractions: this.attractions
            });
        }
    },
    data() {
        return {
            filteredAttractions: this.getAttractions()
        };
    },
    methods: {
        getAttractions() {
            const sort = this.$store.state.sort.sort;
            const sortDir = this.$store.state.sort.dir;
            fetch('/attractions?sort='+sort+'&sortDir='+sortDir)
                .then(t => t.json())
                .then(j => {
                    this.filteredAttractions = j;
                });
        }
    }
});
