<template>
  <button
    v-html="val.text"
    :class="[playState ? 'anm-' + val.animationName : '']"
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
      color: val.color
    }"></button>
</template>

<script>
import braidButtonStyle from './style.vue'
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
    animationName: ''
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
    }
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