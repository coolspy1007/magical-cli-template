import { constantRoutes } from '@/router'
import { getServiceRoutes, getRoutesByRoles } from '@/api/routes'
import { getRoutesByService, formatServiceRoutes } from '@/router/routesService'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
// function hasPermission(roles, route) {
//   if (route.meta && route.meta.roles) {
//     return roles.some(role => route.meta.roles.includes(role))
//   } else {
//     return true
//   }
// }

function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children && tmp.children.length > 0) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  allRoutes: [], // 所有路由
  routes: [], // 可访问路由
  addRoutes: [],
  serviceRoutes: [] // 接口获取的路由表
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  },
  SET_ALL_ROUTES: (state, allRoutes) => {
    state.allRoutes = allRoutes
  },

  SET_SERVICE_ROUTES: (state, serviceRoutes) => {
    state.serviceRoutes = serviceRoutes
  }
}

const actions = {
  // async generateRoutes({ commit }, roles) {
  //   // 根据服务端路由表，获取页面路由
  //   const { data } = await getServiceRoutes()
  //   const serviceRoutes = data.children
  //   console.log('serviceRoutes', serviceRoutes)
  //   const asyncRoutes = getRoutesByService(serviceRoutes)
  //   console.log('asyncRoutes..........', asyncRoutes)
  //   commit('SET_ALL_ROUTES', asyncRoutes)
  //   const accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
  //   // let accessedRoutes
  //   // if (roles.includes('admin')) {
  //   //   accessedRoutes = asyncRoutes || []
  //   // } else {
  //   //   accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
  //   // }
  //   commit('SET_ROUTES', accessedRoutes)
  //   return accessedRoutes
  // }
  async generateRoutes({ commit }, roles) {
    // 根据服务端路由表，获取页面路由
    const { data } = await getServiceRoutes()
    const serviceRoutes = data.children
    // console.log('serviceRoutes', serviceRoutes)
    commit('SET_SERVICE_ROUTES', serviceRoutes)
    const asyncRoutes = formatServiceRoutes(serviceRoutes)
    // console.log('asyncRoutes..........', asyncRoutes)
    commit('SET_ALL_ROUTES', asyncRoutes)
    // 从 api 获取角色可访问的路由
    const { data: accessedData } = await getRoutesByRoles(roles)
    // 转换成页面路由
    const accessedRoutes = getRoutesByService(accessedData.children)
    commit('SET_ROUTES', accessedRoutes)
    return accessedRoutes
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
