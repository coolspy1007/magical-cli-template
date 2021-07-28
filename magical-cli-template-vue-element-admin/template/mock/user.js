const { mock, Random } = require('mockjs')
const USER_TOKEN_KEY = 'x-auth-token'

const tokens = {
  admin: 'admin-token',
  editor: 'editor-token'
}

const users = {
  'admin-token': mock({
    avatar: Random.image('200x200', '#4A7BF7', '#ffffff', 'png', 'H'),
    // 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    // id: 1,
    name: 'Super Admin',
    // account: tokens['admin'],
    // pwd: '123456',
    // phone: '18888888888',
    // status: 'asdas',
    // mail: 'superAdmin@163.com',
    // status: 1,
    // loginFlag: 1,
    // loginTime: 'int //登录时间',
    // createTime: 'date //创建时间',
    // createUser: 'string //创建人',
    // updateTime: 'date //修改时间',
    // updateUser: 'string //修改人',
    // remark: 'string //备注',
    sysRoleList: [
      {
        id: 1,
        roleCode: 'admin',
        roleName: '管理员'
      }
    ]
  }),
  'editor-token': {
    sysRoleList: [
      {
        id: 2,
        roleCode: 'editor',
        roleName: '编辑者'
      }
    ],
    introduction: 'I am an editor',
    avatar: Random.image('200x200', '#894FC4', '#ffffff', 'E'),
    name: 'Normal Editor'
  }
}

module.exports = [
  // user login
  {
    url: '/login',
    type: 'post',
    response: config => {
      const { username } = config.query
      const token = tokens[username]
      // mock error
      if (!token) {
        return {
          status: 500,
          msg: '未获取到 token 登录失败.'
        }
      }

      return {
        status: 'SUCCESS',
        data: {
          token
        }
      }
    }
  },

  // get user info
  {
    url: '/user/current',
    type: 'post',
    response: config => {
      const token = config.headers[USER_TOKEN_KEY]
      const userInfo = users[token]
      // mock error
      if (!userInfo) {
        return {
          status: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        status: 'SUCCESS',
        data: userInfo
      }
    }
  },

  // user logout
  {
    url: '/user/logout',
    type: 'post',
    response: _ => {
      return {
        status: 'SUCCESS',
        data: 'success'
      }
    }
  }
]
