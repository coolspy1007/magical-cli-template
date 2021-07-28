import request from '@/utils/request'

// 获取所有角色
export function getRoles(data) {
  return request({
    url: '/role/list',
    method: 'post',
    data
  })
}

// 根据角色 id 获取角色详情
export function getRoleInfo(id) {
  return request({
    url: '/role/info',
    method: 'post',
    params: { id }
  })
}

export function addRole(data) {
  return request({
    url: '/role/add',
    method: 'post',
    data
  })
}

export function updateRole(data) {
  return request({
    url: `/role/edit `,
    method: 'post',
    data
  })
}

export function deleteRole(id) {
  return request({
    url: `/role/delete`,
    method: 'post'
  })
}

