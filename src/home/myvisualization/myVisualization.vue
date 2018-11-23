<template>
  <div class="myvisualization">
    <Layout>
      <Sider class="sideCols" hide-trigger :style="{background: '#fff', width: '250px', maxWidth: '250px', flex: '0 0 250px', overflow: 'auto'}">
        <div class="myGroups iconfont">
          我的分组
          <p class="newG" @click="_addDatas">新建分组</p>
        </div>
        <Menu active-name="1-1" theme="light" width="auto" :open-names="['1']">
          <Submenu :name="data.num" v-for="(data, index) in datas" :key="index">
            <template slot="title" @dblclick.native="doubleClick($event, data.className)" @click.once="singleClick($event, data.className)" :contenteditable="flag">
              {{ data.className }}
            </template>
            <MenuItem :name="item.name" style="padding-left: 60px;" v-for="(item, index) in data.children" :key="index" @dblclick.native="doubleClick($event, item.name)" @click.native="singleClick($event, item.name)" :contenteditable="flag">
              {{ item.title }}
            </MenuItem>
          </Submenu>
        </Menu>
      </Sider>
      <Layout :style="{padding: '0 24px 24px'}">
        <Breadcrumb :style="{margin: '24px 0', paddingLeft: '10px'}">
            <BreadcrumbItem>分组3中的文件2</BreadcrumbItem>：共15个容量，已建8个，剩7个
        </Breadcrumb>
        <div class="visual_Scroll" :style="{overflow: 'auto'}">
          <ul class="visual_ul">
            <li class="firstLi">
              <new-add></new-add>
            </li>
            <!--  v-for="(data, index) in datas" :key="index" 鼠标经过事件@mouseover.once="handleMouseover($event, index)"-->
            <li class="visual_child" v-for="(item, index) in visualDatas" :key="index">
              <div class="visual_img">
                <img v-lazy="item.ImgUrl" />
              </div>
              <div class="visual_title">
                <p>{{ item.title }}</p>
                <span>{{ item.status }}</span>
              </div>
              <div class="visual_btns">
                <div class="sixBtn" @click="handlePublish($event, index)">
                  <span class="iconfont">&#xe631;</span>
                  <p>发布</p>
                </div>
                <div class="sixBtn" @click="handleRename($event, index)">
                  <span class="iconfont">&#xe609;</span>
                  <p>重命名</p>
                </div>
                <div class="sixBtn">
                  <span class="iconfont">&#xe613;</span>
                  <p>预览</p>
                </div>
                <div class="sixBtn">
                  <span class="iconfont">&#xe642;</span>
                  <p>拷屏</p>
                </div>
                <div class="sixBtn" @click="handleCopy($event, index)">
                  <span class="iconfont">&#xe61d;</span>
                  <p>复制</p>
                </div>
                <div class="sixBtn" @click="handleDel($event, index)">
                  <span class="iconfont">&#xe65b;</span>
                  <p>删除</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
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
      flag: false,
      value: '',
      reName: '',
      datas: [
        {
          num: '1',
          className: '分组1',
          children: [
            {
              name: '1-1',
              title: '分组1-1'
            },
            {
              name: '1-2',
              title: '分组1-2'
            },
            {
              name: '1-3',
              title: '分组1-3'
            },
            {
              name: '1-4',
              title: '分组1-4'
            }
          ]
        },
        {
          num: '2',
          className: '分组2',
          children: [
            {
              name: '2-1',
              title: '分组2-1'
            },
            {
              name: '2-2',
              title: '分组2-2'
            },
            {
              name: '2-3',
              title: '分组2-3'
            },
            {
              name: '2-4',
              title: '分组2-4'
            }
          ]
        },
        {
          num: '3',
          className: '分组3',
          children: [
            {
              name: '3-1',
              title: '分组3-1'
            },
            {
              name: '3-2',
              title: '分组3-2'
            },
            {
              name: '3-3',
              title: '分组3-3'
            },
            {
              name: '3-4',
              title: '分组3-4'
            }
          ]
        }
      ],
      visualDatas: [
        {
          title: '可视化标题' + Math.floor(Math.random() * 100),
          status: '未发布',
          ImgUrl: require('../../assets/images/example_img01.jpg')
        },
        {
          title: '可视化标题' + Math.floor(Math.random() * 100),
          status: '已发布',
          ImgUrl: require('../../assets/images/example_img01.jpg')
        },
        {
          title: '可视化标题' + Math.floor(Math.random() * 100),
          status: '未发布',
          ImgUrl: require('../../assets/images/example_img01.jpg')
        },
        {
          title: '可视化标题' + Math.floor(Math.random() * 100),
          status: '已发布',
          ImgUrl: require('../../assets/images/example_img01.jpg')
        }
      ]
    }
  },
  methods: {
    // 发布按钮事件
    handlePublish (e, index) {
      e.stopPropagation()
      e.preventDefault()
      if (this.visualDatas[index].status === '已发布') {
        this.$Message.warning('已发布，请勿重复操作！')
        return
      }
      this.visualDatas[index].status = '已发布'
      this.$Message.info('发布成功!')
    },
    // 重命名按钮事件
    handleRename (e, index) {
      this.reName = '' // 再次点击时置空value
      this.$Modal.confirm({
        title: '请输入新名称',
        okText: '修改',
        render: (h) => {
          return h('Input', {
            props: {
              value: this.reName,
              autofocus: true,
              placeholder: '请输入新名称'
            },
            on: {
              input: (val) => {
                this.reName = val
              }
            }
          })
        },
        onOk: () => {
          if (this.reName !== '') {
            this.visualDatas[index].title = this.reName
            this.visualDatas[index].status = '修改未发布'
            this.$Message.info('修改成功!')
          } else {
            this.$Message.info('未输入新名称，暂不修改!')
          }
        },
        onCancel: () => {
          this.$Message.info('取消修改!')
        }
      })
    },
    // 复制按钮事件
    handleCopy (e, index) {
      e.stopPropagation()
      e.preventDefault()
      this.$Modal.confirm({
        title: '是否复制',
        content: '确认复制此条内容？',
        onOk: () => {
          this.visualDatas.push({
            title: '复制~' + this.visualDatas[index].title,
            status: '未发布',
            ImgUrl: this.visualDatas[index].ImgUrl
          })
          this.$Message.info('复制成功！')
        },
        onCancel: () => {
          this.$Message.info('取消复制!')
        }
      })
    },
    // 删除按钮事件
    handleDel (e, index) {
      e.stopPropagation()
      e.preventDefault()
      this.$Modal.confirm({
        title: '是否删除',
        content: '确认删除此条内容？',
        onOk: () => {
          this.visualDatas.splice(index, 1)
          this.$Message.info('删除成功！')
        },
        onCancel: () => {
          this.$Message.info('取消删除!')
        }
      })
    },
    // 左侧栏目树单击事件
    singleClick (e, currIndex) {
      console.log(currIndex)
      this.flag = false
    },
    // 左侧栏目树双击事件
    doubleClick (e, currIndex) {
      // alert(currIndex)
      e.stopPropagation()
      e.preventDefault()
      this.flag = true
    },
    // 新建可视化按钮点击事件，路由进入模版选择页面
    _getClickEvent () {
      EventBus.$on('jumpPage', () => {
        this.$router.push({
          name: 'SelectTemp'
        })
      })
    },
    // 新建分组按钮事件
    _addDatas () {
      this.value = '' // 再次点击时置空value
      this.$Modal.confirm({
        title: '请输入新建分组名称',
        okText: '新建',
        render: (h) => {
          return h('Input', {
            props: {
              value: this.value,
              autofocus: true,
              placeholder: '请输入新建分组名称'
            },
            on: {
              input: (val) => {
                this.value = val
              }
            }
          })
        },
        onOk: () => {
          if (this.value !== '') {
            this.datas.push({
              num: this.value,
              className: this.value,
              children: []
            })
            this.$Message.info('新建成功!')
          } else {
            this.$Message.info('未输入新分组名称，暂不创建!')
          }
        },
        onCancel: () => {
          this.$Message.info('取消新建!')
        }
      })
    }
  },
  mounted () {
    this._getClickEvent()
  },
  created () {}
}
</script>

<style scoped>
.visual_Scroll{
  height: 84vh;
}
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
.myvisualization>>>.ivu-menu-vertical .ivu-menu-item, .myvisualization>>>.ivu-menu-vertical .ivu-menu-submenu-title{
  font-size: 16px;
  color: #000;
  padding-left: 48px;
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
.myGroups{
  padding: 25px 0 15px 45px;
  color: #3780FC;
  position: relative;
  border-right: 1px solid #dcdee2;
}
.myGroups:before{
  content: '\e739';
  font-size: 22px;
  position: absolute;
  left: 15px;
  top: 21px;
}
.newG{
  width: 70px;
  height: 26px;
  line-height: 26px;
  text-align: center;
  font-size: 12px;
  color: #3780FC;
  background: #E3E3E3;
  border-radius:13px;
  position: absolute;
  right: 30px;
  top: 25px;
  cursor: pointer;
}
.visual_ul{
  display: flex;
  width: calc(100% - 20px);
  flex-wrap: wrap;
  padding: 5px 10px;
  padding-bottom: 30px;
}
.visual_ul li{
  width: 23%;
  margin-bottom: 2.66%;
  margin-right: 2.66%;
  position: relative;
}
.visual_ul li:nth-child(4n){
  margin-right: 0;
}
.visual_child{
  border-radius: 8px 8px 0 0;
  box-shadow: 0px -4px 9px 0px rgba(179,179,179,0.29), 0px 4px 9px 0px rgba(179,179,179,0.17);
  overflow: hidden;
}
.visual_child img{
  width: 100%;
  min-height: 190px;
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
.visual_child:hover .visual_btns{
  opacity: 1;
}
.visual_btns{
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: calc(100% - 68px);
  background: rgba(0,0,0,.6);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  opacity: 0;
  transition: all .3s;
}
.sixBtn{
  width: 33.33%;
  color: #fff;
  text-align: center;
}
.sixBtn span{
  font-size: 24px;
}
.sixBtn p{
  font-size: 14px;
}
.sideCols{
  height: 91.5vh;
}
.sideCols ul{
  padding-bottom: 15px;
}
@media screen and (min-width: 1440px) and (max-width: 1679px) {
  .sideCols{
    height: 89.5vh;
  }
  .visual_Scroll{
    height: 80vh;
  }
}
@media screen and (min-width: 1151px) and (max-width: 1280px)  {
  .sideCols{
    height: 88vh;
  }
  .visual_Scroll{
    height: 80vh;
  }
}
@media screen and (min-width: 1024px) and (max-width: 1150px)  {
  .sideCols{
    height: 87.5vh;
  }
  .visual_Scroll{
    height: 76vh;
  }
}
</style>
