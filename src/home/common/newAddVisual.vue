<template>
  <div>
    <div class="newadd" @click="handleClick">
      <p class="newadd_title"><Icon class="newadd_icon" type="md-add" />新建可视化</p>
    </div>
  </div>
</template>

<script>
import EventBus from '../../utils/EventBus.js'
export default {
  name: 'NewAdd',
  data () {
    return {
      // value: ''
    }
  },
  methods: {
    handleClick () {
      EventBus.$emit('jumpPage')
      // this.value = '' // 再次点击时置空value
      // this.$Modal.confirm({
      //   render: (h) => {
      //     return h('Input', {
      //       props: {
      //         value: this.value,
      //         autofocus: true,
      //         placeholder: '请输入创建组件标题'
      //       },
      //       on: {
      //         input: (val) => {
      //           this.value = val
      //           EventBus.$emit('addelement', this.value)
      //         }
      //       }
      //     })
      //   }
      // })
    }
  }
}
</script>

<style scoped>
.newadd{
  width: 100%;
  max-width: 260px;
  min-height: 260px;
  background: #fff;
  color: #3780FC;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0 10px rgba(55,128,252,0.29);
  cursor: pointer;
}
.newadd_title{
  font-size: 24px;
}
.newadd_icon{
  display: block;
  text-align: center;
  font-size: 60px;
}
</style>
