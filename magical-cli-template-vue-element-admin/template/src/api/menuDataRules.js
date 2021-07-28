import request from '@/utils/request'

// 菜单数据规则/sys/data/rule/queryMenuDataRule
export function getMenuRules(menuId) {
  return request({
    url: '/sys/data/rule/queryMenuDataRule',
    method: 'post',
    params: {
      menuId
    }
  })
}

// 添加菜单数据规则
export function addMenuRule(data) {
  return request({
    url: '/sys/data/rule/add',
    method: 'post',
    data
  })
}

// 修改菜单数据规则
export function editMenuRule(data) {
  return request({
    url: '/sys/data/rule/edit',
    method: 'post',
    data
  })
}

// 删除菜单数据规则
export function deleteMenuRule(id) {
  return request({
    url: '/sys/data/rule/delete',
    method: 'post',
    params: {
      id
    }
  })
}
