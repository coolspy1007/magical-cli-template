<template>
  <div class="app-container">
    <el-button type="primary" @click="handleAddRole">
      {{ $t('permission.addRole') }}
    </el-button>

    <el-table :data="rolesList" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="Role Key" width="220">
        <template slot-scope="scope">
          {{ scope.row.roleCode }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="角色名称" width="220">
        <template slot-scope="scope">
          {{ scope.row.roleName }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="描述">
        <template slot-scope="scope">
          {{ scope.row.remark }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope)">
            {{ $t('permission.editPermission') }}
          </el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)">
            {{ $t('permission.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :visible.sync="dialogVisible"
      :title="dialogType === 'edit' ? '编辑角色' : '新增角色'"
    >
      <el-form :model="role" label-width="80px" label-position="left">
        <el-form-item label="Role key">
          <el-input v-model="role.roleCode" placeholder="Role key" />
        </el-form-item>
        <el-form-item label="角色名称">
          <el-input v-model="role.roleName" placeholder="角色名称" />
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input
            v-model="role.remark"
            :autosize="{ minRows: 2, maxRows: 4 }"
            type="textarea"
            placeholder="角色描述"
          />
        </el-form-item>
        <el-form-item label="角色权限">
          <el-tree
            ref="tree"
            :check-strictly="checkStrictly"
            :data="routesData"
            :props="defaultProps"
            show-checkbox
            node-key="id"
            class="permission-tree"
          />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible = false">
          {{ $t('permission.cancel') }}
        </el-button>
        <el-button type="primary" @click="confirmRole">
          {{ $t('permission.confirm') }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import path from 'path'
import { deepClone } from '@/utils'
import {
  // getRoutes,
  // getRoles,
  addRole,
  deleteRole,
  updateRole
} from '@/api/role'
import i18n from '@/lang'
import { mapGetters } from 'vuex'

const defaultRole = {
  roleCode: '',
  roleName: '',
  remark: '',
  sysMenuList: []
}
export default {
  data() {
    return {
      role: Object.assign({}, defaultRole),
      routes: [],
      rolesList: [],
      dialogVisible: false,
      dialogType: 'new',
      checkStrictly: false,
      defaultProps: {
        children: 'children',
        label: 'title'
      }
    }
  },
  computed: {
    routesData() {
      return this.routes
    }
  },
  created() {
    // Mock: get all routes and roles list from server
    this.getRoutes()
    this.getRoles()
  },
  methods: {
    ...mapGetters(['allRoutes', 'allRoles']),
    async getRoutes() {
      // const res = await getRoutes()
      // this.serviceRoutes = res.data
      const res = await this.allRoutes()
      this.serviceRoutes = res
      const routes = this.generateRoutes(res)
      this.routes = routes
      // console.log('serviceRoutes', this.serviceRoutes)
      // console.log('this.routes', this.routes)
    },
    async getRoles() {
      // const res = await this.$store.dispatch('role/getAllRoles')
      this.rolesList = this.allRoles()
      // console.log('this.rolesList', this.rolesList)
    },
    i18n(routes) {
      const app = routes.map(route => {
        route.title = i18n.t(`route.${route.title}`)
        if (route.children) {
          route.children = this.i18n(route.children)
        }
        return route
      })
      return app
    },
    // Reshape the routes structure so that it looks the same as the sidebar
    generateRoutes(routes, basePath = '/') {
      const res = []

      for (const route of routes) {
        // skip some route
        if (route.hidden) {
          continue
        }
        // const onlyOneShowingChild = this.onlyOneShowingChild(
        //   route.children,
        //   route
        // )

        // if (route.children && onlyOneShowingChild && !route.alwaysShow) {
        //   route = onlyOneShowingChild
        // }

        const data = {
          // path: path.resolve(basePath, route.path),
          id: route.id,
          title: route.meta && route.meta.title
        }

        // recursive child routes
        if (route.children) {
          data.children = this.generateRoutes(route.children, data.path)
        }
        res.push(data)
      }
      return res
    },
    generateArr(routes) {
      let data = []
      routes.forEach(route => {
        data.push(route)
        if (route.children) {
          const temp = this.generateArr(route.children)
          if (temp.length > 0) {
            data = [...data, ...temp]
          }
        }
      })
      return data
    },
    handleAddRole() {
      this.role = Object.assign({}, defaultRole)
      if (this.$refs.tree) {
        this.$refs.tree.setCheckedNodes([])
      }
      this.dialogType = 'new'
      this.dialogVisible = true
    },
    handleEdit(scope) {
      // console.log('scope', scope.row)
      this.dialogType = 'edit'
      this.dialogVisible = true
      this.checkStrictly = true
      this.role = deepClone(scope.row)
      this.$nextTick(() => {
        // console.log('this.role.sysMenuList', this.role.sysMenuList)
        const routes = this.generateRoutes(this.role.sysMenuList)
        // console.log('this.generateArr(routes)', this.generateArr(routes))
        this.$refs.tree.setCheckedNodes(this.generateArr(routes), true)
        this.checkStrictly = false
      })
    },
    handleDelete({ $index, row }) {
      this.$confirm('确定要删除该角色么?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          await deleteRole(row.id)
          this.rolesList.splice($index, 1)
          this.$message({
            type: 'success',
            message: '删除成功！'
          })
        })
        .catch(err => {
          console.error(err)
        })
    },
    generateTree(routes, checkedKeys) {
      const res = []
      for (const route of routes) {
        const routeId = route.id
        // recursive child routes
        if (route.children) {
          route.children = this.generateTree(route.children, checkedKeys)
        }
        if (
          checkedKeys.includes(routeId) ||
          (route.children && route.children.length >= 1)
        ) {
          res.push(route)
        }
      }
      return res
    },
    async confirmRole() {
      const isEdit = this.dialogType === 'edit'
      // console.log(this.$refs.tree)
      const checkedKeys = this.$refs.tree.getCheckedKeys()
      // console.log('checkedKeys', checkedKeys)
      this.role.sysMenuList = this.generateTree(
        deepClone(this.serviceRoutes),
        checkedKeys
      )

      // console.log('this.role.sysMenuList', this.role.sysMenuList)
      // console.log('this.role', this.role)
      if (isEdit) {
        await updateRole(this.role)
        for (let index = 0; index < this.rolesList.length; index++) {
          if (this.rolesList[index].id === this.role.id) {
            this.rolesList.splice(index, 1, Object.assign({}, this.role))
            break
          }
        }
        // console.log('this.rolesList  edited', this.rolesList)
      } else {
        const { data } = await addRole(this.role)
        this.role.id = data.id
        this.rolesList.push(this.role)
      }

      // const { description, key, name } = this.role
      this.dialogVisible = false
      this.$notify({
        title: 'Success',
        dangerouslyUseHTMLString: true,
        message: `操作成功`,
        type: 'success'
      })
    },
    // reference: src/view/layout/components/Sidebar/SidebarItem.vue
    onlyOneShowingChild(children = [], parent) {
      let onlyOneChild = null
      const showingChildren = children.filter(item => !item.hidden)

      // When there is only one child route, the child route is displayed by default
      if (showingChildren.length === 1) {
        onlyOneChild = showingChildren[0]
        onlyOneChild.path = path.resolve(parent.path, onlyOneChild.path)
        return onlyOneChild
      }

      // Show parent if there are no child route to display
      if (showingChildren.length === 0) {
        onlyOneChild = { ...parent, path: '', noShowingChildren: true }
        return onlyOneChild
      }

      return false
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  .roles-table {
    margin-top: 30px;
  }
  .permission-tree {
    margin-bottom: 30px;
  }
}
</style>
