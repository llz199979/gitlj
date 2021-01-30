<template>
  <div id="bluetooth" class="wrapper" style="overflow-y: auto;">
    <!-- bluetooth -->
    <article style="padding:6px; 0px;height:calc(100% - 36px);">
      <div id="header">
        <labelTop :label-info="labelInfo" @sizeChange="sizeChange" @currentChange="currentChange" />
        <p id="button" class="clearfix">
          <el-button type="success" size="mini" @click="classLeaderVisible = true;" round>
            <i class="el el-icon-circle-plus-outline" />添加
          </el-button>
           <!-- <el-button
        size="mini"
        type="danger"
        round
        @click="deleteBatch"
      >
        <i class="el el-icon-delete" />删除
      </el-button> -->
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
            <label>
              学生姓名
              <el-input
                v-model="rule.studentName"
                size="mini"
                style="width:110px;"
                placeholder="根据姓名查询"
              />
            </label>
           
            <el-select v-model="rule.titleId" placeholder="选择职务查询"  size="mini" style="width:130px;">
              <el-option v-for="(v,i) in get_Job" :key="i"
               :label="v.title" :value="v.id"></el-option>
            </el-select>
            <el-button type="primary" size="mini" round @click="clearSearch">清空</el-button>
          </span>
        </p>
      </div>
      <!-- 班干添加 -->
      <el-dialog :modal="false"
      title="班干部" width="500px"
      :visible.sync="classLeaderVisible"
      style="position:absolute;z-index:3333;"
      center>
      <el-form style="margin:0 50px;"
       ref="cleassLeader" :model="classLeader" :rules="rules"
        label-width="70px" label-position="left">
          <!-- {{get_Job}} -->
          <el-form-item label="职务" prop="titleId" >
            <el-select clearable filterable allow-create
            size="small" class="input_220" default-first-option
             v-model="classLeader.titleId" placeholder="请选择班干部名称">
              <el-option v-for="(v,i) in get_Job" :key="i"
               :label="v.title" :value="v.id"></el-option>
            </el-select>
          </el-form-item>
          <!-- {{get_class_student}} -->
          <el-form-item label="学生姓名" prop="studentId" >
            <el-select clearable filterable allow-create
            size="small" class="input_220" default-first-option
             v-model="classLeader.studentId" placeholder="请选择学生名">
              <el-option v-for="(v,i) in get_class_student" :key="i"
               :label="v.studentName" :value="v.id"></el-option>
            </el-select>
          </el-form-item>
        <el-form-item label-width="0" style="text-align:center;">
          <el-button size="medium" round type="primary"  @click="classLeaderSubmit('cleassLeader', classLeader)">确定</el-button>
          <el-button size="medium" round @click="classLeaderVisible = false">取消</el-button>
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
          <el-table-column align="center" prop="studentName" label="班干姓名" />
          <el-table-column align="center" label="职务" prop="title">
            <template slot-scope="scope">{{scope.row.title}}</template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="200">
              <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                icon="el-icon-delete"
                round
                @click="deletes(scope.row.id)"
              />
               </template>
          </el-table-column>
        </el-table>
      </template>
    </article>
  </div> 
</template>
<script>
import labelTop from "../../components/label";
export default {
  name: "classLeader",
  components: { labelTop },
  data() {
    return {
     classLeaderVisible: false, //班干部
      labelInfo: {
        avatar: "el-icon-set-up",
        level1: "信息管理",
        level2: "班干信息",
        total: 0,
      },
      classLeader: { //班干部对象
      },
       gradeId: '',
      classId: '',
      classList: [],
      selection: [],
      pageSize: 50,
      currentPage: 1,
      rules: {
        classLeaderTitle: { required: true, message: "请输入学生姓名", trigger: "blur" },
        // placeId:  {required: true, message: '请输入教室Id', trigger: 'blur'}
      },
      rule: {
        id: "",
        classId:"",
        studentName: "",
        titleId: "",
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
    get_Job(){
     return this.$store.getters.get_Job;
    },
    get_class_student(){
      return this.$store.getters.get_class_student; 
    },
     get_classLeader(){
      return this.$store.getters. get_classLeader; 
    },
    sdata() {
      let data = this.$store.getters.get_classLeader;
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
   this.$store.dispatch('getJob');
  },
  methods: {
    setData() {
      let data = this.$store.getters.get_Job;
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
      this.rule.studentName = "";
      this.rule.titleId = "";
      this.rule.gradeId = '';
      this.rule.id = '';
    },
     classLeaderSubmit(form, classLeader) { //班干部
      this.$refs[form].validate(valid => {
        if(valid) {
          this.$store.dispatch('addClassLeader', classLeader)
          .then(() => {
            this.classLeaderVisible = false;
            this.classLeader = {}
          }).catch(err => {
            // console.log(err);
          })
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
        this.$store.dispatch('getClassLeader')//渲染班干列表
        .then(res => {
          this.classStudent = res;
        })
       .catch(err => {
        })
      }
    },
     deletes(id){   
          this.$confirm('此操作删除学生信息，是否继续？', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
          }).then(() => {
            this.$store.dispatch('delClassLeader',id)
          }).catch(() => {
    
          })
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
