<template>
  <div id="header" class="section">
    <Clock />
    <h1 class="title centered">{{ title }}</h1>
    <div class="logo-box centered">
      <img src="../assets/logo.png" alt="Vue.js" class="logo">
    </div>
  </div>
</template>

<script>
  import Clock from './clock-tablo.vue'

  export default {
    name: 'Header',

    components: {
      Clock,
    },

    data: function () {
      return {
        title: 'My-notebook'
      }
    },
  }
</script>

<style scoped lang="scss">
  #header {
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
    .logo {
      height: 100%;
      width: auto;
    }
  }
</style>
