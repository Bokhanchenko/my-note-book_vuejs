<template>
  <menu class="menu-list">
    <li class="menu-item" v-for="topic in topics" :key="topic.id">
      <NavItem
        :item="topic"
        :activeId="activeId"
        :editMode="editMode"
        @item-click="setTopic"
        @remove="onRemove"
      />
    </li>

    <NavMenuCreator class="menu-item" v-if="Number.isInteger(articleId)" @create="onCreate" />
  </menu>
</template>

<script>
import db from '@/miniDb'
import NavItem from './NavMenuItem.vue'
import NavMenuCreator from './NavMenuCreator'

export default {
  name: 'NavMenuAside',

  components: {
    NavItem,
    NavMenuCreator,
  },

  props: {
    editMode: Boolean,
    userId: Number,
  },

  data() {
    return {
      topics: []
    }
  },

  computed: {
    articleId() {
      return Number(this.$route.query.articleId)
    },

    activeId() {
      return Number(this.$route.query.topicId)
    },
  },

  created() {
    this.loadTopics(this.articleId)
  },

  watch: {
    articleId: 'loadTopics'
  },

  methods: {
    onCreate(title) {
      db.createTopic(this.articleId, title).then(this.addTopic)
    },

    addTopic(topic) {
      this.topics.push(topic);
      this.setTopic(topic.id)
    },

    onRemove(id) {
      db.removeTopic(id).then(this.removeTopic)
    },

    removeTopic(id) {
      const index = this.topics.findIndex(topic => topic.id === id);
      if (index > -1) this.topics.splice(index, 1)
    },

    onUpdate({ id, title }) {
      db.updateTopic(id, title).then(this.updateTopic)
    },

    updateTopic({ id, title }) {
      const topic = this.topics.find(topic => topic.id === id);
      topic.title = title;
    },

    setTopic(topicId) {
      const query = { ...this.$route.query, topicId };
      this.$router.push({ query })
    },

    loadTopics(articleId) {
      if (!Number.isInteger(articleId)) {
        this.topics = [];
        return Promise.resolve();
      }

      return db.getTopics(articleId).then(topics => this.topics = topics)
    }
  }
}
</script>

<style scoped lang="scss">
.menu-list {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.menu-item {
  margin: 0 4px 0 0;
  :last-child {
    margin: 0;
  }
}

.add {
  color: blue;
}
</style>
