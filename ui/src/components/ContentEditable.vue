<template>
  <div class="content shadow">
    <div class="loading-banner" v-if="isLoading">Loading...</div>
    <div class="loading-banner" v-else-if="!Number.isInteger(currentId)">Please select the topic</div>

    <textarea
      id="textarea"
      class="textarea scrollbar"
      v-else
      v-model="content"
      autofocus
      placeholder="enter text"
      spellcheck="true"
    ></textarea>
  </div>
</template>

<script>
export default {
  name: 'ContentEditable',

  props: {
    topicId: Number
  },

  data() {
    return {
      originContent: '',
      content: '',
      currentId: null,
      isLoading: false,
      activityInterval: null,
    }
  },

  computed: {
    isChanged() {
      return this.content !== this.originContent
    }
  },

  watch: {
    topicId(id) {
      this.checkDiff();
      this.loadContent(id)
    },

    isChanged(val) {
      if (val && !this.activityInterval) this.startActivityInterval();
    },
  },

  created() {
    this.loadContent(this.topicId);
  },

  beforeDestroy() {
    if (this.isChanged) this.updateContent();
    if (this.activityInterval) this.stopActivityInterval();
  },

  sockets: {
    topicGet({ id, content }) {
      this.currentId = id;
      this.originContent = content;
      this.content = content;
      this.isLoading = false;

      setTimeout(() => this.setFocus(), 30);
    },

    topicUpdateContent(successId) {
      if (successId) this.originContent = this.content;
    }
  },

  methods: {
    loadContent(topicId) {
      this.checkDiff();
      if (this.activityInterval) this.stopActivityInterval();

      if (!Number.isInteger(topicId)) {
        this.currentId = null;
        this.originContent = '';
        this.content = '';
        return Promise.resolve();
      }

      this.isLoading = true;

      return this.$socket.emit('topicGet', topicId);
    },

    updateContent() {
      if (!this.currentId || this.isLoading) return null;

      this.$socket.emit('topicUpdateContent', { id: this.currentId, content: this.content });
    },

    startActivityInterval() {
      this.activityInterval = setTimeout(this.checkDiff, 5000)
    },

    checkDiff() {
      if (!this.isChanged) this.stopActivityInterval();
      else this.updateContent()
    },

    stopActivityInterval() {
      if (!this.activityInterval) return;

      clearTimeout(this.activityInterval);
      this.activityInterval = null;
    },

    setFocus() {
      const textarea = document.getElementById('textarea');
      textarea.focus()
    },
  },
}
</script>

<style scoped lang="scss">
.content {
  display: block;
  height: 100%;
  width: 100%;
  position: relative;
}

.textarea {
  width: 100%;
  height: 100%;
  resize: none;
  border: none;
  background-color: transparent;
  padding: 8px;

  &:focus {
    outline: none;
  }
}

.loading-banner {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  color: green;
  font-size: 1.2rem;
  font-weight: bold;
}

.codeflask {
  background: transparent;
}

.codeflask__flatten {
  padding: 0;
  background-color: transparent;
}
</style>
