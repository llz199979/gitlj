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
              icon="el-icon-delete"
              round
              @click="deleteBatch"
            >删除</el-button>
          <span class="right" style="margin:4px;display:inline-block;">
             <label>
              icon名称
              <el-input
                v-model="rule.typeName"
                size="mini"
                style="width:128px;"
                placeholder="根据icon名称查询"
                @keydown.enter.native="wristSearch"
              />
            </label>
            <label>
              icon地址
              <el-input
                v-model="rule.url"
                size="mini"
                style="width:128px;"
                placeholder="根据icon地址查询"
              />
            </label>
            <el-button type="primary" size="mini" round @click="clearSearch">清空</el-button>
          </span>
        </p>
      </div>
      <!-- icon添加 -->
      <el-dialog
        v-el-drag-dialog
        custom-class="dialog"
        width="500px"
        top="10vh"
        :modal="false"
        :visible.sync="dialogVisible"
        :destroy-on-close="true"
        center
        title="icon添加"
      >
        <el-form
          :rules="rules"
          style="width:80%;margin:0 auto;"
          class="form refuseCopy"
          size="small"
          ref="addIcon"
          :model="icon"
          label-position="left"
          label-width="80px"
        >
          <el-form-item label="icon名称" prop="typeName">
            <el-input v-model="icon.typeName" style="width:200px" autocomplete="off" />
          </el-form-item>
          <el-form-item label="icon地址" prop="url">
            <el-input
              v-model="icon.url"
              style="width:200px"
              autocomplete="off"
              @keydown.enter.native="submit('addIcon', icon)"
            />
          </el-form-item>
          <!-- <el-form-item label-width="0" prop="url">
          <el-upload ref="url"
            class="upload-demo"
            action="" style="width:280px;margin:-10px 0 10px;"
            :on-change="photoChange"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :auto-upload="false"
             list-type="picture"
            >
            <el-button size="small" type="primary">图片上传</el-button>
            <div slot="tip" class="el-upload__tip" style="position:absolute;top:-16px;left:90px; ">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item> -->
         <!-- <el-dialog
         :visible.sync="photoVisible" :modal="false">
          <img width="100%" :src="url" alt="">
        </el-dialog> -->
          <el-form-item>
            <el-button type="primary" @click="submit('addIcon', icon)">确 定</el-button>
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
          <el-table-column align="center" prop="typeName" label="icon名称" />
           <el-table-column
        align="center"
        label="icon图标"
        prop="url"
        >
        <template slot-scope="scope">
          <img :src="scope.row.url" style="width:50px;height:50px;" srcset="">
        </template>
       </el-table-column>
          <!-- <el-table-column align="center" label="操作" width="200">
           
          </el-table-column> -->
        </el-table>
      </template>
    </article>
  </div>
</template>
<script>
import labelTop from "../../components/label";
export default {
  name: "icon",
  components: { labelTop },
  data() {
    return {
      dialogVisible: false,
      bindVisible: false,
      labelInfo: {
        avatar: "el-icon-set-up",
        level1: "icon管理",
        total: 0,
      },
      icon: {
        typeName: "",
        url: "",
      },
      selection: [],
      pageSize: 50,
      currentPage: 1,
      rules: {
        typeName: { required: true, message: "请输入icon名称", trigger: "blur" },
        url: { required: true, message: "请输入url地址", trigger: "blur" },
      },
      rule: {
        id: "",
        typeName: "",
        url: "",
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
    sdata() {
      let data = this.$store.getters.getIcon;
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
    this.$store.dispatch("getIconImage");
  },
  methods: {
    setData() {
      let data = this.$store.getters.getIcon;
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
    deleteBatch() {
      if(this.selection.length){
          this.$confirm('此操作将批量删除icon信息，是否继续？', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error',
          center: true
          }).then(() => {
            let iconIdList = [];
            this.selection.forEach(v => {
              iconIdList.push(v.id);
            })
            // let data = {
            //   studentList: this.selection
            // }
            this.$store.dispatch('deleteIcon', {iconIdList})
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
      this.rule.typeName = "";
      this.rule.url = "";
    },
    submit(formName, w) {
      let that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogVisible = false;
          // console.log(w.typeName);
          this.$store.dispatch("addIcon", w).then(() => {
            that.icon = {};
          });
        } else {
          return false;
        }
      });
    },

    pick(parameter) {
      // 根据条件筛选：
      // console.log("keydown");
    },
  },
};
</script>
<style lang="scss">
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
