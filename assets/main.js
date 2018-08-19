import Vue from 'vue';

import './scss/app.scss';

import store from './store'; 
import Menu from './components/menu/Menu.vue';

new Vue({
  el: '#menu-root',
  store,
  render: h => h(Menu)
});
