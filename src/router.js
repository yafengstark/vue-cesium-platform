import VueRouter from 'vue-router'

// 导入路由组件
import LayerContainer from './components/tabbar/LayerContainer.vue'


// 创建路由对象
const router = new VueRouter({
  routes: [
      { path: '/'},
      { path: '/layer', component: LayerContainer },

  ],
  linkActiveClass: 'mui-active' // 手动设置 被激活的 路由链接的高亮类名
})

export default router