<template>
  <div
    :class="{
      selectable: item.status===0,
      selected: item.status===1,
      done: item.status===2
    }"
    @click="select" class="item"
  >
    <div v-show="item.status===0" class="content selectable">?</div>
    <div v-show="item.status===1" class="content">{{ item.value }}</div>
    <div v-show="item.status===2" class="content">&#10004;</div>
  </div>
</template>

<script>
  export default {
    name: 'MemoryGameItem',

    props: ['item'],

    data() {
      return {}
    },

    methods: {
      select() {
        if (this.item.status !== 2) {
          this.$emit('itemClick', this.item.id)
        }
      }
    }
  }
</script>

<style scoped>
  .item {
    display: flex;
    width: 50px;
    height: 50px;
    border: 1px solid black;
  }

  .content {
    margin: auto;
    background-color: transparent;
  }

  .selectable {
    cursor: pointer;
  }

  .selected {
    border: 2px solid greenyellow;
  }

  .done {
    background-color: greenyellow;
  }
</style>
