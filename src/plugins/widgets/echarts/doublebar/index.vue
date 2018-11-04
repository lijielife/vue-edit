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
    '<svg t="1541314968871" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11722" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><defs><style type="text/css"></style></defs><path d="M73.142857 950.857143h936.330959a14.590176 14.590176 0 0 1 14.462192 14.142232v44.922385a14.3982 14.3982 0 0 1-14.462192 14.142232H14.462192A14.71816 14.71816 0 0 1 0 1009.473816V14.462192A14.590176 14.590176 0 0 1 14.142232 0h44.922385c7.807024 0 14.142232 6.591176 14.142232 14.462192v936.394951h-0.063992zM146.285714 402.509686c0-20.349456 15.67804-36.795401 36.923385-36.7954h72.438945c20.413448 0 36.923385 17.021872 36.923385 36.7954v438.409199a36.219473 36.219473 0 0 1-36.923385 36.795401H183.209099a37.179353 37.179353 0 0 1-36.923385-36.795401V402.509686z m219.428572-292.699412c0-20.285464 15.67804-36.667417 36.923384-36.667417h72.438945c20.413448 0 36.923385 16.829896 36.923385 36.667417v731.364579a36.091489 36.091489 0 0 1-36.987377 36.603425H402.63767a37.051369 37.051369 0 0 1-36.923384-36.731409V109.68229v0.127984zM585.142857 548.411449c0-20.093488 15.67804-36.411449 36.923385-36.411449h72.438945c20.413448 0 36.923385 15.742032 36.923384 36.411449v292.827396a36.219473 36.219473 0 0 1-36.923384 36.411449H622.066242a36.091489 36.091489 0 0 1-36.923385-36.411449V548.411449z m219.428572-219.300588c0-20.15748 15.67804-36.539433 36.923384-36.539432h72.438945c20.413448 0 36.923385 16.829896 36.923385 36.539432v512a36.219473 36.219473 0 0 1-36.923385 36.539433H841.494813a37.051369 37.051369 0 0 1-36.923384-36.539433V329.110861z" fill="#8a8a8a" p-id="11723"></path></svg>',
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
