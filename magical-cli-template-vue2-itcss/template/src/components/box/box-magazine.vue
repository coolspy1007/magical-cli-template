<!-- 带背景图的容器，图片铺满（杂志） -->
<template>
  <div :style="'position: relative; background: url('+image+') center; background-size: cover;'">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'CBoxMagazine',
  props: {
    image: String
  }
}
</script>