<template>
  <div class="selecttemp">
    <page-home></page-home>
    <div class="chooseTmpl">
      <Layout>
        <Sider class="sideCols" hide-trigger :style="{background: '#fff', width: '360px', maxWidth: '360px', flex: '0 0 360px', overflow: 'auto'}">
          <ul>
            <li
              class="templ_child"
              :class="Index === index ? 'active_child' : ''"
              @click="leftClick(index, data.ImgUrl)"
              v-for="(data, index) in datas"
              :key="index"
            >
              <img v-lazy="data.ImgUrl" />
              <div class="templ_title">
                <p class="title_icon iconfont">{{ data.title }}</p>
                <p>{{ data.size }}</p>
                <p>{{ data.piex }}</p>
              </div>
            </li>
          </ul>
        </Sider>
        <div class="templ_example">
          <p>选择模板</p>
          <ul>
            <li class="example_child">
              <img @click="popLayer" ref="imgsSrc" src="../../assets/images/example0.png" />
            </li>
          </ul>
        </div>
      </Layout>
    </div>
  </div>
</template>

<script>
import PageHome from '../Home'
export default {
  name: 'SelectTemp',
  components: {
    PageHome
  },
  data () {
    return {
      value: '',
      Index: 0, // 默认显示当前项为空白模板
      datas: [
        {
          ImgUrl: require('../../assets/images/example0.png'),
          title: '空白',
          size: '16:9',
          piex: '1920x1080px'
        },
        {
          ImgUrl: require('../../assets/images/example1.png'),
          title: '货运指数图例',
          size: '16:9',
          piex: '1920x1080px'
        },
        {
          ImgUrl: require('../../assets/images/example2.png'),
          title: '全国空气质量X',
          size: '16:9',
          piex: '1920x1080px'
        },
        {
          ImgUrl: require('../../assets/images/example3.png'),
          title: '2018双十一天猫',
          size: '16:9',
          piex: '1920x1080px'
        },
        {
          ImgUrl: require('../../assets/images/example1.png'),
          title: '货运指数图例',
          size: '16:9',
          piex: '1920x1080px'
        },
        {
          ImgUrl: require('../../assets/images/example2.png'),
          title: '全国空气质量X',
          size: '16:9',
          piex: '1920x1080px'
        },
        {
          ImgUrl: require('../../assets/images/example3.png'),
          title: '2018双十一天猫',
          size: '16:9',
          piex: '1920x1080px'
        },
        {
          ImgUrl: require('../../assets/images/example1.png'),
          title: '货运指数参照图例',
          size: '16:9',
          piex: '1920x1080px'
        },
        {
          ImgUrl: require('../../assets/images/example2.png'),
          title: '全国空气质量',
          size: '16:9',
          piex: '1920x1080px'
        },
        {
          ImgUrl: require('../../assets/images/example3.png'),
          title: '2018双十一天猫',
          size: '16:9',
          piex: '1920x1080px'
        }
      ]
    }
  },
  methods: {
    leftClick (index, Src) {
      this.Index = index
      this.$refs.imgsSrc.src = Src
      // 添加延时执行动画效果
      if (this.Index === index) {
        this.$refs.imgsSrc.className = ''
        setTimeout(() => {
          this.$refs.imgsSrc.className = ['animated zoomIn']
        }, 10)
      }
    },
    // 点击右侧大图出现弹层添加标题及创建模板
    popLayer () {
      // this.value = ''
      this.$Modal.confirm({
        title: '请输入创建模板标题',
        okText: '创建',
        render: (h) => {
          return h('Input', {
            props: {
              value: this.value,
              autofocus: true,
              placeholder: '请输入创建模板标题'
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
            this.$router.push({
              name: 'pageDesiner',
              params: {val: this.value}
            })
          } else {
            this.$Message.info('未输入创建模板名称，暂不创建!')
          }
        },
        onCancel: () => {
          this.$Message.info('取消创建!')
        }
      })
    }
  }
}
</script>

<style scoped>
.templ_child{
  display: flex;
  justify-content: center;
  height: 100px;
  padding: 0 10px;
  margin-top: 20px;
  cursor: pointer;
  color: #000;
  transition: all .3s;
}
.templ_child img{
  width: 150px;
  background: #324f81;
}
.templ_title{
  flex: 1;
  padding-left: 5px;
  font-size: 15px;
}
.title_icon:after{
  content: '\e615';
  padding-left: 5px;
  opacity: 0;
  color: #3780FC;
}
.active_child{
  color: #3780FC;
  padding-left: 20px;
}
.active_child .title_icon:after{
  opacity: 1;
}
/* .templ_child:hover{
  color: #3780FC;
  padding-left: 20px;
}
.templ_child:hover .title_icon:after{
  opacity: 1;
} */
.templ_example{
  flex: 1;
  padding: 20px;
}
.templ_example p{
  padding-bottom: 10px;
  text-align: center;
  font-size: 16px;
  color: #000;
}
.example_child{
  text-align: center;
}
.example_child img{
  width: 100%;
  max-width: 90%;
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
}
@media screen and (min-width: 1151px) and (max-width: 1280px)  {
  .sideCols{
    height: 88vh;
  }
}
@media screen and (min-width: 1024px) and (max-width: 1150px)  {
  .sideCols{
    height: 87.5vh;
  }
}
</style>
