<!-- 水平垂直居中 -->
<template>
  <!-- 根据设计图确定 box 内容的主要字体颜色 -->
  <div class="c-box-center">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'CBoxCenter'
}
</script>

<style lang="scss" scoped>
@include b(c-box-center) {
  @include box-center;
}
</style>
