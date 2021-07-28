import request from '@/utils/request'

// 登录
export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    // data
    params: data
  })
}

// 用户详情
export function getInfo(userId) {
  return request({
    url: '/user/info',
    method: 'post',
    params: { userId }
  })
}

// 新增
export function addUser(data) {
  return request({
    url: '/user/add',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}

// 修改
export function editUser(data) {
  return request({
    url: '/user/edit',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data
  })
}

// 删除
export function delUser(userId) {
  return request({
    url: '/user/delete',
    method: 'post',
    params: { userId }
  })
}

// 获取当前登录用户信息
export function getCurrentUser() {
  return request({
    url: '/user/current',
    method: 'post'
  })
}

// 获取当前登录用户信息
export function getUserRoles(userId) {
  return request({
    url: '/user/available/auth',
    method: 'post',
    params: { userId }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
