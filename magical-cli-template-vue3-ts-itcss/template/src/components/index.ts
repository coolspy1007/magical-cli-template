/**
 * @description 公共组件 plugin
 */
import { Layout, Header, Aside, Content, Footer } from './layout'
import { BoxCenter, BoxSingleCenter, BoxSkin, BoxMagazine } from './box'
import { App } from 'vue'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const components: { [key: string]: any } = {
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
const install = (app: App): void => {
  Object.keys(components).forEach(key => {
    app.component(components[key]['name'], components[key])
  })
}

const appUI = {
  install,
}

export default appUI
