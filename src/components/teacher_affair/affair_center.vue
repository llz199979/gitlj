<template>
    <div id="affair_center">
        <el-dialog :modal="false" fullScreen
          title="值日安排" width="600px"
          :visible.sync="cleanVisible" top="8vh"
          style="position:absolute;z-index:3333;"
          center :inline="true">
      <el-form style="width:96%;margin:0 auto;"
       ref="dutyForm" :model="dutyList" :rules="rules"
        label-width="70px" label-position="left">
            <el-form-item label="" style="display:inline-block;width:220px;">
              <el-select clearable size="small" 
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
            <el-form-item label="值日组长" prop="leader" style="display:inline-block;width:240px;">
              <!-- {{get_class_student}} -->
              <el-select clearable size="small" style="width:150px;" 
              v-model="dutyList.studentIdList" 
              placeholder="请选择负责人">
                <el-option v-for="(v,i) in get_class_student" :key="i" :label="v.studentName" :value="v.id"></el-option>
              </el-select>
            </el-form-item>
        <el-form-item label-width="0" style="text-align:center;">
          <el-button size="medium" round type="primary" @click="onSubmit('dutyForm', dutyList)">确定</el-button>
          <el-button size="medium" round @click="cleanVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>


    <!-- 班干部 -->  
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
    <!-- 班级荣誉添加 -->
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
    <!-- 班级相册添加 -->
    <el-dialog title="相册添加" :visible.sync="albumVisible" :modal="false" width="500px">
      <el-form label-width="80px" style="padding-left:26px;" label-position="left" ref="photoDTOList" :model="photoDTOList" :rules="rules" >
        <el-form-item label="描述">
          <el-input size="small" class="input_260" v-model="photoDTOList.detail"></el-input>
        </el-form-item>
        <el-form-item  label="图片">
          <input id="uploadPhoto" size="small" class="input_260"
          type="file" accept="image/*" multiple
           @change="uploadPhotoChange"
           >
      
        </el-form-item>
        <el-form-item label-width="0" style="text-align:center;">
          <el-button size="medium" round type="primary" @click="addClassPhoto('photoDTOList',  photoDTOList)">确定</el-button>
          <el-button size="medium" round @click="albumVisible = false">取消</el-button>
          
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 班级作品添加 -->
    <el-dialog title="作品添加" :visible.sync="workVisible" :modal="false" width="500px">
      <el-form
        label-width="80px"
        style="padding-left:26px;"
        label-position="left"
        ref="workDTOList"
        :model="workDTOList"
        :rules="rules"
      >
      <el-form-item label="作品作者">
          <el-input size="small" class="input_260" v-model="workDTOList.author"></el-input>
        </el-form-item>
        <el-form-item label="作品介绍">
          <el-input size="small" class="input_260" v-model="workDTOList.detailDesc"></el-input>
        </el-form-item>
        <el-form-item label="图片">
          <input
            id="uploadWork"
            size="small"
            class="input_260"
            type="file"
            accept="image/*"
            multiple
            @change="uploadWorkChange"
          />
        </el-form-item>

        <el-form-item label-width="0" style="text-align:center;">
          <el-button
            size="medium"
            round
            type="primary"
            @click="addClassWorks('workDTOList', workDTOList)"
          >确定</el-button>
          <el-button size="medium" round @click="workVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
        <p class="underline" style="color:#909399;">班级管理</p>
        <div id="selectCase">
            <el-select size="small" clearable @change="gradeChange" v-model="gradeId" placeholder="请先选择年级">
              <el-option v-for="(v, i) in getGrade"
              :key="i" :value="v.id" :label="v.gradeName"></el-option>
            </el-select>
            <el-select size="small" no-data-text="请先选择年级"
            v-model="classId" @change="classChange" placeholder="请选择班级">
              <el-option v-for="(v, i) in classList"
              :key="i" :value="v.id" :label="v.className"></el-option>
            </el-select>
          </div>
        <div class="selfInfoWrapper">
          <div
            class="selfCard" :modal="false"
            style="background:rgb(243,114,118);"
          >
            <router-link to="dutyList"
              class="cardLeft"
              style=""
            >值日安排</router-link>
            <span class="cardRight" @click="cleanVisible=true;"><i
              class="el-icon-circle-plus-outline"
              style="font-size:20px;color:#fff;"
            /></span>
          </div>
          <div
            class="selfCard" 
            style="background:rgb(255,170,61)"
          >
            <router-link to="leader" class="cardLeft">班干部</router-link>
            <span class="cardRight" @click="classLeaderVisible = true;"><i
              class="el-icon-circle-plus-outline"
              style="font-size:20px;color:#fff;"
            /></span>
          </div>
          <!-- <div @click="teacherVisible = true"
            class="selfCard"
            style="background:rgb(37,203,183);"
          >
            <span class="cardLeft">优秀教师</span>
            <span class="cardRight"><i
              class="el-icon-circle-plus-outline"
              style="font-size:20px;color:#fff;"
            /></span>
          </div> -->
          
          <div
            class="selfCard"
            style="background:#39f;"
          >
            <router-link to="classTeacher" class="cardLeft">任课老师</router-link>
            <span class="cardRight"  @click="classTeacherVisible = true"><i
              class="el-icon-circle-plus-outline"
              style="font-size:20px;color:#fff;"
            /></span>
          </div>
          <div class="selfCard"></div>
        </div>
        <p class="underline" style="color:#909399;">班级风采</p>
        <div class="selfInfoWrapper">
          <div class="selfCard"
            style="background-image:linear-gradient(to right, #DA4453, #89216B);"
          >
            <router-link to="classHonor"
              class="cardLeft"
              style=""
            >班级荣誉</router-link>
            <span class="cardRight"  @click="honorVisible=true;"><i
              class="el-icon-circle-plus-outline"
              style="font-size:20px;color:#fff;"
            /></span>
          </div>
          <!-- <div
            class="selfCard" @click="classLeaderVisible = true;"
            style="background:rgb(255,170,61)"
          >
            <span class="cardLeft">班级风采</span>
            <span class="cardRight"><i
              class="el-icon-message-solid"
              style="font-size:20px;color:#fff;"
            /></span>
          </div> -->
          <div
            class="selfCard"
            style="background-image:linear-gradient(to right, #FF0099, #493240);"
          >
            <router-link to="classPictures" class="cardLeft">班级相册</router-link>
            <span @click="albumVisible = true" class="cardRight"><i
              class="el-icon-circle-plus-outline"
              style="font-size:20px;color:#fff;"
            /></span>
          </div>
          <div
            class="selfCard"
            style="background-image:linear-gradient(to right, #8E2DE2, #4A00E0);"
          >
            <router-link to="classWorks" class="cardLeft">班级作品</router-link>
            <span class="cardRight"  @click="workVisible = true"><i
              class="el-icon-circle-plus-outline"
              style="font-size:20px;color:#fff;"
            /></span>
          </div>
          <div class="selfCard"></div>
        </div> 
          <!-- {{getUser}} -->
    </div>
</template>
<script>
// import fx from '../../util/fx';
// import links from '../../components/links';
// import axios from 'axios';
import {mapGetters} from 'vuex';
export default {
  name: 'Self',
  // components: {
  //   links
  // },
  data () {
    return {
      teacherVisible: false,
      cleanVisible: false,
      dialogVisible: false,
      // selectVisible: false,
      classTeacherVisible: false,
      hideUploadEdit: false,
      classLeaderVisible: false, //班干部
      honorVisible: false,  //荣誉
      albumVisible: false,  //相册
      workVisible: false,   //班级作品
      showOptions: false,
      gradeId: '',
      classId: '',
      classList: [],
      rules: {
        gradeId: {required: true, message: '请输入年级', trigger: 'blur'},
        week: { required: true, message: '请输入通知等级', trigger: 'blur' },       //通知等级 /普通/紧急/倒计时
        startTime: {required: true, message: '请输入开始时间', trigger: 'blur'},      //开始时间
        job: { required: true, message: '请输入考试科目', trigger: 'blur'},      //学科
        title: { required: true, message: '请输入标题', trigger: 'blur'},      //学科
        titleId: { required: true, message: '职务为必填项', trigger: 'blur'},      //学科
        time: { required: true, message: '请输入起始&结束时间', trigger: 'blur'},      //学科
        id: { required: true, message: '请至少选择一位老师', trigger: 'blur' },
        stuName: { required: true, message: '请填写微课名称', trigger: 'blur' },
        studentId: { required: true, message: '学生姓名为必填项', trigger: 'blur' },
        // teacherList: { required: true, message: '请填写微课名称', trigger: 'blur' },
        // teachers: { required: true, message: '请填写微课名称', trigger: 'blur' },
        author: { required: true, message: '请填写作者姓名', trigger: 'blur' },
        narrate: { required: true, message: '请填写作品描述', trigger: 'blur' },
        uploadFile: { required: true, message: '请选择图片', trigger: 'blur' },
        courseId: { required: true, message: '请选择课程', trigger: 'blur' },
        teacherId: { required: true, message: '请选择任课教师', trigger: 'blur' },
         photoUrl: { required: true, message: "请输入照片", trigger: "blur" },
        detail: { required: true, message: "请输入照片描述", trigger: "blur" },
      },
      // weeknum: 5,
      // week: [1,2,3,4,5,6,7],
      course_teacher: {
        teacherId: '',
        courseId: ''
        // teacherList: [],
        // teachers: []
      },
      album: {
      },
      albumList: [],
      work: {
        // uploadFile: ''
      },
       photoDTOList	: {
         classId:'',
         detail:'',        
         photoUrl:'',
      },
      fileList: [],
      courseNum: 1,
      dutyList: { //值日组长参数列表
      classId: '',
      studentIdList:[],
      weekday: ''
      },
      classLeader: { //班干部对象
         titleId:'',
         studentId:''
      },
      honour: {
        uploadFile: '',
        title: '',
        honourDesc: ''
      },
       workDTOList: {
        classId: "",
        detailDesc: "",
        url: "",
        author:""
      },
      dialogImageUrl:'',
      pickerOptions: {
       disabledDate: (time) => {
         let nowData = new Date()
         nowData = new Date(nowData.setDate(nowData.getDate() - 1))
         return time < nowData;
       }
      }
    }
  },
  computed: {
    getCourse (day) {
      return function (day) {
        return this.course.filter(v => {
          return v.day === day
        })
      }
    },
    ...mapGetters([
        'getGrade',
        'get_Job',
        'get_classLeader',
        'getTeachers',
        'get_CourseList',
        'get_class_student',
        'getUser',
        'get_ClassList_ByGradeId']),
  },
  methods: {
    handleOpen(key, keyPath) {
        // console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        // console.log(key, keyPath);
      },
      // weeknumChange() {
      //   this.weeknum ++;
      // },
      // weeknumSubtract() {
      //   this.weeknum --;
      // },
      // courseNumChange() {
      //   this.courseNum ++;
      // },
      // courseNumSubtract() {
      //   this.courseNum --;
      //   this.course_teacher.teacherList.splice(this.courseNum,1);
      //   this.course_teacher.teachers.splice(this.courseNum,1);
      //   console.log(this.courseNum)
      // },
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
        // this.$store.dispatch('getClassNotice');
        this.$store.dispatch('getClassTeachers');
        // this.$store.dispatch('getClassHonors');
        // this.$store.dispatch('getClassPictures');
        this.$store.dispatch('getClassLeader');
        this.$store.dispatch('getClassStudent_')
        this.$store.dispatch('getDutyList')
        .then(res => {
          this.classStudent = res;
        })
        // this.$store.dispatch('getCourseTableItem')
        // .then(res => {
        //   console.log(res);
        //   this.courseData = res.perDayCourseList;
        // })
        .catch(err => {
          // this.courseData = '';
          // console.log(err);
        })
      }
    },
      courseChange(v) {
        // console.log(v);
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
    onSubmit(formName, dutyList) {
      let that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
            // let data = studentId;
            // data.studentIdList = [(data.studentId)]; 
            //   console.log(data)
            dutyList.classId=this.classId;
            dutyList.studentIdList=[dutyList.studentIdList]
            this.$store.dispatch('addDutyList', dutyList)
            .then(() => {
               this.cleanVisible = false;
              that.dutyList = {}
            })
        } else {
          return false;
        }
      });
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
     uploadPhotoChange(file) {
      // console.log(file)
        this.photoDTOList.uploadFile = '';
      if(file) {
        this.photoDTOList.uploadFile = ' ';
      }else{
        this.photoDTOList.uploadFile = '';
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
    uploadWorkChange(file) {
      // console.log(file);
      this.workDTOList.uploadFile = "";
      if (file) {
        this.workDTOList.uploadFile = " ";
      } else {
        this.workDTOList.uploadFile = "";
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
           this.honourVisible = false;
            honour.mediaIdList =[res];
            this.$store.dispatch('addClassHonor',honour)
            .then(() => {
              this.honourVisible = false;
              this.honour = {};
               this.$store.dispatch('getClassHonors');
              document.querySelector('#uploadhonour').value = '';
            })
          }).catch(err => {
            
          })
          // console.log(honour);
        }
      })
    },
    addClassWorks(form, workDTOList) {
      this.$refs[form].validate((valid) => {
        this.workVisible = false;
        if (valid) {
          let uploadFile = document.querySelector("#uploadWork").files;
          let formData = new FormData();
          if (uploadFile) {
            uploadFile.forEach((v) => {
              formData.append("file", v);
            });
          }
          delete workDTOList.uploadFile;
          this.$store
            .dispatch("uploadForUrl", formData)
            .then((res) => {
              // console.log(res);
              let workDTOLists = { workDTOList: [] };
              let ClassPhoto = {
                classId: 0,
                detailDesc: "",
                url: "",
                author:""
              };
              ClassPhoto.classId = this.classId;
              ClassPhoto.detailDesc = workDTOList.detailDesc;
              ClassPhoto.url = res;
              ClassPhoto.author = workDTOList.author;
              workDTOLists.workDTOList.push(ClassPhoto);
              this.$store.dispatch("addClassWorks", workDTOLists).then(() => {
                this.honorVisible = false;
                this.$store.dispatch("getClassWorks");
                document.querySelector("#uploadhonour").value = "";
              });
            })
            .catch((err) => {});
          // console.log(workDTOList);
        }
      });
    },
   
    dateChange(dateArr) {
      if(dateArr) {
        this.notification.startTime = dateArr[0];
        this.notification.endTime = dateArr[1];
      }else{
        this.notification.startTime = '';
        this.notification.endTime = '';
      }
    },
    handleRemove(file, fileList) {
      // console.log(file, fileList);
    },
    handlePreview(file) {
      // console.log(file);
    },
    onExceed(file, fileList) {
      // console.log(file);
      // console.log(fileList);
      this.$message.error('本次上传已超出个数限制，单次最多上传8张')
    },
    beforeUpload(file,fileList) {
      if(!file) {
        this.$message.error('请先上传图片');
      }
       var testmsg=/^image\/(jpeg|png|jpg)$/.test(file.type)
            const isLt4M = file.size / 1024/1024 <=4//图片大小不超过2MB
            // console.log(file)
	          if (!testmsg) {
	            this.$message.error('上传图片格式不对!');
	            return
	          }
	          if(!isLt4M) {
	            this.$message.error('上传图片大小不能超过 4M!');
	            return
	          }
	          return testmsg  && isLt4M
    },
    set_request(file, fileList) {
      // console.log(file);
        this.fileList.push(file.file);
    },
     addClassPhoto(form, photoDTOList) {
      this.$refs[form].validate(valid => {
         this.albumVisible= false;
        if(valid) {
          let uploadFile = document.querySelector('#uploadPhoto').files;
          let formData = new FormData();
          if(uploadFile) {
            uploadFile.forEach(v => {
              formData.append('file', v);
            })
          }
         delete photoDTOList.uploadFile;
          this.$store.dispatch('uploadForUrl', formData)
          .then(res => {
//             console.log(res)
         let photoDTOLists={photoDTOList:[]};
            let ClassPhoto={
              "classId": 0,
              "detail": "",
              "photoUrl": ""
              };
            ClassPhoto.classId=this.classId;
            ClassPhoto.detail= photoDTOList.detail;
            ClassPhoto.photoUrl=res;
            photoDTOLists.photoDTOList.push(ClassPhoto);
            this.$store.dispatch('uploadAlbum',photoDTOLists)
            .then(() => {
              this.albumVisible= false;
              this.$store.dispatch('getClassPictures');  
              document.querySelector('#uploadPhoto').value = '';
            })
          }).catch(err => {
            
          })
//           console.log(photoDTOList);
        }
      })
    },
    onExceed() { //超出图片限制的回调
      // this.dialogVisible = true;
      this.$message.error('照片超出数量限制');
    },
    onRemove(file, fileList){ //图片移除时的回调
      // console.log(file);
      // console.log(fileList);
      if(fileList.length < 5) {
        this.hideUploadEdit = false;
      }
      this.notification.uploadFile = fileList;
    }
  },
  mounted() {
    // let isManager = this.$store.getters.getRole  == 'schoolManager';
    // isManager? this.selectVisible = true : '';
    this.$store.dispatch('GradeList');
    if(localStorage.getItem('classId')){
      // this.$store.dispatch('getDutyList')
      // this.$store.dispatch('getClassLeader');
      // this.$store.dispatch('getClassPictures');
      // this.$store.dispatch('getClassTeachers');
      // this.$store.dispatch('getClassHonors');
      this.$store.dispatch('getClassStudent_');
      // 
      this.$store.dispatch('getTeachersInfo');
      this.$store.dispatch('getJob');
      this.$store.dispatch('getCourseList');
      // this.$store.dispatch('getClassLeader');
    }
    // else{
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
    
    
  }
}
</script>

<style lang="scss" scoped>
  #affair_center{
    background:#fff;
    padding:10px;
    height:100%;
    .selfInfoWrapper{
      margin:12px 0;
      margin-bottom:12px;
      display:flex;height:66px;justify-content:space-between;
      text-align:center;
        .selfCard{
          height:66px;width:24%;
        .cardLeft{
          line-height:54px;
          width:calc(100% - 80px);
          color:#fff;
          padding:6px;display:inline-block;
        }
        .cardRight{
          height:54px;width:54px;
          line-height:60px;
          padding:6px;
          float:right;
          background:rgba(120,120,120,0.6);
        }
      }
    }
    .btn_weeknum{
      font-size:13px;
      width:70px;
      position:absolute;
      bottom:120px;
      right:20px;
    }
    .form{
      padding: 0 8%;
      font-size: 18px !important;
    }
    .el-dialog__header{
      background-image: linear-gradient(to right, #2980b9, #6dd5fa, #fff);
      .el-dialog__title{
        color:#fff !important;
      }
    }
    #uploadForm{
      width:80%;
      margin: 0px 110px 20px;
    }
  }
  #selectCase{
    opacity: 1;
    // top:0;
    // left:300px;
    position:static;
  }
  .input_260{
    width:260px;
  }
</style>