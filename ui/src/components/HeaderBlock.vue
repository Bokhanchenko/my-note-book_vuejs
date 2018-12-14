<template>
  <div class="header section">
    <ClockPanel />

    <h1 class="title centered">My-notebook</h1>

    <div
      class="logo-box centered"
      @click="$emit('edit-mode-set')">
      <img
        src="../assets/logo.png"
        alt="Vue.js"
        class="logo">
    </div>
  </div>
</template>

<script>
import ClockPanel from './TheClockPanel.vue';

export default {
  name: 'HeaderBlock',

  components: {
    ClockPanel,
  },

  props: {
    editMode: Boolean
  },
}
</script>

<style scoped lang="scss">
.header {
  grid-area: hd;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: 40px;
  background-color: white;
  overflow: hidden;
}

.title {
  grid-column: 3 / 5;
  font-style: oblique;
  text-decoration: underline overline black;
}

.logo-box {
  grid-column: 6;
  height: 100%;
  cursor: pointer;
  .logo {
    height: 100%;
    width: auto;
  }
}
</style>
