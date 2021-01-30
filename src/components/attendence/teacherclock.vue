<template>
  <div
    id="self"
    class="wrapper animated fadeIn"
  >
  
    <!-- 箭头盒子 -->
    <labelTop
      :label-info="labelInfo"
      @sizeChange="sizeChange"
      @currentChange="currentChange"
    />
    <div class="button clearfix">
     
      <el-button
        size="mini"
        type="success"
        round @click="attendVisible = true"
      >
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
     
    </div>
    <!-- 老师考勤添加 -->
    <el-dialog :modal="false"
      custom-class="dialog"
      width="500px"
      top="10vh"
      :visible.sync="attendVisible"
      :destroy-on-close="true"
      center
      title="老师考勤添加"
    >
      <el-form ref="addTeacherClock"
        class="form refuseCopy"
        size="small" :rules="rules"
        :model="attendence_type"
        label-width="100px"
      >
       <el-form-item label="考勤名称" prop="name">
          <el-input
            v-model="attendence_type.name"
            style="width:200px;"
            autocomplete="off" 
          />
        </el-form-item>
        <el-form-item label="开始时间" prop="startTime">
          <!-- <el-input style="width:200px;" v-model="attendence_type.startTime" placeholder="开始时间"></el-input> -->
          <div class="block">
            <el-time-picker
            value-format="HH:mm:ss"
             v-model="attendence_type.startTime"
              placeholder="选择开始时间"/>
          </div>
        </el-form-item>
        <el-form-item label="结束时间" prop="endTime">
          <!-- <el-input style="width:200px;" v-model="attendence_type.endTime" placeholder="结束时间"></el-input> -->
           <el-time-picker
           value-format="HH:mm:ss"
             v-model="attendence_type.endTime"
              placeholder="选择结束时间"/>
        </el-form-item>       
        <el-form-item>
          <el-button
            type="primary"
            @click="addTeacherClock('addTeacherClock', attendence_type)"
          >
            确 定
          </el-button>
          <el-button @click="attendVisible = false">
            取 消
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
     <!-- 修改框 -->
     <el-dialog v-el-drag-dialog
      custom-class="dialog"
      width="500px" :close-on-click-modal="false"
      top="10vh" :modal="false"
      :visible.sync="updateVisible"
      center @close="updateClose"
      title="信息修改"
    >
        <el-form :rules="rules" ref="updateTeacher"
        class="form refuseCopy"
        size="small" label-position="left"
        :model="teachers"
        label-width="100px"
      >
        <el-form-item label="原考勤名称" prop="name">
          <el-input
            v-model="teachers.name"
            style="width:200px"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="新考勤名称" prop="newName">
          <el-input
            v-model="teachers.newName"
            style="width:200px;font-size:13px;"
            autocomplete="off" 
          />
        </el-form-item>
         <el-form-item label="开始时间" prop="newStartTime">
          <div class="block">
            <el-time-picker
            value-format="HH:mm:ss"
             v-model="teachers.newStartTime"
              placeholder="选择开始时间"/>
          </div>
        </el-form-item>
         <el-form-item label="结束时间" prop="newEndTime">
          <div class="block">
            <el-time-picker
            value-format="HH:mm:ss"
             v-model="teachers.newEndTime"
              placeholder="选择开始时间" @keydown.native.enter="updateTeacher('updateTeacher', teachers);"/>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="updateTeacher('updateTeacher', teachers);"
          >
            确 定
          </el-button>
          <el-button @click="updateVisible = false">
            取 消
          </el-button>
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
          <el-table-column align="center" prop="name" label="考勤名称" />
           <el-table-column align="center" prop="startTime" label="开始时间" />
            <el-table-column align="center" prop="endTime" label="结束时间" />
          
          <el-table-column align="center" label="操作" width="200">
             <template slot-scope="scope">
           <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              class="resetButton"
              @click="updateVisible = true;updateAssign(scope.row) "
            >修改</el-button>
             </template>
          </el-table-column>
        </el-table>
      </template>
  </div>
</template>
<script>
import labelTop from '../../components/label'
export default {
  name: 'Class',
  components: {
    labelTop
  },
  data () {
    return {
      labelInfo: {
        avatar: 'el-icon-user',
        level1: '管理中心',
        level2: '考勤管理',
        total: 0,
        currentPage: 1
      },
      expands: [], //展开行,
    
      user: [
      {
        label: '教师',
        value: 'teacher'
      }],
     teachers:{
        newEndTime:'',
        name:'',
        newStartTime:'',
        newName:''

     },
      selection: [],
     updateVisible: false,
      attendVisible: false,
     
      classId: '', // 修改用户信息所需的classId
      // options: this.$store.getters.getOptions, // 班级列表
//       pickerLimit: {
//         disabledDate: time => {
//           return time.getTime() < Date.now() - 8.64e7 ;
//         }
//       },
      attendence_type: { // 老师考勤列表
        "endTime": '',
        "startTime": '',
        "name": ""
         },
       rules: { // 添加限制
        name: { required: true, message: '请输入考勤名称', trigger: 'blur' },
        // newName: { required: true, message: '请输入新的考勤名称', trigger: 'blur' },
        startTime: { required: true, message: '请选择开始时间', trigger: 'blur' },
        endTime: { required: true, message: '请选择结束时间', trigger: 'blur' } ,
        // newStartTime:{required: true, message: '请选择新的开始时间', trigger: 'blur'} ,
        // newEndTime:{required: true, message: '请选择新的结束时间', trigger: 'blur'}     
      },
      rule: {
        name: '',       
        // date: new Date().Format("yyyy-MM-dd"), // 日期
        pick: function () {
          var pickArr = []
          for (let i in this) {
            if (this[i] !== '') {
              pickArr.push(i)
            }
          }
          pickArr.pop()
          return pickArr
        }
      },
      currentPage: 1,
      pageSize: 50
    }
  },
  computed: {
    sdata () {
      // console.log('sdata触发')
      let data = this.$store.getters.get_TeacherClockInList;
      // console.log(data[400].dateInfo)
      // console.log(this.rule['dateInfo'])
      let rule = this.rule.pick();
      // console.log(rule);
      rule.forEach(e => {
        if(this.rule[e]){
          data = data.filter((v, i) => {
            return v[e].includes(this.rule[e])
          })
        }
      })
      this.setData(rule, data);
      // console.log('this.currentPage '+this.currentPage)
      var prev = (this.currentPage - 1) * this.pageSize
      // console.log(prev)
      data = data.slice(prev, this.pageSize + prev)
      // console.log(this.pageSize)
      // console.log(data);
      return data;
    },
   
    get_TeacherClockInList() {
      return this.$store.getters.get_TeacherClockInList;
    }
  },
  mounted () {
    
    this.$store.dispatch('getTeacherClockInList')
  },
  beforeDestroy () {
  },
  methods: {
    select (selection, row) {
      // 单选
      this.selection = selection
      // console.log(this.selection)
    },
    selectAll (selection) {
      // 多选
      // console.log(selection)
      this.selection = selection
      // console.log(this.selection)
    },
    dblclick(row, cloumn, event) {
      // console.log(row)
      if (this.expands.includes(row.id)) {
        this.expands = this.expands.filter(val => val !== row.id);
      } else {
        this.expands.splice(0,1,row.id)
        // this.expands.pop();
        // this.expands.push(row.id);
      }
    },
    //翻页后序号连续
    table_index(index){
        return (this.currentPage-1) * this.pageSize + index + 1
    },
    handleSizeChange (val) {
      // 分页数量改变
      // console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      // 当前页切换
      // console.log(`当前页: ${val}`)
    },
   
  
    sizeChange (val) {
      // console.log('sizeChange ' + val)
      this.pageSize = val
    },
    currentChange (val) {
      // console.log('currentChage ' + val)
      this.currentPage = val
    },
   
    addTeacherClock(formName, item) {
      let that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          that.attendVisible = false;
          this.$store.dispatch('addTeacherClockIn', item)
          .then(() => {
            that.attendence_type = {};
          })
        } else {
          return false;
        }
      });
    },
     updateTeacher(form, teachers) {
      this.$refs[form].validate(valid => {
        if(valid) {
          this.$store.dispatch('updateTeacherClock', teachers)
           .then(() => {
            this.updateVisible = false;
            this.teachers = {};
          })
        }else{
          return false;
        }
      })
    },
     updateClose() {
      this.teachers = {};
    },
     updateAssign(row) {
      this.updateVisible = true;
      this.teachers = JSON.parse(JSON.stringify(row));
    },
    more(id) {
      this.$router.push('/check/classAttendance')
    },
   
    deleteBatch() {     
        this.$confirm("此操作将删除该通知，是否继续？", "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          center: true,
        })
          .then(() => {
            let idLists = { idList: [] };
            this.selection.forEach((v) => {
              idLists.idList.push(v.id);
            });
            this.$store.dispatch("deleteTeacherClockBatch", idLists);
          })
          .catch(() => {});   
    },

    setData (rule, data) {
      this.labelInfo.total = data.length
    }
  }
}
</script>
<style lang="scss" scoped>
#grade{
  // background:rgba(240,240,240,0.8);
  box-shadow: -2px 2px 6px #fff;
}
.form {
  padding: 0 8%;
  // font-size: 12px !important;
  // text-align: center;
}
.tableHeader {
  background: #eef1f6 !important;
  color: #606266;
  // font-size:14px;
  font-family: "Courier New", Courier, monospace;
}
.table {
  font-size: 14px !important;
  // overflow-y: auto;
}
.button {
  padding: 6px;
  border: solid 1px #f0f0f0;
  // box-shadow: 0 0px 2px #f0f0f0;
}
.el-dialog__header {
  // padding: 10px;
  background: #6df;
  letter-spacing: 2em;
  text-indent: 2em;
  .el-dialog__title {
    color: #fff !important;
  }
}
.el-dialog__headerbtn {
  top: 16px;
  .el-dialog__close {
    color: #fff !important;
  }
}
.el-form-item__label {
  // font-size: 16px;
}
.el-input {
  // font-size: 16px;
}
.pickInput {
  width: 118px !important;
  margin: 0 6px;
  font-size: 12px;
}
.resetButton{
padding:8px 10px;border:none;
}
.tealButton{
  background:teal;color:#fff;
  &:hover{
    background:rgba($color: teal, $alpha: 0.7);
    color:#fff;
  }
}
</style>
