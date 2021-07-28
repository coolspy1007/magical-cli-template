<!-- 带背景色的容器面板，可设置上下边框 -->
<template>
  <div
    class="c-box-skin"
    :class="type ? 'c-box-skin--' + type : ''"
    bg-secondary
  >
    <slot></slot>
  </div>
</template>
<script lang="ts">
export default {
  name: 'CBoxSkin',
  props: {
    type: {
      validator: value => {
        return ['top', 'bottom'].includes(value)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@include b(c-box-skin) {
  @include m(top) {
    border-top: $border-base;
  }
  @include m(bottom) {
    border-bottom: $border-base;
  }
}
</style>
