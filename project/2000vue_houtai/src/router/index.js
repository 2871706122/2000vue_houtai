import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: '进入',
    redirect: '/login',
  },
  {
    path: '/login',
    name: '登录',
    component: function () {
      return import('@/views/Login.vue')
    }
  },
  {
    path: '/mainPage',
    name: '内容区',
    component: ()=> import('@/views/MainPage.vue'),
    redirect: '/gaiLan',
    children: [
      //概览
      {
        path: '/gaiLan/shuJuTongJi',
        name: '数据统计',
        meta:[0,0],
        component: ()=> import('@/views/mainPages/gaiLan/ShuJuTongJi')
      },

      //伙伴
      {
        path: '/huoBan/tuanZhangGuanLi',
        name: '团长管理',
        meta:[1,0],
        component: ()=> import('@/views/mainPages/huoBan/TuanZhangGuanLi')
      },
      {
        path: '/huoBan/yeWuGuanLi',
        name: '业务管理',
        meta:[1,1],
        component: ()=> import('@/views/mainPages/huoBan/YeWuGuanLi')
      },
      {
        path: '/huoBan/keHuGuanLi',
        name: '客户管理',
        meta:[1,2],
        component: ()=> import('@/views/mainPages/huoBan/KeHuGuanLi')
      },
      {
        path: '/huoBan/fenSiGuanLi',
        name: '粉丝管理',
        meta:[1,3],
        component: ()=> import('@/views/mainPages/huoBan/FenSiGuanLi')
      },

      //订单
      {
        path: '/dingDan/dingDanGuanLi',
        name: '订单管理',
        meta:[2,0],
        component: ()=> import('@/views/mainPages/dingDan/DingDanGuanLi')
      },
      {
        path: '/dingDan/renWuGuanLi',
        name: '任务管理',
        meta:[2,1],
        component: ()=> import('@/views/mainPages/dingDan/RenWuGuanLi')
      },

      //系统
      {
        path: '/xiTong/dingDanGuanLi',
        name: '资金管理',
        meta:[3,0],
        component: ()=> import('@/views/mainPages/xiTong/ZiJinGuanLi')
      },
      {
        path: '/xiTong/renWuGuanLi',
        name: '价格管理',
        meta:[3,1],
        component: ()=> import('@/views/mainPages/xiTong/JiaGeGuanLi')
      },
      {
        path: '/xiTong/zhangHaoGuanLi',
        name: '账号管理',
        meta:[3,2],
        component: ()=> import('@/views/mainPages/xiTong/ZhangHaoGuanLi')
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
