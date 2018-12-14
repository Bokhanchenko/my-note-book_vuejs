<template>
  <div>
    <menu class="menu-list">
      <li class="menu-item" v-for="item in navList" :key="item.id">
        <NavItem
          :item="item"
          :activeNavItemId="activeAsideItemId"
          @item-click="$emit('item-click', $event)"
        />
      </li>
    </menu>
  </div>
</template>

<script>
  import NavItem from './NavMenuItem.vue'

  export default {
    name: 'NavMenuAside',

    components: {
      NavItem,
    },

    props: {
      activeAsideItemId: Number,
      navList: {
        type: Array,
        default: () => []
      },
    },
  }
</script>

<style scoped lang="scss">
  .menu-list {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .menu-item {
    margin: 0 4px 0 0;
    :last-child {
      margin: 0;
    }
  }
</style>
