/**
 * @description 公共组件 plugin
 */
import { Layout, Header, Aside, Content, Footer } from './layout/index'
import { BoxCenter, BoxSingleCenter, BoxSkin, BoxMagazine } from './box/index'

const components = {
  Layout,
  Header,
  Aside,
  Footer,
  Content,
  BoxCenter,
  BoxSingleCenter,
  BoxSkin,
  BoxMagazine,
}
const install = app => {
  Object.keys(components).forEach(key => {
    app.component(components[key]['name'], components[key])
  })
}

const appUI = {
  install,
}

export default appUI
