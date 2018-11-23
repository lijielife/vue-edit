<template>
  <div class="mydatas">
    <Form :model="formItem" :label-width="80">
      <FormItem label="分类：">
        <Select v-model="formItem.select1">
          <Option value="beijing">我是名字有点长的分类1</Option>
          <Option value="shanghai">我是名字有点长的分类1</Option>
          <Option value="shenzhen">我是名字有点长的分类1</Option>
        </Select>
      </FormItem>
      <FormItem label="主题：">
        <Select v-model="formItem.select2">
          <Option value="beijing">我是名字有点长的主题2</Option>
          <Option value="shanghai">我是名字有点长的主题2</Option>
          <Option value="shenzhen">我是名字有点长的主题2</Option>
        </Select>
      </FormItem>
      <FormItem>
          <Button class="iconfont" type="primary">搜一下</Button>
      </FormItem>
    </Form>
    <div class="fourBlock">
      <ul>
        <li>
          <p class="themes">分类1</p>
          <p class="themes_num"><span>10</span>个</p>
        </li>
        <li>
          <p class="themes">名字长的分类2</p>
          <p class="themes_num"><span>7</span>个</p>
        </li>
        <li>
          <p class="themes">分类3</p>
          <p class="themes_num"><span>5</span>个</p>
        </li>
        <li>
          <p class="themes">名字长的分类4</p>
          <p class="themes_num"><span>0</span>个</p>
        </li>
      </ul>
    </div>
    <div class="theme_contents">
      <Table border :columns="columns" :data="datas"></Table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyDatas',
  data () {
    return {
      formItem: {
        select1: '',
        select2: ''
      },
      columns: [
        {
          title: '姓名',
          key: 'name',
          render: (h, params) => {
            return h('div', [
              h('Icon', {
                props: {
                  type: 'person'
                }
              }),
              h('strong', params.row.name)
            ])
          }
        },
        {
          title: '年龄',
          key: 'age'
        },
        {
          title: '地址',
          key: 'address'
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.show(params.index)
                  }
                }
              }, 'View'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.remove(params.index)
                  }
                }
              }, 'Delete')
            ])
          }
        }
      ],
      datas: [
        {
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park'
        },
        {
          name: 'Jim Green',
          age: 24,
          address: 'London No. 1 Lake Park'
        },
        {
          name: 'Joe Black',
          age: 30,
          address: 'Sydney No. 1 Lake Park'
        },
        {
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park'
        }
      ]
    }
  },
  methods: {
    show (index) {
      this.$Modal.info({
        title: 'User Info',
        content: `Name：${this.datas[index].name}<br>Age：${this.datas[index].age}<br>Address：${this.datas[index].address}`
      })
    },
    remove (index) {
      this.datas.splice(index, 1)
    }
  }
}
</script>

<style scoped>
.mydatas{
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px 0;
}
.ivu-form{
  display: flex;
  /* flex-wrap: wrap; */
}
.ivu-form-item{
  width: 40%;
}
.mydatas>>>.ivu-form .ivu-form-item-label{
  font-size: 14px;
  color: #333;
  padding: 14px 12px 10px 0;
}
.mydatas>>>.ivu-select-single .ivu-select-selection{
  height: 42px;
  background: #E3E3E3;
  border-color: transparent;
  box-shadow: none;
}
.mydatas>>>.ivu-select-single .ivu-select-selection .ivu-select-placeholder, .mydatas>>>.ivu-select-single .ivu-select-selection .ivu-select-selected-value{
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  color: #000;
}
.mydatas>>>.ivu-form-item-content{  
  line-height: 42px;
  font-size: 14px;
}
.ivu-btn{
  font-size: 14px;
  padding: 9px 15px 8px 45px;
  background: #3780FC;
  border-color: transparent;
  box-shadow: none;
}
.ivu-btn:after{
  content: '\e60e';
  position: absolute;
  left: 16px;
  font-size: 18px;
  top: 10px;
}
.fourBlock{
  margin-top: 20px;
}
.fourBlock ul{
  display: flex;
}
.fourBlock li{
  width: 22.5%;
  height: 150px;
  margin-left: 2%;
  background: #fff;
  box-shadow: 0px 0 8px 0px rgba(179,179,179,0.29);
  border-radius: 4px;
}
.themes{
  font-size: 18px;
  color: #000;
  padding: 20px 0 0 20px;
}
.themes_num{
  font-size: 16px;
  text-align: center;
  margin-top: 15px;
}
.themes_num span{
  font-size: 40px;
  color: #3780FC;
  padding-right: 5px;
}
.theme_contents{
  min-height: 100px;
  background: #fff;
  box-shadow: 0px 0 8px 0px rgba(179,179,179,0.29);
  border-radius: 4px;
  margin-top: 20px;
  padding: 30px 20px;
}
.theme_contents>>>.ivu-table{
  font-size: 16px;
  color: #5D5D5D;
}
</style>
