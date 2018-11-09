<template>
	<div v-show="elm">
		<!-- 左 -->
	  <div class="verti"
	  	@mousedown="handlemousedown($event, 'left', 'left', 'width')"
	    :style="{
        transform: 'rotate(' + this.$store.state.activeElement.rotate + 'deg)',
	      height: elm.height + 'px',
	      top: elm.top + 'px',
	      left: elm.left / defaultW * 100  + '%'
	    }">
	    <div class="square"></div>
	  </div>

		<!-- 右 -->
	  <div class="verti"
		  @mousedown="handlemousedown($event, 'right', 'width')"
	    :style="{
        transform: 'rotate(' + this.$store.state.activeElement.rotate + 'deg)',
	      height: elm.height + 'px',
	      top: elm.top + 'px',
	      left: (elm.left + elm.width) / defaultW * 100 + '%'
	    }">
	    <div class="square"></div>
	  </div>

		<!-- 上 -->
	  <div class="horiz"
		  @mousedown="handlemousedown($event, 'up', 'top', 'height')"
	    :style="{
        transform: 'rotate(' + this.$store.state.activeElement.rotate + 'deg)',
	      width: elm.width / defaultW * 100  + '%',
	      top: elm.top + 'px',
	      left: elm.left / defaultW * 100  + '%'
	    }">
	    <div class="square"></div>
	  </div>

		<!-- 下 -->
	  <div class="horiz"
		  @mousedown="handlemousedown($event, 'down', 'height')"
	    :style="{
        transform: 'rotate(' + this.$store.state.activeElement.rotate + 'deg)',
	      width: elm.width / defaultW * 100  + '%',
	      top: elm.top + elm.height + 'px',
	      left: elm.left / defaultW * 100  + '%'
	    }">
	    <div class="square"></div>
	  </div>

    <!-- 右下角 -->
    <div class="rotateBox"
      @mousedown="handleRotateDown($event)"
      :style="{
        transform: 'rotate(' + this.$store.state.activeElement.rotate + 'deg)',
        top: elm.top + elm.height - 10 + 'px',
        left: (elm.left + elm.width) / defaultW * 100 + '%'
      }">
      <div class="rotate iconfont">&#xe657;</div>
    </div>
	</div>
</template>

<script>
import EventBus from '../../utils/EventBus.js'
export default {
  computed: {
    elm () {
      var target = this.$store.state.activeElement
      if (!target.resizable || target.belong !== 'page' || target.displayNone === false) return ''
      return target
    },
    defaultW () {
      return this.$store.state.page.width
    }
  },

  data () {
    return {
      type: '' // 调整方向 left | right | up | down
    }
  },

  methods: {
    handleRotate (e) {
      e.stopPropagation()
      e.preventDefault()
      this.$store.commit('rotate', {
        x: e.pageX,
        y: e.pageY
      })
      EventBus.$emit('stopCSS' + this.$store.state.uuid)
    },

    handleRotateup () {
      document.removeEventListener('mousemove', this.handleRotate, true)
      document.removeEventListener('mouseup', this.handleRotateup, true)
      this.$store.commit('stopRotate')
    },

    handleRotateDown (e, type) {
      e.stopPropagation()
      this.type = type
      this.$store.commit('initmove', {
        startX: e.pageX,
        startY: e.pageY
      })
      document.addEventListener('mousemove', this.handleRotate, true)
      document.addEventListener('mouseup', this.handleRotateup, true)
    },

    handlemousedown (e, type, originX, originY) {
      e.stopPropagation()
      this.type = type
      this.$store.commit('initmove', {
        startX: e.pageX,
        startY: e.pageY,
        originX: this.elm[originX],
        originY: this.elm[originY]
      })
      document.addEventListener('mousemove', this.handlemousemove, true)
      document.addEventListener('mouseup', this.handlemouseup, true)
    },

    handlemousemove (e) {
      e.stopPropagation()
      e.preventDefault()
      this.$store.commit('resize', {
        x: e.pageX,
        y: e.pageY,
        type: this.type
      })
    },

    handlemouseup () {
      document.removeEventListener('mousemove', this.handlemousemove, true)
      document.removeEventListener('mouseup', this.handlemouseup, true)
      this.$store.commit('stopmove')
    }
  }
}
</script>

<style scoped>
.verti,
.horiz {
  position: absolute;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
}
.verti {
  width: 0;
  cursor: ew-resize;
}
.horiz {
  height: 0;
  cursor: ns-resize;
}
.square {
  width: 10px;
  height: 10px;
  border: 1px solid #2196f3;
  background-color: #fff;
  flex-shrink: 0;
}
.rotateBox{
  position: absolute;
  z-index: 1000;
  display: flex;
  justify-content: right;
  align-items: right;
}
.rotate{
  flex-shrink: 0;
  cursor: pointer;
  color: #2196f3;
}
</style>
