import Vue from 'vue'
// 类似reset.css
import 'normalize.css/normalize.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// lang i18n
import locale from 'element-ui/lib/locale/lang/en'
// global css
import '@/styles/index.scss'

import App from './App'
import store from './store'
import router from './router'
// icon
import '@/icons'
// permission control (permission.js)
import '@/permission'
// simulation data
import '../mock'

Vue.use(ElementUI, { locale })
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
