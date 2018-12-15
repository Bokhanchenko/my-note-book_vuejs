<template>
  <div class="nav-item" @click="$emit('item-click', item.id)">
    <span class="title" :class="{ active: item.id === activeId }">
      {{ item.title }}
    </span>

    <div class="btn-container" v-if="editMode">
      <button class="btn edit" title="Редагуваты" @click="onEdit(item)">E</button>
      <button class="btn remove" title="Видалити" @click="onRemove(item)">R</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavMenuItem',

  props: {
    editMode: Boolean,
    activeId: Number,
    item: { type: Object, require: true },
  },

  data() {
    return {
      edit: false,
    }
  },

  methods: {
    onEdit(item) {
      const newTitle = prompt('Enter the name', item.title);
      if (newTitle) this.$emit('update', { id: item.id, title: newTitle })
    },

    onRemove(item) {
      const canRemove = confirm(`Are you really want to delete "${item.title}"`);
      if (canRemove) this.$emit('remove', item.id)
    }
  }
}
</script>

<style scoped lang="scss">
.nav-item {
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: relative;
  min-height: 18px;
  /*min-width: 120px;*/
  padding: 4px 10px;
  cursor: pointer;

  &:hover .title {
    text-shadow: 0 0 5px #000;
  }
}

.btn-container {
  display: flex;
  position: absolute;
  right: 6px;
  top: -6px;
  height: 100%;

  > .btn {
    height: 16px;
    width: 16px;
    font-size: 0.6rem;
    border: 1px solid gray;
    border-radius: 50%;
    background-color: aqua;
    outline: none;
    cursor: pointer;

    &:hover {
      opacity: .6;
      box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.75);
    }
  }
}

.active {
  text-shadow: 0 0 3px #000;
}
</style>
