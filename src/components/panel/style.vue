<template>
  <div class="panel-wrap" v-if="!activeElement.page && activeElement.common && tab === 1">
    <Collapse v-model="defaultPanel">
      <Panel name="1">
        公共属性
        <div slot="content">
          <!-- 公共属性 -->
          <div class="panel-row">
            <icon name="layers" />
            <div class="panel-label">组件名称</div>
            <div class="panel-value">
              <input type="text" v-model="activeElement.common.title" />
            </div>
          </div>

          <div class="panel-row">
            <icon name="layers" />
            <div class="panel-label">层级</div>
            <div class="panel-value">{{ activeElement.common.position.z }}</div>
            <div class="panel-slider-wrap">
              <slider v-model="activeElement.common.position.z" :step="1" :max="20" />
            </div>
          </div>

          <div class="panel-row">
            <icon name="more-horizontal" />
            <div class="panel-label">宽度</div>
            <div class="panel-value">{{ activeElement.common.size.width }}</div>
            <div class="panel-slider-wrap">
              <slider v-model="activeElement.common.size.width" :step="1" :max="750" />
            </div>
          </div>

          <div class="panel-row">
            <icon name="more-vertical" />
            <div class="panel-label">高度</div>
            <div class="panel-value">{{ activeElement.common.size.height }}</div>
            <div class="panel-slider-wrap">
              <slider v-model="activeElement.common.size.height" :step="1" :max="height" />
            </div>
          </div>

          <div class="panel-row">
            <icon name="arrow-right" />
            <div class="panel-label">横坐标</div>
            <div class="panel-value">{{ activeElement.common.position.left }}</div>
            <div class="panel-slider-wrap">
              <slider v-model="activeElement.common.position.left" :step="1" :max="750" />
            </div>
          </div>

          <div class="panel-row">
            <icon name="arrow-down" />
            <div class="panel-label">纵坐标</div>
            <div class="panel-value">{{ activeElement.common.position.top }}</div>
            <div class="panel-slider-wrap">
              <slider v-model="activeElement.common.position.top" :step="1" :max="height" />
            </div>
          </div>
        </div>
      </Panel>
      <Panel name="2">
        样式
        <div slot="content">
        <!-- 组件样式 -->
          <component :is="widgetStyle[i]" v-for="(item, i) in widgetStyle" :key="i" :activeElement="activeElement" v-if="item.type === activeElement.common.type" />
        </div>
      </Panel>
      <Panel name="3" v-if="activeElement.common.isChild">
        容器
        <!-- 添加到容器 -->
        <div  slot="content">
          <div class="panel-row">
            <icon name="layout" />
            <div class="panel-label">所属容器</div>
            <div class="panel-value">
              <select v-model="activeElement.common.belong">
                <option>page</option>
                <option v-for="(val, index) in containerName" :key="index">{{ val }}</option>
              </select>
            </div>
          </div>
        </div>
      </Panel>
    </Collapse>
  </div>
</template>

<script>
import widget from '../../plugins/widget'

export default {
  name: 'panel-style',

  props: ['activeElement', 'tab'],

  data () {
    return {
      defaultPanel: '2'
    }
  },

  computed: {
    widgetStyle () {
      return widget.getWidgetStyle()
    },
    // 页面高度
    height () {
      return this.$store.state.page.height
    },

    // 容器名称
    containerName () {
      var arr = []
      this.$store.state.widgets.map(
        val => val.isContainer && val.name && arr.push(val.name)
      )

      return arr
    }
  }
}
</script>

<style scoped>
  select{
    line-height: 1.5 !important;
  }
  hr{
    margin: 0px 0px 5px 0px;
  }
</style>
