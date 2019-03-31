import Vue from 'vue';
import App from './App.vue';
import 'iview/dist/styles/iview.css';
import { router } from './router';
import { store } from './store';
import VueI18n from 'vue-i18n';
import zh from 'iview/dist/locale/zh-CN';
import en from 'iview/dist/locale/en-US';
import enUS from './locales/en';
import zhCN from './locales/zh';
import Cookies from 'js-cookie';

Vue.use(VueI18n);
Vue.locale = () => {};

const lang = Cookies.get('lang') || 'zh';

const messages =  {
  zh: Object.assign(zh, zhCN),
  en: Object.assign(en, enUS)
}

// 设置参数，创建Vuei18n的实例
const i18n = new VueI18n({
  locale: lang,
  messages
});

Vue.config.productionTip = false
console.log("aaaa","123")

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
