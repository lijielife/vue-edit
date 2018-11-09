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

    <div class="panel-row">
      <icon name="image" />
      <div class="panel-label">背景图</div>
      <div class="panel-value">
        <div class="panel-preview"
          @click="addPic"
          :style="{ backgroundImage: 'url(' + this.$store.state.page.backPic + ')' }">
          <icon name="plus" v-show="!this.$store.state.page.backPic" />
        </div>
      </div>
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
