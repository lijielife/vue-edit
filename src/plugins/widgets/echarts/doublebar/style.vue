<template>
	<div>
    <hr>
    <div class="panel-row" flex>
      <span class="iconfont">&#xe600;</span>
      <div class="panel-label">是否显示</div>
      <div class="panel-value">
        <label class="form-switch">
          <input type="checkbox" v-model="activeElement.displayNone">
          <i class="form-icon"></i>
        </label>
      </div>
    </div>

    <div class="panel-row" flex>
      <span class="iconfont">&#xe6c1;</span>
      <div class="panel-label">柱条宽度</div>
      <div class="panel-value">{{ activeElement.graphWidth }}px</div>
      <div class="panel-slider-wrap" @click="handleClickWidth">
        <slider :step="10" :max="80" :min="20" v-model="activeElement.graphWidth" ></slider>
      </div>
    </div>

    <div class="panel-row" flex>
      <span class="iconfont">&#xe69a;</span>
      <div class="panel-label">柱条颜色</div>
      <div class="panel-value">{{ activeElement.barColor }}</div>
      <div>
        <input type="color" v-model="activeElement.barColor" @change="handleClickColor()">
      </div>
    </div>

    <div class="panel-row">
      <icon name="target" />
      <div class="panel-label">背景色</div>
      <div class="panel-value">{{ activeElement.bgColor }}</div>
      <div class="panel-value">
        <input type="color" v-model="activeElement.bgColor">
      </div>
    </div>

    <div class="panel-row">
      <icon name="image" />
      <div class="panel-label">背景图</div>
      <div class="panel-value">
        <div class="panel-preview"
          @click="addPic"
          :style="{ backgroundImage: 'url(' + activeElement.backPic + ')' }">
          <icon name="plus" v-show="!activeElement.backPic" />
        </div>
      </div>
    </div>

    <div class="panel-row" flex>
      <span class="iconfont">&#xe60d;</span>
      <div class="panel-label">静态数据</div>
      <div class="panel-value">{{ activeElement.color }}</div>
      <div>
        <input type="color" v-model="activeElement.color">
      </div>
    </div>

  </div>
</template>

<script>
import EventBus from '../../../../utils/EventBus.js'
export default {
  name: 'braid-double-bar-style',
  props: ['activeElement'],
  methods: {
    handleClickWidth () {
      EventBus.$emit('changeDoubleWidth' + this.activeElement.uuid)
    },
    handleClickColor () {
      EventBus.$emit('changeDoubleColor' + this.activeElement.uuid)
      // console.log('changeDoubleColor' + this.activeElement.uuid, 55)
    },
    addPic () {
      this.$store.$emit('upload', (payload) => {
        this.$store.commit('addContainerBackPic', payload)
      })
    }
  },
  created () {
    // console.log(this.activeElement)
  }
}
</script>

<style scoped>
  .panel-preview{
    line-height: 26px;
    background-size: 20px 20px;
  }
  .iconfont{
    color: #acb3c2;
  }
</style>
