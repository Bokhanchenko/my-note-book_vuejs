<template>
  <div class="time centered">{{ time }}</div>
</template>

<script>
export default {
  name: 'Clock',

  data() {
    return {
      time: this.getTime(),
    }
  },

  created() {
    setInterval(() => this.time = this.getTime(), 1000);
  },

  methods: {
    getTime() {
      const time = new Date();
      const hours = time.getHours();
      const minutes = time.getMinutes();
      const seconds = time.getSeconds();
      const formatTime = (num) => (num < 10) ? '0' + num : num;
      return `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
    }
  },
}
</script>

<style scoped>
.time {
  font-weight: bold;
  font-size: 1.8rem;
}
</style>
