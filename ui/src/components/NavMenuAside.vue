<template>
  <menu class="menu-list">
    <li class="menu-item" v-for="topic in topics" :key="topic.id">
      <NavItem
        :item="topic"
        :activeId="activeId"
        :editMode="editMode"
        @item-click="setTopic"
        @remove="emitRemove"
        @update="emitUpdate"
      />
    </li>

    <NavMenuCreator class="menu-item" v-if="Number.isInteger(articleId)" @create="emitCreate" />
  </menu>
</template>

<script>
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

  sockets: {
    topicsGet(topics) {
      this.topics = topics
    },

    topicCreate(topic) {
      this.topics.push(topic);
      this.setTopic(topic.id)
    },

    topicRemove(id) {
      const index = this.topics.findIndex(topic => topic.id === id);
      if (index > -1) this.topics.splice(index, 1)
    },

    topicUpdate({ id, title }) {
      const topic = this.topics.find(topic => topic.id === id);
      topic.title = title;
    }
  },

  methods: {
    loadTopics(articleId) {
      if (!Number.isInteger(articleId)) {
        this.topics = [];
        return Promise.resolve();
      }

      return this.$socket.emit('topicsGet', articleId);
    },

    emitCreate(title) {
      this.$socket.emit('topicCreate', { articleId: this.articleId, title });
    },

    emitRemove(id) {
      this.$socket.emit('topicRemove', id);
    },

    emitUpdate({ id, title }) {
      this.$socket.emit('topicUpdate', { id, title });
    },

    setTopic(topicId) {
      const query = { ...this.$route.query, topicId };
      this.$router.push({ query })
    },
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
  width: 100%;

  :last-child {
    margin: 0;
  }
}

.add {
  color: blue;
}
</style>
