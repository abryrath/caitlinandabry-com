import Vue from 'vue';

export default Vue.component('bar-filter', {
    props: ['bars'],
    mounted() {
        if (this.bars) {
            this.$store.commit('setBars', {
                bars: this.bars
            });
        }
    },
    methods: {
    },
});
