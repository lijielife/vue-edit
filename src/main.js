import Vue from 'vue'
import dashboard from './pageDesiner'

import './assets/iconfont.css'

new Vue({ // eslint-disable-line no-new
  el: '#app',
  render: h => h(dashboard)
})
