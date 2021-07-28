<!-- 垂直水平居中 -->
<template>
  <div>
    <c-box-center class="box-center-demo" pl10 pr10 bg-tertiary>
      居中显示容器
    </c-box-center>
    <br />
    <c-box-magazine
      class="box-magazine-demo"
      bg-tertiary
      image="https://img01.yzcdn.cn/vant/cat.jpeg"
      pa10
    >
      <c-box-center
        class="box-magazine-demo__child"
        bg-primary
        font-primary
        radius10
      >
        杂志容器
      </c-box-center>
    </c-box-magazine>

    <br />
    <c-box-skin class="box-skin-demo" pa10 type="bottom" font-quaternary>
      带背景色的容器面板，可设置上下边框
    </c-box-skin>
    <br />
    <c-single-center class="box-single-center-demo">
      <h4 ml20 class="t-demo-text">单一方向居中（垂直）</h4>
      <c-box-center
        class="box-single-center-demo__child1"
        bg-primary
        font-primary
      >
        垂直水平居中
      </c-box-center>
      <c-box-magazine
        class="box-single-center-demo__child2"
        ml10
        image="https://img01.yzcdn.cn/vant/cat.jpeg"
        circle
      >
      </c-box-magazine>
    </c-single-center>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@include b(box-center-demo) {
  color: $color-white;
  @include dimensions(200px, 100px);
}

@include b(box-magazine-demo) {
  @include dimensions(200px, 100px);
  @include e(child) {
    @include dimensions(80px, 50px);
  }
}

@include b(box-skin-demo) {
  background: #fbfbfb;
  @include dimensions(500px, 50px);
}

@include b(box-single-center-demo) {
  background: #fbfbfb;
  @include dimensions(500px, 100px);
  @include e(child1) {
    @include dimensions(150px, 30px);
  }
  @include e(child2) {
    @include dimensions(80px, 80px);
  }
}
</style>
