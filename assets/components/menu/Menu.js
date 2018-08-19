import Vue from 'vue';

const Menu = Vue.component('nav-menu', {
  methods: {
    isActive(item) {
      return this.$store.state.menu.active === item;
    },
    isOpen(item) {
      console.log('isOpen: ', item);
      return this.$store.state.menu.open === item;
    },
    handleClick(item) {
      console.log('clicked: ', item);
      // const meta = this.$store.state.menu.items.filter(i => i.display === item)[0];
      console.log('vuex open: ', this.$store.state.menu.open);
      if (this.$store.state.menu.open === item) {
        this.$store.commit('setOpen', {
          item: ''
        });
      } else {
        this.$store.commit('setOpen', {
          item: item
        });
      }
      // console.log(meta);
      // const el = document.getElementById(meta.submenuId);
      // el.classList.toggle('submenu-active');
    }
  },
  computed: {
    listItems() {
      return this.$store.state.menu.items;
    },
  }
});

export default Menu;

