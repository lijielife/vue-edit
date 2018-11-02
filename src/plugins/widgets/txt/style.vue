<template>
	<div>
    <hr>
    <div class="panel-row" flex>
      <icon name="sliders" />
      <div class="panel-label">行高</div>
      <div class="panel-value">{{ activeElement.lineHeight }}</div>
      <div class="panel-slider-wrap">
        <slider :max="5" :min="1" v-model="activeElement.lineHeight" />
      </div>
    </div>

    <div class="panel-row" flex>
      <icon name="type" />
      <div class="panel-label">字号</div>
      <div class="panel-value">{{ activeElement.fontSize }}rem</div>
      <div class="panel-slider-wrap">
        <slider :step="0.01" :max="2" :min=".85" v-model="activeElement.fontSize" />
      </div>
    </div>

    <div class="panel-row" flex>
      <icon name="edit-3" />
      <div class="panel-label">颜色</div>
      <div class="panel-value">{{ activeElement.color }}</div>
      <div>
        <input type="color" v-model="activeElement.color">
      </div>
    </div>

    <div class="panel-row" flex>
      <icon name="bold" />
      <div class="panel-label">加粗</div>
      <div class="panel-value">
        <label class="form-switch">
          <input type="checkbox" v-model="activeElement.fontWeight">
          <i class="form-icon"></i>
        </label>
      </div>
    </div>

    <div class="panel-row" flex>
      <icon name="align-justify" />
      <div class="panel-label">对齐</div>
      <div class="panel-value">
        <label class="form-radio tooltip" data-tooltip="左对齐">
          <input type="radio" name="align" value="left" v-model="activeElement.textAlign">
          <i class="form-icon"></i> <icon name="align-left" />
        </label>
        <label class="form-radio tooltip" data-tooltip="居中">
          <input type="radio" name="align" value="center" v-model="activeElement.textAlign">
          <i class="form-icon"></i> <icon name="align-center" />
        </label>
        <label class="form-radio tooltip" data-tooltip="右对齐">
          <input type="radio" name="align" value="right" v-model="activeElement.textAlign">
          <i class="form-icon"></i> <icon name="align-center" />
        </label>
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
  </div>
</template>

<script>
export default {
  name: 'braid-txt-style',
  props: ['activeElement'],
  methods: {
    addPic () {
      this.$store.$emit('upload', (payload) => {
        this.$store.commit('addBackPic', payload)
      })
    }
  }
}
</script>

<style scoped>
  .panel-preview{
    line-height: 26px;
    background-size: 20px 20px;
  }
</style>
