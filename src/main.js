import Vue from 'vue'
import router from './router'
// 懒加载
import VueLazyload from 'vue-lazyload'
// 登录页
import Appframe from './App'

// 登录页
// import pageLogin from './pageLogin'

// 编辑界面
// import dashboard from './pageDesiner'

import iView from 'iview'
import iEditor from 'iview-editor'

import axios from 'axios'
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts'

// 全局组件
import NewAdd from './home/common/newAddVisual'
import Datas from './components/datas/datas'
import BackgroundImg from './plugins/widgets/common/background-img'

import 'iview/dist/styles/iview.css'
import 'iview-editor/dist/iview-editor.css'

import './assets/iconfont.css'
import 'animate.css'

Vue.component(NewAdd.name, NewAdd)
Vue.component(Datas.name, Datas)
Vue.component(BackgroundImg.name, BackgroundImg)

// 使用插件
Vue.use(iView)
Vue.use(iEditor)
Vue.use(VueLazyload)

// 绑定axios到原型实现全局调用
Vue.prototype.$axios = axios

Vue.prototype.$echarts = echarts

new Vue({ // eslint-disable-line no-new
  el: '#app',
  router,
  render: h => h(Appframe)
  // render: h => h(dashboard)
})
