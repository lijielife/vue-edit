<template>
  <header class="header">
    <div class="navbar container ">
      <section class="logo navbar-section" >
        <Icon @click="handleBack" type="ios-arrow-dropleft" />
        <ul class="cp_menu">
            <li>
              <Icon type="md-podium" /><br/>常规图表
              <div>
                <span @click="(e) => {addWidget(e, item)}" v-for="item in widgets" :key="item.name" v-if="item.category == 'common'">
                  <img  :src="item.thumbnail"/><br/>{{item.title}}
                </span>
              </div>
            </li>
            <li><Icon type="md-globe" /><br/>地图
              <div>
                <span @click="(e) => {addWidget(e, item)}" v-for="item in widgets" :key="item.name" v-if="item.category == 'map'">
                  <img  :src="item.thumbnail"/><br/>{{item.title}}
                </span>
              </div>
            </li>
            <li><Icon type="md-create" /><br/>文字
              <div>
                <span @click="(e) => {addWidget(e, item)}" v-for="item in widgets" :key="item.name" v-if="item.category == 'characters'">
                  <img  :src="item.thumbnail"/><br/>{{item.title}}
                </span>
              </div>
            </li>
            <li><Icon type="ios-git-merge" /><br/>关系网络
              <div>
                <span @click="(e) => {addWidget(e, item)}" v-for="item in widgets" :key="item.name" v-if="item.category == 'relational'">
                  <img  :src="item.thumbnail"/><br/>{{item.title}}
                </span>
              </div>
            </li>
        </ul>
      </section>
      <section class="navbar-section">
        <a class="btn btn-link tooltip tooltip-bottom" data-tooltip="复制元件 Ctrl + C" @click="copyWidget">
          <icon name="copy" /> 复制
        </a>
        <a class="btn btn-link tooltip tooltip-bottom" data-tooltip="删除元件 Delete" @click="dele">
          <icon name="trash-2" /> 删除
        </a>
        <a @click="save" class="btn btn-link tooltip tooltip-bottom" data-tooltip="保存 Ctrl + S"><icon name="save" /> 保存</a>
      </section>
    </div>
  </header>
</template>

<script>
// import EventBus from '../utils/EventBus.js'
import widget from '../plugins/widget'
export default {
  mounted () {
    window.history.forward(1)
    // Ctrl + C 复制元件
    document.addEventListener(
      'keyup',
      e => {
        e.stopPropagation()
        if ((e.ctrlKey || e.metaKey) && e.keyCode === 67) {
          this.copyWidget()
        }
      },
      true
    )

    // Delete 删除选中元件
    document.addEventListener(
      'keyup',
      e => {
        e.stopPropagation()
        if (e.keyCode === 46) {
          this.dele()
        }
      },
      true
    )

    // Ctrl + S 保存
    document.addEventListener(
      'keyup',
      e => {
        e.stopPropagation()
        if ((e.ctrlKey || e.metaKey) && e.keyCode === 83) {
          this.save()
        }
      },
      true
    )
  },

  methods: {
    // 返回按钮
    handleBack () {
      // 点击返回按钮事件清空画布并提示是否保存数据
      // console.log(this.$store.state.widgets.length)
      if (this.$store.state.widgets.length === 0) {
        this.$router.push({
          name: 'SelectTemp'
        })
      } else {
        this.$Modal.confirm({
          title: '返回上一页',
          content: '返回前是否保存已编辑的数据？',
          onOk: () => {
            // 点击确认按钮调用保存方法
            this.save()
            this.$router.push({
              name: 'SelectTemp'
            })
            this.$store.state.widgets = []
          },
          onCancel: () => {
            this.$Message.info('取消返回，数据未保存!')
          }
        })
      }
    },
    // 保存
    save () {
      this.$store.dispatch('save')
    },

    // 复制元件
    copyWidget () {
      this.$store.commit('copy')
    },

    // 删除元件
    dele () {
      this.$store.commit('delete')
    },

    // 添加组件
    addWidget (e, item) {
      this.$store.dispatch('addWidget', item)
    }
  },

  computed: {
    widgets () {
      return widget.getWidgets()
    }
  }
}
</script>

<style lang="scss">
@import '../_variables.scss';
.header {
  background-color: #fff;
  padding: 5px 0;
  border-bottom: 1px solid #EDEDED;
}
.navbar {
  .svg-icon {
    svg {
      vertical-align: middle;
    }
  }
  .btn.btn-link {
    color: $gray-color;
    margin-right: 15px;
  }
  .btn.btn-link:hover {
    color: #acb3c2;
  }
  .logo {
    margin-left: 30px;
    cursor: pointer;
    .svg-icon {
      width: 35px;
      text-align: center;
      background-color: #000;
      border-radius: 50%;
    }
    i{
      font-size: 30px;
      color: #619AFC;
      font-weight: 600;
    }
    i:hover{
      color: rgb(0, 0, 0)
    }
  }
  .cp_menu{
    margin-left: 100px;
    li{
      list-style: none;
      float: left;
      padding-left: 20px;
      padding-right: 20px;
      font-family: Arial, Helvetica, sans-serif;
      font-size: 15px;
      text-align: center;
      cursor: pointer;
      i{
        font-size: 25px;
        color: rgb(27, 26, 26)
      }
      div{
        position: absolute;
        width: 305px;
        height: auto;
        border: 1px solid #EDEDED;
        margin-left: -20px;
        display: none;
        background-color: #fff;
        z-index: 999;
        text-align: left;
        padding-bottom: 15px;
        span {
          font-size: 13px;
          padding: 5px; 
          font-family: Arial, Helvetica, sans-serif;
          text-align: center;
          margin-left: 10px;
          width: auto;
          height: auto;
          margin-top: 15px;
          display: -moz-inline-box;
          display: inline-block;
          img{
            width: 75px;
            height: 45px;
          }
        }
        span:hover{
          background-color: beige;
        }
      }
    }
    li:hover{
      background-color: antiquewhite;
      div{
        display: block;
      }
    }
  }
}
</style>
