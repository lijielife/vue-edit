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
    }
  }
}
</script>

<style scoped>
.newadd{
  width: 100%;
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

@media screen and (width: 1920px){
  .newadd{
    min-height: 335px;
  }
}
@media screen and (width: 1680px){
  .newadd{
    min-height: 295px;
  }
}
@media screen and (width: 1600px){
  .newadd{
    min-height: 295px;
  }
}
</style>
