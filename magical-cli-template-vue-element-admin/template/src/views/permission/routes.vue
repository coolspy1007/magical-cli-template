<template>
  <div class="menu-routes">
    <el-button
      type="primary"
      size="small"
      @click="handleMainRouteAdd()"
    >添加主菜单</el-button>
    <!-- <el-button v-permission="delBtn" type="danger">删除</el-button> -->
    <el-tree
      :data="routes"
      node-key="id"
      default-expand-all
      :props="defaultProps"
      :expand-on-click-node="false"
    >
      <span slot-scope="{ node, data }" class="menu-routes__item">
        <span>{{ node.label }}</span>
        <span style="margin-left:50px">
          <el-button
            size="mini"
            type="success"
            icon="el-icon-plus"
            circle
            @click="handleAppend(data)"
          />
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-edit"
            circle
            @click="handleEdit(data)"
          />
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            circle
            @click="handleDelete(node, data)"
          />
          <el-button
            size="mini"
            type="primary"
            @click="handleDataRules(node, data)"
          >数据规则</el-button>
        </span>
      </span>
    </el-tree>
    <el-dialog
      :title="dialogType === 'edit' ? '编辑菜单' : '新增菜单'"
      :visible.sync="routeDialogFormVisible"
    >
      <el-form label-width="80px" label-position="left">
        <el-form-item label="菜单类型">
          <el-radio-group v-model="route.menuType">
            <el-radio :label="1">菜单</el-radio>
            <el-radio :label="2">按钮</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="菜单名称">
          <el-input v-model="route.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="code">
          <el-input v-model="route.code" autocomplete="off" />
        </el-form-item>
        <el-form-item v-if="route.menuType === 1" label="路由地址">
          <el-input v-model="route.path" autocomplete="off" />
        </el-form-item>
        <el-form-item v-if="route.menuType === 1" label="菜单图标">
          <el-input v-model="route.icon" autocomplete="off" />
        </el-form-item>
        <el-form-item v-if="route.menuType === 1" label="组件名称">
          <el-input v-model="route.component" autocomplete="off" />
        </el-form-item>
        <el-form-item label="是否展示">
          <el-switch v-model="route.isShow" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="routeDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmRoute">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="数据规则" :visible.sync="dataRulesDialogVisible">
      <el-button
        type="primary"
        size="small"
        @click="handleRuleAdd()"
      >添加</el-button>
      <el-table
        :data="dataRules"
        style="width: 100%;height:500px;overflow-y:auto"
      >
        <el-table-column prop="name" label="数据规则名称" width="180" />
        <el-table-column prop="sqlSegment" label="自定义sql" width="180" />
        <el-table-column prop="remarks" label="备注" />
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="handleRuleEdit(scope.row)"
            >编辑</el-button>
            <el-button
              type="text"
              size="small"
              @click="handleRuleDelete(scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <el-dialog
      title="编辑数据规则"
      :visible.sync="editDataRuleDialogFormVisible"
    >
      <el-form label-width="100px" label-position="left">
        <el-form-item label="数据规则名称">
          <el-input v-model="dataRule.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="自定义sql">
          <el-input v-model="dataRule.sqlSegment" autocomplete="off" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="dataRule.remarks" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          @click="editDataRuleDialogFormVisible = false"
        >取 消</el-button>
        <el-button type="primary" @click="confirmDataRules">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { addRoute, editRoute, deleteRoute } from '@/api/routes'
import {
  getMenuRules,
  addMenuRule,
  deleteMenuRule,
  editMenuRule
} from '@/api/menuDataRules'
// import { deepClone } from '@/utils'

const rootRouteId = 1 // 根节点
const defaultRoute = {
  name: '',
  path: '',
  isShow: false,
  icon: '', // 小图标
  component: '',
  menuType: 1,
  parentId: rootRouteId,
  code: ''
}
const defaultDataRule = {
  name: '',
  sqlSegment: '',
  remarks: '',
  menuId: 0
}
export default {
  name: 'Routes',
  components: {},
  data() {
    return {
      editDataRuleDialogFormVisible: false,
      dataRulesDialogVisible: false,
      dataRule: Object.assign({}, defaultDataRule),
      dataRules: [],
      routes: [],
      dialogType: 'new',
      dataRuledialogFormType: 'new',
      route: Object.assign({}, defaultRoute),
      routeDialogFormVisible: false,
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  computed: {
    // delBtn() {
    //   return getRolesOfBtn('MyOrder_delBtn')
    // }
  },
  created() {
    this.getRoutes()
  },
  methods: {
    ...mapGetters(['allRoutes']),
    async getRoutes() {
      this.routes = await this.allRoutes()
      console.log('this.routes', this.routes)
    },
    async handleDataRules(node, data) {
      const { data: dataRules } = await getMenuRules(data.id)
      this.dataRules = dataRules
      this.dataRule.menuId = data.id.toString()
      this.dataRulesDialogVisible = true
    },

    handleRuleAdd() {
      // console.log('this.dataRules', this.dataRules)
      this.dataRuledialogFormType = 'new'
      const menuId = this.dataRule.menuId
      this.dataRule = Object.assign({}, defaultDataRule)
      this.dataRule.menuId = menuId
      this.editDataRuleDialogFormVisible = true
    },
    handleRuleEdit(row) {
      // console.log('row-----edit----', row)
      this.dataRuledialogFormType = 'edit'
      this.dataRule = row
      this.editDataRuleDialogFormVisible = true
    },
    async confirmDataRules() {
      if (this.dataRuledialogFormType === 'edit') {
        await editMenuRule(this.dataRule)
      } else {
        await addMenuRule(this.dataRule)
      }
      this.$notify({
        title: 'Success',
        dangerouslyUseHTMLString: true,
        message: `操作成功`,
        type: 'success'
      })
      this.editDataRuleDialogFormVisible = false
    },

    handleRuleDelete(row) {
      // console.log('row-----del---', row)
      this.$confirm('确定要删除此规则么?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          await deleteMenuRule(row.id)
          this.$message({
            type: 'success',
            message: '删除成功！'
          })
        })
        .catch(err => {
          console.error(err)
        })
    },

    handleMainRouteAdd() {
      // console.log('this.route', this.route)
      this.dialogType = 'new'
      this.route = Object.assign({}, defaultRoute)
      this.routeParent = this.routes
      this.routeDialogFormVisible = true
    },
    handleAppend(data) {
      // console.log('data', data)
      this.dialogType = 'new'
      this.route = Object.assign({}, defaultRoute)
      this.route.parentId = data.id
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      this.routeParent = data
      this.routeDialogFormVisible = true
    },

    handleEdit(data) {
      console.log('this.route', this.route)
      console.log('data', data)
      this.route.isShow = !!this.route.isShow
      this.dialogType = 'edit'
      this.route = data
      this.routeDialogFormVisible = true
    },
    generateRoutesArr(routes) {
      let data = []
      routes.forEach(route => {
        data.push(route)
        if (route.children) {
          const temp = this.generateRoutesArr(route.children)
          if (temp.length > 0) {
            data = [...data, ...temp]
          }
        }
      })
      return data
    },
    async confirmRoute() {
      const isEdit = this.dialogType === 'edit'
      this.route.isShow = this.route.isShow ? 1 : 0
      if (isEdit) {
        await editRoute(this.route)
      } else {
        // const { data } = await addRoute(this.route)
        // this.route.id = data.id
        await addRoute(this.route)
        if (this.routeParent.children) {
          this.routeParent.children.push(this.route)
        } else {
          this.routeParent.push(this.route)
        }
      }
      this.routeDialogFormVisible = false
      this.$notify({
        title: 'Success',
        dangerouslyUseHTMLString: true,
        message: `操作成功`,
        type: 'success'
      })
    },
    handleDelete(node, data) {
      // console.log('data', data)
      this.$confirm('确定要删除么?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          await deleteRoute(data.id)
          const parent = node.parent
          const children = parent.data.children || parent.data
          const index = children.findIndex(d => d.id === data.id)
          children.splice(index, 1)
          this.$message({
            type: 'success',
            message: '删除成功！'
          })
        })
        .catch(err => {
          console.error(err)
        })
    }
  }
}
</script>
<style scoped>
.menu-routes {
  padding: 20px;
}
.menu-routes__item span {
  margin-right: 20px;
}
</style>
<style>
.menu-routes .el-tree-node__content {
  height: 40px !important;
}
</style>
