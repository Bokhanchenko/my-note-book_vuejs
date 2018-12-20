<template>
  <div class="create-nav">
    <button class="btn" @click="onCreate" :title="title">+</button>
  </div>
</template>

<script>
export default {
  name: 'NavMenuCreator',

  props: {
    name: String
  },

  computed: {
    title() { return `Create new ${this.name}` },
  },

  methods: {
    onCreate() {
      const title = prompt('Enter the name');
      if (title) this.$emit('create', title)
    }
  }
}
</script>

<style scoped lang="scss">
.create-nav {
  text-align: center;
  height: 100%;
  min-width: 60px;
  user-select: none;
}

.btn {
  height: 24px;
  width: 24px;
  text-align: center;
  margin: auto;
  background-color: transparent;
  border: 1px solid gray;
  border-radius: 50%;
  cursor: pointer;
  outline: none;

  &:hover {
    font-weight: 900;
    opacity: .6;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.75);
  }
}
</style>
