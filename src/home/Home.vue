<template>
  <div class="pageHome">
    <div class="page_nav">
      <p :class="this.$route.name === 'MyVisualization' ? 'actived_P': ''"><router-link to="/myvisualization">我的可视化</router-link></p>
      <p :class="this.$route.name === 'MyDatas' ? 'actived_P': ''"><router-link to="/mydatas">我的数据</router-link></p>
      <p :class="this.$route.name === 'MyLibrarys' ? 'actived_P': ''"><router-link to="/mylibrarys">组件库</router-link></p>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'PageHome'
}
</script>

<style scoped>
.page_nav{
  display: flex;
  height: 80px;
  line-height: 80px;
  font-size: 20px;
  padding-left: 35%;
  border-bottom: 1px solid #eaeaea;
  background: url('../assets/images/pageLogin_letters.png') no-repeat 5% center;
}
.page_nav p{
  margin-right: 10%;
  padding: 0 5px;
  cursor: pointer;
}
.page_nav p a{
  text-decoration: none;
  display: block;
}
.actived_P{
  border-bottom: 4px solid #3780fc;
}
.actived_P a{
  color: #3780fc;
}
</style>
