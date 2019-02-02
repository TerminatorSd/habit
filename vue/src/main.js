/**
 * @file vue 主入口
 * @author wangyisheng@baidu.com (wangyisheng)
 */

import Vue from 'vue'

import App from './App'
import router from './router'
import store from './store'

// Axios
import axios from "axios";
import VueAxios from "vue-axios";

// Vuetify
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import './less/main.less'

Vue.use(Vuetify)
Vue.use(VueAxios,axios);

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
