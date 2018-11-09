<template>
  <div class="AppBox">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'Appframe'
}
</script>

<style scoped>
.AppBox{
  width: 100%;
  height: 100%;
  background: #f8f8f8;
}
</style>
