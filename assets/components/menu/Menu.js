import Vue from 'vue';

const Menu = Vue.component('nav-menu', {
  methods: {
    isActive(item) {
      return this.$store.state.menu.active === item;
    },
    isOpen(item) {
      return this.$store.state.menu.open === item;
    },
    handleClick(item) {
      if (this.$store.state.menu.open === item) {
        this.$store.commit('setOpen', {
          item: '',
        });
      } else {
        this.$store.commit('setOpen', {
          item: item,
        });
      }
    },
  },
  computed: {
    listItems() {
      return this.$store.state.menu.items;
    },
  }
});

export default Menu;

