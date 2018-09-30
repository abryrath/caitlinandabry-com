import Vue from 'vue';

export default Vue.component('restaurant', {
    props: ['restaurant'],
    methods: {
        showModal(data) {
            console.log('show Modal ' + this.restaurant.id, data);
            this.$modal.show('modal-' + this.restaurant.id);
        },
        hideModal(data) {
            this.$modal.hide('modal-' + this.restaurant.id);
        }
    }
});
