import VueRouter from 'vue-router'

// 导入路由组件
import LayerContainer from '../components/tabbar/LayerContainer.vue'
import MarkContainer from '../components/tabbar/MarkContainer.vue'
import MeatureContainer from '../components/tabbar/MeatureContainer.vue'
import SettingContainer from '../components/tabbar/SettingContainer.vue'
import TerrainContainer from '../components/tabbar/TerrainContainer.vue'
import ViewContainer from '../components/tabbar/ViewContainer.vue'

import StartContainer from '../components/ribbon/StartContainer.vue'
import ModelContainer from '../components/ribbon/ModelContainer.vue'
import DataContainer from '../components/ribbon/DataContainer.vue'

// 创建路由对象
const router = new VueRouter({
  routes: [
      { path: '/', redirect: '/start'},
      { path: '/start', component: StartContainer },
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