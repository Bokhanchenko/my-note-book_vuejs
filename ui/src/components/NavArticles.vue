<template>
  <menu class="menu-list" v-if="articles">
    <li class="menu-item" v-for="article in articles" :key="article.id">
      <NavItem
        :item="article"
        :activeId="activeId"
        :editMode="editMode"
        @item-click="setArticle"
        @remove="emitRemove"
        @update="emitUpdate"
      />
    </li>
    <li>
      <NavMenuCreator class="menu-item" name="article" @create="createArticle"/>
    </li>
  </menu>
</template>

<script>
import NavItem from './NavMenuItem.vue'
import NavMenuCreator from './NavMenuCreator'

export default {
  name: 'NevArticles',

  components: {
    NavItem,
    NavMenuCreator
  },

  props: {
    userId: {
      type: Number,
      require: true,
    },
    editMode: Boolean,
  },

  data() {
    return {
      articles: []
    }
  },

  created() {
    this.emitGetArticles(this.userId)
  },

  computed: {
    activeId() {
      return Number(this.$route.query.articleId)
    },
  },

  watch: {
    userId: 'getArticles'
  },

  sockets: {
    articleCreate(article) {
      this.articles.push(article);
      this.setArticle(article.id)
    },

    articlesGetByUser(articles) {
      this.articles = articles
    },

    articleRemove(id) {
      const index = this.articles.findIndex(article => article.id === id );
      if (index > -1) this.articles.splice(index, 1);

      if (Number(this.$route.query.articleId) === id) {
        this.$router.push({ query: { editMode: true }})
      }
    },

    articleUpdate({ id, title }) {
      const article = this.articles.find(article => article.id === id);
      article.title = title;
    }
  },

  methods: {
    createArticle(title) {
      this.$socket.emit('articleCreate', { userId: this.userId, title })
    },

    emitGetArticles(userId) {
      this.$socket.emit('articlesGetByUser', { userId });
    },

    setArticle(id) {
      const query = { ...this.$route.query, articleId: id };
      delete query.topicId;
      this.$router.replace({ query })
    },

    emitRemove(id) {
      this.$socket.emit('articleRemove', { id })
    },

    emitUpdate({ id, title }) {
      this.$socket.emit('articleUpdate', { id, title });
    },
  }
}
</script>

<style scoped lang="scss">
.menu-list {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  min-height: 26px;
  padding: 4px 0;
}

.menu-item {
  margin: 0 4px 0 0;

  &:last-child {
    margin: 0;
  }
}
</style>
