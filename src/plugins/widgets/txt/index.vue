<template>
  <div
    class="txt"
    v-html="val.text"
    :class="[playState ? 'anm-' + val.animationName : '']"
    :contenteditable="ceditable"
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
      wordWrap: 'break-word',
      fontWeight: val.fontWeight ? 'bold': 'normal'
    }">
  </div>
</template>

<script>
import braidTxtStyle from './style.vue'
const WIDGET_NAME = 'braid-txt'

export default {
  name: WIDGET_NAME,
  icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-type"><polyline points="4 7 4 4 20 4 20 7"></polyline><line x1="9" y1="20" x2="15" y2="20"></line><line x1="12" y1="4" x2="12" y2="20"></line></svg>',
  title: '文本',
  panel: braidTxtStyle,
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
    type: WIDGET_NAME,
    isContainer: false,
    isUpload: false,
    hasGuide: true,
    isChild: true,
    dragable: true,
    resizable: true,
    width: 300,
    height: 100,
    left: 50,
    top: 0,
    z: 0,
    lineHeight: 1.6,
    fontSize: 1.2,
    fontWeight: false,
    color: '#000000',
    textAlign: 'left',
    text: '文本',
    href: '',
    belong: 'page',
    animationName: ''
  },
  // 属性含义参照 widgets/pic/index.vue
  props: ['val', 'h', 'w', 'playState', 'defaultWidthRate', 'defaultHeightRate', 'editable'],
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
  .txt {
    outline: none;
    font-size: 28px;
  }
</style>
