<template>
  <div class="mylibrarys" :style="{overflow: 'auto'}">
    <div style="max-width: 1200px;margin: 0 auto;">
      <div class="librarys_item" v-for="data in datas" :key="data.name">
        <p>{{ data.name }}<span>{{ data.words }}</span></p>
        <ul>
          <li v-for="(item, index) in data.chidlren" :key="index">
            <h3>{{ item.title }}</h3>
            <img :src="item.ImgUrl" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyLibrarys',
  data () {
    return {
      datas: [
        {
          name: '折线图',
          words: 'Line',
          chidlren: [
            {
              title: '折线图标题折线图标题1' + Math.floor(Math.random() * 10),
              ImgUrl: require('../../assets/images/example_line1.jpg')
            },
            {
              title: '折线图标题折线图标题1' + Math.floor(Math.random() * 10),
              ImgUrl: require('../../assets/images/example_line2.jpg')
            },
            {
              title: '折线图标题折线图标题1' + Math.floor(Math.random() * 10),
              ImgUrl: require('../../assets/images/example_line1.jpg')
            },
            {
              title: '折线图标题折线图标题1' + Math.floor(Math.random() * 10),
              ImgUrl: require('../../assets/images/example_line2.jpg')
            },
            {
              title: '折线图标题折线图标题1' + Math.floor(Math.random() * 10),
              ImgUrl: require('../../assets/images/example_line1.jpg')
            }
          ]
        },
        {
          name: '柱状图图',
          words: 'Bar',
          chidlren: [
            {
              title: '折线图标题折线图标题1' + Math.floor(Math.random() * 10),
              ImgUrl: require('../../assets/images/example_line1.jpg')
            },
            {
              title: '折线图标题折线图标题1' + Math.floor(Math.random() * 10),
              ImgUrl: require('../../assets/images/example_line2.jpg')
            },
            {
              title: '折线图标题折线图标题1' + Math.floor(Math.random() * 10),
              ImgUrl: require('../../assets/images/example_line1.jpg')
            }
          ]
        },
        {
          name: '散点图',
          words: 'Scatter',
          chidlren: [
            {
              title: '折线图标题折线图标题1' + Math.floor(Math.random() * 10),
              ImgUrl: require('../../assets/images/example_line1.jpg')
            },
            {
              title: '折线图标题折线图标题1' + Math.floor(Math.random() * 10),
              ImgUrl: require('../../assets/images/example_line2.jpg')
            },
            {
              title: '折线图标题折线图标题1' + Math.floor(Math.random() * 10),
              ImgUrl: require('../../assets/images/example_line1.jpg')
            },
            {
              title: '折线图标题折线图标题1' + Math.floor(Math.random() * 10),
              ImgUrl: require('../../assets/images/example_line1.jpg')
            }
          ]
        }
      ]
    }
  }
}
</script>

<style scoped>
.mylibrarys{
  width: 100%;
  height: 91.5vh;
  padding-top: 30px;
}
.librarys_item {
  padding: 0 5px;
  padding-top: 20px;
}
.librarys_item p{
  font-size: 24px;
  color: #666;
  margin-bottom: 20px;
}
.librarys_item p span{
  padding-left: 10px;
  font-size: 20px;
  color: #999;
}
.librarys_item ul{
  display: flex;
  flex-wrap: wrap;
}
.librarys_item li{
  width: 23%;
  min-height: 234px;
  margin-bottom: 2.66%;
  margin-right: 2.66%;
  padding: 8px;
  box-shadow: 0 0 5px #999;
  border-radius: 5px;
  background: #f9f9f9;
  cursor: pointer;
  transition: all .3s;
}
.librarys_item li:nth-child(4n){
  margin-right: 0;
}
.librarys_item li h3{
  width: 100%;
  margin-bottom: 10px;
  font-size: 16px;
  color: #293c55;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: normal;
}
.librarys_item li img{
  width: 100%;
}
.librarys_item li:hover{
  box-shadow: 0 0 15px #666;
  /* transform: rotate(360deg); */
}
@media screen and (min-width: 1440px) and (max-width: 1679px) {
  .mylibrarys{
    height: 89.5vh;
  }
}
@media screen and (min-width: 1151px) and (max-width: 1280px)  {
  .mylibrarys{
    height: 88vh;
  }
}
@media screen and (min-width: 1024px) and (max-width: 1150px)  {
  .mylibrarys{
    height: 87.5vh;
  }
}
</style>
