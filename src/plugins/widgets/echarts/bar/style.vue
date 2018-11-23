<template>
	<div>
      <div class="panel-row" flex>
        <span class="iconfont">&#xe600;</span>
        <div class="panel-label">是否显示</div>
        <div class="panel-value">
          <label class="form-switch">
            <input type="checkbox" v-model="activeElement.common.displayNone">
            <i class="form-icon"></i>
          </label>
        </div>
      </div>

      <div class="panel-row" flex>
        <span class="iconfont">&#xe6c1;</span>
        <div class="panel-label">柱条宽度</div>
        <div class="panel-value">{{ activeElement.chart.graphWidth }}px</div>
        <div class="panel-slider-wrap">
          <slider :step="10" :max="80" :min="20" v-model="activeElement.chart.graphWidth" ></slider>
        </div>
      </div>

      <charttheme :activeElement="activeElement"></charttheme>

      <div style="margin-bottom: 10px;">
        <!-- 全局组件背景色、图选择 -->
        <background-img :activeElement="activeElement"></background-img>
      </div>
      
      <!-- 数据 -->
      <datasources :activeElement="activeElement"></datasources>
  </div>
</template>

<script>
import datasources from '../../common/data-source.vue'
import charttheme from '../theme/chart-theme.vue'
export default {
  name: 'braid-bar-style',
  props: ['activeElement'],
  data () {
    return {
      datax: [],
      datay: []
    }
  },
  components: {
    datasources,
    charttheme
  },
  watch: {
  }
}
</script>

<style scoped>
  .iconfont{
    color: #acb3c2;
  }
  .panel-preview{
    line-height: 26px;
    background-size: 20px 20px;
  }
  .textareaText{
    width: 100%;
  }
  .textareaText>>>textarea.ivu-input{
    min-height: 160px;
    max-height: 160px;
  }
  .textareaText>>>.i-editor-tabs{display: none;}
</style>
