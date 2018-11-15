<template>
  <div>
    <div class="wrapper">
      <menu class="menu-list">
        <li class="menu-item"
            v-for="item in navList"
            :key="item.id">
          <NavItem
            :item="item"
            :activeNavItemId="activeNavItemId"
            @nav-item-click="emitNavItemClick($event)">
          </NavItem>
        </li>
      </menu>
    </div>
  </div>
</template>

<script>
  import NavItem from './NavMenuItem.vue'

  const defaultNavList = [
    {
      id: 0,
      title: 'Test',
    }
  ];

  export default {
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
    data() {
      return {

      }
    },
    methods: {
      emitNavItemClick(data) {
        this.$emit('nav-item-click', data)
      }
    },
    computed: {

    },
    created() {

    }
  }
</script>

<style scoped lang="scss">
  .wrapper {
    display: block;
  }
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