<template>
  <div id="bluetooth" class="wrapper" style="overflow-y: auto;">
    <!-- bluetooth -->
    <article style="padding:6px; 0px;height:calc(100% - 36px);">
      <div id="header">
        <labelTop :label-info="labelInfo" @sizeChange="sizeChange" @currentChange="currentChange" />
        <p id="button" class="clearfix">
          <el-button type="success" size="mini" @click="classTeacherVisible = true;" round>
            <i class="el el-icon-circle-plus-outline" />添加
          </el-button>
           <el-button
        size="mini"
        type="danger"
        round
        @click="deleteBatch"
      >
        <i class="el el-icon-delete" />删除
      </el-button>
          <!-- <span class="right" v-show="selectVisible" style="margin:4px;display:inline-block;">
            <label>年级{{rule.gradeId}}
         <el-select size="small" clearable @change="gradeChange" v-model="gradeId" placeholder="请先选择年级">
              <el-option v-for="(v, i) in getGrade"
              :key="i" :value="v.id" :label="v.gradeName"></el-option>
            </el-select>
        </label>
        <label>班级{{rule.classId}}
         <el-select size="small" no-data-text="请先选择年级"
            v-model="classId" @change="classChange" placeholder="请选择班级">
              <el-option v-for="(v, i) in classList"
              :key="i" :value="v.id" :label="v.className"></el-option>
            </el-select>
        </label> -->
         <span class="right" style="margin:4px;display:inline-block;">
            <label>年级{{rule.gradeId}}
         <el-select size="small" clearable @change="gradeChange" v-model="gradeId" placeholder="请先选择年级">
              <el-option v-for="(v, i) in getGrade"
              :key="i" :value="v.id" :label="v.gradeName"></el-option>
            </el-select>
        </label> 
        <label>班级{{rule.classId}}
         <el-select size="small" no-data-text="请先选择年级"
            v-model="classId" @change="classChange" placeholder="请选择班级">
              <el-option v-for="(v, i) in classList"
              :key="i" :value="v.id" :label="v.className"></el-option>
            </el-select>
        </label>
        
            <!-- <label>
              老师姓名 
             <el-select v-model="rule.teacherId" placeholder="选择姓名查询"  size="mini" style="width:130px;">
                <el-option v-for="(v, i) in getTeachers" :key="i" :label="v.name" :value="v.id"></el-option>
            </el-select>
            </label>
           
            <el-select v-model="rule.courseId" placeholder="选择学科查询"  size="mini" style="width:130px;">
               <el-option v-for="(c, i) in get_CourseList"
                  :key="i"
                  :label="c.name"  :value="c.id"></el-option>
            </el-select>
            <el-button type="primary" size="mini" round @click="clearSearch">清空</el-button> -->
          </span>
        </p>
      </div>
      <!-- 添加班级任课老师 -->
     <el-dialog :modal="false" fullScreen
          title="添加任课老师" width="600px"
          :visible.sync="classTeacherVisible" top="8vh"
          center :inline="true">
      <el-form style="width:90%;margin:0 20px;"
       ref="classTeacher" :rules="rules"
       :model="course_teacher"
        label-width="70px" label-position="left">
          <!-- <p v-for="v in courseNum" :key="v"> -->
            <!-- {{get_CourseList}} -->
            <el-form-item prop="courseId" label="学科" style="display:inline-block;width:230px;">
              <el-select clearable filterable  size="small"  style="width:140px;"
              v-model="course_teacher.courseId"
              placeholder="请选择学科">
                <el-option v-for="(c, i) in get_CourseList"
                  :key="i"
                  :label="c.name"  :value="c.id"></el-option>
              </el-select>
            </el-form-item>
        <!-- {{getTeachers}} -->
            <el-form-item label="任课老师" prop="teacherId" style="display:inline-block;width:230px;">
              <el-select clearable style="width:140px;"
               size="small" filterable
              v-model="course_teacher.teacherId" @change="courseChange"
              placeholder="请选择任课老师">
                <el-option v-for="(v, i) in getTeachers" :key="i" :label="v.name" :value="v.id"></el-option>
              </el-select>
            </el-form-item>
          <!-- </p> -->
          <!-- <p class="btn_weeknum">
            <el-button size="mini"
           type="success" class="animated fadeIn" icon="el-icon-circle-plus"
           @click="courseNumChange"
           circle></el-button>
          <el-button v-if="courseNum > 1" size="mini"
           type="danger" class="animated fadeInLeft" icon="el-icon-remove-outline"
           @click="courseNumSubtract"
           circle></el-button>
          </p> -->
        <el-form-item label-width="0" style="text-align:center;">
          <el-button size="medium" round type="primary" @click="addTeacher('classTeacher', course_teacher)">确定</el-button>
          <el-button size="medium" round @click="classTeacherVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
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
          <el-table-column align="center" prop="teacherName" label="任课老师" />
          <el-table-column align="center" label="学科" prop="courseName">
            <template slot-scope="scope">{{scope.row.courseName}}</template>
          </el-table-column>
          <!-- <el-table-column align="center" label="操作" width="200"></el-table-column> -->
        </el-table>
      </template>
    </article>
  </div>
</template>
<script>
import labelTop from "../../components/label";
export default {
  name: "course_teacher",
  components: { labelTop },
  data() {
    return {
      // selectVisible:false,
     classTeacherVisible: false,
      labelInfo: {
        avatar: "el-icon-set-up",
        level1: "信息管理",
        level2: "任课老师",
        total: 0,
      },
     course_teacher: {
       deleteClassTeacherDTOList: [
    {
      "classId": 0,
      "teacherId": 0
    }
  ],
        // teacherId: '',
        // courseId: '',
        // teacherList: [],
        // teachers: []
        teacherName: '',
        courseName: '',
      },
       gradeId: '',
      classId: '',
      classList: [],
      selection: [],
      pageSize: 50,
      currentPage: 1,
      rules: {
        classLeaderTitle: { required: true, message: "请输入学生姓名", trigger: "blur" },
        weekday: { required: true, message: "请输入星期", trigger: "blur" },
        // placeId:  {required: true, message: '请输入教室Id', trigger: 'blur'}
      },
      rule: {
        id: "",
        classId:"",
        teacherId: '',
        courseId: '',
        pick: function () {
          var pickArr = [];
          for (let i in this) {
            if (this[i] !== "") {
              pickArr.push(i);
            }
          }
          pickArr.pop();
          return pickArr;
        },
      },
    };
  },
  computed: {
    getGrade(){
     return this.$store.getters.getGrade;
    },
    get_class_student(){
      return this.$store.getters.get_class_student; 
    },
    get_CourseList(){
      return this.$store.getters. get_CourseList; 
    },
    get_ClassTeachers(){
      return this.$store.getters.get_ClassTeachers; 
    },
    getTeachers(){
      return this.$store.getters.getTeachers; 
    },
    sdata() {
      let data = this.$store.getters.get_ClassTeachers;
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
      return data;
    },
     
  },
  mounted() {
  //  let isManager = this.$store.getters.getRole  == 'schoolManager';
  //   isManager? this.selectVisible = true : '';
  //   this.$store.dispatch('GradeList');
  //   if(localStorage.getItem('classId')){
  //     this.$store.dispatch('getClassStudent_');
      this.$store.dispatch('getTeachersInfo');
      // this.$store.dispatch('getClassTeachers');
      this.$store.dispatch('getCourseList');
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
    setData() {
      let data = this.$store.getters.get_ClassTeachers;
      this.labelInfo.total = data.length;
    },
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
    handleChange(classroom) {
      // console.log(classroom);
    },
    table_index(index) {
      return (this.currentPage - 1) * this.pageSize + index + 1;
    },
    sizeChange(v) {
      this.pageSize = v;
    },
    currentChange(v) {
      this.currentPage = v;
    },
    clearSearch() {
      this.rule.teacherId = "";
      this.rule.courseId = "";
      this.rule.gradeId = '';
      this.rule.id = '';
    },
    addTeacher(form, teacher) { //添加班级任课老师
      // console.log(teacher)
      this.$refs[form].validate(valid => {
        if(valid) {
          this.$store.dispatch('addClassTeacher', teacher)
          .then(res => {
            this.classTeacherVisible = false;
              this.course_teacher = {};
          })
        }else{
          return false;
        }
      })
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
        this.$store.dispatch('getClassTeachers')//渲染教师列表
        .then(res => {
          // this.classStudent = res;
        })
       .catch(err => {
        })
      }
    },
    deleteBatch() {
      if(this.selection.length){
          this.$confirm('此操作将删除任课老师信息，是否继续？', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error',
          center: true
          }).then(() => {
            let newTeacher={deleteClassTeacherDTOList:[]};
            this.selection.forEach(v => {
            let courseTeacher={"classId":0,"teacherId":0};
              courseTeacher.teacherId=v.teacherId;
              courseTeacher.classId=v.classId;            
               newTeacher.deleteClassTeacherDTOList.push(courseTeacher);
            })
            this.$store.dispatch('delClassTeacher',newTeacher)
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
    courseChange(v) {
        // console.log(v);
      },
    pick(parameter) {
      // 根据条件筛选：
      // console.log("keydown");
    },
  },
};
</script>
<style lang="scss" scope>
#bluetooth {
  background: rgb(243, 249, 248);
  #header {
    // height:80px;
    line-height: 20px;
    background: #fff;
    margin-bottom: 6px;
    position: relative;
    box-shadow: -2px -2px 2px #f0f0f0;
    #button {
      width: 100%;
      padding: 6px;
      // position:absolute;
      // right:40px;
      // top:44px;
      // text-align:center;
      // border:solid 1px;
      label {
        margin-right: 5px;
        .el-input {
          // width:118px;
          margin-left: 3px;
          // &:nth-last-child(1){
          margin-right: 4px;
          // }
        }
      }
    }
  }
  .table {
    width: 95%;
  }
  .tableHeader {
    background: #fff !important;
  }
}
</style>
