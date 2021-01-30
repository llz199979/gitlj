<template>
    <div id="adminHome" style="padding:10px;">
    <!-- 考试通知 -->
    <el-dialog :modal="false"
      title="考试通知" width="540px"
      :visible.sync="examinationVisible"
      style="position:absolute;z-index:3333;box-shadow:2px 2px 10px #aaa;"
      center>
      <el-form style="width:80%;margin:0 auto;padding:10px;"
       ref="exam" :model="examination" :rules="rules"
        label-width="80px" label-position="left">

          <el-form-item label="考试科目" prop="subjects" style="display:inline-block;">
            <el-select clearable size="small" class="input_300"
             v-model="examination.subjects" placeholder="请选择考试科目">
              <el-option v-for="(v,i) in get_CourseList" :key="i"
               :label="v.name" :value="v.name"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="范围"  style="display:inline-block;">
          <el-input clearable size="small" class="input_300" v-model="examination.scope"></el-input>
        </el-form-item>
          <el-form-item label="年级" prop="gradeId" style="display:inline-block;">
            <el-select class="input_300" @change="gradeChange" size="small" v-model="examination.gradeId" placeholder="请选择年级">
              <el-option v-for="(v,i) in getGrade" :key="i"
               :label="v.gradeName" :value="v.id"></el-option>
            </el-select>
          </el-form-item>
          <!-- 时间 -->
          <el-form-item label="期限" prop="time"  style="display:inline-block;">
          <el-date-picker clearable :picker-options="pickerOptions"
          v-model="examination.time" value-format="yyyy-MM-dd HH:mm"
          size="small" format="yyyy-MM-dd HH:mm"
          type="datetimerange" style="width:300px;"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="exameDateChange">
        </el-date-picker>
        </el-form-item>
        <p class="animated fadeIn" v-for=" (ex, i) in classArr" :key="i+'.'" >
          
          <el-form-item label="班级" prop="" style="display:inline-block;">
            <el-select class="input_300" disabled
             v-model="examNotification[i].classId" 
             placeholder="请选择班级"
             style="font-size:12px !important;" 
             size="small" >
              <el-option v-for="(v,idx) in classArr" :key="idx"
               :label="v.className" :value="v.classId"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="监考老师" prop="" style="display:inline-block;">
            <el-select class="input_300" v-model="examNotification[i].invigilatorArr" multiple
                filterable allow-create size="small"
                default-first-option
                placeholder="请选择监考老师">
                <el-option
                  v-for="item in getTeachers"
                  :key="item.name"
                  :label="item.label"
                  :value="item.name">
                </el-option>
              </el-select>
          </el-form-item>
        </p>
            
        <el-form-item label="备注" style="width:80%;">
          <el-input type="textarea" class="input_300" rows="2" 
           v-model="examination.remark"></el-input>
        </el-form-item>
        <el-form-item label-width="0" style="text-align:center;">
          <el-button size="medium" round type="primary" @click="examSubmit('exam', examination)">确定</el-button>
          <el-button size="medium" round @click="examinationVisible = false">取消</el-button>
        </el-form-item>
        </el-form>
    </el-dialog>

    <!-- 添加优秀教师 -->
    <el-dialog title="优秀教师填写" width="500px" :visible.sync="teacherVisible" :modal="false">
      <el-form style="margin:0 20px;"  ref="goodTeacher" :model="goodTeacher" :rules="rules" >
        <el-form-item prop="id" label="优秀教师">
          <!-- <el-input  v-model="goodTeacher.id" size="small"></el-input> -->
          <el-select class="input_320" v-model="goodTeacher.id" multiple
                filterable allow-create size="small"
                default-first-option clearable
                placeholder="请选择教师">
                <el-option
                  v-for="item in getTeachers"
                  :key="item.name"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
        </el-form-item>
        <el-form-item label-width="0" style="text-align:center;">
          <el-button size="medium" round type="primary" @click="addTeacher('goodTeacher', goodTeacher)">确定</el-button>
          <el-button size="medium" round @click="teacherVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 添加微课视频 -->
    <el-dialog title="添加微课" :visible.sync="videoVisible" :modal="false" width="540px">
      <el-form style="margin: 0 20px;" label-width="80px" label-position="left" ref="video" :model="video" :rules="rules" >
        <el-form-item prop="name" label="微课名称">
          <el-input size="small" class="input_300" v-model="video.name"></el-input>
        </el-form-item>
        <!-- <el-form-item label="年级" prop="gradeId" style="display:inline-block;">
            <el-select class="input_300"
            size="small" v-model="video.gradeId" 
            placeholder="请选择年级">
              <el-option v-for="(v,i) in getGrade" :key="i"
               :label="v.gradeName" :value="v.id"></el-option>
            </el-select>
          </el-form-item> -->
        <el-form-item prop="detailDesc" label="描述">
          <el-input size="small" class="input_300" v-model="video.detailDesc"></el-input>
        </el-form-item>
        <el-form-item prop="uploadFile" label="视频">
          <input id="uploadVideo" size="small" class="input_300" @change="videoRule"
          type="file" accept="video/*"
           >
        </el-form-item>

        <el-form-item label-width="0" style="text-align:center;">
          <el-button size="medium" round type="primary" @click="addVideo('video', video)">确定</el-button>
          <el-button size="medium" round @click="videoVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 添加学校荣誉 -->
    <el-dialog title="荣誉添加" :visible.sync="honourVisible" :modal="false" width="500px">
      <el-form label-width="70px" style="padding-left:26px;" label-position="left" ref="honour" :model="honour" :rules="rules" >
        <el-form-item prop="title" label="荣誉名称">
          <el-input size="small" class="input_300" v-model="honour.title"></el-input>
        </el-form-item>
        <el-form-item prop="obtainTime" label="获奖时间">
          <el-date-picker size="small" style="width:300px;"
            v-model="honour.obtainTime"
            type="date" value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item prop="honourDesc" label="描述">
          <el-input size="small" class="input_300" v-model="honour.honourDesc"></el-input>
        </el-form-item>
        <el-form-item prop="uploadFile" label="图片">
          <input id="uploadhonour" size="small" class="input_300"
          type="file" accept="image/*" multiple
           @change="uploadHonourChange"
           >
        </el-form-item>

        <el-form-item label-width="0" style="text-align:center;">
          <el-button size="medium" round type="primary" @click="addHonour('honour', honour)">确定</el-button>
          <el-button size="medium" round @click="honourVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="班干部职务添加" :visible.sync="jobVisible" :modal="false" width="500px">
      <el-form label-width="70px" @submit.native.prevent style="padding-left:26px;" label-position="left" ref="job" :model="job" :rules="rules" >
        <el-form-item prop="classLeaderTitle" label="职务">
          <el-input size="small" class="input_300" @keydown.enter.native="addJob('job', job)" v-model="job.classLeaderTitle"></el-input>
        </el-form-item>

        <el-form-item label-width="0" style="text-align:center;">
          <el-button size="medium" round type="primary" @click="addJob('job', job)">确定</el-button>
          <el-button size="medium" round @click="jobVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

        <p class="underline" style="color:#909399;">普通事务</p>
        <div class="selfInfoWrapper">
          <!-- <div
            class="selfCard"
            style="background:rgb(255,170,61)"
          >
            <router-link to="examination" class="cardLeft">
              <i
              class="el-icon-message-solid"
              style="font-size:20px;color:#fff;"
              />考试通知
            </router-link>
           
            <span  class="cardRight" @click="$router.push('/schoolAffair/AffairManage/examAdd');"><i
              class="el-icon-circle-plus-outline"
              style="font-size:20px;color:#fff;"
            /></span>
          </div> -->
           <div
            class="selfCard" :modal="false"
            style="background:rgb(243,114,118);"
          >
            <router-link to="classInfo"
              class="cardLeft"
              style=""
            >发布通知</router-link>
            <!-- noticeVisible=true; -->
            <span class="cardRight" @click="$router.push('/schoolAffair/AffairManage/publicNotice')"><i
              class="el-icon-circle-plus-outline"
              style="font-size:20px;color:#fff;"
            /></span>
          </div>
          <div
            class="selfCard"
            style="background:rgb(37,203,183);"
          >
            <router-link to="goodTeacher" class="cardLeft">优秀教师</router-link>
            <span class="cardRight"  @click="teacherVisible = true"><i
              class="el-icon-circle-plus-outline"
              style="font-size:20px;color:#fff;"
            /></span>
          </div>
          <div
            class="selfCard"
            style="background:#39f;"
          >
            <router-link to="video" class="cardLeft">微课添加</router-link>
            <span class="cardRight"  @click="videoVisible = true"><i
              class="el-icon-circle-plus-outline"
              style="font-size:20px;color:#fff;"
            /></span>
          </div>
        </div> 
        <p class="underline" style="color:#909399;">荣誉</p>
        <div class="selfInfoWrapper">
          <div
            class="selfCard" :modal="false"
            style="background-image:linear-gradient(to right, #DA4453, #89216B);"
          >
            <router-link to="schoolHonor"
              class="cardLeft"
            >学校荣誉</router-link>
            <span class="cardRight" @click="honourVisible=true;"><i
              class="el-icon-circle-plus-outline"
              style="font-size:20px;color:#fff;"
            /></span>
          </div>
          <div
            class="selfCard" :modal="false"
            style="background-image:linear-gradient(to right, #DA4453, #89216B);"
          >
            <router-link to="job"
              class="cardLeft"
            >班干职务管理</router-link>
            <span class="cardRight" @click="jobVisible=true;"><i
              class="el-icon-circle-plus-outline"
              style="font-size:20px;color:#fff;"
            /></span>
          </div>
        </div> 
    </div>
</template>
<script>
import fx from '../../util/fx';
import links from '../../components/links';
import axios from 'axios';
import {mapGetters} from 'vuex';
import service from '../../util/api_'
export default {
  name: 'Self',
  components: {
    links
  },
  data () {
    return {
      teacherVisible: false,      // 优秀教师
      noticeVisible: false,       // 公告添加
      // dialogVisible: false, 
      videoVisible: false,        // 微课添加
      hideUploadEdit: false, 
      examinationVisible: false,  // 考试通知
      honourVisible: false,       // 学校荣誉
      jobVisible: false,          // 班干职务荣誉
      classInfoVisible:false,
      gradeInfoVisible:false,
      schoolInfoVisible:false,
      job: {},
      gradeId: '',
      classId: '',
      classList: [],
      rules: {
        gradeId: {required: true, message: '请输入年级', trigger: 'blur'},
        level: { required: true, message: '请输入通知等级', trigger: 'blur' },       //通知等级 /普通/紧急/倒计时
        startTime: {required: true, message: '请输入开始时间', trigger: 'blur'}, //开始时间
        endTime: {required: true, message: '请输入结束时间', trigger: 'blur'},     //结束时间 
        content: {required: true, message: '请输入通知内容', trigger: 'blur'},     //通知内容 
        subject: { required: true, message: '请输入考试科目', trigger: 'blur'},      //学科
        title: { required: true, message: '该项为必填项', trigger: 'blur'},      //学科
        classLeaderTitle: { required: true, message: '该项为必填项', trigger: 'blur'},      //学科
        time: { required: true, message: '请输入起始&结束时间', trigger: 'blur'},      //学科
        id: { required: true, message: '请至少选择一位老师', trigger: 'blur' },
        uploadFile: { required: true, message: '请选择微课视频', trigger: 'blur' },
        job: { required: true, message: '请填写职称', trigger: 'blur' },
        name: { required: true, message: '请填写微课名称', trigger: 'blur' },
        subjects: { required: true, message: '请填写考试科目', trigger: 'blur'},
        detailDesc: { required: true, message: '请填写备注', trigger: 'blur'}
      }, 
      notification: { //公告
        schoolId: '',
        gradeId: '',
        classId:'',
        title: '',      //标题
        level: '',      //通知等级 /普通/紧急/倒计时
        startTime: '',  //开始时间
        endTime: '',    //结束时间
        content: '',    //内容
        // picpath: '',    //照片路径
        explains: '',    //小标题；导语
        // uploadFile: []
      },
      examination: {
        gradeId: '',
        level: '4',       //通知等级 /普通/紧急/倒计时
        startTime: '',      //开始时间
        endTime: '',
        subjects: '',      //学科
        remark: '',       //备注
        // invigilatorArr: '',  //监考员
        scope: '',        //范围
        time: ''
      },
      classId: '',
      examNotification: [],
      classArr: [],
      teachers: [],
      goodTeacher: {
      },
      video: {
        name: '',         //名称
        // url: '',          //视频地址
        detailDesc: '',    //描述
        gradeId: '',      //年级Id
        uploadFile: ''
      },
      honour: {
        uploadFile: '',
        title: '',
        honourDesc: ''
      },
       infoClass: {
        classId:'', 
        content: '',
        title: '',
        author: '',
        startTime:'',
        endTime:'',
        level:''
      },
       infoGrade: {
        content: '',
        title: '',
        author: '',
        startTime:'',
        endTime:'',
        level:'4' //默认值

      },
       infoSchool: {
        content: '',
        title: '',
        author: '',
        startTime:'',
        endTime:'',
        level:''
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
    getGrade() {
      let grade = this.$store.getters.getGrade;
      let flag = grade.find(v => v.id == '0');
      if(!flag) {
        grade.push({gradeName: '全校', id: '0'})
      }
      return grade;
    },
    ...mapGetters([
        'getTeachers',
        'get_CourseList',
        'getGoodTeachers',
        'getOrdinaryTeachers',
         'get_class_student',
        'get_ClassList_ByGradeId']),
  },
  methods: {
    handleOpen(key, keyPath) {
        // console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        // console.log(key, keyPath);
      },
      changeVideo() {
        var uploadFile = document.getElementById("imgFile").files[0];
        // console.log(uploadFile);
        // that.file = file;
        var formData = new FormData(); 
        //构造一个 FormData，把后台需要发送的参数添加到FormData里面，这样就可以直接把formData作为参数传递了
        if (uploadFile) {
            formData.append("uploadFile", uploadFile); //接口需要传递的参数
        }
        // console.log(formData);
        // let uploadFile = formData;
        let urls = "http://120.24.253.177:8777/brand/setMicroClassVideo";
        // let config = {
        //     headers:{'Content-Type':'multipart/form-data'}
        // };
        axios({
          url: urls,
          method: 'post',
          data: formData
        }).then((res) => {
          // console.log(res);
        }).catch(err => {
          // console.log(err)
        })
        },
    examSubmit(form, examination) { //考试通知
      // console.log(examination)
      // console.log(this.examNotification)
      this.$refs[form].validate(valid => {
        if(valid) {
          // console.log(examination)
          this.examNotification.map(v => {
            for(let key in examination){
              v[key] = examination[key]
            }
            if(v.invigilatorArr){
              v.invigilator = v.invigilatorArr.join(',');
            }
            delete v.classTeacherId;
            delete v.internalClassId;
            delete v.invigilatorArr;
            delete v.time;
          })
          // console.log(this.examNotification);
          this.$store.dispatch('addExamination', this.examNotification)
          .then(res => {
            // console.log(res);
            this.examinationVisible = false;
          }).catch(err => {
            // console.log(err);
          })
        }
      })
    },
    gradeChange(id){ //年级改变引出对应班级
      // console.log('gradeChange:  ' + id)
      if(id) {  
        let that = this;
        this.$store.dispatch('getClassListByGradeId', id)
        .then(res => {
          // console.log(res)
           this.classList = res;
          if(!res.length) {
            this.$message.error('当前年级下未添加班级');
            this.examination.gradeId = '';
          }
          res.forEach(v => {
            v.classId = v.id;
            delete v.id;
          })
          this.examNotification = res;
          // console.log(this.examNotification)
          this.classArr = res.concat([]);
        })
        this.classId = '';
      }else{
        this.examNotification = [];
      }
    },
    onSubmit(form, notice) { //公告添加
      delete notice.time;
      this.$refs[form].validate(valid => {
        if(valid) {
          let loading = this.openLoading();
          let uploadFile = document.querySelector('#File1').files;
          let formData = new FormData();
          if(uploadFile && uploadFile.length) {
            let isSize = 0;
            let text = '';
            uploadFile.forEach(v => {
              // console.log(v.size);
              isSize = v.size / 1024 < 500;
              if(!isSize) {
                text += v.name + ' ';
                }
              formData.append('uploadFile', v);
            })
              if(text) {
                this.$message.error({
                  message: `图片 ${text}大小超出500k限制`,
                  duration: 3000
                })
                loading.close()
                return ;
              }
            }
          this.$store.dispatch('addNotice', notice)
          .then(res => {
            // let uploadFile = document.querySelector("#File1").files;
            // let formData = new FormData();
            // let isSize = 0;
            // let text = '';
            // if(uploadFile) {
            //   uploadFile.map(v => {
            //     isSize = v.size / 1024 < 500;
            //     if(!size){
            //       text += v.name;
            //     }
            //     formData.append("uploadFile", v);
            //   })
            // }
            // let formData = new FormData($("#uploadForm")[0]);
            if(!uploadFile.length){
              loading.close();
              this.noticeVisible = false;
              return ;
            }
            axios({
              url: 'http://120.24.253.177:8777/brand/setNotificationPicture',
              method: 'post',
              data: formData
            }).then(res => {
              // console.log(res);
              this.$store.dispatch('getNotice');
              this.noticeVisible = false;
              loading.close();
            }).catch(err => {
              loading.close();
              // console.log(err)
            })
            // console.log(res);
          }).catch(err => {
            // console.log(err);
          })
        }
      })
    },
    addTeacher(form, teacher) {
      this.$refs[form].validate(valid => {
        if(valid) {
          let loading = this.openLoading();
          this.$store.dispatch('addGoodTeacher', teacher.id)
          .then(() => {
            this.teacherVisible = false;
            loading.close();
            this.goodTeacher = {}
          }).catch(() => {
            loading.close();
          })
        }else{
          return false
        }
      })
    },
    videoRule(value) {
      if(value){
        this.video.uploadFile = ' '
        return ;
      }
      this.video.uploadFile = '';
    },
    addVideo(form, video) {
      this.$refs[form].validate(valid => {
        if(valid) {
          this.openLoading();
          // console.log(video)
          var uploadFile = document.getElementById("uploadVideo").files[0];
          // console.log(uploadFile)
          let formData = new FormData();
          if(uploadFile) {
            formData.append("file", uploadFile);
          }
          this.$store.dispatch('uploadForUrl', formData)
          .then(res => {
            video.url = res;
            this.$store.dispatch('addMicroClass', video)
            .then(() => {
              this.video = {};
              this.openLoading().close();
              this.videoVisible = false;
               document.getElementById("uploadVideo").value = '';
            }).catch(() => {
              this.openLoading().close();
            })
          }).catch(err => {
              this.openLoading().close();
          })
          // var uploadFile = document.getElementById("imgFile").files[0];
          // console.log(uploadFile);
          // // that.file = file;
          // var formData = new FormData(); 
          // //构造一个 FormData，把后台需要发送的参数添加到FormData里面，这样就可以直接把formData作为参数传递了
          // if (uploadFile) {
          //     formData.append("uploadFile", uploadFile); //接口需要传递的参数
          // }
          // console.log(formData);
          // // let uploadFile = formData;
            
        }
      })
      
    },
    uploadHonourChange(file) {
      // console.log(file)
      if(file) {
        this.honour.uploadFile = ' ';
      }else{
        this.honour.uploadFile = '';
      }
    },
    addHonour(form, honour) {
      this.$refs[form].validate(valid => {
        if(valid) {
          let uploadFile = document.querySelector('#uploadhonour').files;
          let formData = new FormData();
          let isSize = 0;
          let text = '';
          if(uploadFile) {
            uploadFile.forEach(v => {
              // console.log(v.size);
              isSize = v.size / 1024 < 1000;
              if(!isSize) {
                text += v.name + ' ';
                }
              formData.append('file', v);
            })
            if(text) {
              this.$message.error({
                message: `图片 ${text}大小超过1M限制`,
                duration: 3000,
                showClose: true
              })
              return ;
            }
          }
          // console.log(formData)
          delete honour.uploadFile;
          // console.log(honour);
          this.$store.dispatch('uploadImage', formData)
          .then(res => {
            // console.log(res)
            honour.mediaIdList =[res];
            this.$store.dispatch('addHonour',honour)
            .then(() => {
              this.honourVisible = false;
              this.honour = {};
              document.querySelector('#uploadhonour').value = '';
            })
          }).catch(err => {
            
          })
        }
      })
    },
    addJob(form, job) {
      this.$refs[form].validate(valid => {
        if(valid) {
          // console.log(job)
          this.$store.dispatch('addClassJob', job)
          .then(() => {
            this.jobVisible = false;
            this.job = {};
          })
          
        }else{
          return false;
        }
      })
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
    exameDateChange(dateArr) {
      if(dateArr) {
        this.examination.startTime = dateArr[0];
        this.examination.endTime = dateArr[1];
      }else{
        this.examination.startTime = '';
        this.examination.endTime = '';
      }
    },
    set_request(file) {
      // console.log(1)
      // console.log(file);
      this.notification.uploadFile.push(fx.fileHandle(file))
    },
    // addPhoto(file, fileList) { //添加图片的回调
    //   // console.log(typeof file);
    //   console.log(file);
    //    let vm = this
    //     vm.hideUploadEdit = fileList.length > 4;
    //     // console.log(this.hideUploadEdit)
    //   let formData = fx.fileHandle(file);
    //   console.log('formData')
    //   console.log(formData);
    //   this.notification.uploadFile.push(formData)
    //   console.log(this.notification.uploadFile)
    //   $.ajax({
    //     url: 'http://192.168.1.238:8777/brand/setNotificationPicture',
    //     method: 'post',
    //     data: formData,
    //     contentType: false,
    //     processData: false,
    //     success: function(res) {
    //       console.log(res)
    //     }
    //   })$
    // },
    onExceed() { //超出图片限制的回调
      // alert(111)
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
    },
      classChange(classId) {
      if(classId) {
        localStorage.setItem('classId', classId)
        this.$store.dispatch('getClassTeachers');
        this.$store.dispatch('getClassStudent_')
        // this.$store.dispatch('getDutyList')
        .then(res => {
          this.classStudent = res;
        })
        this.$store.dispatch('getCourseTableItem')
        .then(res => {
          // console.log(res);
          this.courseData = res.perDayCourseList;
        }).catch(err => {
          this.courseData = '';
          // console.log(err);
        })
      }
    },
  },
  mounted() {
    this.$store.dispatch('getTeachersInfo');
    this.$store.dispatch('GradeList');
    if(localStorage.getItem('classId')){
      //  this.$store.dispatch('getClassTeachers');
      this.$store.dispatch('getClassStudent_');
      this.$store.dispatch('getTeachersInfo');
    }
  }
}
</script>

<style lang="scss">

  #adminHome{
    background:#fff;
    padding:10px;
    height:100%;
    .selfInfoWrapper{
      // background:#fff;
      margin-bottom:12px;
      margin-top: 12px;
      display:flex;height:66px;justify-content:space-around;text-align:center;
        .selfCard{
          // max-width:324px;
          height:66px;width:24%;
        .cardLeft{
          line-height:54px;
          // border:solid 1px;
          width:calc(100% - 80px);
          // float:left;
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
    .form{
      padding: 0 8%;
      font-size: 18px !important;
      // text-align: center;
    }
    .el-dialog__header{
      // background:#1296db;
      background-image: linear-gradient(to right, #2980b9, #6dd5fa, #fff);
      .el-dialog__title{
        color:#fff !important;
      }
    }
    .el-dialog__body{
      // background:#efefef;
      // background-image: linear-gradient(to right, #C6FFDD, #FBD786, #f7797d);

    }
    #uploadForm{
      width:80%;
      margin: 0px 110px 20px;
    }
  }
  .el-upload-list{
    li{
      float:left;
    }
  }
  .hide .el-upload--picture-card{
    display:none;
  }
  .input_400{
    width:400px;
  }
  .input_300{
    width:300px;
  }
  .input_320{
    width:320px;
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