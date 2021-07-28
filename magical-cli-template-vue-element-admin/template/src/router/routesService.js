import Layout from '@/layout'
import store from '../store'

// 路由组件映射表
export const routesMap = {
  layout: Layout,
  role: () => import('@/views/permission/role.vue'),
  routes: () => import('@/views/permission/routes.vue'),
  myOrder: () => import('@/views/myOrder/index.vue')
}

/**
 * 将嵌套数组打散
 */
function generateArr(routes) {
  let data = []
  routes.forEach(route => {
    data.push(route)
    if (route.children) {
      const temp = generateArr(route.children)
      if (temp.length > 0) {
        data = [...data, ...temp]
      }
    }
  })
  return data
}
/**
 * 获取code对应按钮的可访问角色
 */
export function getRolesOfBtn(code) {
  const allRoles = store.getters.allRoles
  console.log(allRoles)
  const codeRoles = allRoles.filter(role => {
    const menus = generateArr(role.sysMenuList)
    const btns = menus.filter(menu => {
      return menu.code === code && menu.menuType === 2
    })
    return btns.length > 0
  })
  const rolesOfBtn = codeRoles.map(role => role.roleCode)
  console.log(rolesOfBtn)
  return rolesOfBtn
}
// 根据接口获取页面路由 （只支持一层嵌套）
// export function getRoutesByService(serviceRoutes) {
//   return serviceRoutes.reduce((prev, cur, index, array) => {
//     const routeObj = {
//       id: cur.id,
//       hidden: !cur.isShow, // 是否展示在左侧菜单
//       path: cur.path,
//       component: routesMap[cur.component],
//       // component: cur.component,
//       //   alwaysShow: true, // 总是展示在根节点
//       meta: {
//         title: cur.name, // 设置该路由在侧边栏和面包屑中展示的名字
//         icon: cur.icon
//       }
//     }
//     // 子节点
//     if (cur.parentId) {
//       const index = array.findIndex(sr => sr.id === cur.parentId)
//       if (prev[index].children && prev[index].children.length > 0) {
//         prev[index].children.push(routeObj)
//       } else {
//         // 为父节点添加 redirect 到第一个子节点
//         const childPath = cur.path.replace(/^\//, '')
//         prev[index].redirect = `${prev[index].path}/${childPath}`
//         prev[index].children = [routeObj]
//       }
//     } else {
//       routeObj.alwaysShow = !!cur.isShow
//       // 根节点
//       prev.push(routeObj)
//     }
//     return prev
//   }, [])
// }

/**
 * 将服务端路由表转换为页面路由
 * @param {*} serviceRoutes  服务端路由表
 * @returns
 */
export function getRoutesByService(serviceRoutes) {
  const res = []
  serviceRoutes.forEach(route => {
    const { name, isParent, attributes } = route
    let { children } = route
    let attributesObj
    if (attributes) {
      attributesObj = attributes
    } else {
      attributesObj = route
    }
    const { id, path, isShow, icon, component, menuType, parentId } = attributesObj
    const routeObj = {
      id,
      hidden: !isShow, // 是否展示在左侧菜单
      isShow,
      path,
      parentId,
      component: routesMap[component],
      //   alwaysShow: true, // 总是展示在根节点
      meta: {
        title: name, // 设置该路由在侧边栏和面包屑中展示的名字
        icon
      },
      menuType
    }
    if (routeObj.menuType === 1) {
      if (children && children.length > 0) {
        // children = children.filter(child => child.attributes.menuType === 1)
        children = children.filter(child => {
          if (child.attributes) {
            attributesObj = child.attributes
          } else {
            attributesObj = child
          }
          return attributesObj.menuType === 1
        })
        if (children.length === 1) {
          routeObj.alwaysShow = !!isShow // 总是展示在根节点
        }

        // 如果没有父节点
        if (!isParent) {
          const childPath = children[0].attributes.path.replace(/^\//, '')
          routeObj.redirect = `${path}/${childPath}`
        }

        routeObj.children = getRoutesByService(children)
      }
      res.push(routeObj)
    }
  })

  return res
}

/**
 * 格式化服务端路由表
 * @param {*} serviceRoutes  服务端路由表
 * @returns
 */
export function formatServiceRoutes(serviceRoutes) {
  const res = []
  serviceRoutes.forEach(route => {
    const { name, attributes, code } = route
    const { children } = route
    let attributesObj
    if (attributes) {
      attributesObj = attributes
    } else {
      attributesObj = route
    }
    const { id, path, isShow, icon, component, menuType, parentId } = attributesObj
    const routeObj = {
      id,
      hidden: !isShow, // 是否展示在左侧菜单
      path,
      component,
      isShow,
      name,
      code,
      parentId,
      menuTypeName: menuType === 1 ? '菜单' : menuType === 2 ? '按钮' : '其他',
      meta: {
        title: name, // 设置该路由在侧边栏和面包屑中展示的名字
        icon
      },
      menuType
    }
    if (children && children.length > 0) {
      routeObj.children = formatServiceRoutes(children)
    }
    res.push(routeObj)
  })

  return res
}
