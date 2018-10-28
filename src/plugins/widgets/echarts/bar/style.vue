<template>
	<div>
    <hr>
    <div class="panel-row" flex>
      <span class="iconfont">&#xe600;</span>
      <div class="panel-label">显示图例</div>
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
      <div class="panel-slider-wrap" @click="handleClick">
        <slider :step="10" :max="80" :min="20" v-model="activeElement.graphWidth" ></slider>
      </div>
    </div>

    <div class="panel-row" flex>
      <span class="iconfont">&#xe69a;</span>
      <div class="panel-label">柱条颜色</div>
      <div class="panel-value">{{ activeElement.barColor }}</div>
      <div>
        <input type="color" v-model="activeElement.barColor" @change="handleClick">
      </div>
    </div>
    <!-- 全局组件-数据源 -->
    <datas :activeElement="activeElement"></datas>

  </div>
</template>

<script>
import EventBus from '../../../../utils/EventBus.js'
export default {
  name: 'braid-bar-style',
  props: ['activeElement'],
  methods: {
    handleClick () {
      EventBus.$emit('change')
    }
  },
  created () {
    // console.log(this.activeElement, 77)
  }
}
</script>

<style scoped>
  .iconfont{
    color: #acb3c2;
  }
  .textareaText{
    width: 100%;
    margin-top: 5px;
  }
</style>
