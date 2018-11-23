<template>
	<div class="panel-wrap" v-if="activeElement.page && tab === 1">
    <div class="panel-row" flex>
      <icon name="type" />
      <div class="panel-label">页面标题</div>
      <div class="panel-value">
        <input type="text" v-model="activeElement.title">
      </div>
    </div>

    <div class="panel-row" flex>
      <icon name="smartphone" />
      <div class="panel-label">页面宽度</div>
      <div class="panel-value">
        <input type="text" v-model="activeElement.width">
      </div>
    </div>

    <div class="panel-row" flex>
      <icon name="smartphone" />
      <div class="panel-label">页面高度</div>
      <div class="panel-value">
        <input type="text" v-model="activeElement.height">
      </div>
    </div>

    <div class="panel-row" flex>
      <icon name="droplet" />
      <div class="panel-label">页面背景色</div>
      <div class="panel-value">
        <input type="color" v-model="activeElement.backgroundColor">
      </div>
    </div>

    <!-- <div class="panel-row">
      <icon name="image" />
      <div class="panel-label">背景图</div>
      <div class="panel-value">
        <div class="panel-preview"
          @click="addPic"
          :style="{ backgroundImage: 'url(' + this.$store.state.page.backPic + ')' }">
          <icon name="plus" v-show="!this.$store.state.page.backPic" />
        </div>
      </div>
    </div> -->
    <div class="panel-row">
      <icon name="image" />
      <div class="panel-label">背景图</div>
      <div class="panel-value">
        <div class="panel-preview"
          @click="addPic">
          <icon name="plus" />
        </div>
      </div>
    </div>
    <div class="small_pics" v-show="this.$store.state.page.backPic">
      <img :src="this.$store.state.page.backPic" />
    </div>

    <div class="panel-row">
      <icon name="delete" />
      <div class="panel-label">删除背景图</div>
      <div class="panel-value">
        <div class="panel-preview"
          @click="deletePic">
          <icon name="minus" />
        </div>
      </div>
    </div>
<!--
    <div class="panel-row" flex>
      <icon name="clock" />
      <div class="panel-label">截止日期</div>
      <div class="panel-value">
        <input type="date" v-model="activeElement.endTime">
      </div>
    </div>
    -->
  </div>
</template>

<script>
import EventBus from '../../utils/EventBus.js'
export default {
  props: ['activeElement', 'tab'],
  methods: {
    addPic () {
      this.$store.$emit('upload', (payload) => {
        this.$store.commit('addViewportBackPic', payload)
      })
    },
    deletePic () {
      this.$store.commit('deleteViewportBackPic')
    },
    _getTitle () {
      // 接收模板选择组件传递过来的标题数据
      this.activeElement.title = this.$route.params.val
    }
  },
  created () {
    // 如果走路由选择模板进入编辑界面则执行页面标题的赋值改变，否则默认为'测试页面'
    if (this.$route.params.val) {
      setTimeout(() => {
        this._getTitle()
        console.log(this.activeElement)
      }, 250)
    }
  },
  watch: {
    'activeElement.width': function (newVal, oldVal) {
      if (newVal !== oldVal) {
        EventBus.$emit('pageChangeWidth')
      }
    },
    'activeElement.height': function (newVal, oldVal) {
      if (newVal !== oldVal) {
        EventBus.$emit('pageChangeWidth')
      }
    }
  }
}
</script>

<style scoped>
  .panel-preview{
    line-height: 26px;
    background-size: 20px 20px;
  }
  .small_pics{
    height: 100px;
    padding-left: 100px;
    margin-bottom: 10px;
  }
  .small_pics img{
    width: 100%;
    max-height: 100px;
  }
</style>
