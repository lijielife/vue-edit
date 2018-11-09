import Vue from 'vue'
import Router from 'vue-router'

import PageHome from '../home/Home'
import MyDatas from '../home/mydatas/myDatas'
import Mylibrarys from '../home/myLibrarys/mylibrarys'
import MyVisualization from '../home/myvisualization/myVisualization'

import pageLogin from '../pageLogin'
import pageDesiner from '../pageDesiner'

// 选择模板组件
import SelectTemp from '../home/common/selectTemp'

Vue.use(Router)

export default new Router({
  routes: [
    {
      // 重定项的设置
      path: '/',
      redirect: { name: 'pageLogin' }
    },
    {
      path: '/pagelogin',
      name: 'pageLogin',
      component: pageLogin
    },
    {
      path: '/pagehome',
      name: 'PageHome',
      component: PageHome,
      redirect: { name: 'MyVisualization' },
      children: [
        {
          path: '/mydatas',
          name: 'MyDatas',
          component: MyDatas
        },
        {
          path: '/mylibrarys',
          name: 'MyLibrarys',
          component: Mylibrarys
        },
        {
          path: '/myvisualization',
          name: 'MyVisualization',
          component: MyVisualization
        }
      ]
    },
    {
      path: '/pagedesiner',
      name: 'pageDesiner',
      component: pageDesiner
    },
    {
      path: '/selecttemp',
      name: 'SelectTemp',
      component: SelectTemp
    }
  ]
})
