import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import VModal from 'vue-js-modal';
/* Admin Components */
import AdminAddTask from './components/AddTask.vue';
import AllTasks from './components/AllTasks.vue';


Vue.use(VueSweetalert2);
Vue.use(Loading);
Vue.use(VModal);

Vue.config.productionTip = false
Vue.use(VueRouter);

var $ = global.jQuery;
window.$ = $;

const routes = [
  { name: 'addTask', path: '/', component: AdminAddTask },
  { name: 'allTasks', path: '/allTasks', component: AllTasks },
];

const router = new VueRouter({
  mode: 'history',
  routes: routes,
});

new Vue({
  el: '#app',
  router: router,
  render: h => h(App),
})
