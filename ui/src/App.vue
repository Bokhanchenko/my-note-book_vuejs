<template>
  <div id="app"><router-view /></div>
</template>

<script>
export default {
  name: "App",
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  height: 100vh;
  width: 100vw;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  height: 100%;
  width: 100%;

  background-image: url("./assets/back-1.jpg");
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-position: center;
}

.section {
  background-color: white;
  border: 2px solid black;
  border-radius: 5px;
}

.shadow {
  box-shadow: inset 0 0 10px 1px rgba(0, 0, 0, 0.75);
}

.scrollbar {
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: mediumblue;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: mediumblue;
  }
}

.centered {
  justify-self: center;
  align-self: center;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

hr {
  margin: 10px 0;
}
</style>
