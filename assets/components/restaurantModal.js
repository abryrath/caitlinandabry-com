import Vue from 'vue';

export default Vue.component('restaurant-modal', {
    props: ['id'],
    methods: {
        onShow(data) {
            console.log(data);
        }
    }
});
