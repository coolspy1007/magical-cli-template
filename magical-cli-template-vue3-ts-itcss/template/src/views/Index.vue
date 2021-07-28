<template>
  <div>
    <h2 ml20>vue3 - TypeScript - ITCSS架构项目模板 </h2>
    <ul ml20>
      <li>- 使用 Sass 预编译语言处理 CSS</li>
      <li>- 采用 ITCSS 架构，包含一整套 CSS通用组件及样式 <router-link to="demo" font-quaternary>demo</router-link></li>
      <li>- 引入 normalize.css 去除浏览器默认样式</li>
      <li>- 引入 SassMagic 一些常用的 mixin </li>
    </ul>
    <h2 ml20>style 目录结构</h2>
    <ul ml20>
      <li>- acss -- 定义一些高可复用的原子属性样式</li>
      <li>- base -- 对 html 元素基础样式进行扩展补充</li>
      <li>- settings -- 定义公共变量</li>
      <li>- tools -- 定义可复用的 mixin ，包含 SassMagic</li>
      <li>- themes -- 主题样式</li>
    </ul>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>
