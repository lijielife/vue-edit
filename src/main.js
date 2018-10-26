import Vue from 'vue'
import dashboard from './pageDesiner'

import iView from 'iview'
import iEditor from 'iview-editor'

// 全局组件
import Datas from './components/datas/datas'

import 'iview/dist/styles/iview.css'
import 'iview-editor/dist/iview-editor.css'

import './assets/iconfont.css'

Vue.component(Datas.name, Datas)

// 使用插件
Vue.use(iView)
Vue.use(iEditor)

new Vue({ // eslint-disable-line no-new
  el: '#app',
  render: h => h(dashboard)
})
