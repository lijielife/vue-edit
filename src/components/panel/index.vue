<template>
  <div class="rightDiv" :class="this.flag === false ? '' : 'ChangeWidth'">
    <div class="btnDiv iconfont" @click="handleClick">&#xe655;</div>
    <ul class="tab tab-block panel-tab" v-if="activeElement.common">
      <li class="tab-item" :class="{active: activeTab === 1}" @click="activeTab = 1"><a>参数</a></li>
      <li class="tab-item" :class="{active: activeTab === 2}" @click="activeTab = 2"><a>交互</a></li>
      <li class="tab-item" :class="{active: activeTab === 3}" @click="activeTab = 3"><a>动画</a></li>
    </ul>

    <page :activeElement="activeElement" :tab="activeTabPanel"></page>
    <appearance :activeElement="activeElement" :tab="activeTabPanel"></appearance>
    <event :activeElement="activeElement" :tab="activeTabPanel"></event>
    <animation :activeElement="activeElement" :tab="activeTabPanel"></animation>
  </div>
</template>

<script>
import page from './page.vue'
import style from './style.vue'
import event from './event.vue'
import animation from './animation.vue'
import EventBus from '../../utils/EventBus.js'

export default {
  components: {
    page: page,
    appearance: style,
    event: event,
    animation: animation
  },

  data () {
    return {
      activeTab: 1,
      flag: false
    }
  },

  computed: {
    // 选中元素对象
    activeElement () {
      return this.$store.state.activeElement
    },
    activeTabPanel () {
      if (this.activeElement.page) {
        this.activeTab = 1
      }
      return this.activeTab
    }
  },
  methods: {
    handleClick () {
      this.flag = !this.flag
      EventBus.$emit('changeWidth')
    }
  }
}
</script>

<style lang="scss">
@import '../../_variables.scss';
.rightDiv {
  position: relative;
  transition: all .3s;
}
.ChangeWidth {
  // transform: translate(100%);
  width: 0 !important;
}
.btnDiv {
  width: 30px;
  height: 30px;
  position: absolute;
  top: 0;
  left: -50px;
  cursor: pointer;
  text-align: center;
}
.panel-tab {
  padding: 0;
}
.panel-wrap {
  height: calc(100% - 50px);
  padding: 15px 20px;
  position: relative;
  overflow-y: auto;
  .btn-action {
    background-color: none;
    border: none;
    border-radius: 50%;
  }
  .btn-action:hover {
    background-color: #f5f5f5;
  }
}
.panel-row {
  display: flex;
  font-size: 13px;
  line-height: 36px;
}
.panel-row .svg-icon {
  font-size: 16px;
  color: $gray-color;
}
.panel-label {
  display: inline-block;
  width: 80px;
  height: 36px;
  padding-left: 6px;
  color: #999;
}
.panel-value {
  min-width: 80px;
  display: flex;
  align-items: center;
}
.panel-slider-wrap {
  flex-grow: 1;
  padding: 6px 5px;
  opacity: 0;
  transition: opacity 0.3s;
}
.panel-row:hover .panel-slider-wrap {
  opacity: 1;
}
.panel-cell {
  flex-grow: 1;
}
.panel-wrap input:checked ~ .svg-icon svg {
  stroke: #333;
}
.panel-select {
  width: 100%;
  height: 32px;
  border: 1px solid #ccc;
}
.panel-wrap hr {
  margin: 20px 0;
  border: none;
  border-top: 1px solid #f5f5f5;
}
.panel-wrap select,
.panel-wrap input[type="text"] {
  width: 100%;
}
.panel-preview {
  width: 50px;
  height: 32px;
  background: no-repeat center/100%;
  cursor: pointer;
}
select{
  line-height: 1.5 !important;
}  
</style>
