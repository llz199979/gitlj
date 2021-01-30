<template>
  <div id="bluetooth" class="wrapper" style="overflow-y: auto;">
    <!-- bluetooth -->
    <article style="padding:6px; 0px;height:calc(100% - 36px);">
      <div id="header">
        <labelTop :label-info="labelInfo" @sizeChange="sizeChange" @currentChange="currentChange" />
        <p id="button" class="clearfix">
          <el-button type="success" size="mini" @click="dialogVisible = true;" round>
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
           
            <el-select v-model="rule.weekday" placeholder="选择星期查询"  size="mini" style="width:130px;">
              <el-option
                v-for="item in statusList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-button type="primary" size="mini" round @click="clearSearch">清空</el-button>
          </span>
        </p>
      </div>
      <!-- 值日添加 -->
      <el-dialog
        v-el-drag-dialog
        custom-class="dialog"
        width="500px"
        top="10vh"
        :modal="false"
        :visible.sync="dialogVisible"
        :destroy-on-close="true"
        center
        title="值日添加"
      >
        <el-form
          :rules="rules"
          class="form refuseCopy"
          size="small"
          ref="addDutyList"
          :model="dutyList"
          label-position="left"
          label-width="80px"
        >
          
          <el-form-item>
            <el-form-item label="值日组长" prop="leader">
              <!-- {{get_class_student}} -->
              <el-select clearable size="small" style="width:200px;" 
              v-model="dutyList.studentIdList" 
              placeholder="请选择负责人">
                <el-option v-for="(v,i) in get_class_student" :key="i" :label="v.studentName" :value="v.id"></el-option>
              </el-select>
            </el-form-item>
             <el-form-item label="星期">
              <el-select clearable size="small"  style="width:200px;"
              v-model="dutyList.weekday" 
              placeholder="请选择星期">
                <el-option label="星期一" :key="1" value="星期一"></el-option>
                <el-option label="星期二" :key="2" value="星期二"></el-option>
                <el-option label="星期三" :key="3" value="星期三"></el-option>
                <el-option label="星期四" :key="4" value="星期四"></el-option>
                <el-option label="星期五" :key="5" value="星期五"></el-option>
                <el-option label="星期六" :key="6" value="星期六"></el-option>
                <el-option label="星期天" :key="7" value="星期天"></el-option>
              </el-select>
            </el-form-item>
            <el-button type="primary" @click="submit('addDutyList', dutyList)">确 定</el-button>
            <el-button @click="dialogVisible = false">取 消</el-button>
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
          <el-table-column align="center" prop="studentName" label="学生姓名" />
          <el-table-column align="center" label="星期" prop="weekday">
            <template slot-scope="scope">{{scope.row.weekday}}</template>
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
  name: "dutyList",
  components: { labelTop },
  data() {
    return {
      dialogVisible: false,
      bindVisible: false,
      labelInfo: {
        avatar: "el-icon-set-up",
        level1: "信息管理",
        level2: "值日信息",
        total: 0,
      },
       statusList: [{
          value: '星期一',
          label: '星期一'
        },
        {
          value: '星期二',
          label: '星期二'
        },
        {
          value: '星期三',
          label: '星期三'
        },
        {
          value: '星期四',
          label: '星期四'
        },
        {
          value: '星期五',
          label: '星期五'
        },
         {
          value: '星期六',
          label: '星期六'
        },
        {
          value: '星期天',
          label: '星期天'
        }
        ],
      dutyList: {
        classId: "",
        weekday: "",
       studentIdList:[],
      },
       gradeId: '',
      classId: '',
      classList: [],
      selection: [],
      pageSize: 50,
      currentPage: 1,
      rules: {
        studentIdList: { required: true, message: "请输入学生姓名", trigger: "blur" },
        weekday: { required: true, message: "请输入星期", trigger: "blur" },
        // placeId:  {required: true, message: '请输入教室Id', trigger: 'blur'}
      },
      rule: {
        id: "",
        classId:"",
        studentName: "",
        weekday: "",
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
    sdata() {
      let data = this.$store.getters.get_dutyList;
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
    // this.$store.dispatch("getDutyList");
  },
  methods: {
    setData() {
      let data = this.$store.getters.get_dutyList;
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
      this.rule.weekday = "";
      this.rule.gradeId = '';
      this.rule.id = '';
    },
    submit(formName, dutyList) {
      let that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogVisible = false;
            dutyList.classId=this.classId;
            dutyList.studentIdList=[dutyList.studentIdList]
            this.$store.dispatch('addDutyList', dutyList)
            .then(() => {
              that.dutyList = {}
            })
        } else {
          return false;
        }
      });
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
        this.$store.dispatch('getDutyList')
        .then(res => {
          this.classStudent = res;
        })
       .catch(err => {
        })
      }
    },
    deleteBatch() {
      if(this.selection.length){
          this.$confirm('此操作将删除学生信息，是否继续？', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error',
          center: true
          }).then(() => {
            let idList = [];
            this.selection.forEach(v => {
              idList.push(v.id);
            })
            this.$store.dispatch('delOnDutyListById', {idList})
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
