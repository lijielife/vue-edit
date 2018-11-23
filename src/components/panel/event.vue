<template>
  <div class="panel-wrap" v-if="tab === 2">
    <Collapse v-model="defaultPanel">
      <Panel name="link" v-if="activeElement.connect != undefined || activeElement.connect.href !== undefined">
        链接
        <div slot="content" class="panel-row" >
          <div class="panel-label">链接至</div>
          <div class="panel-value">
            <input type="text" v-model="activeElement.connect.href" placeholder="绝对路径，以https://开头">
          </div>
        </div>
      </Panel>
      <Panel name="connect" v-if="activeElement.connect != undefined && activeElement.chart">
        组件交互
        <div class="panel-row" slot="content">
          <div class="panel-label">组件类型：</div>
          <div class="panel-value">
            <Select v-model="categorySelected" multiple style="width:200px" :style="categorySelectedWarning">
              <Option :value="item.category" :label="item.name" v-for="item in chartCategory" :key="item.name" class="category-list">
                  <div><Icon :type="item.icon" />{{item.name}}</div>
              </Option>
            </Select>
          </div>
        </div>
        <div class="panel-row" slot="content">
          <div class="panel-label">交互组件：</div>
          <div class="panel-value">
            <Select v-model="connectuid" multiple style="width:200px" :style="connectuidWarning" @on-change="_submitParams">
              <Option :value="layer.uuid" :label="layer.common.title" v-for="layer in layers" :key="layer.uuid" class="layer-list" v-if="(categorySelected == '' || categorySelected.indexOf(layer.common.category) != -1) && layer.uuid != activeElement.uuid">
                  <div><img :src="layer.common.thumbnail"/><span>{{layer.common.title}}</span></div>
              </Option>
            </Select>
          </div>
        </div>
        <div class="panel-row" slot="content">
          <div class="panel-label">交互属性：</div>
          <div class="panel-value">
            <Button type="primary" icon="ios-hammer" @click="_opensetting">设定交互参数</Button>
          </div>
        </div>
        <div class="panel-row" slot="content" v-if="activeElement.connect.connectconfig.enable">
          <div class="panel-label">已设参数：</div>
          <div class="panel-value">
            <ul>
              <li v-for="item in activeElement.connect.connectconfig.attrs" :key="item.key">{{item.key}} - {{item.name}}</li>
            </ul>
          </div>
        </div>
      </Panel>
    </Collapse>
    <Drawer title="交互属性设置" :closable="false" v-model="paramsetting" width="350">
      <div v-if="activeElement.chart && activeElement.chart.content != ''">
        <div class="checkedall">
          <Checkbox
              :indeterminate="indeterminate"
              :value="checkAll"
              @click.prevent.native="handleCheckAll">全选</Checkbox>
        </div>
        <CheckboxGroup v-model="checkAllGroup" @on-change="checkAllGroupChange"  class="params">
          <div v-for="param in params" :key="param.key"><Checkbox :label="param.key"></Checkbox> <input :disabled="!param.checked" style="width:150px" type="text" :param-key="param.key" v-model="param.name" placeholder="交互时传入组件参数名称"></div>
        </CheckboxGroup>
        <Button type="primary" @click="_submitParams" shape="circle" icon="md-done-all">确定</Button>
      </div>
      <div v-else>
        <font color="#E31D1A" style="font-size: 15px; letter-spacing: 1px;">{{warningmsg}}</font>
      </div>
    </Drawer>
  </div>
</template>

<script>

export default {
  data () {
    return {
      chartdata: [],
      paramsetting: false,
      defaultPanel: 'connect',
      categorySelected: [],
      connectuid: [],
      indeterminate: false,
      checkAll: true,
      checkAllGroup: [],
      params: [],
      warningmsg: '该组件尚未配置数据，请先为组件配置数据，再进行交互设置',
      chartCategory: [
        {
          icon: 'md-podium',
          name: '常规图表',
          category: 'common'
        },
        {
          icon: 'md-globe',
          name: '地图',
          category: 'map'
        },
        {
          icon: 'md-create',
          name: '文字',
          category: 'characters'
        }
      ],
      warningborder: 'border: 1px solid #E31D1A',
      categorySelectedWarning: '',
      connectuidWarning: ''
    }
  },
  props: ['activeElement', 'tab'],
  computed: {
    layers () {
      return this.$store.state.widgets
    },
    chartdatacomputed () {
      if (this.activeElement.chart) {
        this.chartdata = this.activeElement.chart.processData
        return this.activeElement.chart.processData
      }
      return this.chartdata
    }
  },
  methods: {
    // 交互属性设置-全选
    handleCheckAll () {
      if (this.indeterminate) {
        this.checkAll = false
      } else {
        this.checkAll = !this.checkAll
      }
      this.indeterminate = false
      if (this.checkAll) {
        this.checkAllGroup = []
        for (let i = 0; i < this.params.length; i++) {
          let record = this.params[i]
          this.checkAllGroup.push(record.key)
        }
      } else {
        this.checkAllGroup = []
      }
      this._changedparam()
    },
    // 交互属性设置-属性设置更改
    checkAllGroupChange (data) {
      if (data.length === this.params.length) {
        this.indeterminate = false
        this.checkAll = true
      } else if (data.length > 0) {
        this.indeterminate = true
        this.checkAll = false
      } else {
        this.indeterminate = false
        this.checkAll = false
      }
      this._changedparam()
    },
    // 交互属性设置-传输属性变更
    _changedparam () {
      let data = this.checkAllGroup
      for (let i = 0; i < this.params.length; i++) {
        if (data.length === 0) {
          let record = this.params[i]
          record.checked = false
        } else {
          for (let j = 0; j < data.length; j++) {
            let record = this.params[i]
            let checkdata = data[j]
            if (record.key === checkdata) {
              record.checked = true
              break
            } else {
              record.checked = false
            }
          }
        }
      }
    },
    // 初始化交互属性
    _initParams () {
      this.checkAllGroup = []
      this.params = []
      let chartconfig = this.activeElement.chart
      let dataType = chartconfig.contentsource
      if (dataType === 'json') {
        let dualData = chartconfig.processData
        let dualDatas = dualData.datas
        let dataConfig = dualDatas[dualDatas.length - 1]
        for (let key in dataConfig) {
          if (key === 'index' || key === 'level' || key === 'data' || key === 'parentcode' || key === 'parentname') {
            continue
          }
          this.params.push({
            key: key,
            checked: true,
            name: key
          })
          this.checkAllGroup.push(key)
        }
      }
    },
    // 保存属性更改
    _submitParams () {
      if (this.checkAllGroup.length > 0) {
        this.activeElement.connect.connectconfig.enable = true
        this.activeElement.connect.connectconfig.attrs = []
        this.activeElement.connect.connectconfig.components = []
        for (let i = 0; i < this.params.length; i++) {
          let record = this.params[i]
          if (record.checked) {
            this.activeElement.connect.connectconfig.attrs.push({
              key: record.key,
              name: record.name
            })
          }
        }
        let widgets = this.layers
        for (let i = 0; i < widgets.length; i++) {
          let widget = widgets[i]
          for (let j = 0; j < this.connectuid.length; j++) {
            if (widget.uuid === this.connectuid[j]) {
              this.activeElement.connect.connectconfig.components.push(widget)
            }
          }
        }
      } else {
        this.activeElement.connect.connectconfig.enable = false
        this.activeElement.connect.connectconfig.attrs = []
        this.activeElement.connect.connectconfig.components = []
      }
      this.paramsetting = false
    },
    _opensetting () {
      let flag = true
      if (this.categorySelected.length === 0) {
        this.categorySelectedWarning = this.warningborder
        flag = false
      }
      if (this.connectuid.length === 0) {
        this.connectuidWarning = this.warningborder
        flag = false
      }
      if (flag) {
        this.paramsetting = true
      }
    }
  },
  watch: {
    'chartdatacomputed': function (newval, oldval) {
      if (newval !== oldval && newval.category) {
        this._initParams()
      }
    },
    'categorySelected': function (newval, oldval) {
      if (newval !== oldval) {
        this.categorySelectedWarning = ''
      }
    },
    'connectuid': function (newval, oldval) {
      if (newval !== oldval) {
        this.connectuidWarning = ''
      }
    }
  }
}
</script>
<style lang="scss">
@import '../../_variables.scss';
.category-list {
  i{
    margin-right: 10px;
  }
  div{
    font-size: 15px;
    padding: 2px;
    letter-spacing: 1px;
  }
}
.layer-list {
  padding: 3px;
  div {
    text-align: left;
    cursor: pointer;
    white-space: nowrap;
    padding: 5px 0px 0px 2px;
    &:hover {
      background: #f5f5f5;
    }
    &.layer-active {
      color: $light-color;
      background: $primary-color;
    }
    img {
      height: 25px;
    }
    span {
      display: -moz-inline-box;
      display: inline-block;
      height: 25px;
      line-height: 25px;
      overflow: hidden;
      padding-left: 5px;
      font-size: 10px;
      width: 64px;
      text-overflow: ellipsis; 
      -o-text-overflow: ellipsis;
      white-space:nowrap;
    }
  }
}
.params{
  border-bottom: 1px solid #ECECEC;
  padding-bottom: 10px;
  margin-bottom: 10px;
  div{
    height: 30px;
    margin-bottom: 10px;
    label {
      float: left;
      width: 130px;
      font-size: 15px;
    }
    input {
      float: left;
    }
  }
}
.checkedall{
  border-bottom: 1px solid #ECECEC;
  padding-bottom: 10px;
  margin-bottom: 10px;
  label {
    font-size: 16px;
    letter-spacing: 1px;
    font-weight: 600;
  }
}
</style>