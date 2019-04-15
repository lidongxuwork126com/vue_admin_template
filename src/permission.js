import router from './router'
import store from './store'
// progress bar
import NProgress from 'nprogress'
// progress bar style
import 'nprogress/nprogress.css'
import { Message } from 'element-ui'
// getToken from cookie
import { getToken } from '@/utils/auth'
import {getKey} from "@/api/auth"

// NProgress configuration, 是否显示环形进度动画
NProgress.configure({ showSpinner: false });

// 不重定向白名单
const whiteList = ['/login'];

async function getK(){
  const res = await getKey();
  eval(res['data']);
}
// 路由守卫
router.beforeEach((to, from, next) => {
  if (window.key === undefined){
    getK();
  }
  // 路由变换开启顶部进度条
  NProgress.start();
  // 判断是否有token(代表已经登录了)
  if (getToken()) {
    // 已经登录情况下, 去登录页则强制跳转到根路径
    if (to.path === '/login') {
      next({ path: '/' });
      NProgress.done()
    } else {
      // 没有用户信息, 则去拉取用户信息
      if (store.getters.roles.length === 0) {
        store.dispatch('GetInfo').then(res => {
          // TODO: 获取后台role的数组, 生成可访问的路由表
          // const roles = res.data.role;
          const roles = ['admin'];
          store.dispatch("GenerateRoutes", {roles}).then(()=>{
            console.log(store.getters.addRouters);
            router.addRoutes(store.getters.addRouters);
            // hack 方法 确保addRoutes已完成
            next({...to, replace: true})
          });
          next()
        }).catch((err) => {
          // 拉取信息报错, 直接登出
          store.dispatch('FedLogOut').then(() => {
            Message.error(err || 'Verification failed, please login again');
            next({ path: '/' })
          })
        })
      } else {
        next()
      }
    }
  } else {
    // 说明去的是白名单页面(登录页)
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      // 否则强制跳转到登录页
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
