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
      <icon name="sliders" />
      <div class="panel-label">行高</div>
      <div class="panel-value">{{ activeElement.common.lineHeight }}</div>
      <div class="panel-slider-wrap">
        <slider :max="5" :min="1" v-model="activeElement.common.lineHeight" />
      </div>
    </div>

    <div class="panel-row" flex>
      <icon name="type" />
      <div class="panel-label">字号</div>
      <div class="panel-value">{{ activeElement.common.fontSize }}rem</div>
      <div class="panel-slider-wrap">
        <slider :step="0.01" :max="2" :min=".85" v-model="activeElement.common.fontSize" />
      </div>
    </div>

    <div class="panel-row" flex>
      <icon name="edit-3" />
      <div class="panel-label">颜色</div>
      <div class="panel-value">{{ activeElement.common.color }}</div>
      <div>
        <input type="color" v-model="activeElement.common.color">
      </div>
    </div>

    <div class="panel-row" flex>
      <icon name="bold" />
      <div class="panel-label">加粗</div>
      <div class="panel-value">
        <label class="form-switch">
          <input type="checkbox" v-model="activeElement.common.fontWeight">
          <i class="form-icon"></i>
        </label>
      </div>
    </div>

    <div class="panel-row" flex>
      <icon name="align-justify" />
      <div class="panel-label">对齐</div>
      <div class="panel-value">
        <label class="form-radio tooltip" data-tooltip="左对齐">
          <input type="radio" name="align" value="left" v-model="activeElement.common.textAlign">
          <i class="form-icon"></i> <icon name="align-left" />
        </label>
        <label class="form-radio tooltip" data-tooltip="居中">
          <input type="radio" name="align" value="center" v-model="activeElement.common.textAlign">
          <i class="form-icon"></i> <icon name="align-center" />
        </label>
        <label class="form-radio tooltip" data-tooltip="右对齐">
          <input type="radio" name="align" value="right" v-model="activeElement.common.textAlign">
          <i class="form-icon"></i> <icon name="align-center" />
        </label>
      </div>
    </div>

    <!-- 全局组件背景色、图选择 -->
    <background-img :activeElement="activeElement"></background-img>
  </div>
</template>

<script>
export default {
  name: 'braid-txt-style',
  props: ['activeElement']
}
</script>

<style scoped>
  .panel-preview{
    line-height: 26px;
    background-size: 20px 20px;
  }
</style>
