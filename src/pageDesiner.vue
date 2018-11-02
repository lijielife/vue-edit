<template>
  <div id="app">
    <vue-page-designer :value="value" @save="handleSave" :upload="handleUpload" :uploadOption="uploadOption" />
  </div>
</template>

<script>
import vuePageDesigner from './dashboard.js'
import store from './store'
export default {
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
    // 获取cookie下面的动画存储数据
    // if (this.getCookie('vpd-data-cookie')) {
    //   let Animation = JSON.parse(this.getCookie('vpd-data-cookie')).animation
    //   console.log('动画库：', Animation)
    //   this.$store.state.animation = Animation
    //   console.log(this.$store.state.animation, 333)
    // }
  },

  methods: {
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

<style>
#app {
  height: 100%;
}
</style>
