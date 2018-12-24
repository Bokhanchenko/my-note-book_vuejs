<template>
  <div class="header section">
    <Clock />
    <h1 class="title centered">My-notebook</h1>
    <UserNav class="logo-box centered" />
  </div>
</template>

<script>
import Clock from './Clock.vue';
import UserNav from './UserNav.vue';

export default {
  name: 'HeaderBlock',

  components: {
    Clock,
    UserNav
  },
}
</script>

<style scoped lang="scss">
.header {
  grid-area: hd;
  display: grid;
  padding: 4px;
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
}
</style>
