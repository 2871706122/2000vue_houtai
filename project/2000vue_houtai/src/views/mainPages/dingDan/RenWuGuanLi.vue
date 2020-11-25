<template>
  <!-- 任务管理 -->
  <div class="ren-wu-guan-li">
    <header class="rwgl-header"><span @click='back'>订单管理</span> \ <span>任务审核</span></header>
    <div class="ul-outer">
      <div class="c-ul">
        <div class="c-rwgl-header-btns">
          <div class="left">
            <span style='margin:0 10px 0 0'>粉丝昵称:</span>
            <el-input v-model='nickname' style='width:200px'></el-input>
            <span style='margin:0 10px 0 10px'>粉丝openid:</span>
            <el-input v-model='openid' style='width:200px'></el-input>
            <span style='margin:0 0px 0 10px'>
              <el-radio v-model="status" label="">所有</el-radio>
              <el-radio v-model="status" :label="'0'">未审核</el-radio>
              <el-radio v-model="status" :label="1">不合格</el-radio>
              <el-radio v-model="status" :label="2">合格</el-radio>
            </span>
            <el-button type="primary" style="margin: 0px 0 0 40px" @click="search">查询</el-button>
            <el-button @click="reset">重置</el-button>
          </div>
          <div class="right">
            <el-button type="primary" @click="focusMode(-1)">聚焦模式</el-button>
            <el-button type="primary" :disabled="userType!==5" @click="selectAll" v-show="btnVisible">本页全选</el-button>
            <el-button type="danger" :disabled="userType!==5" @click="cancelSelectAll" v-show="!btnVisible">取消全选</el-button>
            <el-button type="primary" :disabled="selectedListData.length&&userType===5?false:true" @click='approvalList(selectedListData)'>审核通过</el-button>
            <el-button type="primary" @click='back' :disabled="userType!==5">释放任务</el-button>
          </div>
        </div>
        <ul class="task-ui" v-if='listData.length'>
          <li class="task-li" v-for="(item, index) in listData" :key="index">
            <div class="task-li-top">
              <!-- 状态为不合格或者未审核并且身份是审核员 -->
              <el-checkbox :disabled="[0,1].indexOf(item.status)!==-1&&userType===5?false:true" @change="(a) => checkboxChange(a, index)" v-model="checkboxValueList[index]"></el-checkbox>
              <img :src="item.headPictureUrl" />
              <div class="task-li-top-right">
                <p style='margin:0 0 6px 0'>{{ item.nickname }}</p>
                <el-button type="primary" size="small" @click="copy(item.openid)">复制openid</el-button>
              </div>
            </div>
            <div class="task-li-mid">
              <p>提交：{{ item.createTime }}</p>
              <p>审核：{{ item.updateTime }}</p>
            </div>
            <div class="task-li-btm">
              <el-button-group>
                <el-button size="small" :class="item.status===2?'active':''" :disabled="userType!==5" round @click='approval(2,item)'>合格</el-button>
                <el-button size="small" :class="item.status===1?'active':''" :disabled="userType!==5" round @click='approval(1,item)'>不合格</el-button>
              </el-button-group>
            </div>
            <div @click='focusMode(index)' class="task-li-img">
              <img :src="item.taskPictureUrl" alt />
            </div>
          </li>
        </ul>
        <div class="c-pagination">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pageNum" :page-sizes="[10, 15, 20]" :page-size="pageSize" layout="sizes, prev, pager, next,jumper" :total="total"></el-pagination>
        </div>
      </div>
    </div>
    <div class="modalPage" v-if="modalVisible&&listData.length">
      <img class="close-img" @click='modalVisible=false' src="../../../assets/imgs/close.png" alt="" />
      <div class="c-display">
        <img class="display-img" :src="listData[focusModeDisplayIndex].taskPictureUrl" alt="" />
        <div class="info-and-operate">
          <div class="info">
            <div class="info-top">
              <img :src="listData[focusModeDisplayIndex].headPictureUrl" alt="" />
              <div class="info-top-right">
                <p>{{listData[focusModeDisplayIndex].name}}</p>
                <el-button size="small" @click='copy(listData[focusModeDisplayIndex].openid)'>复制openid</el-button>
              </div>
            </div>
            <div class="info-btm">
              <p>提交时间：{{listData[focusModeDisplayIndex].createTime}}</p>
              <p>审核时间：{{listData[focusModeDisplayIndex].updateTime}}</p>
              <p v-show='+listData[focusModeDisplayIndex].status===0'>审核状态：待审核</p>
              <p v-show='+listData[focusModeDisplayIndex].status===1'>审核状态：不合格</p>
              <p v-show='+listData[focusModeDisplayIndex].status===2'>审核状态：合格</p>
            </div>
          </div>
          <div class="operate">
            <h2>第{{focusModeDisplayIndex+1}}个/本页共{{listData.length}}个</h2>
            <el-button type="success" @click='approvalList(unqualifiedArr)' :disabled="userType!==5">本页全合格</el-button>
            <div class="operate-btm">
              <div class="operate-btm-left">
                <div>
                  <span class="span1" @click='PageUp'>Page UP</span>
                  <img @click='PageUp' src="../../../assets/imgs/arrow.png" alt="" />
                </div>
                <div>
                  <img @click='PageDown' class="wow" src="../../../assets/imgs/arrow.png" alt="" />
                  <p @click='PageDown' class="down">Page Down</p>
                </div>
              </div>
              <div class="operate-btm-right">
                <el-button :disabled="userType!==5" @click='approval(2,listData[focusModeDisplayIndex])' v-show='listData[focusModeDisplayIndex].status===1 || listData[focusModeDisplayIndex].status===0' size="big" type="success">合格</el-button>
                <el-button class="aaa" :disabled="userType!==5" @click='approval(1,listData[focusModeDisplayIndex])' v-show='listData[focusModeDisplayIndex].status===2 || listData[focusModeDisplayIndex].status===0' size="big" type="danger">不合格</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { remove } from 'lodash'
import getReq from '@/utils/getReq.js'
export default {
  name: "renWuGuanLi",
  data() {
    return {
      userType: 5,  // 0,1 管理员  5 审核员
      // 
      checkCode: 123, // 审核员的名字 (登录的这个人)
      taskOrderNo: '', // 订单号
      // 
      inQuery: false,

      status: '',
      nickname: '',
      openid: '',

      pageNum: 1,
      pageSize: 10,
      total: 10,

      listData: [
        {
          id: 1,
          t_img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1602608266924&di=dad8d168566413442b66826961ae5100&imgtype=0&src=http%3A%2F%2Fa0.att.hudong.com%2F18%2F56%2F14300000958002128488569856508.jpg',
          name: '跃然我心1',
          openid: 111,
          time: {
            start: '2020-10-10 20:03:04',
            end: '2020-10-10 20:03:04'
          },
          status: 1, // 1合格  2不合格
        },
        {
          id: 2,
          t_img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1602608266924&di=dad8d168566413442b66826961ae5100&imgtype=0&src=http%3A%2F%2Fa0.att.hudong.com%2F18%2F56%2F14300000958002128488569856508.jpg',
          name: '跃然我心2',
          openid: 1,
          time: {
            start: '2020-10-10 20:03:04',
            end: '2020-10-10 20:03:04'
          },
          status: 1,
        },
        {
          id: 3,
          t_img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1602608266924&di=dad8d168566413442b66826961ae5100&imgtype=0&src=http%3A%2F%2Fa0.att.hudong.com%2F18%2F56%2F14300000958002128488569856508.jpg',
          name: '跃然我心3',
          openid: 1,
          time: {
            start: '2020-10-10 20:03:04',
            end: '2020-10-10 20:03:04'
          },
          status: 1,
        },
        {
          id: 4,
          t_img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1602608266924&di=dad8d168566413442b66826961ae5100&imgtype=0&src=http%3A%2F%2Fa0.att.hudong.com%2F18%2F56%2F14300000958002128488569856508.jpg',
          name: '跃然我心4',
          openid: 1,
          time: {
            start: '2020-10-10 20:03:04',
            end: '2020-10-10 20:03:04'
          },
          status: 1,
        },
        {
          id: 5,
          t_img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1602608266924&di=dad8d168566413442b66826961ae5100&imgtype=0&src=http%3A%2F%2Fa0.att.hudong.com%2F18%2F56%2F14300000958002128488569856508.jpg',
          name: '跃然我心5',
          openid: 1,
          time: {
            start: '2020-10-10 20:03:04',
            end: '2020-10-10 20:03:04'
          },
          status: 2,
        },
        {
          id: 6,
          t_img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1602608266924&di=dad8d168566413442b66826961ae5100&imgtype=0&src=http%3A%2F%2Fa0.att.hudong.com%2F18%2F56%2F14300000958002128488569856508.jpg',
          name: '跃然我心6',
          openid: 1,
          time: {
            start: '2020-10-10 20:03:04',
            end: '2020-10-10 20:03:04'
          },
          status: 1,
        },
        {
          id: 7,
          t_img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1602608266924&di=dad8d168566413442b66826961ae5100&imgtype=0&src=http%3A%2F%2Fa0.att.hudong.com%2F18%2F56%2F14300000958002128488569856508.jpg',
          name: '跃然我心7',
          openid: 1,
          time: {
            start: '2020-10-10 20:03:04',
            end: '2020-10-10 20:03:04'
          },
          status: 2,
        }
      ],
      checkboxValueList: [],
      // 选中的数据
      selectedListData: [],
      focusModeDisplayIndex: 0, // 聚焦模式展示的数据的下标
      // ui
      btnVisible: true,
      modalVisible: false
    }
  },
  computed: {
    unqualifiedArr() {
      let arr = []
      this.listData.forEach(item => {
        if (+item.status !== 2) {
          arr.push(item)
        }
      })
      return arr
    }
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
    closeModal(e) {
      if (e.keyCode === 27) {
        this.modalVisible = false
      }
    },
    // 查询
    search() {
      this.inQuery = true
      this.pageNum = 1
      this.pageSize = 10
      this.getListData()
    },
    reset() {
      this.nickname = ''
      this.openid = ''
      this.radio = ''
      this.pageNum = 1
      this.pageSize = 10
      this.inQuery = false
      this.getListData()
    },
    // 全选
    selectAll() {
      this.selectedListData = []
      this.listData.forEach((item, index) => {
        if (item.status === 2) {  // 审核通过

        } else {
          this.$set(this.checkboxValueList, index, true)
          this.selectedListData.push(item)
        }
      })
      this.btnVisible = false
      console.log(this.selectedListData)
    },
    // 取消全选
    cancelSelectAll() {
      this.checkboxValueList.forEach((item, index) => {
        this.$set(this.checkboxValueList, index, false)
      })
      this.selectedListData = []
      this.btnVisible = true
    },
    async approval(type, item) {
      let val = {}
      val.checkCode = this.checkCode
      val.taskNo = item.taskNo
      val.type = type
      let url = '/task/task/check?'
      url += getReq(val)
      let res = await this.$axios.post(url)
      console.log(res)
      if (res.data.code === 200) {
        this.$message.success('操作成功')
        //   更新table数据
        this.getListData()
      } else {
        this.$message.error(res.data.message)
      }
    },
    // 审核任务(多个批量通过)
    async approvalList(taskArr) {
      let arr = []
      taskArr.forEach(item => {
        arr.push(item.taskNo)
      })
      let val = {}
      val.checkCode = this.checkCode
      val.taskNoStrs = arr.toString()
      let url = '/task/task/checkList?'
      url += getReq(val)
      let res = await this.$axios.post(url)
      console.log(res)
      if (res.data.code === 200) {
        this.$message.success('操作成功')
        //   更新table数据
        this.getListData()
      } else {
        this.$message.error(res.data.message)
      }
    },
    // 开启聚焦模式
    focusMode(num) {
      if (num !== -1) {
        this.focusModeDisplayIndex = num
      }
      this.modalVisible = true
    },
    PageUp() {
      if (this.focusModeDisplayIndex >= 1) {
        this.focusModeDisplayIndex -= 1
      }
    },
    PageDown() {
      if (this.focusModeDisplayIndex < this.listData.length - 1) {
        this.focusModeDisplayIndex += 1
      }
    },
    checkboxChange(val, index) {
      console.log(val, index)
      if (val) {
        this.selectedListData.push(this.listData[index])
      } else {
        let id = this.listData[index].id
        console.log(id)
        // 取消的元素在选中数组中的index
        let sameIndex = this.selectedListData.findIndex(item => {
          return item.id === id
        })
        this.selectedListData = remove(this.selectedListData, (item, idx) => {
          return idx !== sameIndex
        })
      }
      console.log(this.selectedListData)
    },
    handleSizeChange(val) {
      console.log(val)
      this.pageSize = val
      // 查询数据
      this.getListData()
    },
    handleCurrentChange(val) {
      console.log(val)
      console.log(this.pageNum)
      // 查询数据
      this.getListData()
    },
    async getListData() {
      let val
      if (this.inQuery) {
        val = {
          taskOrderNo: this.taskOrderNo,
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          status: this.status,
          nickname: this.nickname,
          openid: this.openid
        }
      } else {
        val = {
          taskOrderNo: this.taskOrderNo,
          pageNum: this.pageNum,
          pageSize: this.pageSize,
        }
      }
      let url = '/task/task/list?'
      url += getReq(val)
      let res = await this.$axios.get(url)
      console.log(res)
      this.total = res.data.data.count
      this.selectedListData = []
      this.listData = res.data.data.resultList
      this.checkboxValueList = []
      this.listData.forEach(item => {
        this.checkboxValueList.push(false)
      })
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
      console.log(res)
      if (res) {
        this.$message.success('复制成功')
      }
      return res;// 返回操作结果
    }
  },
  async created() {
    console.log(localStorage.getItem("name"))
    console.log(this.userType)
    console.log(this.$route.query.taskOrderNo)
    this.userType = +localStorage.getItem("userType")
    this.taskOrderNo = this.$route.query.taskOrderNo
    this.checkCode = localStorage.getItem("name")
    this.getListData()
  },
  mounted() {
    document.addEventListener('keydown', this.closeModal)
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.closeModal)
  }

}
</script>

<style scoped lang="scss">
.active {
  color: #fff;
  border-color: #c6e2ff;
  background-color: #409EFF;
}
.ren-wu-guan-li {
  height: 100%;
  position: relative;
  .rwgl-header {
    height: 40px;
    line-height: 40px;
    padding-left: 15px;
    span {
      cursor: pointer;
    }
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
        justify-content: flex-start;
        flex-wrap: wrap;
        .task-li {
          width: 180px;
          margin-bottom: 40px;
          padding: 38px;
          .task-li-top {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
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
            p {
              margin-bottom: 10px;
              text-align: left;
            }
          }
          .task-li-btm {
            text-align: center;
            margin-bottom: 10px;
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
  .modalPage {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background-color: rgba(0, 0, 0, 0.8);
    .close-img {
      position: absolute;
      right: 30px;
      top: 30px;
      cursor: pointer;
    }
    .c-display {
      width: 289px;
      height: 600px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      .display-img {
        width: 100%;
        height: 100%;
      }
      .info-and-operate {
        position: absolute;
        top: 60px;
        left: 340px;
        color: #fff;
        width: 200px;
        .info {
          .info-top {
            display: flex;
            align-items: center;
            margin-bottom: 16px;
            img {
              width: 35px;
              height: 35px;
              border-radius: 4px;
              margin-right: 16px;
            }
            .info-top-right {
              p {
                margin-bottom: 8px;
              }
            }
          }
          .info-btm {
            margin-bottom: 24px;
            p {
              margin-bottom: 8px;
            }
          }
        }
        .operate {
          h2 {
            margin-bottom: 8px;
          }
          .operate-btm {
            margin-top: 60px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .operate-btm-left {
              width: 106px;
              img {
                width: 60px;
                height: 60px;
                cursor: pointer;
              }
              .wow {
                transform: rotateZ(180deg);
                position: relative;
                top: -20px;
              }
              .down {
                position: relative;
                top: -22px;
                left: -5px;
              }
            }
            .operate-btm-right {
              .aaa {
                margin-left: 0 !important;
                margin-top: 20px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
