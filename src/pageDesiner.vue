<template>
  <div id="app">
    <vue-page-designer :value="value" @save="handleSave" :upload="handleUpload" :uploadOption="uploadOption" />
  </div>
</template>

<script>
import vuePageDesigner from './dashboard.js'
import store from './store'
// import EventBus from '../src/utils/EventBus.js'
export default {
  name: 'pageDesiner',
  store,
  data () {
    return {
      value: null,
      uploadOption: {
        url: 'https://jsonplaceholder.typicode.com/photos'
      }
    }
  },

  created () {
    // let data = window.localStorage.getItem('vpd-data')
    // if (data) {
    //   this.value = JSON.parse(data)
    // }
  },

  mounted () {
    // 浏览器后退事件
    if (window.history && window.history.pushState) {
      history.pushState(null, null, document.URL)
      window.addEventListener('popstate', this._broswerBack, false)
    }
    this.handleRefreshPage()
    // 获取cookie下面的动画存储数据
    // if (this.getCookie('vpd-data-cookie')) {
    //   let Animation = JSON.parse(this.getCookie('vpd-data-cookie')).animation
    //   console.log('动画库：', Animation)
    //   this.$store.state.animation = Animation
    //   console.log(this.$store.state.animation, 333)
    // }
  },

  destroyed () {
    this.handleRefreshPage()
    window.removeEventListener('popstate', this._broswerBack, false)
  },

  methods: {
    // 网页关闭、刷新提示
    handleRefreshPage () {
      // console.log(this.$route.fullPath, this.$store.state.widgets.length, 333)
      if (this.$route.fullPath === '/pagedesiner') {
        window.onbeforeunload = (e) => {
          e = e || window.event
          if (e) {
            e.returnValue = '关闭提示' // 浏览器默认样式修改不掉
          }
          return '关闭提示'
        }
      } else {
        window.onbeforeunload = null
      }
    },
    _broswerBack () {
      if (this.$store.state.widgets.length === 0) {
        this.$router.push({
          name: 'SelectTemp'
        })
      } else {
        this.$Modal.confirm({
          title: '返回上一页',
          content: '返回上一页之前是否保存数据？',
          onOk: () => {
            this.$store.state.widgets = []
            this.$store.dispatch('save')
            this.$Message.info('数据保存，后退成功！')
            this.$router.push({
              name: 'SelectTemp'
            })
          },
          onCancel: () => {
            this.$Message.info('取消后退!')
          }
        })
      }
    },
    handleSave (data) {
      console.log('saving:', data)
      window.localStorage.setItem('vpd-data', JSON.stringify(data))
      this.setCookie('vpd-data-cookie', JSON.stringify(data), 2)
    },
    handleUpload (files) {
      console.log('uploading:', files)
      return new Promise(resolve => {
        resolve({
          files: files,
          status: 200
        })
      })
    },
    setCookie: function (cname, cvalue, exdays) {
      var d = new Date()
      d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
      var expires = 'expires=' + d.toUTCString()
      console.info(cname + '=' + cvalue + '; ' + expires)
      document.cookie = cname + '=' + cvalue + '; ' + expires
      console.info(document.cookie)
    },
    getCookie (cname) {
      var name = cname + '='
      var ca = document.cookie.split(';')
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim()
        if (c.indexOf(name) === 0) return c.substring(name.length, c.length)
      }
      return ''
    }
  },
  components: {
    vuePageDesigner
  }
}
</script>

<style scoped>
#app {
  height: 100%;
}
</style>
