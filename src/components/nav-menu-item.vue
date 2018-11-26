<template>
  <div>
    <div class="wrapper"
         @click="emitNavItemClick()">
      <span class="title"
            :class="{active: item.id === activeNavItemId}">
        {{ item.title }}
      </span>

      <div class="btn-container" v-if="false">
        <button class="edit" title="Редагуваты"></button>
        <button class="remove" title="Видалити"></button>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    props: ['item', 'activeNavItemId'],
    data() {
      return {}
    },
    methods: {
      emitNavItemClick() {
        this.$emit('nav-item-click', this.item.id)
      }
    },
    computed: {}
  }
</script>

<style scoped lang="scss">
  .wrapper {
    display: flex;
    justify-content: space-around;
    align-items: center;
    min-height: 18px;
    min-width: 120px;
    padding: 4px;
    cursor: pointer;
    &:hover {
      font-weight: 900;
      opacity: .6;
    }
  }
  .btn-container {
    display: flex;
    height: 100%;
    > button {
      height: 100%;
    }
  }
  .active {
    font-weight: 900;
  }
</style>
