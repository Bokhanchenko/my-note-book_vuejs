<template>
  <menu class="menu-list">
    <li v-if="articles" class="menu-item" v-for="article in articles" :key="article.id">
      <NavItem
        :item="article"
        :activeId="activeId"
        :editMode="editMode"
        @item-click="setArticle"
        @remove="onRemove"
        @update="onUpdate"
      />
    </li>

    <NavMenuCreator class="menu-item" @create="createArticle"/>
  </menu>
</template>

<script>
import db from '@/miniDb'
import NavItem from './NavMenuItem.vue'
import NavMenuCreator from './NavMenuCreator'

export default {
  name: 'NevMenu',

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
    this.loadArticles(this.userId)
  },

  computed: {
    activeId() {
      return Number(this.$route.query.articleId)
    },
  },

  watch: {
    userId: 'loadArticles'
  },

  methods: {
    createArticle(title) {
      db.createArticle(this.userId, title)
        .then((article) => {
          this.articles.push(article);
          this.setArticle(article.id)
        })
    },

    loadArticles(userId) {
      return db.getArticles(userId)
        .then((articles) => this.articles = articles)
    },

    setArticle(id) {
      const query = { ...this.$route.query, articleId: id };
      delete query.topicId;
      this.$router.replace({ query })
    },

    onRemove(id) {
      db.removeArticle(id).then(this.removeArticle)
    },

    removeArticle(id) {
      const index = this.articles.findIndex(article => article.id === id );
      if (index > -1) this.articles.splice(index, 1);

      if (Number(this.$route.query.articleId) === id) {
        this.$router.push({ query: { editMode: true }})
      }
    },

    onUpdate({ id, title }) {
      db.updateArticle(id, title)
        .then(this.updateAticle)
    },

    updateArticle({ id, title }) {
      const article = this.articles.find(article => article.id === id);
      article.title = title;
    }
  }
}
</script>

<style scoped lang="scss">
.menu-list {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.menu-item {
  margin: 0 4px 0 0;

  :last-child {
    margin: 0;
  }
}
</style>
