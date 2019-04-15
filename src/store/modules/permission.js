// 权限全局管理
// 加载路由里的静态/动态路由
import {constantRouterMap, asyncRouterMap} from "@/router";

function hasPermission(roles, route) {
  // 有没有meta选项, 并且有没有role字段(里面放着需要的权限)
  if (route.meta && route.meta.role) {
    // 判断是否有权限(有返回true, 没有返回false)
    // some 为数组里 每个元素执行一次callback函数 (role数组里元素)
    return roles.some(role => route.meta.role.indexOf(role) >= 0)
  } else {
    // 不需要判断权限, 则直接返回true
    return true
  }
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers;
      state.routers = constantRouterMap.concat(routers);
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { roles } = data;
        const accessedRouters = asyncRouterMap.filter(v => {
          // 如果是admin, 则不用再过滤了, 直接全部使用
          if (roles.indexOf('admin') >= 0) return true;
          if (hasPermission(roles, v)) {
            if (v.children && v.children.length > 0) {
              v.children = v.children.filter(child => {
                if (hasPermission(roles, child)) {
                  return child
                }
                return false;
              });
              return v
            } else {
              return v
            }
          }
          return false;
        });
        commit('SET_ROUTERS', accessedRouters);
        resolve();
      })
    }
  }
};

export default permission;
