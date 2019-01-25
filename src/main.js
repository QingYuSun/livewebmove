import Vue from 'vue';
import store from './vuex/store';
import VueRouter from 'vue-router';
Vue.use(VueRouter)

import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'
Vue.use(Mint);

import VueResource from 'vue-resource'
Vue.use(VueResource);


 System.import('vue-resource').then(function(resource) {
    Vue.use(resource)
    Vue.http.options.emulateJSON = true;
    //session 失效跳转
    // Vue.http.interceptors.push((request, next) => {
    //     next((response) => {
    //         if(response.status == 200 && response.body.status == 'UNLOGIN'){
    //             window.location.hash = "#/login"
    //         }
    //     });
    // });

   /* Vue.http.interceptors.push((request, next) => {
       console.log("http.interceptors:  " + request.url);
       request.url = 'zteng-web/' + request.url
       console.log("after http.interceptors:  " + request.url);
    next((response) => {
        // ...
        // 请求发送后的处理逻辑
        // ...
        // 根据请求的状态，response参数会返回给successCallback或errorCallback
        console.log('全局 返回')
         if(response.body.code == '401'){
                window.location.hash = "#/logout"
        }
        return response
    })
})*/

});

import App from './App'
import Main from './components/main/Main'
import Search from './components/Search'
import History from './components/History'
import Watch from './components/Watch'
import Message from './components/Message'
import Public from './components/Public'

 const routes = [
  { path: '', component: Main },
  { path: '/Search', component: Search },
  { path: '/History', component: History },
  { path: '/Watch', component: Watch },
  { path: '/Message', component: Message },
  { path: '/Public', component: Public },
]

const router = new VueRouter({
  routes // （缩写）相当于 routes: routes
})
 
const app = new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')