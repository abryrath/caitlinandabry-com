<template>
  <ul class="nav">
    <li
      v-for="item in listItems"
      v-bind:class="{ 
                    'nav-item-active': isActive(item), 
                    'nav-item': true
                    }"
      >
      <a v-if="item.link" v-bind:href="item.url">
        {{item.display}}
      </a>
      <a v-else href="#" v-on:click="handleClick(item.display)">
        {{item.display}}
      </a>
      <div
        v-bind:id="item.submenuId"
        v-bind:class="{
                      submenu: true,
                      'submenu-active': isOpen(item.display)
                      }"
        >
        <ul class="submenu-list">
          <li v-for="child in item.children">
            <a v-if="child.link" v-bind:href="child.url">
              {{child.display}}
            </a>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</template>
<script src="./Menu.js"></script>
