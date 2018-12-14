<template>
  <menu class="menu-list">
    <li class="menu-item" v-for="item in navList" :key="item.id">
      <NavItem
        :item="item"
        :activeNavItemId="activeNavItemId"
        @item-click="$emit('item-click', $event)"
      />
    </li>
  </menu>
</template>

<script>
import NavItem from './NavMenuItem.vue'

export default {
  name: 'NevMenu',

  components: {
    NavItem
  },

  props: {
    navList: {
      type: Array,
      default: function() { return defaultNavList },
      required: true,
    },

    activeNavItemId: {
      type: Number,
      default: 0,
    }
  },
}
</script>

<style scoped lang="scss">
.menu-list {
  display: flex;
  align-items: center;
}

.menu-item {
  margin: 0 4px 0 0;
  :last-child {
    margin: 0;
  }
}
</style>
