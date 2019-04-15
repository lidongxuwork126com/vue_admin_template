import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);
// 整个页面的入口
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/
// 公共路由设置
export const constantRouterMap = [
  // 二级路由入口在views/layout/components/AppMain.vue中
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: "Dashboard",
    meta: { title: "Dashboard", icon: "form"}, //role, 页面需要的权限
    children: [
      // 首页
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index')
      }
    ]
  }
];

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
});


//异步挂载的路由
//动态需要根据权限加载的路由表
export const asyncRouterMap = [
  {
    path: '/one',
    component: Layout,
    redirect: "/one/oneC",
    name: "One",
    // 面包削上的文字
    meta: {title: "one", role: ["admin2"]},
    children: [
      {
        path: "oneC",
        component: () => import('@/views/one/one'),
        //导航上的文字
        meta: { title: 'oneC', icon: 'form', role: ["admin2"] }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
];
