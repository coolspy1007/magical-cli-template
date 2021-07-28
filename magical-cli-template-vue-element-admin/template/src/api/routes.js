import request from '@/utils/request'

// 获取路由表
export function getServiceRoutes() {
  return request({
    url: '/sys/menu/tree',
    method: 'post'
  })
}

// 根据角色获取可访问路由
export function getRoutesByRoles(data) {
  return request({
    url: '/role/available/menu',
    method: 'post',
    data
  })
}

// 添加菜单
export function addRoute(data) {
  return request({
    url: '/sys/menu/add',
    method: 'post',
    data
  })
}

// 修改菜单
export function editRoute(data) {
  return request({
    url: '/sys/menu/edit',
    method: 'post',
    data
  })
}

// 删除菜单
export function deleteRoute(id) {
  return request({
    url: '/sys/menu/delete',
    method: 'post',
    params: {
      id
    }
  })
}
