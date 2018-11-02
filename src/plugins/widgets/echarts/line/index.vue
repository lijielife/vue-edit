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
import braidLineStyle from './style.vue'
import { changeResize, changeObjResize } from '../../../../utils/offset'
import EventBus from '../../../../utils/EventBus.js'
// 引入 ECharts 主模块
var echarts = require('echarts/lib/echarts')
// 引入类型图
require('echarts/lib/chart/line')

const WIDGET_NAME = 'chart-line'

var id
var myChartMap

export default {
  name: WIDGET_NAME,
  icon:
    '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve"><g><path d="M10,53.8c0-1.4,0.6-2.8,1.6-3.9c1.1-1.1,2.5-1.6,3.9-1.6h34.9c1.4,0,2.8,0.6,3.9,1.6c1.1,1.1,1.6,2.5,1.6,3.9v851.9h928.6c1.4,0,2.8,0.5,3.9,1.6c1.1,1.1,1.6,2.5,1.6,3.9v34.9c0,1.4-0.5,2.8-1.6,3.9c-1.1,1.1-2.5,1.6-3.9,1.6H10L10,53.8L10,53.8z"/><path d="M667.4,593.9"/><path d="M667.4,593.9"/><path d="M898.9,299c-38.3,0-69.4,31.2-69.4,69.4c0,9.3,1.9,18.2,5.2,26.3L629.2,586c-11-7.4-24.2-11.7-38.4-11.7c-7.2,0-14.2,1.2-20.9,3.3l-65.7-82.8c4.9-9.6,7.8-20.2,7.8-31.4c0-38.3-31.1-69.4-69.4-69.4s-69.4,31.2-69.4,69.4c0,3.5,0.6,6.9,1.2,10.3l-165.8,130c-10.7-6.8-23.4-10.9-37-10.9c-38.3,0-69.4,31.2-69.4,69.4c0,38.3,31.1,69.5,69.4,69.5s69.4-31.2,69.4-69.5c0-7.1-1.4-13.8-3.3-20.2l160.3-125.7c0.4,0.4,0.7,0.8,1.2,1.2c12.3,9.9,27.7,15.4,43.5,15.4c9.2,0,18.1-1.8,26.4-5.2l63.2,79.6c-6.7,10.8-10.8,23.2-10.8,36.4c0,38.3,31.1,69.5,69.4,69.5c38.3,0,69.4-31.2,69.4-69.5c0-6.4-1.2-12.5-2.8-18.3l210-195.5c9.5,4.9,20.1,7.9,31.5,7.9c38.3,0,69.4-31.2,69.4-69.4C968.4,330.2,937.2,299,898.9,299z"/><path d="M727.6,438.2"/><path d="M727.6,438.2"/><path d="M102,368.4c0,38.3,31.1,69.4,69.4,69.4c13.7,0,26.3-4.1,37-10.9l165.8,130c-0.5,3.4-1.2,6.8-1.2,10.3c0,38.3,31.1,69.4,69.4,69.4c38.3,0,69.4-31.2,69.4-69.4c0-11.1-2.9-21.7-7.8-31.4l65.7-82.8c6.7,2.1,13.7,3.3,20.9,3.3c14.2,0,27.4-4.3,38.4-11.7l205.5,191.3c-3.3,8.1-5.2,17-5.2,26.3c0,38.3,31.1,69.4,69.4,69.4c38.3,0,69.5-31.2,69.5-69.5c0-38.3-31.2-69.4-69.4-69.4c-11.4,0-22,3-31.5,7.9l-210-195.5c1.6-5.9,2.8-11.9,2.8-18.3c0-38.3-31.2-69.5-69.4-69.5c-38.3,0-69.4,31.2-69.4,69.5c0,13.2,4,25.6,10.8,36.4L468.9,503c-8.2-3.4-17.2-5.2-26.4-5.2c-15.8,0-31.3,5.5-43.5,15.4c-0.4,0.3-0.7,0.8-1.2,1.2L237.6,388.6c2-6.4,3.3-13.1,3.3-20.2c0-38.3-31.1-69.5-69.4-69.5S102,330.1,102,368.4"/></g></svg>',
  title: '折线图',
  panel: braidLineStyle,
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
          text: '未来一周气温变化',
          subtext: '纯属虚构'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['最高气温', '最低气温']
        },
        // toolbox: {
        //   show: true,
        //   feature: {
        //     dataZoom: {
        //       yAxisIndex: 'none'
        //     },
        //     dataView: {readOnly: false},
        //     magicType: {type: ['line', 'bar']},
        //     restore: {},
        //     saveAsImage: {}
        //   }
        // },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value} °C'
          }
        },
        series: [
          {
            name: '最高气温',
            type: 'line',
            data: [11, 11, 15, 13, 12, 13, 10],
            markPoint: {
              data: [
                {type: 'max', name: '最大值'},
                {type: 'min', name: '最小值'}
              ]
            },
            markLine: {
              data: [
                {type: 'average', name: '平均值'}
              ]
            }
          },
          {
            name: '最低气温',
            type: 'line',
            data: [1, -2, 2, 5, 3, 2, 0],
            markPoint: {
              data: [
                {name: '周最低', value: -2, xAxis: 1, yAxis: -1.5}
              ]
            },
            markLine: {
              data: [
                {type: 'average', name: '平均值'},
                [{
                  symbol: 'none',
                  x: '90%',
                  yAxis: 'max'
                }, {
                  symbol: 'circle',
                  label: {
                    normal: {
                      position: 'start',
                      formatter: '最大值'
                    }
                  },
                  type: 'max',
                  name: '最高点'
                }]
              ]
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
