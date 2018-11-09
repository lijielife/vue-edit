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

    <div class="panel-row">
      <icon name="target" />
      <div class="panel-label">背景色</div>
      <!-- <div class="panel-value">{{ activeElement.bgColor }}</div> -->
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
      <div class="panel-value">
        <!-- <Select v-model="model1" style="width:100px"> -->
        <Select style="width:150px">
          <!-- <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option> -->
          <option>本地JSON文件</option>
        </Select>
      </div>
    </div>

    <div class="panel-row" flex>
      <span class="iconfont">&#xe665;</span>
      <div class="panel-label">数据编写：</div>
    </div>

    <div class="panel-row" flex>
      <div class="textareaText">
        <i-editor v-model="content"></i-editor>
      </div>
    </div>

  </div>
</template>

<script>
import EventBus from '../../../../utils/EventBus.js'
export default {
  name: 'braid-bar-style',
  props: ['activeElement'],
  data () {
    return {
      content: this.activeElement.content,
      datax: [],
      datay: []
    }
  },
  watch: {
    content (newVal, oldVal) {
      setTimeout(() => {
        if (newVal !== oldVal) {
          this.handleDatas()
        }
      }, 20)
    }
  },
  methods: {
    handleClick () {
      EventBus.$emit('change' + this.$store.state.uuid)
    },
    handleDatas () {
      let ObjContent = JSON.parse(this.content)
      this.datax = []
      this.datay = []
      for (let i = 0; i < ObjContent.length; i++) {
        this.datax.push(ObjContent[i].name)
        this.datay.push(ObjContent[i].value)
      }
      EventBus.$emit('DatasChange' + this.$store.state.uuid, this.datax, this.datay, this.content)
    },
    addPic () {
      this.$store.$emit('upload', (payload) => {
        this.$store.commit('addContainerBackPic', payload)
      })
    }
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
