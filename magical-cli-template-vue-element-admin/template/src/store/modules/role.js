import { getRoleInfo, getRoles } from '@/api/role'
import { formatServiceRoutes } from '@/router/routesService'
import { paginationData } from '../../utils/constant'
const state = {
  allRoles: []
}

const mutations = {
  SET_ALL_ROLES: (state, allRoles) => {
    state.allRoles = allRoles
  }
}

const actions = {
  // 获取所有角色列表
  async setAllRoles({ commit }) {
    const { data } = await getRoles(paginationData())
    const allRoles = []
    if (data && data.list) {
      const roles = data.list
      for (let i = 0; i < roles.length; i++) {
        if (!roles[i].sysMenuList) {
          const { data } = await getRoleInfo(roles[i].id)
          const sysMenuList = formatServiceRoutes(data.sysMenuList)
          allRoles.push({ ...roles[i], sysMenuList })
          // console.log('allRoles', allRoles)
        }
      }
    }
    commit('SET_ALL_ROLES', allRoles)
    // return allRoles
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
