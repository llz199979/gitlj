<template>
  <div
    id="app"
    class="wrapper"
  >
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'App'
}
</script>

<style>
@import './assets/css/app.scss';
@import './assets/css/animate.css';
.el-form-item__label{
  margin-left:10px;
  position: relative;
}
.el-form-item__label:before{
  position: absolute;
  left:-10px;
}
.formMargin{
    margin:0 60px;
  }
</style>
