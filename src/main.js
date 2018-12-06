import Vue from 'vue';
import VueLocalStorage from 'vue-localstorage';
import App from './App.vue';
import store from './store';

Vue.config.productionTip = false;
Vue.use(VueLocalStorage, {
  name: 'ls',
  bind: true,
});

new Vue({
  store,
  render: h => h(App),
}).$mount('#app');
