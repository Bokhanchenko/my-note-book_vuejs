<template>
  <div class="content" >
    <div class="loading-banner" v-if="isLoading">Loading...</div>
    <div class="loading-banner" v-else-if="!Number.isInteger(currentId)">Please select the topic</div>

    <textarea
      class="textarea"
      v-else
      v-model="content"
      autofocus
      placeholder="enter text"
      spellcheck="true"
    ></textarea>
  </div>
</template>

<script>
import db from '@/miniDb'

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

      return db.getTopic(topicId)
        .then(({ id, content }) => {
          this.currentId = id;
          this.originContent = content;
          this.content = content;
          this.isLoading = false;
        })
    },

    updateContent() {
      if (!this.currentId || this.isLoading) return null;

      return db.updateContent(this.currentId, this.content)
        .then((successId) => {
          if (successId) this.originContent = this.content;
          else console.log('ERROR IN updateContent', successId)
        })
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
</style>
