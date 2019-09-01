import VueRouter from 'vue-router'

// 导入路由组件
import LayerContainer from './components/tabbar/LayerContainer.vue'
import DataContainer from './components/tabbar/DataContainer.vue'
import MarkContainer from './components/tabbar/MarkContainer.vue'
import MeatureContainer from './components/tabbar/MeatureContainer.vue'
import ModelContainer from './components/tabbar/ModelContainer.vue'
import SettingContainer from './components/tabbar/SettingContainer.vue'
import TerrainContainer from './components/tabbar/TerrainContainer.vue'
import ViewContainer from './components/tabbar/ViewContainer.vue'

// 创建路由对象
const router = new VueRouter({
  routes: [
      { path: '/'},
      { path: '/layer', component: LayerContainer },
      { path: '/data', component: DataContainer },
      { path: '/mark', component: MarkContainer },
      { path: '/meature', component: MeatureContainer },
      { path: '/model', component: ModelContainer },
      { path: '/setting', component: SettingContainer },
      { path: '/terrain', component: TerrainContainer },
      { path: '/view', component: ViewContainer },



  ],
  linkActiveClass: 'mui-active' // 手动设置 被激活的 路由链接的高亮类名
})

export default router