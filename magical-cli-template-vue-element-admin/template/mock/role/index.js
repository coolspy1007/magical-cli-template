const Mock = require('mockjs')
const { serviceRoutes } = require('./routes.js')
// const { deepClone } = require('../utils')
// const { asyncRoutes, constantRoutes } = require('./routes.js')
// const routes = deepClone([...constantRoutes, ...asyncRoutes])

const roles = [
  {
    id: 1,
    roleCode: 'admin',
    roleName: '管理员',
    remark: 'Super Administrator. Have access to view all pages.'
  },
  {
    id: 2,
    roleCode: 'editor',
    roleName: '运营',
    remark: 'Normal Editor. Can see all pages except permission page'
  },
  {
    id: 3,
    roleCode: 'visitor',
    roleName: '访问者',
    remark: 'Just a visitor. Can only see the home page and the document page'
  }
]

const rolesDetail = [
  {
    id: 1,
    sysMenuList: serviceRoutes
  },

  {
    id: 2,
    sysMenuList: serviceRoutes.filter(i => i.path !== '/permission') // just a mock
  },
  {
    id: 3,
    sysMenuList: [
      {
        code: '2',
        checked: true,
        name: '订单管理',
        isParent: 0, // 是否有父节点
        attributes: {
          id: 2,
          path: '/myOrder',
          isShow: 1,
          icon: 'el-icon-s-order', // 小图标
          menuType: 1,
          component: 'layout'
        },
        children: [
          {
            code: '4',
            isParent: 1,
            checked: true,
            name: '我的订单',
            attributes: {
              id: 4,
              isShow: 1,
              path: 'index',
              icon: '', // 小图标
              menuType: 1,
              component: 'myOrder'
            }
            // children: [
            //   {
            //     code: '5',
            //     isParent: 1,
            //     checked: true,
            //     name: '测试',
            //     attributes: {
            //       id: 5,
            //       menuType: 2,
            //       isShow: 1,
            //       path: 'test',
            //       icon: '', // 小图标
            //       component: 'myOrder'
            //     }
            //   }
            // ]
          }
        ]
      }
    ]
  }
]
function hasPermission(roles, route) {
  if (route.rolesId) {
    return roles.some(role => route.rolesId.includes(role))
  } else {
    return true
  }
}

function filterAsyncRoutes(routes, roles) {
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
// 获取服务端路由表
module.exports = [
  {
    url: '/sys/menu/tree',
    type: 'post',
    response: _ => {
      return {
        status: 'SUCCESS',
        data: {
          children: serviceRoutes
        }
      }
    }
  },
  // 根据角色获取可访问路由
  {
    url: '/role/available/menu',
    type: 'post',
    response: config => {
      const rolesId = config.body
      return {
        status: 'SUCCESS',
        data: {
          children: filterAsyncRoutes(serviceRoutes, rolesId)
        }
      }
    }
  },
  // 角色详情
  {
    url: '/role/info',
    type: 'post',
    response: config => {
      const { id } = config.query
      const data = rolesDetail.find(r => {
        return parseInt(r.id) === parseInt(id)
      })
      return {
        status: 'SUCCESS',
        data
      }
    }
  },

  // 获取所有角色
  {
    url: '/role/list',
    type: 'post',
    response: _ => {
      return {
        status: 'SUCCESS',
        data: {
          list: roles
        }
      }
    }
  },

  // add role
  {
    url: '/role/add',
    type: 'post',
    response: {
      status: 'SUCCESS',
      code: Mock.mock('@integer(10000, 90000)').toString(),
      data: {
        // key: Mock.mock('@integer(300, 5000)')
        id: Mock.mock('@integer(10000, 90000)')
      }
    }
  },

  // update role
  {
    url: '/role/edit',
    type: 'post',
    response: {
      status: 'SUCCESS',
      code: Mock.mock('@integer(10000, 90000)').toString(),
      data: {}
    }
  },

  // delete role
  {
    url: '/role/delete',
    type: 'post',
    response: {
      status: 'SUCCESS',
      code: Mock.mock('@integer(10000, 90000)').toString(),
      data: {}
    }
  },
  // 添加菜单
  {
    url: '/sys/menu/add',
    type: 'post',
    response: {
      status: 'SUCCESS',
      code: Mock.mock('@integer(10000, 90000)').toString(),
      data: {
        id: Mock.mock('@integer(10000, 90000)')
      }
    }
  },

  // 修改菜单
  {
    url: '/sys/menu/edit',
    type: 'post',
    response: {
      status: 'SUCCESS',
      code: Mock.mock('@integer(10000, 90000)').toString(),
      data: {}
    }
  },

  // 删除菜单
  {
    url: '/sys/menu/delete',
    type: 'post',
    response: {
      status: 'SUCCESS',
      code: Mock.mock('@integer(10000, 90000)').toString(),
      data: {}
    }
  }
]
