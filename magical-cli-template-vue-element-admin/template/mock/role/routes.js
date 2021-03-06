// Just a mock data

const constantRoutes = [
  {
    path: '/redirect',
    component: 'layout/Layout',
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: 'views/redirect/index'
      }
    ]
  },
  {
    path: '/login',
    component: 'views/login/index',
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: 'views/login/auth-redirect',
    hidden: true
  },
  {
    path: '/404',
    component: 'views/error-page/404',
    hidden: true
  },
  {
    path: '/401',
    component: 'views/error-page/401',
    hidden: true
  },
  {
    path: '',
    component: 'layout/Layout',
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: 'views/dashboard/index',
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', affix: true }
      }
    ]
  }
]

// const asyncRoutes = [
//   {
//     path: '/permission',
//     component: 'layout/Layout',
//     redirect: '/permission/role',
//     alwaysShow: true,
//     meta: {
//       title: 'permission',
//       icon: 'lock',
//       roles: ['admin']
//     },
//     children: [
//       {
//         path: 'role',
//         component: 'views/permission/role',
//         name: 'RolePermission',
//         meta: {
//           title: 'rolePermission',
//           roles: ['admin']
//         }
//       }
//     ]
//   },

//   {
//     path: '/storeManage',
//     redirect: '/storeManage/index',
//     children: [
//       {
//         path: 'index',
//         component: 'views/storeManage/index',
//         name: 'StoreManage',
//         meta: {
//           title: 'storeManage',
//           icon: 'el-icon-s-shop'
//         }
//       }
//     ]
//   },
//   {
//     path: '/goodsManage',
//     redirect: '/goodsManage/index',
//     children: [
//       {
//         path: 'index',
//         component: 'views/goodsManage/index',
//         name: 'GoodsManage',
//         meta: {
//           title: 'goodsManage',
//           icon: 'el-icon-s-goods'
//         }
//       }
//     ]
//   },
//   {
//     path: '/myOrder',
//     redirect: '/myOrder/index',
//     children: [
//       {
//         path: 'index',
//         component: 'views/myOrder/index',
//         name: 'MyOrder',
//         meta: { title: 'myOrder', icon: 'el-icon-s-order', affix: false }
//       }
//     ]
//   },

//   {
//     path: '/error',
//     component: 'layout/Layout',
//     redirect: 'noRedirect',
//     name: 'ErrorPages',
//     meta: {
//       title: 'errorPages',
//       icon: '404'
//     },
//     children: [
//       {
//         path: '401',
//         component: 'views/error-page/401',
//         name: 'Page401',
//         meta: { title: 'page401', noCache: true }
//       },
//       {
//         path: '404',
//         component: 'views/error-page/404',
//         name: 'Page404',
//         meta: { title: 'page404', noCache: true }
//       }
//     ]
//   },

//   {
//     path: '/error-log',
//     component: 'layout/Layout',
//     redirect: 'noRedirect',
//     children: [
//       {
//         path: 'log',
//         component: 'views/error-log/index',
//         name: 'ErrorLog',
//         meta: { title: 'errorLog', icon: 'bug' }
//       }
//     ]
//   },

//   {
//     path: '/pdf/download',
//     component: 'views/pdf/download',
//     hidden: true
//   },

//   { path: '*', redirect: '/404', hidden: true }
// ]

const serviceRoutes = [
  {
    code: '1',
    checked: true,
    name: '????????????', // ????????????
    isParent: 0,
    attributes: {
      id: 1,
      menuType: 1,
      parentId: 0,
      path: '/permission', // ????????????
      isShow: 1, // ???????????????????????????
      icon: 'lock', // ?????????
      component: 'layout' // ????????????
    },
    children: [
      {
        code: '7',
        checked: true,
        isParent: 1,
        name: '????????????',
        attributes: {
          id: 7,
          parentId: 1,
          menuType: 1,
          path: 'routes',
          isShow: 1,
          icon: '', // ?????????
          component: 'routes'
        }
      },
      {
        code: '3',
        checked: true,
        isParent: 1,
        name: '????????????',
        attributes: {
          parentId: 1,
          id: 3,
          menuType: 1,
          path: 'role',
          isShow: 1,
          icon: '', // ?????????
          component: 'role'
        }
      }
    ]
  },
  {
    code: '2',
    checked: true,
    name: '????????????',
    isParent: 0, // ??????????????????
    attributes: {
      id: 2,
      path: '/myOrder',
      menuType: 1,
      parentId: 0,
      isShow: 1,
      icon: 'el-icon-s-order', // ?????????
      component: 'layout'
    },
    children: [
      {
        code: '4',
        isParent: 1,
        checked: true,
        name: '????????????',
        attributes: {
          parentId: 2,
          id: 4,
          isShow: 1,
          menuType: 1,
          path: 'index',
          icon: '', // ?????????
          component: 'myOrder'
        },
        children: [
          {
            code: '6',
            isParent: 1,
            checked: true,
            name: '??????',
            attributes: {
              parentId: 4,
              id: 6,
              isShow: 1,
              menuType: 1,
              path: 'test',
              icon: '', // ?????????
              component: 'myOrder'
            },
            children: [
              {
                code: 'MyOrder_delBtn',
                isParent: 1,
                checked: true,
                name: '??????',
                attributes: {
                  id: 5,
                  parentId: 6,
                  menuType: 2,
                  isShow: 1,
                  path: 'asd',
                  icon: '',
                  component: ''
                }
              }
            ]
          }
        ]
      }
    ]
  }
]

module.exports = {
  constantRoutes,
  // asyncRoutes
  serviceRoutes
}
