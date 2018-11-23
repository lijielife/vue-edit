<template>
  <div class="menu-bar">
      <summary>组件</summary>
      <!-- 添加组件增多的时候显示滚动条 -->
      <div class="sideCols" :style="{overflow: 'auto'}">
        <ul class="layer-list">
          <li :class="{'layer-active': layer === activeElement}" v-for="layer in layers" :key="layer.uuid" @click="(e) => {activeLayer(e, layer)}">
            <img :src="layer.common.thumbnail"/><span>{{layer.common.title}}</span>
          </li>
        </ul>
      </div>
  </div>
</template>

<script>
import { cumulativeOffset, checkInView } from '../utils/offset'

export default {
  props: ['zoom'],
  data () {
    return {}
  },
  computed: {
    layers () {
      return this.$store.state.widgets
    },
    activeElement () {
      return this.$store.state.activeElement
    }
  },
  methods: {
    activeLayer (e, item) {
      this.$store.commit('select', {
        uuid: item.uuid
      })
      let viewport = document.querySelector('#viewport')
      let target = viewport.querySelector(`[data-uuid='${item.uuid}']`)
      if (target && !checkInView(target)) {
        viewport.scrollTop = (cumulativeOffset(target).common.position.top - 50) * this.zoom / 100
      }
    }
  }
}
</script>

<style lang="scss">
@import '../_variables.scss';
.menu-bar {
  ul {
    list-style: none;
    margin: 0;
  }
  details {
    padding: 10px;
  }
  summary {
    padding: 5px 0;
    font-size: 20px;
    letter-spacing: 5px;
    text-align: center;
    border-bottom: 1px solid #f5f5f5;
  }
}
.widget-list {
  padding: 0;
}
.menu-item {
  text-align: center;
  cursor: pointer;
  padding: 15px 0 8px;
  transition: all 0.2s;
  position: relative;
  &:hover {
    transform: scale(1.2);
  }
  .svg-icon {
    font-size: 24px;
  }
  .menu-caption {
    display: block;
    font-size: 12px;
    width: 100%;
  }
}
.layer-list {
  padding: 3px;
  li {
    text-align: left;
    cursor: pointer;
    white-space: nowrap;
    padding: 5px 0px 0px 2px;
    &:hover {
      background: #f5f5f5;
    }
    &.layer-active {
      color: $light-color;
      background: $primary-color;
    }
    img {
      height: 25px;
    }
    span {
      display: -moz-inline-box;
      display: inline-block;
      height: 25px;
      line-height: 25px;
      overflow: hidden;
      padding-left: 5px;
      font-size: 10px;
      width: 64px;
      text-overflow: ellipsis; 
      -o-text-overflow: ellipsis;
      white-space:nowrap;
    }
  }
}
.sideCols{
  height: 89.5vh;
}
.sideCols ul{
  padding-bottom: 15px;
}
@media screen and (min-width: 1440px) and (max-width: 1679px) {
  .sideCols{
    height: 87.5vh;
  }
}
@media screen and (min-width: 1151px) and (max-width: 1280px)  {
  .sideCols{
    height: 86vh;
  }
}
@media screen and (min-width: 1024px) and (max-width: 1150px)  {
  .sideCols{
    height: 84.5vh;
  }
}
</style>
