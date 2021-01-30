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
          <el-button size="mini" type="danger" round @click="deleteBatch">
          <i class="el el-icon-delete" />删除
        </el-button>
          <span class="right" style="margin:4px;display:inline-block;">
             <label>
              设备Id
              <el-input
                v-model="rule.cpuId"
                size="mini"
                style="width:118px;"
                placeholder="根据Id查询"
                @keydown.enter.native="wristSearch"
              />
            </label>
            <label>
              设备名称
              <el-input
                v-model="rule.name"
                size="mini"
                style="width:110px;"
                placeholder="根据name查询"
              />
            </label>
           
            <el-select v-model="rule.status" placeholder="选择状态查询"  size="mini" style="width:130px;">
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
      <!-- 设备添加 -->
      <el-dialog
        v-el-drag-dialog
        custom-class="dialog"
        width="500px"
        top="10vh"
        :modal="false"
        :visible.sync="dialogVisible"
        :destroy-on-close="true"
        center
        title="设备添加"
      >
        <el-form
          :rules="rules"
          style="width:80%;margin:0 auto;"
          class="form refuseCopy"
          size="small"
          ref="equipmentAdd"
          :model="equipment"
          label-position="left"
          label-width="80px"
        >
          <el-form-item label="设备id" prop="cpuId">
            <el-input v-model="equipment.cpuId" style="width:200px" autocomplete="off" />
          </el-form-item>
          <el-form-item label="设备名称" prop="name">
            <el-input
              v-model="equipment.name"
              style="width:200px"
              autocomplete="off"
              @keydown.enter.native="submit('equipmentAdd', equipment)"
            />
          </el-form-item>
          <!-- <el-form-item label="教室" prop="id">
           <el-select v-model="bluetooth.id" placeholder="请选择">
            <el-option
              v-for="item in getClassroomSelect"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
          </el-form-item>-->
          <el-form-item>
            <el-button type="primary" @click="submit('equipmentAdd', equipment)">确 定</el-button>
            <el-button @click="dialogVisible = false">取 消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <!-- <el-form-item label="蓝牙Id" prop="bluetoothAPId">
          <el-input
            v-model="bluetoothAp.bluetoothAPId"
            style="width:240px"
            autocomplete="off"
          />
      </el-form-item>-->
      <!-- <el-form-item label="教室Id" prop="placeId">
          <el-input
            v-model="bluetoothAp.placeId"
            style="width:240px"
            autocomplete="off"
          />
      </el-form-item>-->
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
          <!-- <el-table-column
            align="center"
            prop="id"
            label="蓝牙Id"
          />-->
          <el-table-column align="center" prop="cpuId" label="设备id" />
          <el-table-column align="center" prop="name" label="设备名称" />
          <!-- <el-table-column
            align="center"
            prop="bindingPlace"
            label="绑定地点"
          />-->
          <el-table-column align="center" label="在线情况" prop="status">
            <template slot-scope="scope">{{scope.row.status=='on'? '在线' : '离线'}}</template>
          </el-table-column>
          <!-- <el-table-column
            align="center"
            prop="online"
            label="lost状态"
          >
          {{sdata[0].online}}
          </el-table-column>-->
          <!-- <el-table-column
            align="center"
            prop="classroom"
            label="班级"
          />
          <el-table-column
            align="center"
            prop="address"
            label="地址"
          />-->
          <!-- <el-table-column
            align="center"
            prop="date"
            label="绑定日期"
          />-->
          <!-- <el-table-column align="center" label="操作" width="200"></el-table-column> -->
        </el-table>
      </template>
    </article>
  </div>
</template>
<script>
import labelTop from "../../components/label";
export default {
  name: "equipment",
  components: { labelTop },
  data() {
    return {
      dialogVisible: false,
      bindVisible: false,
      labelInfo: {
        avatar: "el-icon-set-up",
        level1: "设备管理",
        level2: "设备管理",
        total: 0,
      },
       statusList: [{
          value: 'on',
          label: '在线'
        },
        {
          value: 'off',
          label: '离线'
        }
        ],
      equipment: {
        name: "",
        cpuId: "",
        status: "",
      },
      selection: [],
      pageSize: 50,
      currentPage: 1,
      rules: {
        name: { required: true, message: "请输入name", trigger: "blur" },
        cpuId: { required: true, message: "请输入cpuId", trigger: "blur" },
        // placeId:  {required: true, message: '请输入教室Id', trigger: 'blur'}
      },
      rule: {
        id: "",
        name: "",
        cpuId: "",
        status: "",
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
      options: this.$store.getters.getOptions,
      equipmentData: this.$store.getters.getWristData,
    };
  },
  computed: {
    getWristData() {
      return this.$store.getters.getWristData;
    },
    getClassroomSelect() {
      return this.$store.getters.get_ClassroomList;
    },
    sdata() {
      let data = this.$store.getters.getEquipment;
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
    this.$store.dispatch("equipmentData");
    this.$store.dispatch("getClassroomList");
  },
  methods: {
    setData() {
      let data = this.$store.getters.getEquipment;
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
      this.rule.cpuId = "";
      this.rule.name = "";
      this.rule.status = "";
    },
    submit(formName, w) {
      let that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogVisible = false;
          // console.log(w.name);
          this.$store.dispatch("equipmentAdd", w).then(() => {
            that.equipment = {};
          });
        } else {
          return false;
        }
      });
    },
   deleteBatch() {
     
        this.$confirm("此操作将删除班级作品，是否继续？", "警告", {
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
            this.$store.dispatch("deleteEquipment", idLists);
          })
          .catch(() => {});
     
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
