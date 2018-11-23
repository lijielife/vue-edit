<template>
  <div
    class="txt animated"
    v-html="val.common.text"
    :class="[val.animation.playState ? val.animation.animationName : '']"
    :contenteditable="ceditable"
    @blur="(e) => updateText(e, val.uuid)"
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
      backgroundImage: 'url(' + val.common.backPic + ')',
      lineHeight: val.common.lineHeight,
      fontSize: cfontSize,
      color: val.common.color,
      textAlign: val.common.textAlign,
      wordWrap: 'break-word',
      fontWeight: val.common.fontWeight ? 'bold': 'normal'
    }">
  </div>
</template>

<script>
import EventBus from '../../../utils/EventBus.js'
import braidTxtStyle from './style.vue'
import imgUrl from './text.png'

const WIDGET_NAME = 'txt'
const WIDGET_TITLE = '文本'
const WIDGET_CATEGORY = 'characters'

export default {
  name: WIDGET_NAME,
  icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-type"><polyline points="4 7 4 4 20 4 20 7"></polyline><line x1="9" y1="20" x2="15" y2="20"></line><line x1="12" y1="4" x2="12" y2="20"></line></svg>',
  title: WIDGET_TITLE,
  thumbnail: imgUrl,
  category: WIDGET_CATEGORY,
  panel: braidTxtStyle,
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
    },
    cfontSize () {
      return this.val.common.fontSize  + 'rem'
    },
    ceditable () {
      if (undefined === this.editable) {
        return true
      } else {
        return this.editable
      }
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
      text: '文本', // 显示文本
      inputtext: '文本', // 输入文本
      lineHeight: 1.6,
      fontSize: 1.2,
      fontWeight: false,
      color: '#000000',
      textAlign: 'left',
      size: {
        width: 180, // 宽度
        height: 60 // 高度
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
      params: {} // 交互参数，组件内部，组件之间交互时参数
    },
    animation: {
      animationName: '', // 动画名称
      playState: false // 是否启用动画
    }
  },
  // 属性含义参照 widgets/pic/index.vue
  props: ['val', 'h', 'w', 'playState', 'defaultWidthRate', 'defaultHeightRate', 'editable'],
  methods: {
    // 当组件添加了动画的时候点击旋转按钮时候去掉动画class类名，保持旋转事件的css执行
    _stopCSSEvent () {
      EventBus.$on('stopCSS' + this.val.uuid, () => {
        this.val.animation.playState = false
      })
    },
    _formatData () {
      let params = this.val.connect.params
      function evil (fn) {
        var Fn = Function // 一个变量指向Function，防止有些前端编译工具报错
        return new Fn('return ' + fn)()
      }
      this.val.common.text = this.val.common.inputtext.repeat('1')
      for (var key in params) {
        this.val.common.text = this.val.common.text.replace(evil('/(#{' + key + '})/gi'), params[key])
      }
    },
    updateText (e, uuid) {
      let text = e.target.innerHTML
      this.val.common.text = text
      this.val.common.inputtext = text
    }
  },
  mounted () {
    // 改变组件动画状态为关闭状态
    this._stopCSSEvent()
  },
  watch: {
    'val.connect.params': function (newval, oldval) {
      this._formatData()
    },
    'val.common.inputtext': function (newval, oldval) {
      this._formatData()
    }
  }
}
</script>

<style scoped>
  .txt {
    outline: none;
    font-size: 28px;
  }
</style>
