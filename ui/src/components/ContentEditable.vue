<template>
  <div class="wrapper" >
    <textarea
      class="textarea"
      v-if="contentLoaded"
      v-model="contentA"
      autofocus
      placeholder="enter text"
      spellcheck="true"
    />

    <div
      class="loading-banner"
      v-else>
      Loading...
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ContentEditable',

    props: ['content'],

    data() {
      return {
        contentA: 'Loading...',
        contentLoaded: false,
      }
    },

    watch: {
      content(newVal) {
        this.contentLoaded = false;

        setTimeout(() => {
          this.updateContent(newVal);
        }, 500);
      }
    },

    created() {
      setTimeout(() => {
        this.updateContent(this.content);
      }, 500);
    },

    methods: {
      updateContent(newVal = this.content) {
        this.contentA = newVal;
        this.contentLoaded = true;
      }
    },
  }
</script>

<style scoped lang="scss">
  .wrapper {
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
