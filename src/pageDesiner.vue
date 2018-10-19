<template>
  <div id="app">
    <vue-page-designer :value="value" @save="handleSave" :upload="handleUpload" :uploadOption="uploadOption" />
  </div>
</template>

<script>
import vuePageDesigner from './dashboard.js'

export default {
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
