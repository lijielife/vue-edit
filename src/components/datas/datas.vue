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
        <i-editor v-model="content" @change="changeDatas"></i-editor>
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
      content: [
        {
          name: 'Mon',
          value: '100'
        },
        {
          name: 'Tue',
          value: '30'
        },
        {
          name: 'Wed',
          value: '80'
        },
        {
          name: 'Thu',
          value: '20'
        },
        {
          name: 'Fri',
          value: '60'
        },
        {
          name: 'Sat',
          value: '40'
        },
        {
          name: 'Sun',
          value: '90'
        }
      ],
      datax: [],
      datay: []
    }
  },
  watch: {
    content (newVal, oldVal) {
      if (newVal !== oldVal) {
        console.log(newVal, 'new')
        this.handleDatas()
        this.changeDatas()
      }
    }
  },
  methods: {
    changeDatas () {
      EventBus.$emit('DatasChange' + this.$store.state.uuid, this.datax, this.datay)
    },
    handleDatas () {
      let ObjContent = JSON.parse(this.content)
      // console.log(ObjContent)
      // this.$store.state.datasX = []
      // this.$store.state.datasY = []
      this.datax = []
      this.datay = []
      for (let i = 0; i < ObjContent.length; i++) {
        this.datax.push(ObjContent[i].name)
        this.datay.push(ObjContent[i].value)
      }
      console.log(this.datax, this.datay, 33)
    }
  },
  created () {
    let StrContent = JSON.stringify(this.content)
    this.content = StrContent
    let ObjContent = JSON.parse(this.content)

    for (let i = 0; i < ObjContent.length; i++) {
      this.$store.state.datasX.push(ObjContent[i].name)
      this.$store.state.datasY.push(ObjContent[i].value)
    }
    console.log(this.$store.state.datasX, 9999, ObjContent)
  }
}
</script>

<style scoped>
.textareaText>>>textarea.ivu-input{
  min-height: 120px;
  max-height: 120px;
}
</style>
