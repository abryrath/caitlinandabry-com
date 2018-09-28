import Vue from 'vue';

import './scss/app.scss';

import store from './store'; 
import Menu from './components/menu/Menu.vue';
import restaurantFilter from './components/restaurantFilter.vue';

new Vue({
  el: '#menu-root',
  store,
  render: h => h(Menu)
});

document.querySelectorAll('[data-vue]').forEach((e) => {
    new Vue({ store }).$mount(e);
});
