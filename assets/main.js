import Vue from 'vue';

import './scss/app.scss';


import VModal from 'vue-js-modal';
import store from './store'; 
import Menu from './components/menu/Menu.vue';
import restaurant from './components/restaurant.vue';
import restaurantModal from './components/restaurantModal.vue';
import restaurantFilter from './components/restaurantFilter.vue';
import barFilter from './components/barFilter.vue';
import attractionFilter from './components/attractionFilter.vue';
import photoLightbox from './components/photoLightbox.vue';

Vue.use(VModal);

new Vue({
  el: '#menu-root',
  store,
  render: h => h(Menu)
});

document.querySelectorAll('[data-vue]').forEach((e) => {
    new Vue({ store }).$mount(e);
});
