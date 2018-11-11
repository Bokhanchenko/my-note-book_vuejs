<template>
  <div class="wrapper" @click="onClick()">

    <span class="title">
      {{ item.title }}
    </span>

    <div class="btn-container" v-if="false">
      <button class="edit" title="Редагуваты"></button>
      <button class="remove" title="Видалити"></button>
    </div>

  </div>
</template>

<script>
  export default {
    props: ['item'],
    data() {
      return {}
    },
    methods: {
      onClick() {
        console.log(this.item)
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
  }
  .btn-container {
    display: flex;
    height: 100%;
    > button {
      height: 100%;
    }
  }
</style>
