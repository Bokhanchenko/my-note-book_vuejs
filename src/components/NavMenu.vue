<template>
  <div class="wrapper">
    <manu class="menu-list">
      <li class="menu-item" v-for="item in navList" :key="item.id">
        <NavItem :item="item" />
      </li>
    </manu>
  </div>
</template>

<script>
  import NavItem from './nav-item.vue'

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
    },
    data() {
      return {

      }
    },
    methods: {

    },
    computed: {

    },
    created: function() {
      console.log('navList', this.navList)
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