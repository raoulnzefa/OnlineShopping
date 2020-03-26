import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from "./routes/index";
import * as firebase from "firebase";
import store from "./store";
import { rtdbPlugin } from 'vuefire'
import {app} from '../src/firebase'

//import {db} from '../src/firebase'
Vue.use(app)
//Vue.use(db)
Vue.use(rtdbPlugin)
Vue.config.productionTip = false;
window.$ = window.jQuery = require('jquery');





firebase.auth().onAuthStateChanged(user => {
  store.dispatch("fetchUser", user);
});

new Vue({
//  db,
  router,
  store,
  
  render: h => h(App),
}).$mount('#app')
