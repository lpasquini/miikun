import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import VueElectron from 'vue-electron';
Vue.use(VueElectron);

Vue.config.productionTip = false;

import { MdButton, MdIcon, MdDialog, MdField } from 'vue-material/dist/components';
Vue.use(MdButton);
Vue.use(MdIcon);

/* Required by MdDialogPrompt */
Vue.use(MdField);
Vue.use(MdDialog);

import VueCodeMirror from 'vue-codemirror';
Vue.use(VueCodeMirror);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
