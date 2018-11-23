<template>
  <!-- @blur="(e) => updateText(e, val.uuid)" -->
  <div
    class="bar animated"
    :class="[val.animation.playState ? val.animation.animationName : '']"
    :style="{
      position: val.common.belong === 'page' ? 'absolute' : 'relative',
      left: cleft,
      top: ctop,
      width: cwidth,
      minHeight: cminHeight,
      zIndex: val.common.position.z,
      display: val.common.displayNone ? 'block': 'none',
      transform: 'rotate(' + val.common.rotate + 'deg)',
      backgroundColor: val.common.bgColor,
      backgroundImage: 'url(' + val.common.backPic + ')'
    }"
    >
  </div>
</template>

<script>
import braidBarStyle from './style.vue'
import { changeResize, changeObjResize } from '../../../../utils/offset'
import EventBus from '../../../../utils/EventBus.js'
import imgUrl from './bar.png'

// 引入柱状图
require('echarts/lib/chart/bar')

const WIDGET_NAME = 'chart-bar'
const WIDGET_TITLE = '基本柱图'
const WIDGET_CATEGORY = 'common'

export default {
  name: WIDGET_NAME,
  icon:
    '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve"><g><path d="M238.4,472.8c0,0,35.8,0,53.7,0c0.7,155.3,1.4,310.7,2.1,466c-34.8,0-69.7,0-104.5,0c0-155.3,0-310.7,0-466C203.5,472.8,238.4,472.8,238.4,472.8l-10.1-50.1c0,0-59.1,0-88.7,0c0,172,0,344.1,0,516.1c-43.2,0-86.4,0-129.6,0c0,17.4,0,34.8,0,52.2c325.9,0,652,0,977.9,0c0.7-17.4,1.4-34.8,2.1-52.2c-43.2,0-86.4,0-129.6,0c0-309.9,0-619.9,0-929.9C824.2,9,747.5,9,747.5,9l0.2,52.2c0,0,44,0,62.6,0c0,292.5,0,585.1,0,877.6c-34.8,0-69.7,0-104.5,0c0-292.5,0-585.1,0-877.6c13.6,0,41.8-0.1,41.8-0.1l-0.1-52c0,0-62.8-0.1-91.8-0.1c0,309.9,0,619.9,0,929.9c-17.4,0-34.8,0-52.2,0c0-258.4,0-516.8,0-775.2c-36.8,0-110.3,0-110.3,0l5.6,52.2c0,0,35,0,52.5,0c0,241,0,482,0,723c-34.1,0-68.3,0-102.4,0c0-241,0-482,0-723c13.6,0,49.9,0.1,49.9,0.1l-5.7-52.5c0,0-67.5,0.1-96.4,0.1c0,258.4,0,516.8,0,775.2c-17.4,0-34.8,0-52.2,0c0-172,0-344.1,0-516.1c-36,0-116.1,0-116.1,0L238.4,472.8z"/></g></svg>',
  title: WIDGET_TITLE,
  category: WIDGET_CATEGORY,
  thumbnail: imgUrl,
  panel: braidBarStyle,
  data () {
    return {
      myChartBar: null,
      primarykey: '',
      cachedata: []
    }
  },
  computed: {
    ctop () {
      return this.val.common.belong === 'page' ? (this.val.common.position.top * this.defaultHeightRate) / this.h * 100 + '%' : '0'
    },
    cwidth () {
      return this.val.common.size.width * this.defaultWidthRate / this.w * 100 + '%'
    },
    cminHeight () {
      return ((this.val.common.size.height * this.defaultHeightRate) / this.h) * 100 + '%'
    },
    cleft () {
      return this.val.common.belong === 'page' ? (this.val.common.position.left * this.defaultWidthRate) / this.w * 100 + '%' : '0'
    }
  },
  watch: {
    cwidth () {
      // this._initEcharts()
      changeObjResize(this.myChartBar)
    },
    cminHeight () {
      // this._initEcharts()
      changeObjResize(this.myChartBar)
    },
    'val.chart.content': function (newVal, oldVal) {
      setTimeout(() => {
        if (newVal !== oldVal) {
          let dataJson = JSON.parse(newVal)
          this._dualJsonData(dataJson)
        }
      }, 20)
    },
    'val.chart.graphWidth': function (newVal, oldVal) {
      setTimeout(() => {
        if (newVal !== oldVal) {
          this.myChartBar.setOption({
            barWidth: this.val.chart.graphWidth
          })
        }
      }, 20)
    },
    'val.chart.theme': function (newVal, oldVal) {
      setTimeout(() => {
        if (newVal !== oldVal) {
          this._initEcharts()
        }
      }, 20)
    },
    'val.connect.params': function (newval, oldval) {
      this._changeChartData()
    }
  },
  setting: {
    common: {
      type: WIDGET_NAME, // 组件类型
      title: WIDGET_TITLE, // 组件名称
      category: WIDGET_CATEGORY, // 组件类型
      thumbnail: imgUrl, // 缩略图
      isContainer: false, // 是否为容器
      isUpload: false, // 是否上传
      hasGuide: true, // 是否有参考线
      isChild: true, // 是否为子容器
      dragable: true, // 是否允许拖拽
      resizable: true, // 是否允许改变大小
      displayNone: true, // 是否显示本组件
      bgColor: '', // 组件背景色
      backPic: '', // 组件背景图
      backPicUrl: '', // 组件背景图地址
      size: {
        width: 500, // 宽度
        height: 200 // 高度
      },
      position: {
        top: 0, // 距顶部位置
        left: 50, // 距左边位置
        z: 0
      },
      rotate: 0, // 旋转角度
      belong: 'page' // 所属容器
    },
    connect: {
      connectconfig: {
        enable: false,
        attrs: [],
        components: []
      }, // 交互组件
      href: '', // 打开网页链接
      params: []
    },
    animation: {
      animationName: '', // 动画名称
      playState: false // 是否启用动画
    },
    chart: {
      contentsource: 'json', // 数据来源类型
      content: '', // 来源数据
      processData: [], // 来源数据处理后的数据
      dataLevel: 1, // 数据深度
      dataSelectLevel: 1, // 目前chart展示深度
      title: {
        text: '标题',
        show: true,
        textStyle: {
          color: '#333'
        }
      },
      graphWidth: 20, // 柱子宽度
      dataset: [], // chart dataset 数据集
      series: [], // chart series 数据集
      theme: 'light' // chart theme
    }
  },
  // 属性含义参照 widgets/pic/index.vue
  props: ['val', 'h', 'w', 'defaultWidthRate', 'defaultHeightRate'],
  methods: {
    // updateText (e, uuid) {
    //   let text = e.target.innerHTML
    //   this.$store.commit('updateData', {
    //     uuid: uuid,
    //     key: 'text',
    //     value: text
    //   })
    // },
    // ECharts图表 创建方法
    _initEcharts () {
      let chartpanel = WIDGET_NAME + this.val.uuid
      if (this.myChartBar != null) {
        this.myChartBar.dispose()
      }
      // 初始化图表设置
      let option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          show: true,
          type: 'plain',
          x: 'left'
        },
        grid: {
          left: '1%',
          top: '5%',
          bottom: '5%',
          right: '1%',
          containLabel: true
        },
        barWidth: this.val.chart.graphWidth
      }
      let tiltle = {
        text: this.val.chart.title.text,
        show: this.val.chart.title.show,
        textStyle: {
          color: this.val.chart.title.textStyle.color
        },
        left: 'center'
      }
      let xAxis = {
        type: 'category',
        splitLine: {
          show: false
        }
      }
      let yAxis = {
        splitLine: {
          show: false
        }
      }
      let dataset = this.val.chart.dataset
      let series = this.val.chart.series
      option['tiltle'] = tiltle
      option['xAxis'] = xAxis
      option['yAxis'] = yAxis
      option['series'] = series
      option['dataset'] = dataset
      // 初始化图表
      this.myChartBar = this.$echarts.init(document.getElementById(chartpanel), this.val.chart.theme)
      this.myChartBar.setOption(option)
      // 改变浏览器窗口的时候图形自动缩放适应窗口
      changeResize(this.myChartBar)
      if (this.val.chart.dataLevel > 1) {
        let THIS$$ = this
        this.myChartBar.on('dblclick', function (chartparam) {
          THIS$$._chartdblclick(chartparam)
        })
        if (this.val.chart.dataSelectLevel > 1) {
          let backId = chartpanel + '_back'
          let backDiv = document.getElementById(backId)
          if (backDiv) {
            backDiv.style.display = 'block'
          } else {
            var div = document.createElement('icon')
            div.id = backId
            div.className = 'ivu-icon ivu-icon-ios-undo'
            div.onclick = function () {
              THIS$$._echartDataBack()
            }
            document.getElementById(chartpanel).append(div)
          }
        }
      }
    },
    // 更改柱状图数据
    _changeChartData () {
      let params = this.val.connect.params
      // 判断当前层级与选中层级是否一致
      if (params.level) {
        if (params.level > this.val.chart.dataSelectLevel) {
          this._echartDataBack()
          return
        }
      }
      let resultData = this.val.chart.processData
      let datasetdata = {
        source: [resultData['category']]
      }
      for (let i = 1; i < resultData['datas'].length; i++) {
        let record = resultData['datas'][i]
        let matchflag = true
        for (let key in record) {
          if (matchflag) {
            for (let param in params) {
              if (key === param) {
                let value = record[key]
                let paramvalue = params[param]
                if (value !== paramvalue) {
                  matchflag = false
                  break
                } else {
                  matchflag = true
                }
              }
            }
          }
        }
        if (matchflag) {
          datasetdata['source'].push(record['data'])
          this.val.chart.dataSelectLevel = record['level']
        }
      }
      this.val.chart.dataset = datasetdata
      this.val.chart.series = resultData['series']
      this.cachedata.push({
        dataset: datasetdata,
        series: resultData['series']
      })
      this._initEcharts()
    },
    // 返回上一层
    _echartDataBack () {
      let record = this.cachedata[this.val.chart.dataSelectLevel - 2]
      this.val.chart.dataset = record.dataset
      this.val.chart.series = record.series
      this.cachedata.splice(this.val.chart.dataSelectLevel--)
      this._initEcharts()
      this._connectchartfollowreturn()
    },
    // chart双击事件
    _chartdblclick (chartparam) {
      let THIS$$ = this
      if (++THIS$$.val.chart.dataSelectLevel <= THIS$$.val.chart.dataLevel) {
        // 图表中x轴显示的是数据中的name值
        THIS$$.val.connect.params = {
          level: THIS$$.val.chart.dataSelectLevel,
          parentname: chartparam.name
        }
      }
      this._chartconnect(chartparam.name)
    },
    // 组件交互
    _chartconnect (selectedname) {
      let THIS$$ = this
      // 双击进行组件之间交互 JSON格式[出参时，对方数据格式为静态数据时，code/name需指定为上级得code/name]
      if (THIS$$.val.connect.connectconfig.enable) {
        let attrs = THIS$$.val.connect.connectconfig.attrs
        let components = THIS$$.val.connect.connectconfig.components
        let params = {}
        let resultData = THIS$$.val.chart.processData
        let dblclickRecord = {}
        // 拿到本级数据
        for (let i = 1; i < resultData['datas'].length; i++) {
          let record = resultData['datas'][i]
          if (record.name === selectedname && record.level === (THIS$$.val.chart.dataSelectLevel - 1)) {
            dblclickRecord = record
            break
          }
        }
        for (let i = 0; i < attrs.length; i++) {
          let attr = attrs[i]
          let paramkey = attr.name
          params[paramkey] = dblclickRecord[attr.key]
        }
        for (let i = 0; i < components.length; i++) {
          let widget = components[i]
          if (widget.chart.contentsource === 'json') {
            if (params['code']) {
              params['parentcode'] = params['code']
              delete params['code']
            }
            if (params['name']) {
              params['parentname'] = params['name']
              delete params['name']
            }
          }
          widget.connect.params = params
        }
      }
    },
    // 交互得组件跟随返回上一层
    _connectchartfollowreturn () {
      let THIS$$ = this
      let components = THIS$$.val.connect.connectconfig.components
      let params = {
        level: THIS$$.val.chart.dataSelectLevel
      }
      for (let i = 0; i < components.length; i++) {
        let widget = components[i]
        widget.connect.params = params
      }
    },
    // 初始化时示例数据
    _initEchartsData () {
      this.val.chart.dataset = {
        // 提供一份数据。
        source: [
          ['product', '2015', '2016', '2017'],
          ['Matcha Latte', 43.3, 85.8, 93.7],
          ['Milk Tea', 83.1, 73.4, 55.1],
          ['Cheese Cocoa', 86.4, 65.2, 82.5],
          ['Walnut Brownie', 72.4, 53.9, 39.1]
        ]
      }
      this.val.chart.series = [
        {type: 'bar'},
        {type: 'bar'},
        {type: 'bar'}
      ]
      this._initEcharts()
    },
    // 处理输入参数
    _dualJsonData (dataJson) {
      this.cachedata.splice(0)
      let THIS$$ = this
      this.val.chart.dataLevel = 1
      let rootcode = 'all'
      let rootname = '合计'
      let resultData = {
        'category': ['category'],
        'series': [],
        'datas': []
      }
      function dualchild (data, level, i, _index, parentcode, parentname) {
        level++
        for (let j = 0; j < data.length; j++) {
          let childrecord = data[j]
          let code = childrecord['code']
          let name = childrecord['name']
          if (i === 0) {
            resultData['datas'].push({
              'index': _index,
              'code': code,
              'name': name,
              'parentcode': parentcode,
              'parentname': parentname,
              'level': level,
              'data': [name, childrecord['value']]
            })
          } else {
            resultData['datas'][_index]['data'].push(childrecord['value'])
          }
          let children = childrecord['children']
          if (children !== undefined && children != null && children.length > 0) {
            dualchild(children, level, i, ++_index, code, name)
          } else {
            if (level > THIS$$.val.chart.dataLevel) {
              THIS$$.val.chart.dataLevel = level
            }
          }
          _index += 1
        }
      }
      function dualFirstLevel (record, i) {
        let level = 0
        resultData['category'].push(record['name'])
        if (i === 0) {
          resultData['datas'].push({
            'index': i,
            'code': rootcode,
            'name': rootname,
            'level': level,
            'data': [rootname, record['value']]
          })
        } else {
          resultData['datas'][0]['data'].push(record['value'])
        }
        resultData['series'].push({
          type: record['type']
        })
        let children = record['children']
        if (children !== undefined && children != null && children.length > 0) {
          dualchild(children, level, i, 1, rootcode, rootname)
        }
      }
      let _dataLength = dataJson.length
      if (undefined === _dataLength) {
        dualFirstLevel(dataJson, 0)
      } else {
        for (let i = 0; i < dataJson.length; i++) {
          let record = dataJson[i]
          dualFirstLevel(record, i)
        }
      }
      this.val.chart.processData = resultData
      this.val.chart.dataSelectLevel = 1
      this.val.connect.params = {
        level: 1,
        parentname: rootname
      }
    },
    // 当组件添加了动画点击旋转按钮时候去掉动画class类名，保持旋转事件的css执行
    _stopCSSEvent () {
      EventBus.$on('stopCSS' + this.val.uuid, () => {
        this.val.animation.playState = false
        setTimeout(() => {
          // this._initEcharts()
          changeObjResize(this.myChartBar)
        }, 250)
      })
    },
    _changeWidth () {
      EventBus.$on('changeWidth', () => {
        // 右侧收缩太快需加延时保证图形自适应
        setTimeout(() => {
          changeObjResize(this.myChartBar)
        }, 250)
      })
    },
    // 改变page宽高的时候执行图形重绘
    _changePageW () {
      EventBus.$on('pageChangeWidth', () => {
        setTimeout(() => {
          changeObjResize(this.myChartBar)
        }, 250)
      })
    }
  },
  mounted () {
    // 改变组件动画状态为关闭状态
    this._stopCSSEvent()
    // 显示隐藏右侧配置菜单
    this._changeWidth()
    // 默认数据初始化及图形展示
    this._initEchartsData()
    this._changePageW()
  },
  created () {
  },
  // 可能会遇到一个坑是$on()会触发多次，具体原因跟生命周期有关,解决办法就是在beforeDestroy或destroy周期中将事件进行销毁，使用$off()
  beforeDestroy () {
    EventBus.$off('change')
    EventBus.$off('DatasChange' + this.val.uuid)
  }
}
</script>

<style scoped>
.bar {
  outline: none;
  font-size: 28px;
  padding: 5px;
  /* transition: all .3s; */
}
/* 交互返回按钮事件样式  字体图标及定位 */
.bar>>>.ivu-icon-ios-undo{
  color: red;
  position:absolute;
  bottom:2px;
  right:5px;
  cursor:pointer
}
</style>
