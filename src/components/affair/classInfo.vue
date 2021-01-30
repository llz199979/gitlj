<template>
  <div id="notice" class="wrapper">
    <div id="come" class="animated fadeIn">
      <p class="underline">
        <span class="openAclose">全部通知</span>
        <!-- 箭头盒子 -->
        <!-- <labelTop style="position:aboslute;top:-32px;z-index:2222;"
            :label-info="labelInfo"
            @sizeChange="sizeChange"
            @currentChange="currentChange"
        />-->
      </p>
      <article id="noticeWrapper">
        <div id="header">
        <p id="button" class="clearfix">
          <el-button type="success" size="mini" @click="dropNotice" round>
            <i class="el el-icon-circle-plus-outline" />添加
          </el-button>
           <el-button size="mini" type="danger" round @click="deleteBatch">
          <i class="el el-icon-delete" />删除
        </el-button>
        
          <span class="right" style="margin:4px;display:inline-block;">
             <label>年级
         <el-select size="mini" clearable @change="gradeChange" v-model="gradeId" placeholder="请先选择年级">
              <el-option v-for="(v, i) in getGrade"
              :key="i" :value="v.id" :label="v.gradeName" ></el-option>
            </el-select>
        </label>
        <label>班级
         <el-select size="mini" no-data-text="请先选择年级" clearable
            v-model="classId" @change="classChange" placeholder="请选择班级">
              <el-option v-for="(v, i) in classList"
              :key="i" :value="v.id" :label="v.className"></el-option>
            </el-select>
        </label>
            <!-- <label>年级
          <el-select v-model="rule.gradeId" class="pickInput"
           clearable @change="gradeChange"
           placeholder="请选择年级" size="mini" filterable>
            <el-option 
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </label>
        <label>班级{{rule.classId}}
          <el-select v-model="rule.id" class="pickInput"
           clearable 
           placeholder="请选择班级" size="mini" filterable>
            <el-option 
              v-for="item in classList"
              :key="item.id"
              :label="item.className"
              :value="item.id">
            </el-option>
          </el-select>
        </label> -->
             <label>
              标题
              <el-input
                v-model="rule.title"
                size="mini"
                style="width:118px;"
                placeholder="根据标题查询"
              />
            </label>
            <label>
             发布人
              <el-input
                v-model="rule.author"
                size="mini"
                style="width:130px;"
                placeholder="根据发布人查询" 
              />
            </label>
           
            <!-- <el-select v-model="rule.level" placeholder="选择状态查询"  size="mini" style="width:130px;">
              <el-option
                v-for="item in levelList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select> -->
            <el-button type="primary" size="mini" round @click="clearSearch">清空</el-button>
          </span>
        </p>
      </div>
      <div style="height:calc(100% - 48px);">
        <el-table
        class="animated fadeInUp"
        size="mini" height="100%"
        row-class-name="table"
        header-cell-class-name="tableHeader"
        :data="sdata"
        :border="true"
        :row-key="getRowKey"
        :expand-row-keys="expands"
        @row-dblclick="dblclick"
        @select="select"
        @select-all="selectAll"
      >
        <el-table-column
          :resizable="true"
          align="center"
          type="selection"
        /> 
         <el-table-column type="index" align="center" :index="table_index" width="70" label="序数" />
     
        <el-table-column align="center" prop="title" label="标题" ></el-table-column>
      
        <el-table-column align="center" prop="author" label="发布人" ></el-table-column>
        <el-table-column align="center" prop="level" label="通知等级" >
           <template slot-scope="scope">
             {{scope.row.level==1?'紧急':scope.row.level==2?'倒计时':'普通'}}

        </template>
        </el-table-column>
         <el-table-column align="center" prop="startTime" label="开始时间" ></el-table-column>
        <el-table-column align="center" prop="endTime" label="结束时间" ></el-table-column>
        <el-table-column
          align="center"
          label="操作"
          width="160"
        >
          <template slot-scope="scope">
            <el-button
            size="mini"
            type="primary"
            round  @click="updateAssign(scope.row)"
          >
          详情
            </el-button>
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            round @click="deletes(scope.row.id)"
          />
          </template>
        
        </el-table-column>
      </el-table>
     <el-dialog v-el-drag-dialog
      custom-class="dialog"
      width="500px"
      top="10vh" :modal="false"
      :visible.sync="detailVisible"
      center
      title="详情"
      
    >
       <el-form  style="margin-left:60px;"
        class="form refuseCopy" 
        size="small" label-position="left"
        :model="classInfo"
        label-width="80px"
      >
        <el-form-item label="标题" prop="title">
          <el-input
           type="textarea"
           autosize
            v-model="classInfo.title"
            style="width:250px"
            autocomplete="off"
          />
        </el-form-item>
         <el-form-item label="发布人" prop="author">
          <el-input
           type="textarea"
           autosize
            v-model="classInfo.author"
            style="width:250px"
            autocomplete="off"
          />
        </el-form-item>
         <!-- <el-form-item label="通知等级" prop="level">
          <el-input
           type="textarea"
           autosize
            v-model="classInfo.level"
            style="width:250px"
            autocomplete="off"
          />
        </el-form-item> -->
         <el-form-item label="开始时间" prop="startTime">
          <el-input
           type="textarea"
           autosize
            v-model="classInfo.startTime"
            style="width:250px"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="结束时间" prop="endTime">
          <el-input
           type="textarea"
           autosize
            v-model="classInfo.endTime"
            style="width:250px"
            autocomplete="off"
          />
        </el-form-item>
          <el-form-item label="内容" prop="content">
          <el-input
           type="textarea"
           autosize
            v-model="classInfo.contentOutputDTO.text"
            style="width:250px;"
            autocomplete="off"
          >
          
          </el-input>
        </el-form-item>
         <el-form-item label="图片" prop="content">
           <viewer>
          <img width="80%" :src="classInfo.contentOutputDTO.imageUrl" v-if="classInfo.contentOutputDTO.imageUrl!=''" alt="内容图片"  >
          </viewer>
        </el-form-item>
       </el-form>
     
    </el-dialog>
       
      </div>       
      </article>
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
      notice: [],
      modelVisible: false,
      detailVisible:false,
      showImg: "",
      imgList: [],
      index: -1,
      expands: [], //展开行,
      labelInfo: {
        total: 0,
      },
      gradeId: '',
      classId: '',
      classList: [],
       getRowKey(row) {
        return row.id;
      },
      classInfo: {
        title: "",
        author: "", 
        contentOutputDTO:{
          text:'',
          imageUrl:''
        },
        classId:'',
        gradeId:'',
      },
      showClose: [],
      currentPage: 1,
      pageSize: 50,
      rule: {
        id: '',
        classId:'',
        gradeId:'',
        title: "",
        author: "",
        // level: "",
        // getGrade:'',
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
      //  levelList: [{
      //     value: '1',
      //     label: '紧急'
      //   },
      //   {
      //     value: '2',
      //     label: '倒计时'
      //   },
      //   {
      //     value: '3',
      //     label: '普通'
      //   }
      //   ],
    }
  },
   watch: {
    rule: {
      handler(new_, old) {
        this.currentPage = 1;
      },
      deep: true
    }
    
  },
  computed: {
      getGrade(){
     return this.$store.getters.getGrade;
    },
    get_class_student(){
      return this.$store.getters.get_class_student; 
    },
    get_AllClassId() {
      return this.$store.getters.get_AllClassId;
    },
    sdata() {
      let data = this.$store.getters.get_AllClassId;
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
      this.setData(rule,data);
      let prev = (this.currentPage - 1) * this.pageSize;
      // console.log(prev);
      data = data.slice(prev, prev + this.pageSize);
      // console.log(data);
      return data;
    },
   
   
    getDate(date) {
      return function (date) {
        let d = new Date(date);
        let d_ = [d.Format("dd"), d.Format("yyyy MM-dd")];
        // console.log(d_)
        return d_;
      };
    },
  },
  mounted: function () {
    this.$store.dispatch("getAllByclassId");
  },
  methods: {
     select(selection, row) {
      // 单选
      this.selection = selection;
    },
    selectAll(selection) {
      this.selection = selection;
    },
    updateAssign(value) {      
      this.detailVisible = true;  
      this.fileList = '';    
      this.classInfo = {...value};
    },
    rowClick(row, s) {
      this.focusOne = row;
      // console.log(row);
      // console.log(s);
    },
    dblclick(row, cloumn, event) {
      // console.log(row)
      if (this.expands.includes(row.id)) {
        this.expands = this.expands.filter(val => val !== row.id);
      } else {
        this.expands.splice(0,1,row.id)
      }
    },
    enlargePhoto(img, idx, list) {
      // this.showImg = img.pictureList[idx];
      this.showImg = img;
      this.modelVisible = true;
      this.index = idx;
      this.imgList = list;
    },
     clearSearch() {
      this.rule.title = "";
      this.rule.author = "";
      this.rule.id = "";
      this.classId = '';
      this.gradeId = '';
       this.$store.dispatch("getAllByclassId");
    },
    // clear(){
    //    this.$refs.cascaderHandle.checkedValue=""
    // },
    dropNotice(){
      this.$router.push('publicNotice')
    },
    nextPhoto(direction) {
      // console.log(this.index);
      if (direction == "left") {
        if (this.index == 0) {
          return;
        }
        this.index--;
      } else {
        if (this.index == this.imgList.length - 1) {
          return;
        }
        this.index++;
      }
      // console.log(this.index);
      this.showImg = this.imgList[this.index];
    },
    // setData(len) {
    //   let data = this.$store.getters.get_AllClassId;
    //   this.labelInfo.total = data.len;
    // },
     setData (rule, data) {
      if (rule.length) {
        this.currentPage = 1
      }
      this.labelInfo.total = data.length
    },
    sizeChange(page) {
      this.sizeChange = page;
      // console.log(page);
    },
    currentChange(page) {
      this.currentPage = page;
    },
    closeClick(i) {
      // console.log(i);
      this.$refs[i].className = "el-icon-close el";
      // console.log(this.$refs[i]);
    },
    table_index(index){
        return (this.currentPage-1) * this.pageSize + index + 1
    },
     gradeChange(gradeId) {
      if(gradeId){
        this.classVisible = true;      
        this.$store.dispatch('getClassListByGradeId', gradeId)       
        .then(res => {
          this.classList = res;
        }).catch(err =>{
        console.log(err)
        })
      }
        this.classId = '';
    },
     classChange(classId) {
      //  let classId=this.classId;
      if(classId) {
        localStorage.setItem('classId', classId)
        this.$store.dispatch('setClassId', classId);
        // this.$store.dispatch('getClassStudent_')     
         this.$store.dispatch('getAllByclassId',classId)
        .then(res => {
          // this.getGrade = res;        
        })
       .catch(err => {
        })
      }
    },
    deletes(id) {
      // console.log(id);
      this.$confirm("此操作将删除该通知，是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      })
        .then(() => {
          this.$store.dispatch("deleteNotice", [id])
            .then((res) => {
              // console.log(res);
            })
            .catch((err) => {
              // console.log(err);
            });
        })
        .catch(() => {});
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
            this.$store.dispatch("deleteClassInfoBatch", idLists);
          })
          .catch(() => {});
     
    },
    more(id) {
      // console.log("more: " + id);
    },
     pick(parameter) {
      // 根据条件筛选：
      // console.log("keydown");
    },
  },
};
</script>
<style lang="scss" scoped>
#notice {
  font-family: "PingFang SC";
  // font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  background: rgba($color: #fff, $alpha: 0.6);
  padding: 6px;
  box-sizing: border-box;
  #come {
    height: 100%;
    // box-shadow: -2px -2px 2px #aaa;
    // background: rgba(235,242,253,0.8);
    padding: 4px;
    .underline {
      border-bottom: solid 1px #ccc;
      padding-bottom: 6px;
      margin-bottom: 9px;
      .openAclose {
        background: #fff;
        padding: 4px;
        border-bottom: solid 2px #39f;
        color: #39f;
      }
    }
    #noticeWrapper {
      // padding:10px;
      box-sizing: border-box;
      height: calc(100% - 26px);
      overflow-y: auto;
      margin: 10px;
      .everyOneNotice {
        padding: 8px;
        border: solid 1px #ccc;
        margin: 10px 0;

        .header {
          padding: 10px;
          font-size: 14px;
          color: #fff;
          background: rgba($color: #3091f2, $alpha: 1);
        }
        .honorUl {
          li {
            // box-shadow:2px 2px 10px #ccc;
            padding: 4px;
            // border:solid 1px;
          }
        }
        .imageShow {
          width: 25%;
          height: 50%;
          border-radius: 8px;
        }
        .date {
          text-align: center;
          font-size: 24px;
          display: inline-block;
          height: 60px;
          width: 80px;
          color: #333;
          padding: 10px 0;
          line-height: 28px;
          vertical-align: top;
          border: solid 1px #aaa;
          margin-top: 10px;
          border-radius: 4px;
          & > p:last-child {
            font-size: 13px;
            color: #909399;
          }
        }
        .topic_wrapper {
          overflow: hidden;
          position: relative;
          display: inline-block;
          margin-left: 10px;
          // border-top:solid 1px #aaa;
          border-bottom: solid 1px transparent;
          height: 100px;
          width: calc(100% - 100px);
          & > li {
            padding: 0 10px;
            // border:solid 1px;
            height: 30px;
            line-height: 30px;
          }
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
          .type {
          }
          .content {
            height: auto;
            width: calc(100% - 80px);
            // border-right:solid 1px;
            text-align: right;
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
