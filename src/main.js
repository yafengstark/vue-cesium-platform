// 项目的JS打包入口文件
// 1. 导入Vue
import Vue from 'vue';


// 配置路由
import VueRouter from 'vue-router';
Vue.use(VueRouter);
// 导入路由对象
import router from './router.js';

// iView
import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView);

import 'vue-cesium/lib/vc-navigation.css'
import VueCesium from 'vue-cesium';
import lang from 'vue-cesium/lang/zh-hans';

Vue.use(VueCesium, {
    // cesiumPath 是指引用的Cesium.js路径，如
    // 项目本地的Cesium Build包，vue项目需要将Cesium Build包放static目录：
    //cesiumPath: '../lib/Cesium/Cesium.js'
    // 个人在线Cesium Build包：
     cesiumPath: 'https://zouyaoji.top/vue-cesium/statics/Cesium/Cesium.js',
    // 个人在线SuperMap Cesium Build包（在官方基础上二次开发出来的）：
    // cesiumPath: 'https://zouyaoji.top/vue-cesium/statics/SuperMapCesium/Cesium.js'
    // 官方在线Cesium Build包，有CDN加速，推荐用这个：
     //cesiumPath: 'https://unpkg.com/cesium/Build/Cesium/Cesium.js',
    accessToken:'',
    lang: lang
})

// 注册全局的组件
// import testcom from '../test/02.test.vue'
// 这些全局注册的组件，在任何组件中，都可以使用 < 的形式引入到页面中
// Vue.component('mytest', testcom)

// 导入状态管理对象
import store from './store.js';

// 导入 根组件
import App from './components/App.vue';

const vm = new Vue({
  el: '#app',
  render: c => c(App),
  router, // 挂载路由
  store // 挂载 store
})

// import '../test/03.数组的some方法.js'