<template>
  <div
    id="stundent"
    class="wrapper"
  >
    <!-- 箭头盒子 -->
    <labelTop
      :label-info="labelInfo"
      @sizeChange="sizeChange"
      @currentChange="currentChange"
    />
    <div class="button">
      <el-button
        size="mini"
        type="primary"
        round
        @click="dialogVisible = true"
      >
        <i class="el el-icon-circle-plus-outline" />添加
      </el-button>
       <router-link style="margin-left:10px;" target="_blank" to="/template/BanPai_V1.05.apk">
                  <el-button size="small" type="primary" round class="el el-icon-download">
                  下载软件
                  </el-button>
                   </router-link>
      <!-- <el-button
        size="mini"
        type="danger"
        round
        @click="deletes"
      >
        <i class="el el-icon-delete" />删除
      </el-button> -->
      <div class="right">
        <label>名称<el-input
          v-model="rule.name"
          class="pickInput"
          size="mini" clearable
          placeholder="根据软件名称查询"
        /></label>
        <el-button
          type="primary"
          size="mini"
          round
          @click="clearSearch"
        >
          清空
        </el-button>
      </div>
    </div>
    <!-- dialogVisible 软件添加弹窗 el-dialog -->
    <el-dialog top="8vh" width="500px"
      custom-class="dia"
      :modal="false"
      :visible.sync="dialogVisible"
      :destroy-on-close="true"
      center
      title="添加"
    >
      <el-form ref="ruleForm"
        class="form refuseCopy"
        size="small" :rules="rules"
        :model="soft"
        label-position="left"
        label-width="100px"
      >
      <el-form-item prop="name" label="软件名称">
          <el-input clearable
            v-model="soft.name"
            class="input_220"
            autocomplete="off"
          />
        </el-form-item>  
        <el-form-item prop="updateDetail" label="更新说明">
          <el-input clearable
            v-model="soft.updateDetail"
            class="input_220"
            autocomplete="off"
          />
        </el-form-item>
         <el-form-item label="学校" prop="schoolId">
          <el-select clearable filterable v-model="soft.schoolId" placeholder="请选择" class="input_220">
            <el-option
              v-for="item in getSchool"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item prop="url" label="下载地址">
          <el-input clearable
            v-model="soft.url"
            class="input_220"
            autocomplete="off"
          />
          </el-form-item> -->
           <!-- <el-form-item prop="createTime" label="创建时间">
          <el-input clearable
            v-model="soft.createTime"
            class="input_220"
            autocomplete="off"
          />
          </el-form-item> -->
       <el-form-item label-width="0" prop="url">
          <el-upload ref="url"
            class="upload-demo"
            action="" style="width:280px;margin:-10px 0 10px;"
            accept=".apk"
            :on-change="photoChange"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :auto-upload="false"
             multipart
            list-type="picture">
            <el-button size="small" type="primary">安装包上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submit('ruleForm', soft)"
          >
            确 定
          </el-button>
          <el-button @click="dialogVisible = false">
            取 消
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 学校信息列表 -->
    <div style="height:calc(100% - 90px);">
      <template>
      <el-table style="background:rgba(243,249,248,0.8)"
        size="mini" height="100%"
        row-class-name="table"
        header-cell-class-name="tableHeader"
        class="animated slideInDown"
        top="8vh"
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
        <!-- <el-table-column type="expand" width="24">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="姓名">
            <span>{{ props.row.soft.name }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column> -->
     <el-table-column type="index" :index="table_index" align="center" width="60" label="序数" />
        <el-table-column align="center" prop="name" label="软件名称"></el-table-column>
            <el-table-column align="center" prop="url" label="下载地址"></el-table-column>
            <el-table-column align="center" prop="updateDetail" label="更新说明"></el-table-column>
            <el-table-column align="center" prop="code" label="数字版本"></el-table-column>
            <el-table-column align="center" prop="createTime" label="创建日期"></el-table-column>
            <!-- <el-table-column align="center" prop="schoolId" label="学校名称"></el-table-column> -->
             <el-table-column
          align="center"
          label="操作"
          width="200"
          prop="url"
        >
          <template slot-scope="scope">
            <!-- <router-link style="margin-left:10px;" target="_blank" to="/template/BanPai_V1.05.apk">
                  <el-button size="small" plain>
                  下载软件
                  </el-button>
                   </router-link> -->
            <a :href="scope.row.url">
               <el-button size="small" type="primary" round class="el el-icon-download">下载</el-button>
              </a>
          </template>
        </el-table-column>
      </el-table>
    </template>
    </div>
  </div>
</template>
<script>
import { getItem } from '../../util/localStorage'
import labelTop from '../../components/label'
export default {
  name: 'soft_',
  components: {
    labelTop
  },
  data () {
    return {
      labelInfo: {
        avatar: 'iconfont icon-xuexiao6',
        level1: '学校管理',
        // level2: '学生管理',
        total: 0
        // handleSizeChange:
      },
      fileList: [],
      softList:[],
      expands: [], //展开行,
      getRowKey(row) {
        return row.id;
      },
      rowKey: '',
      search: '',
      selection: [],
      dialogVisible: false,
      updateVisible: false,
      soft: {     
        url: "",
        updateDetail: "",
        code: 0,
        name: "",
        schoolId:'',
        createTime:''
      // date:''
      },
      url:'',
      rules: {
          'name': {required: true, message: '软件名为必填项', trigger: 'blur'},
          // 'url': {required: true, message: '请填写软件地址', trigger: 'blur'},
          // 'updateDetail': {required: true, message: '请填写软件地址', trigger: 'blur'},
      },
      rule: {
       name:'',
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
      soft_: { // 软件对象 >> 属性     
          "url": "下载地址",
          "updateDetail": "更新说明",
          "code": "数字版本",
          "name": "软件名称",
          "createTime":"创建日期"
      },
      currentPage: 1,
      pageSize: 50,
      soft_Data: []
    }
  },
  computed: {
     getSchool() {
      return this.$store.getters.getSchool;
    },
     getSoft() {
      return this.$store.getters.getSoft;
    },
    sdata () {
      let data = this.$store.getters.getSoft;
      console.log(data)
      let rule = this.rule.pick()
      rule.forEach(e => {
        data = data.filter((v, i) => {
          if (Array.isArray(this.rule[e])) {
            return v[e].includes(this.rule[e].join(''))
          } else {
            return v[e].includes(this.rule[e])
          }
        })
      })
      // console.log(rule)
      this.setData(rule, data)
      var prev = (this.currentPage - 1) * this.pageSize
      // this.labelInfo.total = data.length
      data = data.slice(prev, this.pageSize + prev)
      // console.log(prev)
      // console.log(this.pageSize)
      return data
    },
  //    onBeforeUpload(file)
  //   {
  //     const isIMAGE = file.type === '.apk';
  //     // const isLt1M = file.size / 1024 / 1024 < 2;

  //     if (!isIMAGE) {
  //       this.$message.error('上传文件只能是图片格式!');
  //     }
  //     // if (!isLt1M) {
  //     //   this.$message.error('上传文件大小不能超过 2M!');
  //     // }
  //     return isIMAGE;
  //   },
  },
  mounted () {
    this.$store.dispatch("getSoftList")
    .then(res => {
      
      this.softList = res;
    })
    // this.$store.dispatch("getSchoolList");
  },
  methods: {
    setData() {
      let data = this.$store.getters.getSoft;
      this.labelInfo.total = data.length;
    },
    handleRemove(file, fileList) { //照片移除回调
        this.fileList = {};
      },
    handlePreview(file) { //
      // console.log(file);
      this.url = file.url;
    },
    photoChange(file) {
      // console.log(file)
      this.fileList = file;
      //  this.hideUpload = true;
    },
    select (selection, row) { // 单选
      this.selection = selection
      // console.log(this.selection)
    },
    selectAll (selection) { // 多选
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
        // this.expands.push(row.sid);
      }
    },
    // getRowKey(row) {
    //   console.log(row)
    // },
    // onAvatar(e) {
    //   // console.log(e)
    //   var files = e.target.files || e.dataTransfer.files;
    //   // console.log(e.target.files);
    //   if (!files.length)
    //     return;
    //     this.soft.avatar = files[0];
    //   // this.createImage(files[0]);
    // },
    table_index(index){
        return (this.currentPage-1) * this.pageSize + index + 1
    },
    handleSizeChange (val) { // 分页数量改变
      // console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) { // 当前页切换
      // console.log(`当前页: ${val}`)
    },
    handleChange (e) {
      // console.log(e)
    },
    clearSearch () {
      // this.rule.sid = '' // 班级号：唯一ID
      this.rule.name = ''
      // this.rule.classroom = ''// 班主任
      // this.rule.grade = ''
    },
    sizeChange (val) {
      // console.log('sizeChange ' + val)
      this.pageSize = val
    },
    currentChange (val) {
      // console.log('currentChage ' + val)
      this.currentPage = val
    },
    //  uploadLogo(file) {
    //   this.fileList.push(file.file);
    // },
    submit(soft, soft_) { // 提交添加软件信息
      this.$refs[soft].validate(valid => {
        if(valid) {
            // this.$refs['uploadLogo'].submit();
            
          let file = this.fileList.raw;
            let formData = new FormData();
            // formData.append('file', this.fileList[0]);
             if(file) {
            formData.append('file', file); 
          }
            this.$store.dispatch('uploadForUrl', formData)
            .then(res => {
              soft_.url = res;
              soft_.schoolId = '1304706837181894658';
              soft_.code=1;
              this.$store.dispatch('publishSoft', soft_)
              .then(() => {
                this.dialogVisible = false;
                this.soft = {} 
                         
              }).catch(() => {

              })
              // console.log(res);
            }).catch(err => {

            })
          
        }else{
          return false;
        }
      })
      
    },
  }
}
</script>
<style lang="scss" scoped>
    .form{
      padding: 0 10%;
      font-size: 18px !important;
      // text-align: center;
      margin:0 auto;
    }
    .tableHeader{
        background: #eef1f6 !important;
        color: #606266;
        // font-size:14px;
        font-family: 'Courier New', Courier, monospace;
    }
    .table{
        font-size:14px !important;
    }
    .button{
      padding:10px;
      border:solid 1px #f0f0f0;
    }
    // .el-dialog{
    //   width:500px !important;
    // }
    // .el-input__inner{
    //   height:20px !important;
    // }
    // .el-dialog__header{
    //   // padding: 10px;
    //   background: #6df;
    //   letter-spacing:2em;
    //   text-indent:2em;
    //   .el-dialog__title{
    //     color:#fff !important;
    //   }
    // }
    // .el-dialog--center .el-dialog__body{
    //   padding:0 !important;
    // }
    .el-dialog--center{

      background: #000;
    }
     .el-dialog__body{
      // padding:0 !important;
      // text-align:center !important;
      background: #000;
      // margin:0 auto !important;
    }
    .el-form-item{
      margin:0 auto;
    }
    .pickInput{
      width:120px !important;
      margin:0 8px;
      font-size:12px;
    }
    .dia{
      color:#ff0;
      // text-align:center;
    }
    // .el-popup-parent--hidden {
    //   padding: 0 !important;
    // }
    .upload-demo{
      width:220px;
    }
    .input_220{
      width:220px;
      margin-bottom: 20px;
    }
</style>
