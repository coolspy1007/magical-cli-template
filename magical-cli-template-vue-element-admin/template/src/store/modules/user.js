import { login, getInfo, getCurrentUser } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const state = {
  id: 0,
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: []
}

const mutations = {
  SET_ID: (state, id) => {
    state.id = id
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password })
        .then(response => {
          // 登录成功
          console.log(response)
          const { data } = response
          commit('SET_TOKEN', data.token)
          setToken(data.token)
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // 根据id获取用户信息
  getUserInfo({ commit, state }, userId) {
    return new Promise((resolve, reject) => {
      getInfo(state.token)
        .then(response => {
          const { data } = response
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // 获取当前你用户信息
  getCurrentUser({ commit, state }) {
    return new Promise((resolve, reject) => {
      getCurrentUser()
        .then(response => {
          const { data } = response
          if (!data) {
            reject('请重新登录')
          }
          const {
            sysRoleList,
            id,
            name = '',
            avatar = '',
            introduction = ''
          } = data
          const roles = sysRoleList.map(roleObj => roleObj.roleCode)
          const rolesId = sysRoleList.map(roleObj => roleObj.id)
          data.roles = roles
          data.rolesId = rolesId
          // roles must be a non-empty array
          if (!roles || roles.length <= 0) {
            reject('您没有任何权限')
          }
          commit('SET_ID', id)
          commit('SET_ROLES', roles)
          commit('SET_NAME', name)
          commit('SET_AVATAR', avatar)
          commit('SET_INTRODUCTION', introduction)
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    commit('SET_TOKEN', '')
    commit('SET_ROLES', [])
    removeToken()
    resetRouter()
    // return new Promise((resolve, reject) => {
    //   logout(state.token)
    //     .then(() => {
    //       commit('SET_TOKEN', '')
    //       commit('SET_ROLES', [])
    //       removeToken()
    //       resetRouter()

    //       // reset visited views and cached views
    //       // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
    //       dispatch('tagsView/delAllViews', null, { root: true })

    //       resolve()
    //     })
    //     .catch(error => {
    //       reject(error)
    //     })
    // })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  async changeRoles({ commit, dispatch }, role) {
    const token = role + '-token'

    commit('SET_TOKEN', token)
    setToken(token)

    const { roles } = await dispatch('getInfo')

    resetRouter()

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch('permission/generateRoutes', roles, {
      root: true
    })
    // dynamically add accessible routes
    router.addRoutes(accessRoutes)

    // reset visited views and cached views
    dispatch('tagsView/delAllViews', null, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
