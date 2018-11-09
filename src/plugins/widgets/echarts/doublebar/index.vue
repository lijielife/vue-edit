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
import braidDoubleBarStyle from './style.vue'
import { changeResize, changeObjResize } from '../../../../utils/offset'
import EventBus from '../../../../utils/EventBus.js'
// 引入 ECharts 主模块
var echarts = require('echarts/lib/echarts')
// 引入柱状图
require('echarts/lib/chart/bar')

const WIDGET_NAME = 'chart-double-bar'

var id
var myChartBar

export default {
  name: WIDGET_NAME,
  icon:
    '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve"><g><path d="M238.4,472.8c0,0,35.8,0,53.7,0c0.7,155.3,1.4,310.7,2.1,466c-34.8,0-69.7,0-104.5,0c0-155.3,0-310.7,0-466C203.5,472.8,238.4,472.8,238.4,472.8l-10.1-50.1c0,0-59.1,0-88.7,0c0,172,0,344.1,0,516.1c-43.2,0-86.4,0-129.6,0c0,17.4,0,34.8,0,52.2c325.9,0,652,0,977.9,0c0.7-17.4,1.4-34.8,2.1-52.2c-43.2,0-86.4,0-129.6,0c0-309.9,0-619.9,0-929.9C824.2,9,747.5,9,747.5,9l0.2,52.2c0,0,44,0,62.6,0c0,292.5,0,585.1,0,877.6c-34.8,0-69.7,0-104.5,0c0-292.5,0-585.1,0-877.6c13.6,0,41.8-0.1,41.8-0.1l-0.1-52c0,0-62.8-0.1-91.8-0.1c0,309.9,0,619.9,0,929.9c-17.4,0-34.8,0-52.2,0c0-258.4,0-516.8,0-775.2c-36.8,0-110.3,0-110.3,0l5.6,52.2c0,0,35,0,52.5,0c0,241,0,482,0,723c-34.1,0-68.3,0-102.4,0c0-241,0-482,0-723c13.6,0,49.9,0.1,49.9,0.1l-5.7-52.5c0,0-67.5,0.1-96.4,0.1c0,258.4,0,516.8,0,775.2c-17.4,0-34.8,0-52.2,0c0-172,0-344.1,0-516.1c-36,0-116.1,0-116.1,0L238.4,472.8z"/></g></svg>',
  title: '双柱状图',
  panel: braidDoubleBarStyle,
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
      if (this.cwidth !== 400) {
        this._initEcharts()
        changeObjResize(myChartBar)
      }
    },
    cminHeight () {
      if (this.cminHeight !== 200) {
        this._initEcharts()
        changeObjResize(myChartBar)
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
    width: 400,
    height: 200,
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
      myChartBar = echarts.init(document.getElementById(id))
      // myChartBar.clear()
      myChartBar.setOption({
        title: {
          text: 'iphone销量',
          left: 'center'
        },
        barWidth: this.val.graphWidth,
        barGap: '0',
        color: this.val.colorArr,
        grid: {
          left: '1%',
          top: '15%',
          bottom: '1%',
          right: '1%',
          containLabel: true,
          backgroundColor: '#ccc'
        },
        legend: {
          left: 'right',
          data: ['A', 'B']
        },
        xAxis: {
          type: 'category',
          axisTick: {
            show: false
          },
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value',
          // 坐标轴的分割线
          splitLine: {
            show: false
            // lineStyle: {
            //   // 使用深浅的间隔色
            //   color: ['#aaa', '#ddd']
            // }
          }
        },
        series: [
          {
            name: 'A',
            data: [20, 200, 50, 80, 30, 110, 30],
            type: 'bar'
          },
          {
            name: 'B',
            data: [20, 200, 50, 80, 30, 110, 30],
            type: 'bar'
          }
        ]
      })
      // 改变浏览器窗口的时候图形自动缩放适应窗口
      changeResize(myChartBar)
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
        console.log(22)
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
