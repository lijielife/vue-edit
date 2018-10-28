<template>
  <div class="datas">
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
      <div class="textareaText">
        <i-editor v-model="content"></i-editor>
      </div>
    </div>
  </div>
</template>

<script>
import EventBus from '../../utils/EventBus.js'
export default {
  name: 'Datas',
  data () {
    return {
      content: null,
      datax: [],
      datay: []
    }
  },
  watch: {
    content (newVal, oldVal) {
      if (newVal !== oldVal) {
        setTimeout(() => {
          this.handleDatas()
        }, 20)
      }
    }
  },
  methods: {
    handleDatas () {
      let ObjContent = JSON.parse(this.content)
      this.datax = []
      this.datay = []
      for (let i = 0; i < ObjContent.length; i++) {
        this.datax.push(ObjContent[i].name)
        this.datay.push(ObjContent[i].value)
      }
      EventBus.$emit('DatasChange' + this.$store.state.uuid, this.datax, this.datay)
    },
    _initDatas () {
      this.$axios.get('../../../static/datas.json')
        .then((res) => {
          // console.log(res.data.content)
          this.content = res.data.content
          let StrContent = JSON.stringify(this.content)
          this.content = StrContent
          let ObjContent = JSON.parse(this.content)
          for (let i = 0; i < ObjContent.length; i++) {
            this.datax.push(ObjContent[i].name)
            this.datay.push(ObjContent[i].value)
          }
        })
    }
  },
  created () {
    // 数据初始化  当再次选中元件的时候等于是重新加载了页面 对于改变的值又被初始化了
    this._initDatas()
  }
}
</script>

<style scoped>
.textareaText>>>textarea.ivu-input{
  min-height: 120px;
  max-height: 120px;
}
</style>
