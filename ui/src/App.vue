<template>
  <div id="app">
    <Header />

    <div class="nav-top">
      <NavMenu
        v-if="user"
        class="section"
        :userId="user.id"
        :editMode="editMode"
      />
    </div>

    <aside class="nav-aside section" v-if="user">
      <AsideNavMenu :userId="user.id" :editMode="editMode"/>
    </aside>

    <main class="content section">
      <ContentEditable :topicId="topicId" />
    </main>

    <!--<footer class="footer section">Turbo Web Developer Dmitry Kayan</footer>-->
  </div>
</template>

<script>
import Header from "./components/HeaderBlock.vue";
import NavMenu from "./components/NavMenu.vue";
import AsideNavMenu from "./components/NavMenuAside.vue";
import ContentEditable from "./components/ContentEditable.vue";

export default {
  name: "App",

  components: {
    Header,
    NavMenu,
    AsideNavMenu,
    ContentEditable
  },

  data() {
    return {
      user: null,
    };
  },

  computed: {
    editMode() {
      const mode = this.$route.query.editMode;
      return mode ? JSON.parse(mode) : false;
    },

    topicId() {
      return Number(this.$route.query.topicId)
    }
  },

  created() {
    this.clearState();
  },

  sockets: {
    connect() {
      this.getUser()
    },

    userGet(user) {
      this.setUser(user)
    }
  },

  methods: {
    getUser() {
      const localUser = localStorage.getItem('user');

      if (false && localUser) {
        this.user = JSON.parse(localUser);
      } else {
        this.$socket.emit('userGet', 7)
      }
    },

    setUser(user) {
      this.user = user;
      this.saveUserToLocal(this.user)
    },

    saveUserToLocal(user) {
      localStorage.setItem('user', JSON.stringify(user))
    },

    clearState() {
      const newQuery = Object.assign({}, this.$route.query);
      delete newQuery.editMode;
      this.$router.replace({ query: newQuery });
    }
  }
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  height: 100vh;
  width: 100vw;
  padding: 10px;
  background-image: url("./assets/back-1.jpg");
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-position: center;

  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: 50px min-content auto; //30px;
  grid-gap: 10px;
  grid-template-areas:
    "hd  hd  hd  hd  hd  hd"
    "nav nav nav nav nav nav"
    "sd  ct  ct  ct  ct  ct"
    /*"ft  ft  ft  ft  ft  ft";*/
}

.nav-top {
  grid-area: nav;
  background-color: white;
  overflow: auto;
}

.nav-aside {
  grid-area: sd;
  background-color: white;
  overflow: auto;

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

.main {
  grid-area: mn;
}

.footer {
  grid-area: ft;
  background-color: white;
  text-align: center;
  font-size: 0.6rem;
}

.content {
  grid-area: ct;
  padding: 8px;
}


.section {
  background-color: white;
  border: 2px solid black;
  border-radius: 5px;
  padding: 3px;
  box-shadow: inset 0 0 10px 1px rgba(0, 0, 0, 0.75);
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
