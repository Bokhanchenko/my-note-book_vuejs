<template>
  <div>
    <div class="wrapper">
      <menu class="menu-list">
        <li class="menu-item"
            v-for="item in navList"
            :key="item.id">
          <NavItem
              :item="item"
              :activeNavItemId="activeAsideItemId"
              @nav-item-click="emitNavItemClick($event)">
          </NavItem>
        </li>
      </menu>
    </div>
  </div>
</template>

<script>
  import NavItem from './nav-menu-item.vue'

  export default {
    components: {
      NavItem,
    },
    props: ['navList', 'activeAsideItemId'],
    data() {
      return {}
    },
    methods: {
      emitNavItemClick(id) {
        this.$emit('nav-item-click', id)
      }
    },
    computed: {}
  }
</script>

<style scoped lang="scss">
  .wrapper {
    display: block;
  }
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