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

// file upload
import uploader from "vue-simple-uploader";

// toast
import toastRegistry from "@/components/common/toast/index";

Vue.use(Vuetify)
Vue.use(VueAxios, axios);
Vue.use(toastRegistry);
Vue.use(uploader);

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
