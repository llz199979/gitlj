<template>
  <div
    id="notice"
    class="wrapper"
  >
    <div id="come" class="animated fadeIn">
        <p class="underline">
          <span @click="transformVisible = true" :class="[transformVisible?'openAclose' : 'transformTab']">微课管理</span>
          <span @click="transformVisible = false" :class="[transformVisible?'transformTab' : 'openAclose']">微课分发</span>
          <!-- 箭头盒子 -->
          <labelTop style="position:absolute;top:-10px;right:10px;z-index:2222;"
            :label-info="labelInfo"
            @sizeChange="sizeChange"
            @currentChange="currentChange"
          />
        </p>
        <div style="height:100%;" v-if="transformVisible">
          <el-radio-group @change="gradeChange" size="mini" v-model="rule.gradeId" style="margin-bottom:10px;">
        <el-radio-button v-for="(v, i) in getGradeList" :key="i" :label="v.id">
          {{v.gradeName}}
        </el-radio-button>
      </el-radio-group>
        <article id="videoWrapper">
          <p class="everyOneNotice" @mousemove="index = i" @mouseleave="index = -1" v-for="(v, i) in get_gradeVideo" :key="i">
            <i v-if="index == i" class="el-icon-error animated fadeInDown"
            @click="deleteByGradeId(v.id)"
            style="font-size:18px;color:#f44;position:absolute;right:0;z-index:3333;"></i>
            <video style="border-radius:8px;border:solid 1px #ccc;" height="130" width="234" :src="v.url" controls="controls"></video>
            <ul class="topic">
              <li style="font-weight:bolder;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">【{{v.name}}】</li>
              <li style="color:#909399;">{{v.microDesc}}</li>
              <!-- <li>{{getGrade(v.gradeId)}}</li> -->
            </ul>
        </p>
        <!-- {{get_gradeVideo}} -->
        <i style="width:242px;"></i>
        <i style="width:242px;"></i>
        <i style="width:242px;"></i>
      </article>
        </div>
        <div v-else style="height:100%;">
          <el-button type="success" @click="addAssign" size="mini">添加</el-button>
          <!-- <el-radio-group size="mini" v-model="rule.gradeId" style="margin-bottom:10px;">
        <el-radio-button v-for="(v, i) in getGradeList" :key="i" :label="v.id">
          {{v.gradeName}}
        </el-radio-button>
      </el-radio-group> -->
        <article id="videoWrapper">
          <p class="everyOneNotice" @mousemove="index = i" @mouseleave="index = -1" v-for="(v, i) in get_video" :key="i">
            <i v-if="index == i" class="el-icon-error animated fadeInDown"
            @click="deletes(v.id)"
            style="font-size:18px;color:#f44;position:absolute;right:0;z-index:3333;"></i>
            <video style="border-radius:8px;border:solid 1px #ccc;" height="130" width="234" :src="v.url" controls="controls"></video>
            <ul class="topic">
              <li style="font-weight:bolder;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">【{{v.name}}】</li>
              <li style="color:#909399;">——{{v.microDesc}}</li>
              <!-- <li>{{getGrade(v.gradeId)}}</li> -->
               <el-checkbox @change="checkEvent(v)">选中</el-checkbox>
            </ul>
        </p>
        <i style="width:242px;"></i>
        <i style="width:242px;"></i>
        <i style="width:242px;"></i>
        <el-dialog title="添加微课" :visible.sync="videoVisible" :modal="false" width="540px">
      <el-form style="margin: 0 auto;width:400px;" label-width="100px" ref="video" :model="video" :rules="rules" >
        <!-- <el-form-item prop="name" label="微课名称">
          <el-input size="small" class="input_300" v-model="video.name"></el-input>
        </el-form-item> -->
        <el-form-item label="年级" prop="gradeId">
            <el-select class="input_300"
            size="small" v-model="video.gradeId" 
            placeholder="请选择年级">
              <el-option v-for="(v,i) in get_Grade" :key="i"
               :label="v.gradeName" :value="v.id"></el-option>
            </el-select>
          </el-form-item>
        <!-- <el-form-item prop="detailDesc" label="描述">
          <el-input size="small" class="input_300" v-model="video.detailDesc"></el-input>
        </el-form-item> -->
        <!-- <el-form-item prop="uploadFile" label="视频">
          <input id="uploadVideo" size="small" class="input_300" @change="videoRule"
          type="file" accept="video/*"
           >
        </el-form-item> -->

        <el-form-item label-width="0" style="text-align:center;">
          <el-button size="medium" round type="primary" @click="addVideo('video', video)">确定</el-button>
          <el-button size="medium" round @click="videoVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
      </article>
        </div>
    </div>
    
  </div>
</template>
<script>
import labelTop from "../../components/paging";
import { getItem } from "../../util/localStorage";
import axios from "axios";
export default {
  name: "notice",
  components: {
    labelTop,
  },
  data() {
    return {
      videoVisible: false,
      video: {},
      gradeList: [],
      gradeId: "",
      index: -1,
      labelInfo: {
        total: 0,
      },
      selection: [],
      transformVisible: true,
      rule: {
        gradeId: "",
      },
      rules: {},
      currentPage: 1,
      pageSize: 50,
    };
  },
  computed: {
    get_video() {
      // console.log(this.$store.getters.get_video)
      return this.$store.getters.get_video;
    },
    get_gradeVideo() {
      return this.$store.getters.get_gradeVideo;
    },
    sdata() {
      let data = this.$store.getters.get_video;
      // this.setData(data.length);
      // if(this.rule.gradeId) {
      //   console.log(data)

      // //   console.log(this.rule.gradeId)
      //   data = data.filter(v => v.gradeId == this.rule.gradeId)
      // }
      // let prev = (this.currentPage - 1) * this.pageSize;
      // console.log(prev)
      // data = data.slice(prev, prev + this.pageSize);
      // console.log(data);
      return data;
    },
    get_Grade() {
      return this.$store.getters.getGrade;
    },
    getGradeList() {
      return this.$store.getters.getGrade;
    },
  },
  mounted() {
    this.$store.dispatch("getMicroClassList");
    this.$store.dispatch("GradeList");
    // this.gradeList = this.$store.getters.getGrade;
  },
  methods: {
    getGrade(id) {
      let gradeList = this.$store.getters.getGrade;
      let data = gradeList.find((v) => v.id == id);
      // console.log(data);
      if (data) {
        return data.gradeName;
      }
      return "无数据";
    },
    setData(len) {
      this.labelInfo.total = len;
    },
    sizeChange(page) {
      this.sizeChange = page;
      // console.log(page)
    },
    currentChange(page) {
      this.currentPage = page;
    },
    gradeChange(id) {
      // console.log(id);
      this.$store.dispatch("getGradeVideo", id);
    },
    addAssign() {
      if (this.selection.length) {
        this.videoVisible = true;
      } else {
        this.$notify({
          title: "警告",
          message: "请先选择一个视频",
          type: "error",
        });
      }
    },
    addVideo(form, video) {
      // console.log(video)
      video.microClassIds = this.selection;
      this.$store.dispatch("publishMicroClass", video);
    },
    checkEvent(video) {
      // console.log(video.id)
      // 是否查不到
      let flag = this.selection.indexOf(video.id) == -1;
      // console.log(flag)
      if (!flag) {
        this.selection.splice(this.selection.indexOf(video.id), 1);
      } else {
        this.selection.push(video.id);
      }
    },
    addGradeVideos() {
      // console.log('addGradeVideos')
    },
    deletes(id) {
      // console.log(id);
      this.$confirm("此操作将删除该视频，是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      })
        .then(() => {
          this.$store
            .dispatch("deleteVideo", id)
            .then((res) => {
              // console.log(res);
            })
            .catch((err) => {
              // console.log(err);
            });
        })
        .catch(() => {});
    },
    deleteByGradeId(id) {
      let gradeId = this.rule.gradeId;
      // console.log(this.rule.gradeId)
      // console.log(id)
      let obj = {
        gradeId: this.rule.gradeId,
        microClassId: id,
      };
      this.$store.dispatch("deleteVideoByGradeId", obj);
    },
    more(id) {
      // console.log('more: ' + id)
    },
  },
};
</script>
<style lang="scss" scoped>
#notice {
  font-family: "PingFang SC";
  // font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  // background:rgba($color: #fff, $alpha: 0.6);
  padding: 6px;
  box-sizing: border-box;
  #come {
    height: 100%;
    // box-shadow: -2px -2px 2px #aaa;
    // background: rgba(235,242,253,0.8);
    padding: 4px;
    .underline {
      position: relative;
      border-bottom: solid 1px #ccc;
      padding-bottom: 6px;
      margin-bottom: 9px;
      .openAclose {
        background: #fff;
        padding: 4px;
        border-bottom: solid 2px #39f;
        color: #39f;
        cursor: pointer;
      }
      .transformTab {
        padding: 4px;
        color: #999;
        cursor: pointer;
      }
    }
    #videoWrapper {
      height: calc(100% - 60px);
      width: 100%;
      // border:solid 1px;
      overflow-y: auto;
      display: flex;
      flex-wrap: wrap;
      align-content: flex-start;
      justify-content: space-around;
      // background:#f0f0f0;
      margin-top: 2px;
      border-radius: 3px;
      box-shadow: inset 0 0 2px 2px #f0f0f0;
      .everyOneNotice {
        position: relative;
        background: #fff;
        border-radius: 8px;
        border: solid 1px #ccc;
        padding: 2px;
        border-bottom: solid 1px #ccc;
        height: 200px;
        width: 242px;
        margin-top: 10px;
        .topic {
          text-align: center;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          .title {
            color: #000;
            font-size: 14px;
            font-weight: bolder;
            .titleWidth {
              display: inline-block;
              width: 180px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
          }
          .content {
            height: auto;
            width: calc(100% - 80px);
            // border-right:solid 1px;
            display: -webkit-box; //将对象作为弹性伸缩盒子模型显示。
            -webkit-box-orient: vertical; //从上到下垂直排列子元素（设置伸缩盒子的子元素排列方式）
            -webkit-line-clamp: 2; //这个属性不是css的规范属性，需要组合上面两个属性，表示显示的行数
          }
          .operate {
            position: absolute;
            right: -10px;
            top: 34px;
          }
        }
      }
    }
  }
}
</style>
