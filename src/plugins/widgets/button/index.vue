<template>
  <button
    class="btn animated"
    v-html="val.text"
    :class="[val.playState ? val.animationName : '']"
    contenteditable="true"
    @blur="(e) => updateText(e, val.uuid)"
    :style="{
      position: val.belong === 'page' ? 'absolute' : 'relative',
      left: cleft,
      top: ctop,
      width: cwidth,
      minHeight: cminHeight,
      zIndex: val.z,
      backgroundColor: val.bgColor,
      backgroundImage: 'url(' + val.backPic + ')',
      color: val.color,
      transform: 'rotate(' + val.rotate + 'deg)'
    }"></button>
</template>

<script>
import braidButtonStyle from './style.vue'
import EventBus from '../../../utils/EventBus.js'
const WIDGET_NAME = 'braid-button'

export default {
  name: WIDGET_NAME,
  icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-square"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg>',
  title: '按钮',
  panel: braidButtonStyle,
  computed: {
    ctop () {
      return this.val.belong === 'page' ? (this.val.top * this.defaultHeightRate) / this.h * 100 + '%' : '0'
    },
    cwidth () {
      return ((this.val.width * this.defaultWidthRate) / this.w) * 100 + '%'
    },
    cminHeight () {
      return ((this.val.height * this.defaultHeightRate) / this.h) * 100 + '%'
    },
    cleft () {
      return this.val.belong === 'page' ? (this.val.left * this.defaultWidthRate) / this.w * 100 + '%' : '0'
    },
    cfontSize () {
      return this.val.fontSize  + 'rem'
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
    name: '',
    width: 250,
    height: 60,
    left: 50,
    top: 0,
    z: 0,
    bgColor: '#000000',
    backPic: '',
    backPicUrl: '',
    color: '#ffffff',
    text: '按钮',
    belong: 'page',
    animationName: '',
    rotate: 0,
    playState: false
  },
  props: ['w', 'h', 'val', 'playState', 'defaultWidthRate', 'defaultHeightRate'],
  methods: {
    updateText (e, uuid) {
      let text = e.target.innerHTML
      this.$store.commit('updateData', {
        uuid: uuid,
        key: 'text',
        value: text
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
    // 改变组件动画状态为关闭状态
    this._stopCSSEvent()
  }
}
</script>

<style scoped>
.btn{
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
</style>
