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
import braidMapStyle from './style.vue'
import { changeResize, changeObjResize } from '../../../../utils/offset'
import EventBus from '../../../../utils/EventBus.js'
import imgUrl from './map.png'
// 引入 ECharts 主模块
var echarts = require('echarts/lib/echarts')
// 引入类型图
require('echarts/map/js/china.js')

const WIDGET_NAME = 'chart-map'
const WIDGET_TITLE = '分级色彩地图'
var id
var myChartMap

export default {
  name: WIDGET_NAME,
  icon:
    '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve"><metadata> Svg Vector Icons : http://www.sfont.cn </metadata><g><path d="M11,438.7c-24.8,3.9,428.4,122.4,428.4,122.4l183.6,428.3L990,10.5C990,10.5,35.9,435,11,438.7zM622.6,794.3L499.6,500.9l-275.5-71.8l647.4-290.2C863.4,160.5,622.6,794.3,622.6,794.3z"/></g></svg>',
  title: WIDGET_TITLE,
  thumbnail: imgUrl,
  category: 'map',
  panel: braidMapStyle,
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
    title: WIDGET_TITLE,
    thumbnail: imgUrl,
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
          text: 'iphone销量',
          subtext: '纯属虚构',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['iphone3', 'iphone4', 'iphone5']
        },
        visualMap: {
          min: 0,
          max: 2500,
          left: 'left',
          top: 'bottom',
          text: ['高', '低'],           // 文本，默认为数值文本
          calculable: true
        },
        // toolbox: {
        //   show: true,
        //   orient: 'vertical',
        //   left: 'right',
        //   top: 'center',
        //   feature: {
        //     mark: {show: true},
        //     dataView: {show: true, readOnly: false},
        //     restore: {show: true},
        //     saveAsImage: {show: true}
        //   }
        // },
        series: [
          {
            name: 'iphone3',
            type: 'map',
            mapType: 'china',
            roam: false,
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: true
              }
            },
            data: [
              {name: '北京', value: Math.round(Math.random() * 1000)},
              {name: '天津', value: Math.round(Math.random() * 1000)},
              {name: '上海', value: Math.round(Math.random() * 1000)},
              {name: '重庆', value: Math.round(Math.random() * 1000)},
              {name: '河北', value: Math.round(Math.random() * 1000)},
              {name: '河南', value: Math.round(Math.random() * 1000)},
              {name: '云南', value: Math.round(Math.random() * 1000)},
              {name: '辽宁', value: Math.round(Math.random() * 1000)},
              {name: '黑龙江', value: Math.round(Math.random() * 1000)},
              {name: '湖南', value: Math.round(Math.random() * 1000)},
              {name: '安徽', value: Math.round(Math.random() * 1000)},
              {name: '山东', value: Math.round(Math.random() * 1000)},
              {name: '新疆', value: Math.round(Math.random() * 1000)},
              {name: '江苏', value: Math.round(Math.random() * 1000)},
              {name: '浙江', value: Math.round(Math.random() * 1000)},
              {name: '江西', value: Math.round(Math.random() * 1000)},
              {name: '湖北', value: Math.round(Math.random() * 1000)},
              {name: '广西', value: Math.round(Math.random() * 1000)},
              {name: '甘肃', value: Math.round(Math.random() * 1000)},
              {name: '山西', value: Math.round(Math.random() * 1000)},
              {name: '内蒙古', value: Math.round(Math.random() * 1000)},
              {name: '陕西', value: Math.round(Math.random() * 1000)},
              {name: '吉林', value: Math.round(Math.random() * 1000)},
              {name: '福建', value: Math.round(Math.random() * 1000)},
              {name: '贵州', value: Math.round(Math.random() * 1000)},
              {name: '广东', value: Math.round(Math.random() * 1000)},
              {name: '青海', value: Math.round(Math.random() * 1000)},
              {name: '西藏', value: Math.round(Math.random() * 1000)},
              {name: '四川', value: Math.round(Math.random() * 1000)},
              {name: '宁夏', value: Math.round(Math.random() * 1000)},
              {name: '海南', value: Math.round(Math.random() * 1000)},
              {name: '台湾', value: Math.round(Math.random() * 1000)},
              {name: '香港', value: Math.round(Math.random() * 1000)},
              {name: '澳门', value: Math.round(Math.random() * 1000)}
            ]
          },
          {
            name: 'iphone4',
            type: 'map',
            mapType: 'china',
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: true
              }
            },
            data: [
              {name: '北京', value: Math.round(Math.random() * 1000)},
              {name: '天津', value: Math.round(Math.random() * 1000)},
              {name: '上海', value: Math.round(Math.random() * 1000)},
              {name: '重庆', value: Math.round(Math.random() * 1000)},
              {name: '河北', value: Math.round(Math.random() * 1000)},
              {name: '安徽', value: Math.round(Math.random() * 1000)},
              {name: '新疆', value: Math.round(Math.random() * 1000)},
              {name: '浙江', value: Math.round(Math.random() * 1000)},
              {name: '江西', value: Math.round(Math.random() * 1000)},
              {name: '山西', value: Math.round(Math.random() * 1000)},
              {name: '内蒙古', value: Math.round(Math.random() * 1000)},
              {name: '吉林', value: Math.round(Math.random() * 1000)},
              {name: '福建', value: Math.round(Math.random() * 1000)},
              {name: '广东', value: Math.round(Math.random() * 1000)},
              {name: '西藏', value: Math.round(Math.random() * 1000)},
              {name: '四川', value: Math.round(Math.random() * 1000)},
              {name: '宁夏', value: Math.round(Math.random() * 1000)},
              {name: '香港', value: Math.round(Math.random() * 1000)},
              {name: '澳门', value: Math.round(Math.random() * 1000)}
            ]
          },
          {
            name: 'iphone5',
            type: 'map',
            mapType: 'china',
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: true
              }
            },
            data: [
              {name: '北京', value: Math.round(Math.random() * 1000)},
              {name: '天津', value: Math.round(Math.random() * 1000)},
              {name: '上海', value: Math.round(Math.random() * 1000)},
              {name: '广东', value: Math.round(Math.random() * 1000)},
              {name: '台湾', value: Math.round(Math.random() * 1000)},
              {name: '香港', value: Math.round(Math.random() * 1000)},
              {name: '澳门', value: Math.round(Math.random() * 1000)}
            ]
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
