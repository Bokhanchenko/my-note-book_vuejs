<template>
  <div>
    <div class="wrapper" @click="$emit('item-click', item.id)">
      <span class="title" :class="{active: item.id === activeNavItemId}">{{ item.title }}</span>

      <div class="btn-container" v-if="editMode">
        <button class="edit" title="Редагуваты">P</button>
        <button class="remove" title="Видалити">R</button>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: 'NavMenuItem',

    props: {
      item: { type: Object, require: true},
      activeNavItemId: Number,
      editMode: Boolean,
    },
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
