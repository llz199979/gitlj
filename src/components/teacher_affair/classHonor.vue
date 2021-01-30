<template>
  <div
    id="notice"
    class="wrapper"
  >
    <div id="come" class="animated fadeIn">
        <p class="underline">
          <span class="openAclose">班级荣誉</span>
          <!-- 箭头盒子 -->
          <!-- <labelTop style="position:aboslute;top:-32px;z-index:2222;"
            :label-info="labelInfo"
            @sizeChange="sizeChange"
            @currentChange="currentChange"
          /> -->
        </p>
        <article id="noticeWrapper">
        <div id="header">
       
        <p id="button" class="clearfix">
          <el-button type="success" size="mini" @click="honorVisible = true;" round>
            <i class="el el-icon-circle-plus-outline" />添加
          </el-button>
           <el-button
        size="mini"
        type="danger"
        round
        @click="deletes"
      >
        <i class="el el-icon-delete" />删除
      </el-button>
          <span class="right" style="margin:4px;display:inline-block;">
            <label>年级
         <el-select size="small" clearable @change="gradeChange" v-model="gradeId" placeholder="请先选择年级">
              <el-option v-for="(v, i) in getGrade"
              :key="i" :value="v.id" :label="v.gradeName"></el-option>
            </el-select>
        </label>
        <label>班级
         <el-select size="small" no-data-text="请先选择年级"
            v-model="classId" @change="classChange" placeholder="请选择班级">
              <el-option v-for="(v, i) in classList"
              :key="i" :value="v.id" :label="v.className"></el-option>
            </el-select>
        </label>
          </span>
        </p>
      </div>

       <template>
        <el-table
          size="mini"
          row-class-name="table"
          header-cell-class-name="tableHeader"
          :data="sdata"
          height="90%"
          class="animated fadeInUp"
          @select="select"
          @select-all="selectAll"
        >
          <el-table-column :resizable="true" align="center" type="selection" />
          <!-- <el-table-column :resizable="true" v-for="(v,i) in form" align="center" :prop="v[0]" :label="v[1]" v-bind:key="i"></el-table-column> -->
          <el-table-column type="index" :index="table_index" width="70" label="序数" />
          <el-table-column align="center" prop="title" label="荣誉标题" />
          <el-table-column align="center" label="内容" prop="honourDesc">
            <template slot-scope="scope">{{scope.row.honourDesc}}</template>
          </el-table-column>
           <el-table-column
        align="center" 
        label="照片"
        prop="mediaUrlList"
        >
        <template slot-scope="scope">
          <viewer>
          <img :src="scope.row.mediaUrlList" style="width:50px;height:50px;" srcset="">
          </viewer>
        </template>
       </el-table-column>
          <!-- <el-table-column align="center" label="操作" width="200"></el-table-column> -->
        </el-table>
      </template>
          
          
      </article>
    </div>
    <!-- 荣誉添加 -->
     <el-dialog title="荣誉添加" :visible.sync="honorVisible" :modal="false" width="500px">
      <el-form label-width="80px" style="padding-left:26px;" label-position="left" ref="honour" :model="honour" :rules="rules" >
        <el-form-item prop="title" label="荣誉名称">
          <el-input size="small" class="input_260" v-model="honour.title"></el-input>
        </el-form-item>
        <el-form-item prop="honourDesc" label="描述">
          <el-input size="small" class="input_260" v-model="honour.honourDesc"></el-input>
        </el-form-item>
        <el-form-item prop="obtainTime" label="获奖时间">
          <el-date-picker size="small" style="width:260px;"
            v-model="honour.obtainTime"
            type="date" value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item prop="uploadFile" label="图片">
          <input id="uploadhonour" size="small" class="input_260"
          type="file" accept="image/*" multiple
           @change="uploadHonourChange"
           >
        </el-form-item>

        <el-form-item label-width="0" style="text-align:center;">
          <el-button size="medium" round type="primary" @click="addHonour('honour', honour)">确定</el-button>
          <el-button size="medium" round @click="honorVisible = false">取消</el-button>
          
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import labelTop from '../../components/paging';
import { getItem } from '../../util/localStorage'
import axios from 'axios';
export default {
  name: 'notice',
  components: {
    labelTop
  },
  data () {
    return {
      // selectVisible:false,
       honorVisible: false,  //荣誉
       honour: {
        uploadFile: '',
        title: '',
        honourDesc: '',
        obtainTime:'',
        
      },
       gradeId: '',
      classId: '',
      classList: [],
      selection: [],
      labelInfo: {
        // avatar: 'el-icon-user',
        // level1: '用户管理',
        // level2: '学生管理',
        total: 0
      },
      showClose: [],
      currentPage: 1,
      pageSize: 50,
       rules: {
        honourDesc: { required: true, message: "请输内容", trigger: "blur" },
        title: { required: true, message: "请输入标题", trigger: "blur" },
        // placeId:  {required: true, message: '请输入教室Id', trigger: 'blur'}
      },
       rule: {
         id:'',
        title: '',
        honourDesc: '',
        obtainTime: '',
        ownerId:'',
        pick: function () {
          var pickArr = []
          for (let i in this) {
            if(typeof this[i] == 'string'){
              this[i] = this[i].trim();
            }
            if (this[i] !== '') {
              pickArr.push(i)
            }
          }
          pickArr.pop()
          return pickArr
        }
      },
    }
  },
  computed: {
     getGrade(){
     return this.$store.getters.getGrade;
    },
    get_class_student(){
      return this.$store.getters.get_class_student; 
    },
     get_ClassHonors() {
      return this.$store.getters.get_ClassHonors;
    },
    sdata() {
      let data = this.$store.getters.get_ClassHonors;
      let rule = this.rule.pick();
      if (rule.length) {
        this.currentPage = 1;
      }
      rule.forEach((e) => {
        data = data.filter((v, i) => {
          if (v[e] != null) {
            return v[e].includes(this.rule[e]);
          }
        });
      });
      this.setData(rule, data);
      var prev = (this.currentPage - 1) * this.pageSize;
      data = data.slice(prev, this.pageSize + prev);
      // console.log('sdata()====>'+JSON.stringify(data));
      return data;
      // this.setData(data.length);
      // let prev = (this.currentPage - 1) * this.pageSize;
      // console.log(prev)
      // data = data.slice(prev, prev + this.pageSize);
      // console.log(JSON.stringify(data));
      // return data;
    },
   
    // getLevel(level) {
    //   return function(level) {
    //     switch(level) {
    //       case '1': return '紧急';break;
    //       case '2': return '考试';break;
    //       case '3': return '倒计时';break;
    //       case '4': return '普通';break;
    //     }
    //   }
    // },
    // getType(level) {
    //   return function(level) {
    //     switch(level) {
    //       case '1': return 'danger';break;
    //       case '2': return 'warning';break;
    //       case '3': return 'primary';break;
    //       case '4': return '全校';break;
    //     }
    //   }
    // },
    getDate(date) {
      return function(date) {
        let d = new Date(date);
        // let d_ = {
        //   year: d.getFullYear(),
        //   month: d.getMonth() + 1,
        //   day: d.getDate()
        // }
        let d_ = [d.Format('dd'), d.Format('yyyy MM-dd')]
        // console.log(d_)
        return d_;
      };
    }
  },
  mounted() {
    this.$store.dispatch('getClassHonors');
    //  let isManager = this.$store.getters.getRole  == 'schoolManager';
    // isManager? this.selectVisible = true : '';
    // this.$store.dispatch('GradeList');
    // if(localStorage.getItem('classId')){
    //   this.$store.dispatch('getClassStudent_');
    //   this.$store.dispatch('getTeachersInfo');
    // }else{
    //   if( isManager ) {
    //   this.$notify.error({
    //     title: '警告',
    //     message: '请先选择班级'
    //   })
    //   return ;
    //   }else{
    //     this.$notify.error({
    //       title: '警告',
    //       message: '您不是班主任，没有该管理权限'
    //     })
    //   }
    // }
  },
  methods: {
    select(selection, row) {
      // 单选
      this.selection = selection;
      // console.log(this.selection);
    },
    selectAll(selection) {
      // 多选
      // console.log(selection)
      this.selection = selection;
      // console.log(this.selection);
    },
    rowClick(row,s) {
      this.focusOne = row;
      // console.log(row);
      // console.log(s);
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
     table_index(index){
        return (this.currentPage-1) * this.pageSize + index + 1
    },
    closeClick(i) {
      // console.log(i)
      this.$refs[i].className = 'el-icon-close el';
      // console.log(this.$refs[i])
    },
     gradeChange(gradeId) {
      if(gradeId){
        this.classVisible = true;
        this.$store.dispatch('getClassListByGradeId', gradeId)
        .then(res => {
          // console.log(res);
          this.classList = res;
        }).catch(err => 
        console.log(err)
        )
      }
      this.classId = '';
    },
     classChange(classId) {
      if(classId) {
        // console.log(classId);
        localStorage.setItem('classId', classId)
        this.$store.dispatch('setClassId', classId);
        this.$store.dispatch('getClassStudent_')
        this.$store.dispatch('getClassHonors')//渲染班级荣誉
        .then(res => {
          // this.classStudent = res;
        })
       .catch(err => {
        })
      }
    },
    uploadHonourChange(file) {
      // console.log(file)
        this.honour.uploadFile = '';
      if(file) {
        this.honour.uploadFile = ' ';
      }else{
        this.honour.uploadFile = '';
      }
    },
     addHonour(form, honour) {
      this.$refs[form].validate(valid => {
         this.honorVisible = false;
        if(valid) {
          let uploadFile = document.querySelector('#uploadhonour').files;
          let formData = new FormData();
          if(uploadFile) {
            uploadFile.forEach(v => {
              formData.append('file', v);
            })
          }
          delete honour.uploadFile;
          this.$store.dispatch('uploadImage', formData)
          .then(res => {
            // console.log(res)
            honour.mediaIdList =[res];
            this.$store.dispatch('addClassHonor',honour)
            .then(() => {
              this.honorVisible = false;
              // this.honour = {};
              this.$store.dispatch('getClassHonors');
              document.querySelector('#uploadhonour').value = '';
            })
          }).catch(err => {
            
          })
          // console.log(honour);
        }
      })
    },
    deletes() {
      if(this.selection.length){
          this.$confirm('此操作将删除班级荣誉信息，是否继续？', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error',
          center: true
          }).then(() => {
            let classHonors=[];
            this.selection.forEach(v => {        
               classHonors.push(v.id);
            })
            this.$store.dispatch('delClassHonorByIds',classHonors)
          }).catch(() => {
    
          })
        }else{
          this.$message({
            message: '请选中至少一条数据',
            type: 'error',
            duration: 1500
          })
        }
    },
    // more(id) {
    //   console.log('more: ' + id)
    // }
  }
}
</script>
<style lang="scss" scope>
#notice{
  font-family: "PingFang SC";
  // font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  background:rgba($color: #fff, $alpha: 0.6);
  padding:6px;
  box-sizing: border-box;
  #come{
    height:100%;
    // box-shadow: -2px -2px 2px #aaa;
    // background: rgba(235,242,253,0.8);
    padding:4px;
    .underline{
      border-bottom:solid 1px #ccc;padding-bottom:6px;
      margin-bottom:9px;
      .openAclose{
          background:#fff;
          padding:4px;
          border-bottom:solid 2px #39f;
          color:#39f;
      }
    }
    #noticeWrapper{
      // padding:10px;
      box-sizing: border-box;
      height:calc(100% - 26px);
      overflow-y:auto;
      margin:10px;
      .everyOneNotice{
        padding:8px;
        border:solid 1px #ccc;
        // margin:10px 0;
        margin-bottom:10px;

        .header{
          padding:10px;
          font-size:14px;
          color:#fff;
          background:rgba($color: #3091f2, $alpha: 1.0)
        }
        .honorUl{
          li{
            // box-shadow:2px 2px 10px #ccc;
            padding:4px;
            // border:solid 1px;

          }
        }
        .imageShow{
          width:22%;height:160px;
          border:solid 1px #ccc;

          padding:1%;
          // margin:10px 4px;
          margin-right:4px;
          border-radius:8px;
        }
        .date{
          text-align:center;
          font-size:24px;
          display:inline-block;
          height:60px;
          width:80px;
          color:#333;
          padding:10px 0;
          line-height:28px;
          vertical-align:top;
          border:solid 1px #aaa;
          margin-top:10px;
          border-radius:4px;
          &>p:last-child{
            font-size:13px;
            color:#909399;
          }
        }
        .topic_wrapper{
          overflow:hidden;
          position:relative;
          display: inline-block;
          margin-left:10px;
          // border-top:solid 1px #aaa;
          border-bottom:solid 1px transparent;
          height:100px;
          width: calc(100% - 100px);
          &>li{
            padding:0 10px;
            // border:solid 1px;
            height:30px;
            line-height:30px;
          }
          .title{
            color:#000;
            font-size:14px;
            font-weight: bolder;
            .titleWidth{
              display:inline-block;
              width:180px;
              overflow:hidden;
              white-space:nowrap;
              text-overflow:ellipsis;
            }
          }
          // .type{
            
          // }
          .content{
            height:auto;
            width:calc(100% - 80px);
            // border-right:solid 1px;
            display:-webkit-box; //将对象作为弹性伸缩盒子模型显示。
            -webkit-box-orient:vertical; //从上到下垂直排列子元素（设置伸缩盒子的子元素排列方式）
            -webkit-line-clamp:2; //这个属性不是css的规范属性，需要组合上面两个属性，表示显示的行数
          }
          .operate{
            position:absolute;
            right:-10px;
            top:34px;
          }
        }
      }
    }
  }
}
.input_260{
    width:260px;
  }
</style>
