<template>
  <nav class="nav centered">
    <li class="nav-item">
      <button class="btn" @click="toggleEditMode">
        <img class="icon" src="@/assets/feather.svg" alt="auto-fix.svg">
      </button>
    </li>
    <li class="nav-item">
      <button class="btn" @click="logout">
        <img src="@/assets/exit-run.svg" alt="Exit" class="item exit">
      </button>
    </li>
  </nav>
</template>

<script>
export default {
  name: "UserNav",

  methods: {
    toggleEditMode() {
      const query = Object.assign({}, this.$route.query);

      if (query.editMode) delete query.editMode;
      else query.editMode = true;

      this.$router.replace({ query })
    },


    logout() {
      localStorage.removeItem('user');
      this.$router.push('login')
    },
  }
}
</script>

<style scoped lang="scss">
.nav {
  display: flex;
  align-items: center;
}

.btn {
  text-align: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  padding: 4px;

  &:hover {
    opacity: .6;
    font-weight: 900;
  }
  &:active {
    opacity: .8;
  }
}
</style>