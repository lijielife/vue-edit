<template>
  <div
    class="txt animated"
    :class="[val.playState ? val.animationName : '']"
    @blur="(e) => updateText(e, val.uuid)"
    :style="{
      position: val.belong === 'page' ? 'absolute' : 'relative',
      left: cleft,
      top: ctop,
      width: cwidth,
      minHeight: cminHeight,
      zIndex: val.z,
      lineHeight: val.lineHeight,
      fontSize: cfontSize,
      color: val.color,
      textAlign: val.textAlign,
      display: val.displayNone ? 'block': 'none',
      transform: 'rotate(' + val.rotate + 'deg)',
      backgroundColor: val.bgColor,
      backgroundImage: 'url(' + val.backPic + ')'
    }"
    >
  </div>
</template>

<script>
import braidPieStyle from './style.vue'
import { changeResize, changeObjResize } from '../../../../utils/offset'
import EventBus from '../../../../utils/EventBus.js'
// 引入 ECharts 主模块
var echarts = require('echarts/lib/echarts')
// 引入类型图
require('echarts/lib/chart/pie')

const WIDGET_NAME = 'chart-pie'

var id
var myChartMap

export default {
  name: WIDGET_NAME,
  icon:
    '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve"><g><path d="M500,990c270.2,0,490-219.8,490-490c0-5.3-2.3-10.4-6.2-14c-4-3.6-9.3-5.3-14.5-4.8l-420.1,42.6c-10.3,1.1-17.9,10.3-16.8,20.7c1.1,10.4,10.2,17.9,20.7,16.8l398.8-40.5c-11,239.8-209.4,431.4-451.8,431.4C250.6,952.3,47.7,749.4,47.7,500c0-243.1,192.8-442,433.5-451.9V500c0,10.4,8.4,18.8,18.8,18.8c10.4,0,18.8-8.4,18.8-18.8V28.8c0-10.4-8.4-18.8-18.8-18.8C229.8,10,10,229.8,10,500C10,770.2,229.8,990,500,990z"/><path d="M583.3,17c-5.5-0.9-11.1,0.6-15.3,4.2c-4.3,3.6-6.7,8.9-6.7,14.4v429.8c0,5.4,2.3,10.5,6.3,14c3.5,3.1,8,4.8,12.6,4.8c0.7,0,1.4,0,2.1-0.1c387.3-42.4,390.5-46.7,396.9-55.1c3.1-4.2,4.4-9.6,3.5-14.7C946.8,211.5,786.3,51.8,583.3,17z M598.9,444.4V58.5c171,38.2,305.6,173.2,343,344.7C889.1,411.5,719,431.2,598.9,444.4z"/></g></svg>',
  title: '饼图',
  panel: braidPieStyle,
  computed: {
    ctop () {
      return this.val.belong === 'page' ? (this.val.top * this.defaultHeightRate) / this.h * 100 + '%' : '0'
    },
    cwidth () {
      return this.val.width * this.defaultWidthRate / this.w * 100 + '%'
    },
    cminHeight () {
      return ((this.val.height * this.defaultHeightRate) / this.h) * 100 + '%'
    },
    cleft () {
      return this.val.belong === 'page' ? (this.val.left * this.defaultWidthRate) / this.w * 100 + '%' : '0'
    },
    cfontSize () {
      return this.val.fontSize + 'rem'
    }
  },
  watch: {
    cwidth () {
      // console.log(this.cwidth)
      if (this.cwidth !== 600) {
        this._initEcharts()
        changeObjResize(myChartMap)
      }
    },
    cminHeight () {
      if (this.cminHeight !== 400) {
        this._initEcharts()
        changeObjResize(myChartMap)
      }
    }
  },
  setting: {
    type: WIDGET_NAME,
    isContainer: false,
    isUpload: false,
    hasGuide: true,
    isChild: true,
    dragable: true,
    resizable: true,
    width: 600,
    height: 400,
    left: 50,
    top: 0,
    z: 0,
    lineHeight: 1.6,
    fontSize: 1.2,
    displayNone: true,
    color: '#000000',
    textAlign: 'left',
    bgColor: '',
    backPic: '',
    backPicUrl: '',
    href: '',
    belong: 'page',
    animationName: '',
    graphWidth: 20,
    barColor: '#c23531',
    rotate: 0,
    colorArr: ['#c23531', '#2f4554'],
    playState: false
  },
  // 属性含义参照 widgets/pic/index.vue
  props: ['val', 'h', 'w', 'playState', 'defaultWidthRate', 'defaultHeightRate'],
  methods: {
    updateText (e, uuid) {
      let text = e.target.innerHTML
      this.$store.commit('updateData', {
        uuid: uuid,
        key: 'text',
        value: text
      })
    },
    // ECharts图表 创建方法
    _initEcharts () {
      id = WIDGET_NAME + this.val.uuid
      myChartMap = echarts.init(document.getElementById(id))
      // myChartMap.clear()
      myChartMap.setOption({
        title: {
          text: '某站点用户访问来源',
          subtext: '纯属虚构',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
              {value: 335, name: '直接访问'},
              {value: 310, name: '邮件营销'},
              {value: 234, name: '联盟广告'},
              {value: 135, name: '视频广告'},
              {value: 1548, name: '搜索引擎'}
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      })
      // 改变浏览器窗口的时候图形自动缩放适应窗口
      changeResize(myChartMap)
    },
    // 修改柱状条的颜色 $on里面的回调函数使用箭头函数，避免this指向出现问题报错
    _EventListenerC () {
      var colors = []
      EventBus.$on('changeDoubleColor' + this.val.uuid, () => {
        colors.unshift(this.val.barColor)
        console.log('changeDoubleColor' + this.val.uuid)
        this.val.colorArr = colors
        this._initEcharts()
      })
    },
    // 修改柱状条的宽度 $on里面的回调函数使用箭头函数，避免this指向出现问题报错
    _EventListenerW () {
      EventBus.$on('changeDoubleWidth' + this.val.uuid, () => {
        this._initEcharts()
      })
    },
    // 当组件添加了动画的时候点击旋转按钮时候去掉动画class类名，保持旋转事件的css执行
    _stopCSSEvent () {
      EventBus.$on('stopCSS' + this.val.uuid, () => {
        this.val.playState = false
      })
    }
  },
  mounted () {
    // 初始化柱状图
    this._initEcharts()
    // 修改柱状条的宽度
    this._EventListenerW()
    // 修改柱状条的颜色
    this._EventListenerC()
    // 改变组件动画状态为关闭状态
    this._stopCSSEvent()
  }
}
</script>

<style scoped>
.txt {
  outline: none;
  font-size: 28px;
  padding: 20px;
}
</style>
