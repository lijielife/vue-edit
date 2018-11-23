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
    // 登录页
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
        // 我的数据
        {
          path: '/mydatas',
          name: 'MyDatas',
          component: MyDatas
        },
        // 组件库
        {
          path: '/mylibrarys',
          name: 'MyLibrarys',
          component: Mylibrarys
        },
        // 我的可视化
        {
          path: '/myvisualization',
          name: 'MyVisualization',
          component: MyVisualization
        }
      ]
    },
    // 视图编辑页面
    {
      path: '/pagedesiner',
      name: 'pageDesiner',
      component: pageDesiner
    },
    // 模板选择页面
    {
      path: '/selecttemp',
      name: 'SelectTemp',
      component: SelectTemp
    }
  ]
})
