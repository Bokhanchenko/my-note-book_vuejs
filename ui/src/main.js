import Vue from 'vue'
import App from './App.vue'
import { router } from './plugins/router'
import VueSocketIO from 'vue-socket.io'

Vue.use(new VueSocketIO({
  debug: false,
  connection: '127.0.0.1:3000',
}));

const app = new Vue({
  el: '#app',
  router,
  render: h => h(App),
});
