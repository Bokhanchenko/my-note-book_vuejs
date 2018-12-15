import Vue from 'vue'
import App from './App.vue'
import { router } from './plugins/router'

const app = new Vue({
  el: '#app',
  router,
  render: h => h(App),
});
