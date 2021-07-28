/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const orderRouter = {
  path: '/myOrder',
  component: Layout,
  redirect: '/myOrder/index',
  // name: 'MyOrder',
  // meta: {
  //   title: 'myOrder',
  //   icon: 'table'
  // },
  children: [
    {
      path: 'index',
      component: () => import('@/views/myOrder/index'),
      name: 'MyOrder',
      meta: { title: 'myOrder', icon: 'el-icon-s-order', affix: false }
    }
  ]
}
export default orderRouter
