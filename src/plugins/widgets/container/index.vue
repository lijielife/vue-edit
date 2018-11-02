<template>
  <div
    class="lz-container"
    :class="[val.playState ? val.animationName : '']"
    :style="{
      display: val.display,
      position: 'absolute',
      width: val.width / w * 100 + '%',
      height: val.height / h * 100 + '%',
      left: val.left / w * 100 + '%',
      top: val.top / h * 100 + '%',
      zIndex: val.z,
      backgroundColor: val.bgColor,
      backgroundImage: 'url(' + val.backPic + ')',
      borderStyle: 'solid',
      borderRadius: val.radius + 'px',
      borderColor: val.borderColor,
      borderWidth: val.borderWidth + 'px',
      flexDirection: val.dir,
      justifyContent: val.justify,
      alignItems: val.align,
      transform: 'rotate(' + val.rotate + 'deg)'
    }">

    <!-- 子组件 -->
    <slot></slot>
  </div>
</template>

<script>
import EventBus from '../../../utils/EventBus.js'
import braidContainerStyle from './style.vue'
const WIDGET_NAME = 'braid-container'

export default {
  name: WIDGET_NAME,
  icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-layout"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>',
  title: '容器',
  panel: braidContainerStyle,
  setting: {
    type: WIDGET_NAME,
    isContainer: true,
    hasGuide: true,
    isUpload: false,
    isChild: false,
    dragable: true,
    resizable: true,
    name: '',
    width: 650,
    height: 300,
    left: 50,
    top: 0,
    z: 0,
    display: 'flex',
    bgColor: '',
    backPic: '',
    backPicUrl: '',
    radius: 0,
    borderColor: '',
    borderWidth: 0,
    dir: 'row',
    justify: 'flex-start',
    align: 'flex-start',
    belong: 'page',
    animationName: '',
    rotate: 0,
    playState: false
  },
  props: ['h', 'val', 'playState', 'w'],
  methods: {
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
  },
  created: function () {
    console.log('w:' + this.w)
  }
}
</script>

<style scoped>
.lz-container {
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
}
</style>
