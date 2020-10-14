<template>
  <!-- 任务管理 -->
  <div class="ren-wu-guan-li">
    <header class="rwgl-header">订单管理 \ 任务审核</header>
    <div class="ul-outer">
      <div class="c-ul">
        <div class="c-rwgl-header-btns">
          <div class="left">
            <el-select v-model="selectValue_fans" placeholder="请选择">
              <el-option label="粉丝昵称" :value="1"></el-option>
              <el-option label="粉丝openid" :value="2"></el-option>
            </el-select>
            <el-input
              style="width:200px;margin:0 16px 0 0px"
              placeholder="请输入内容"
              v-model="searchValue_fans"
            ></el-input>
            <el-select v-model="selectValue_status" placeholder="请选择">
              <el-option label="合格" :value="1"></el-option>
              <el-option label="不合格" :value="2"></el-option>
              <el-option label="未审核" :value="3"></el-option>
            </el-select>
            <el-button type="primary" style="margin:0 8px 0 16px" @click="search">查询</el-button>
            <el-button @click="reset">重置</el-button>
          </div>
          <div class="right">
            <el-button type="primary" style="marginRight: 8px">聚焦模式</el-button>
            <el-button
              type="primary"
              style="marginRight: 8px"
              @click="selectAll"
              v-show="btnVisible"
            >本页全选</el-button>
            <el-button
              type="danger"
              style="marginRight: 8px"
              @click="cancelSelectAll"
              v-show="!btnVisible"
            >取消全选</el-button>
            <el-button type="primary" style="marginRight: 8px">审核通过</el-button>
            <el-button type="primary">释放</el-button>
          </div>
        </div>
        <ul class="task-ui">
          <li class="task-li" v-for="(item,index) in listData" :key="index">
            <div class="task-li-top" style="marginBottom:10px">
              <el-checkbox
                @change="(a)=> checkboxChange(a,index)"
                v-model="checkboxValueList[index]"
              ></el-checkbox>
              <img :src="item.t_img" />
              <div class="task-li-top-right">
                <p>{{item.name}}</p>
                <el-button type="primary" size="small" @click="copy(item.openid)">复制openid</el-button>
              </div>
            </div>
            <div class="task-li-mid" style="marginBottom:10px">
              <p>提交：{{item.time.start}}</p>
              <p>审核：{{item.time.end}}</p>
            </div>
            <div class="task-li-btm" style="marginBottom:10px">
              <el-button-group>
                <el-button size="small" round>合格</el-button>
                <el-button size="small" round>不合格</el-button>
              </el-button-group>
            </div>
            <div class="task-li-img">
              <img src="../../../assets/imgs/a.jpg" alt />
            </div>
          </li>
        </ul>
        <div class="c-pagination">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-sizes="[5, 10, 20]"
            :page-size="pageSize"
            layout="sizes, prev, pager, next,jumper"
            :total="total"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "renWuGuanLi",
  data() {
    return {
      selectValue_fans: 1,
      searchValue_fans: '',
      selectValue_status: 1,

      currentPage: 1,
      pageSize: 5,
      total: 10,

      listData: [
        {
          id: 1,
          t_img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1602608266924&di=dad8d168566413442b66826961ae5100&imgtype=0&src=http%3A%2F%2Fa0.att.hudong.com%2F18%2F56%2F14300000958002128488569856508.jpg',
          name: '跃然我心',
          openid: 111,
          time: {
            start: '2020-10-10 20:03:04',
            end: '2020-10-10 20:03:04'
          },
        },
        {
          id: 2,
          t_img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1602608266924&di=dad8d168566413442b66826961ae5100&imgtype=0&src=http%3A%2F%2Fa0.att.hudong.com%2F18%2F56%2F14300000958002128488569856508.jpg',
          name: '跃然我心',
          openid: 1,
          time: {
            start: '2020-10-10 20:03:04',
            end: '2020-10-10 20:03:04'
          },
        },
        {
          id: 3,
          t_img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1602608266924&di=dad8d168566413442b66826961ae5100&imgtype=0&src=http%3A%2F%2Fa0.att.hudong.com%2F18%2F56%2F14300000958002128488569856508.jpg',
          name: '跃然我心',
          openid: 1,
          time: {
            start: '2020-10-10 20:03:04',
            end: '2020-10-10 20:03:04'
          },
        },
        {
          id: 4,
          t_img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1602608266924&di=dad8d168566413442b66826961ae5100&imgtype=0&src=http%3A%2F%2Fa0.att.hudong.com%2F18%2F56%2F14300000958002128488569856508.jpg',
          name: '跃然我心',
          openid: 1,
          time: {
            start: '2020-10-10 20:03:04',
            end: '2020-10-10 20:03:04'
          },
        },
        {
          id: 5,
          t_img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1602608266924&di=dad8d168566413442b66826961ae5100&imgtype=0&src=http%3A%2F%2Fa0.att.hudong.com%2F18%2F56%2F14300000958002128488569856508.jpg',
          name: '跃然我心',
          openid: 1,
          time: {
            start: '2020-10-10 20:03:04',
            end: '2020-10-10 20:03:04'
          },
        },
        {
          id: 6,
          t_img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1602608266924&di=dad8d168566413442b66826961ae5100&imgtype=0&src=http%3A%2F%2Fa0.att.hudong.com%2F18%2F56%2F14300000958002128488569856508.jpg',
          name: '跃然我心',
          openid: 1,
          time: {
            start: '2020-10-10 20:03:04',
            end: '2020-10-10 20:03:04'
          },
        },
        {
          id: 7,
          t_img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1602608266924&di=dad8d168566413442b66826961ae5100&imgtype=0&src=http%3A%2F%2Fa0.att.hudong.com%2F18%2F56%2F14300000958002128488569856508.jpg',
          name: '跃然我心',
          openid: 1,
          time: {
            start: '2020-10-10 20:03:04',
            end: '2020-10-10 20:03:04'
          },
        }
      ],
      checkboxValueList: [],
      // 选中的数据
      selectedListData: [],
      // ui
      btnVisible: true,
    }
  },
  methods: {
    // 查询
    search() {
    },
    reset() {
      this.selectValue_fans = 1
      this.searchValue_fans = ''
      this.selectValue_status = 1
    },
    // 全选
    selectAll() {
      this.checkboxValueList.forEach((item, index) => {
        this.$set(this.checkboxValueList, index, true)
      })
      // this.selectedListData = cloneDeep(this.listData)
      this.btnVisible = false
    },
    // 取消全选
    cancelSelectAll() {
      this.checkboxValueList.forEach((item, index) => {
        this.$set(this.checkboxValueList, index, false)
      })
      this.selectedListData = []
      this.btnVisible = true
    },
    checkboxChange(val, index) {
      console.log(val, index)
      if (val) {
        this.selectedListData.push(this.listData[index])
      } else {
        let id = this.listData[index].id
        let index = this.selectedListData.findIndex(item => {
          return item.id === id
        })
        this.selectedListData = remove(this.selectedListData, (item, idx) => {
          return idx === indx
        })
      }
      console.log(this.selectedListData)
    },
    handleSizeChange(val) {
      console.log(val)
      this.pageSize = val
      // 查询数据
    },
    handleCurrentChange(val) {
      console.log(val)
      console.log(this.currentPage)
      // 查询数据
    },
    async getListData() {

    },
    copy(value) {
      var currentFocus = document.activeElement;// 保存当前活动节点

      var input = document.createElement('input');// 创建一个input标签
      document.body.appendChild(input);// 把标签添加给body
      input.style.opacity = 0;//设置input标签设置为透明(不可见)
      input.value = value;// 把需要复制的值放到input上

      // 记录当前滚动位置, 因为添加节点并选中的时候会影响页面滚动
      var scrollY = window.scrollY;

      input.focus();// input节点获取焦点
      input.setSelectionRange(0, input.value.length);// 选中input框中的所有文字

      var res = document.execCommand('copy', true);// 复制文字并获取结果

      currentFocus.focus();// 之前活动节点获得焦点
      document.body.removeChild(input);// 删除添加的input节点

      // 页面滚动到之前位置
      window.scrollTo(0, scrollY);

      return res;// 返回操作结果
    }
  },
  async created() {
    this.getListData()
    // 初始化 checkboxValueList
    this.listData.forEach(item => {
      this.checkboxValueList.push(false)
    })
  },
}
</script>

<style scoped lang="scss">
.ren-wu-guan-li {
  height: 100%;
  .rwgl-header {
    height: 40px;
    line-height: 40px;
    padding-left: 15px;
  }
  .ul-outer {
    background-color: rgb(245, 247, 240);
    height: calc(100% - 60px);
    display: flex;
    justify-content: center;
    padding: 10px;
    .c-ul {
      width: 100%;
      height: calc(100% - 60px);
      background-color: #fff;
      padding: 30px;
      overflow-y: auto;
      /deep/ .el-select {
        width: 120px;
      }
      .c-rwgl-header-btns {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        .left {
          margin-bottom: 20px;
        }
        .right {
          margin-bottom: 20px;
        }
      }
      .task-ui {
        list-style: none;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        .task-li {
          width: 180px;
          margin-bottom: 20px;
          .task-li-top {
            display: flex;
            justify-content: space-between;
            align-items: center;
            img {
              width: 35px;
              height: 35px;
              border-radius: 4px;
            }
            .task-li-top-right {
              text-align: center;
              width: 93px;
              p {
                max-width: 93px;
              }
            }
          }
          .task-li-mid {
            text-align: center;
          }
          .task-li-btm {
            text-align: center;
          }
          .task-li-img {
            width: 100%;
            height: 200px;
            background-color: #f2f2f2;
            text-align: center;
            img {
              height: 100%;
              width: 96px;
            }
          }
        }
      }
    }
    .c-pagination {
      margin-top: 30px;
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
