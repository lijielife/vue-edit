<template>
  <div class="myvisualization">
    <Layout>
      <Sider hide-trigger :style="{background: '#fff', height: '100vh', overflow: 'auto'}">
        <Menu active-name="1-2" theme="light" width="auto" :open-names="['1']">
          <Submenu name="1">
            <template slot="title">
              <Icon type="ios-navigate"></Icon>
              Item 1
            </template>
            <MenuItem name="1-1">Option 1</MenuItem>
            <MenuItem name="1-2">Option 2</MenuItem>
            <MenuItem name="1-3">Option 3</MenuItem>
          </Submenu>
          <Submenu name="2">
            <template slot="title">
              <Icon type="ios-keypad"></Icon>
              Item 2
            </template>
            <MenuItem name="2-1">Option 1</MenuItem>
            <MenuItem name="2-2">Option 2</MenuItem>
          </Submenu>
          <Submenu name="3">
            <template slot="title">
              <Icon type="ios-analytics"></Icon>
              Item 3
            </template>
            <MenuItem name="3-1">Option 1</MenuItem>
            <MenuItem name="3-2">Option 2</MenuItem>
            <MenuItem name="3-3">Option 1</MenuItem>
            <MenuItem name="3-4">Option 2</MenuItem>
            <MenuItem name="3-5">Option 1</MenuItem>
            <MenuItem name="3-6">Option 2</MenuItem>
            <MenuItem name="3-7">Option 1</MenuItem>
            <MenuItem name="3-8">Option 2</MenuItem>
            <MenuItem name="3-9">Option 1</MenuItem>
            <MenuItem name="3-10">Option 2</MenuItem>
            <MenuItem name="3-11">Option 11</MenuItem>
            <MenuItem name="3-12">Option 12</MenuItem>
          </Submenu>
        </Menu>
      </Sider>
      <Layout :style="{padding: '0 24px 24px'}">
        <Breadcrumb :style="{margin: '24px 0'}">
            <BreadcrumbItem>分组3中的文件2</BreadcrumbItem>：共15个容量，已建8个，剩7个
        </Breadcrumb>
        <Content :style="{minHeight: '280px'}">
          <div class="conDiv" :class="[cssClass === false ? '' : 'conDivScroll']">
            <ul class="visual_ul" ref="visualUl">
              <li class="firstLi">
                <new-add></new-add>
              </li>
              <li class="visual_child">
                <img src="../../assets/images/example_img01.jpg" alt="">
                <div class="visual_title">
                  <p>可视化1</p>
                  <span>未发布</span>
                </div>
              </li>
              <li class="visual_child">
                <img src="../../assets/images/example_img01.jpg" alt="">
                <div class="visual_title">
                  <p>可视化1</p>
                  <span>未发布</span>
                </div>
              </li>
            </ul>
          </div>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>

<script>
import EventBus from '../../utils/EventBus.js'
export default {
  name: 'MyVisualization',
  data () {
    return {
      cssClass: false // 控制右侧元素个数超过10个的时候出现滚动条样式
    }
  },
  methods: {
    _getClickEvent () {
      EventBus.$on('jumpPage', () => {
        this.$router.push({
          name: 'SelectTemp'
        })
      })
    },
    _calLiLength () {
      let Children = this.$refs.visualUl.children
      if (Children.length > 10) {
        this.cssClass = true
      }
      // console.log(Children.length)
    }
  },
  mounted () {
    this._getClickEvent()
    this._calLiLength()
  }
}
</script>

<style scoped>
.ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu):after{
  right: initial;
  left: 0;
  width: 4px;
  background: #3399ff;
}
.ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu){
  color: #3780FC;
  background: #f8f8f8;
}
.ivu-layout{
  background: none;
}
.ivu-breadcrumb{
  font-size: 16px;
  color: #666;
}
.ivu-breadcrumb>span:last-child{
  font-weight: normal;
  color: #666;
}
.ivu-layout-content{
  flex: initial;
}
.conDivScroll{
  height: 80vh;
  overflow-y: scroll;
}
.visual_ul{
  display: flex;
  width: 100%;
  flex-wrap: wrap;
}
.visual_ul li{
  width: 20%;
  margin-right: 2%;
  margin-bottom: 2%;
  max-width: 260px;
  min-height: 260px;
}
.visual_child{
  border-radius: 4px;
  box-shadow: 0px -4px 9px 0px rgba(179,179,179,0.29), 0px 4px 9px 0px rgba(179,179,179,0.17);
  overflow: hidden;
}
.visual_child img{
  width: 100%;
}
.visual_title{
  display: flex;
  padding: 20px 10px;
}
.visual_title p{
  flex: 1;
  font-size: 16px;
}
.visual_title span{
  font-size: 14px;
  color: #666;
}
</style>
