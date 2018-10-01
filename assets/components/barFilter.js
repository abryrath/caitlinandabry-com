import Vue from 'vue';

export default Vue.component('bar-filter', {
    props: ['bars'],
    data() {
        return {
            filteredBars: this.getBars()
        };
    },
    mounted() {
        if (this.bars) {
            this.$store.commit('setBars', {
                bars: this.bars
            });
        }
    },
    methods: {
        updateBarSort(sort) {
            this.$store.commit('setSort', sort);
            document.querySelectorAll('[data-sort]').forEach(label => {
                label.classList.remove('active');
            });
            document.querySelector('[data-sort=\''+sort+'\']').classList.add('active');
               
            this.getBars();
        },
        getBars() {
            const sort = this.$store.state.sort.sort;
            const sortDir = this.$store.state.sort.dir;
            fetch('/bars?sort='+sort+'&sortDir='+sortDir)
                .then(t => t.json())
                .then(j => {
                    this.filteredBars = j;
                });
        },
    },
});
