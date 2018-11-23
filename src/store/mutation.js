const generate = require('nanoid/generate')

export default {
  // 选中元件与取消选中
  select (state, payload) {
    state.uuid = payload.uuid
    if (payload.uuid === -1) {
      state.activeElement = state.page
      state.type = 'page'
    } else {
      let widget = state.widgets.find(w => w.uuid === payload.uuid)
      state.activeElement = widget
      state.type = widget.type
      state.activeElement.animationName = ''
    }
  },

  // 设置 mousemove 操作的初始值
  initmove (state, payload) {
    state.startX = payload.startX
    state.startY = payload.startY
    state.originX = payload.originX
    state.originY = payload.originY
    state.moving = true
    // console.log(payload)
  },

  // 元件移动结束
  stopmove (state) {
    state.moving = false
  },

  // 元件移动结束
  stopRotate (state) {
    state.moving = false
  },

  // 移动元件
  move (state, payload) {
    var target = state.activeElement.common
    var dx = payload.x - state.startX
    var dy = payload.y - state.startY
    var left = state.originX + Math.floor(dx * 100 / state.zoom)
    var top = state.originY + Math.floor(dy * 100 / state.zoom)

    target.position.left = left > 0 ? left : 0
    target.position.top = top > 0 ? top : 0
  },

  // 旋转元件
  rotate (state, payload) {
    var target = state.activeElement.common
    var dx = payload.x - state.startX
    // var dy = payload.y - state.startY
    // 鼠标按下去的x轴坐标位置减去鼠标左右移动的x值正负来确定旋转角度的加减
    if (dx < 0) {
      target.rotate += 1
    } else {
      target.rotate -= 1
    }
  },

  // 调整元件尺寸
  resize (state, payload) {
    var dx = payload.x - state.startX
    var dy = payload.y - state.startY
    var value
    var target = state.activeElement.common

    if (payload.type === 'right') {
      value = state.originX + Math.floor(dx * 100 / state.zoom)
      target.size.width = value > 10 ? value : 10
      return
    }

    if (payload.type === 'down') {
      value = state.originX + Math.floor(dy * 100 / state.zoom)
      target.size.height = value > 10 ? value : 10
      return
    }

    if (payload.type === 'left') {
      var left = state.originX + Math.floor(dx * 100 / state.zoom)
      var width = state.originY - Math.floor(dx * 100 / state.zoom)
      target.position.left = left > 0 ? left : 0
      target.size.width = width > 10 ? width : 10
      return
    }

    if (payload.type === 'up') {
      var top = state.originX + Math.floor(dy * 100 / state.zoom)
      var height = state.originY - Math.floor(dy * 100 / state.zoom)
      target.position.top = top > 0 ? top : 0
      target.size.height = height > 10 ? height : 10
    }
  },

  // 复制元件
  copy (state, payload) {
    if (state.type !== 'page') {
      var copy = Object.assign({}, state.activeElement, {top: state.top, uuid: generate('1234567890abcdef', 10)})

      // 由于容器的名称必须是唯一的，故复制容器需作处理
      if (state.activeElement.isContainer) {
        var name = state.activeElement.name
        if (name) {
          // 设置容器副本的名称
          var copyName = name.split('-')[0] + '-' + state.counter
          copy.name = copyName

          // 复制容器内的图片和文本
          for (var i = 0, len = state.widgets.length; i < len; i++) {
            if (state.widgets[i].belong === name) {
              state.widgets.push(
                Object.assign({}, state.widgets[i], { belong: copyName })
              )
            }
          }

          state.counter += 1
        }
      }

      state.widgets.push(copy)
    }
  },

  // 更新元件初始 top 值
  updateSrollTop (state, top) {
    state.top = top
  },

  // 页面缩放
  zoom (state, val) {
    state.zoom = val
  },

  // 初始化选中对象
  initActive (state) {
    state.activeElement = state.page
  },

  // 删除选中元件
  delete (state) {
    var type = state.type
    if (type === 'page') return

    // 如果删除的是容器，须将内部元件一并删除
    if (state.activeElement.isContainer) {
      var name = state.activeElement.name

      for (var i = 0; i < state.widgets.length; i++) {
        if (state.widgets[i].belong === name) {
          state.widgets.splice(i, 1)
        }
      }
    }

    // 删除元件
    // console.log(state.activeElement.uuid)
    if (state.widgets.length !== 0) {
      for (var k = 0; k < state.widgets.length; k++) {
        if (state.widgets[k].uuid === state.activeElement.uuid) {
          state.widgets.splice(k, 1)
          state.activeElement = state.page
          // state.type = 'page'
          state.uuid = -1
        }
      }
    }
  },

  // 添加组件
  addWidget (state, { data: data = null, item }) {
    let def = { top: state.top, uuid: generate('1234567890abcdef', 10), defaultRate: state.defaultRate }
    let setting = JSON.parse(JSON.stringify(item.setting))
    if (setting.isContainer) {
      setting.name = def.uuid
    }
    if (data) {
      data.forEach(function (val) {
        state.widgets.push(Object.assign(setting, val, def))
      })
    } else {
      state.widgets.push(Object.assign(setting, def))
    }
  },

  // 替换图片
  replaceImage (state, payload) {
    state.activeElement.width = payload[0].width
    state.activeElement.url = payload[0].url
  },

  // 添加screen背景图
  addViewportBackPic (state, payload) {
    state.page.backPic = payload[0].url
    state.page.backPicUrl = payload[0].src
  },

  // 删除screen背景图
  deleteViewportBackPic (state) {
    state.page.backPic = ''
  },

  // 添加容器背景图
  addContainerBackPic (state, payload) {
    state.activeElement.common.backPic = payload[0].url
    state.activeElement.common.backPicUrl = payload[0].src
    // state.activeElement.width = payload[0].width
    // state.activeElement.height = payload[0].height
  },

  // 添加背景图
  addBackPic (state, payload) {
    state.activeElement.common.backPic = payload[0].url
    state.activeElement.common.backPicUrl = payload[0].src
  },

  // 添加动画
  // addAnimation (state) {
  //   state.animation.push({
  //     name: '',
  //     duration: 3,
  //     delay: 0,
  //     iteration: 1,
  //     timing: 'linear',
  //     direction: 'normal',
  //     fill: 'none',
  //     keyframes: [
  //       {
  //         stop: 0,
  //         css: ''
  //       }
  //     ]
  //   })
  // },

  // // 为动画添加 keyframe
  // addkeyframe (state, name) {
  //   state.animation.map(val => {
  //     if (val.name === name) {
  //       val.keyframes.push({
  //         stop: 0,
  //         css: ''
  //       })
  //     }
  //   })
  // },

  // 动画的播放与停止(全局的所有组件动画播放控制，所有弃用!)
  // setAnimation (state, status) {
  //   state.playState = status
  // },

  // 更新数据
  updateData (state, {uuid, key, value}) {
    let widget = state.widgets.find(w => w.uuid === uuid)
    if (undefined !== widget) {
      if (key.indexOf('.') !== -1) {
        let keyary = key.split('.')
        let config = widget
        let keylength = keyary.length
        for (let i = 0; i < keylength; i++) {
          let attr = keyary[i]
          if (i === keylength - 1) {
            config[attr] = value
          } else {
            config = config[attr]
          }
        }
      } else {
        widget[key] = value
      }
    }
  }
}
