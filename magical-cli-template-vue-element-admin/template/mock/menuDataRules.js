const Mock = require('mockjs')
const rules = [
  {
    id: 1,
    menuId: '3',
    name: '用户过滤',
    sqlSegment: 'user_id=#{userId}',
    remarks: '用户过滤sql 条件'
  }
]
// 获取服务端路由表
module.exports = [
  // 获取所有角色
  {
    url: '/sys/data/rule/queryMenuDataRule',
    type: 'post',
    response: _ => {
      return {
        status: 'SUCCESS',
        data: rules
      }
    }
  },

  // 添加
  {
    url: '/sys/data/rule/add',
    type: 'post',
    response: {
      status: 'SUCCESS',
      code: Mock.mock('@integer(10000, 90000)').toString(),
      data: {
        id: Mock.mock('@integer(10000, 90000)')
      }
    }
  },

  // 修改
  {
    url: '/sys/data/rule/edit',
    type: 'post',
    response: {
      status: 'SUCCESS',
      code: Mock.mock('@integer(10000, 90000)').toString(),
      data: {}
    }
  },

  // 删除
  {
    url: '/sys/data/rule/delete',
    type: 'post',
    response: {
      status: 'SUCCESS',
      code: Mock.mock('@integer(10000, 90000)').toString(),
      data: {}
    }
  }
]
