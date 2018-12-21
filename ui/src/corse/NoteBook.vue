<template>
  <div class="wrapper">
    <Header class="scrollbar shadow" @logout="logout"/>

    <div class="nav-top scrollbar section shadow">
      <NavArticles
        v-if="user"
        :userId="user.id"
        :editMode="editMode"
      />
    </div>

    <aside class="nav-aside section scrollbar shadow" v-if="user">
      <NavTopics :userId="user.id" :editMode="editMode"/>
    </aside>

    <main class="content section">
      <ContentEditable :topicId="topicId" />
    </main>
  </div>
</template>

<script>
import Header from "../components/HeaderBlock.vue";
import NavArticles from "../components/NavArticles.vue";
import NavTopics from "../components/NavTopics.vue";
import ContentEditable from "../components/ContentEditable.vue";

export default {
  name: "NoteBook",

  components: {
    Header,
    NavArticles,
    NavTopics,
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
    this.getUser()
  },

  sockets: {
    connect() {
    },

    userGet(user) {
      this.setUser(user)
    }
  },

  methods: {
    logout() {
      localStorage.removeItem('user');
      this.$router.push('login')
    },

    getUser() {
      const user = localStorage.getItem('user');

      if (user) {
        this.user = JSON.parse(user);
      } else {
        this.$router.push({ name: 'login' })
      }
    },

    clearState() {
      const newQuery = Object.assign({}, this.$route.query);
      delete newQuery.editMode;
      this.$router.replace({ query: newQuery });
    }
  }
};
</script>

<style scoped lang="scss">
.wrapper {
  display: grid;
  height: 100%;
  width: 100%;
  padding: 10px;

  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: 50px min-content auto;
  grid-gap: 10px;
  grid-template-areas:
    "hd  hd  hd  hd  hd  hd"
    "nav nav nav nav nav nav"
    "sd  ct  ct  ct  ct  ct"
}

.nav-top {
  grid-area: nav;
  min-height: 26px;
  max-height: 56px;
  overflow-y: auto;
}

.nav-aside {
  grid-area: sd;
  overflow-x: hidden;
}

.main {
  grid-area: mn;
}

.content {
  grid-area: ct;
}
</style>