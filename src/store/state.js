export default {
  top: 0,                 // 添加元件的初始纵坐标
  zoom: 100,              // 画布缩放百分比
  type: 'page',           // 选中元素类型
  index: -1,              // 选中元素索引
  uuid: null,             // 选中元素uuid
  counter: 0,             // 容器副本命名时避免重名所用的计数器

  originX: 0,             // 选中元件的横向初始值
  originY: 0,             // 选中元件的纵向初始值
  rotate: 0,              // 选中元件的旋转度
  startX: 0,              // 鼠标摁下时的横坐标
  startY: 0,              // 鼠标摁下时的纵坐标
  moving: false,          // 是否正在移动元件（参考线仅在移动元件时显示）
  datasX: [],           // X轴柱状图数据内容
  datasY: [],           // Y轴柱状图数据内容

  animation: [],          // 动画库
  playState: false,       // 动画播放状态

  defaultWidthRate: 1,   // 页面缩放宽度比例（发布页面时使用，默认为1）
  defaultHeightRate: 1,  // 页面缩放高度比例（发布页面时使用，默认为1）

  activeElement: {},      // 选中对象，要么是元件，要么是页面
  page: {
    page: true,
    title: '测试页面',    // 页面 title
    height: 1500,         // 画布高度
    width: 1000,          // 画布宽度
    endTime: new Date(),   // 截止日期
    backgroundColor: '#fff'
  },
  widgets: []            // 元件
}
