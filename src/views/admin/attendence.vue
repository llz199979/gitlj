<template>
  <div
    id="self"
    class="wrapper animated fadeIn"
  >
    <!-- 个人中心 -->
      <article class="height_100">
        <el-row class="tac height_100">
        <el-col :span="4" style="height:100%;border-right:solid 1px #eee;">
          <el-menu class="refuseCopy" style="font-size:12px;" :router="true"
            :default-active="activeIndex" text-color="#909399"  
            active-text-color="#42b8a0"
            :unique-opened="true"
            @open="handleOpen"
            @close="handleClose">
            <el-menu-item class="liactive" index="/admin/attendence/teacherclock">
              <i class="el-icon-menu"></i>
              <span slot="title">教师考勤</span>
            </el-menu-item>
            <el-menu-item class="liactive" index="/admin/attendence/studentclock">
              <i class="el-icon-star-on"></i>
              <span slot="title">学生考勤</span>
            </el-menu-item>
           
          </el-menu>
        </el-col>
        <el-col :span="20" style="height:100%;">
          <router-view />
        </el-col>
      </el-row>
      </article>
  </div>
</template>
<script>
import fx from '../../util/fx';
import links from '../../components/links';
import axios from 'axios';
import {mapGetters} from 'vuex';
export default {
  name: 'Self',
  components: {
    links
  },
  data () {
    return {
      activeIndex: '',
    }
  },
  watch: {
    $route: {
      handler (val, oldVal) {
        this.activeIndex = val.path;
        // console.log('watch')
        // console.log(oldVal.path)
        // console.log(this.activeIndex)
      }
    }
  },
  computed: {
   
    },
 
  methods: {
      handleOpen(key, keyPath) {
        // console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        // console.log(key, keyPath);
      },
 
  },
  mounted() {
  
  }
}
</script>

<style lang="scss" scoped>
  #self{
    background:#fff;
    padding:10px;
    .selfInfoWrapper{
      // background:#fff;
      display:flex;height:66px;justify-content:space-between;text-align:center;
        .selfCard{
          // max-width:324px;
          height:66px;width:24%;
        .cardLeft{
          line-height:54px;
          // border:solid 1px;
          width:calc(100% - 80px);
          // float:left;
          color:#fff;
          padding:6px;display:inline-block;
        }
        .cardRight{
          height:54px;width:54px;
          line-height:60px;
          padding:6px;
          float:right;
          background:rgba(120,120,120,0.6);
        }
      }
    }
    .form{
      padding: 0 8%;
      font-size: 18px !important;
      // text-align: center;
    }
    .el-dialog__header{
      // background:#1296db;
      background-image: linear-gradient(to right, #2980b9, #6dd5fa, #fff);
      .el-dialog__title{
        color:#fff !important;
      }
    }
    .el-dialog__body{
      // background:#efefef;
      // background-image: linear-gradient(to right, #C6FFDD, #FBD786, #f7797d);

    }
    #uploadForm{
      width:80%;
      margin: 0px 110px 20px;
    }
  }
  .el-upload-list{
    li{
      float:left;
    }
  }
  .hide .el-upload--picture-card{
    display:none;
  }
  .input_400{
    width:400px;
  }
  .aside-menu{
      font-size:13px;
      height:100%;
    }
  .el-menu-item{
  width:100%;font-size:13px;
  min-width:auto;
}
.el-submenu__title{
      font-size:13px !important;
    }
  .el-menu-item{
    height:50px;
  }
  li{
    .is-active{
      // background:rgb(236, 245, 255);
      background:rgba(198, 255, 221,0.6);
    }
  }
  .liactive.is-active{
      background:rgba(198, 255, 221,0.6);
  }
  .el-menu-item.is-active::after{
    content:'';
    position:absolute;
    width: 2px;
    height:50px;
    right:0;
    background:#42b9a0;
  }
  .is-opened::after{
    width:0 !important;
  }
</style>
