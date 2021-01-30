<template>
  <div class="mainIn">
      <p class="underline">
          <span class="highLight">发布通知</span>
      </p>
      <el-form style="width:90%;margin:0 auto;padding:10px;"
       ref="noticeForm" :model="notification" :rules="rules"
        label-width="70px" label-position="left">
        <el-form-item label="标题" prop="title">
          <el-input clearable size="small" style="width:400px;" v-model="notification.title"></el-input>
        </el-form-item>
        <!-- <el-form-item label="导语" >
          <el-input clearable size="small" style="width:400px;" v-model="notification.explains"></el-input>
        </el-form-item> -->
        <p>
          <el-form-item label="年级">
            <el-select clearable size="small" @change="gradeChange"
            style="font-size:12px !important;width:400px;"
             v-model="notification.gradeId" placeholder="默认为全校">
              <el-option v-for="(v,i) in getGrade" :key="i"
               :label="v.gradeName" :value="v.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="班级" prop="classId">
            <el-select clearable size="small" 
            style="font-size:12px !important;width:400px;"
             v-model="notification.classId" placeholder="请选择通告班级">
              <el-option v-for="(v,i) in get_ClassList_ByGradeId" :key="i"
               :label="v.className" :value="v.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="优先等级" prop="level">
            <el-select clearable size="small" 
            v-model="notification.level" style="width:400px;"
            placeholder="请选择公告等级">
              <el-option label="倒计时" value="2"></el-option>
              <el-option label="普通通知" value="3"></el-option>
              <el-option label="紧急通知" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发布人" prop="author">
          <el-input size="small"
           style="width:400px;"  placeholder="请输入发布人"
           v-model="notification.author"></el-input>
        </el-form-item>
          <el-form-item label="期限" prop="time" >
            <el-date-picker clearable :picker-options="pickerOptions"
                v-model="notification.time" value-format="yyyy-MM-dd HH:mm:ss"
                size="small" style="width:400px;" format="yyyy-MM-dd HH:mm"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                @change="dateChange">
            </el-date-picker>
        </el-form-item>
        
        </p>
        <!-- <form id="uploadForm" 
        action="http://192.168.1.238:8777/brand/setNotificationPicture"
         method="post" enctype="multipart/form-data">
          <label style="color:#333;font-size:14px;margin-right:12px;">图片</label>
          <input id="File1" name="uploadFile"
          accept="image/gif, image/jpeg" 
          multiple="multiple" type="file" value="" />
        </form> -->
         <el-form-item label-width="0" prop="imageUrlList">
          <el-upload ref="imageUrlList"
            class="upload-demo"
            action="" style="width:280px;margin:-10px 0 10px;"
            :on-change="photoChange"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :auto-upload="false"
             list-type="picture"
            >
            <el-button size="small" type="primary">图片上传</el-button>
            <div slot="tip" class="el-upload__tip" style="position:absolute;top:-16px;left:87px;">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
         <el-dialog
         :visible.sync="photoVisible" :modal="false">
          <img width="100%" :src="imageUrlList" alt="">
        </el-dialog>
        
        <el-form-item label="内容" prop="text">
          <el-input style="width:400px;" type="textarea" autosize 
           v-model="notification.text"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button size="small" type="primary" @click="onSubmit('noticeForm', notification)">确定</el-button>
          <el-button size="small" @click="$router.go(-1)">返回</el-button>
        </el-form-item>
      </el-form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'mainIn',
    data() {
        return {
           photoVisible : false,
            noticeVisible: false,  //公告添加,
             fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
            rules: {
                gradeId: {required: true, message: '请输入年级', trigger: 'blur'},
                level: { required: true, message: '请输入通知等级', trigger: 'blur' },       //通知等级 /普通/紧急/倒计时
                startTime: {required: true, message: '请输入开始时间', trigger: 'blur'},      //开始时间
                title: { required: true, message: '请输入标题', trigger: 'blur'},      //学科
                time: { required: true, message: '请输入起始&结束时间', trigger: 'blur'},
                text: { required: true, message: '请填写内容', trigger: 'blur' },               
                // name: { required: true, message: '请填写微课名称', trigger: 'blur' },
                author: { required: true, message: '发布人为必填项', trigger: 'blur' },
                // subjects: { required: true, message: '请填写考试科目', trigger: 'blur'}
            },
            notification: { //公告
                gradeId: '',
                title: '',      //标题
                level: '',      //通知等级 /普通/紧急/倒计时
                startTime: '',  //开始时间
                endTime: '',    //结束时间
                content: '',    //内容
                // picpath: '',    //照片路径
                // uploadFile: []
            },
            fileList: [],
             imageUrlList:'',
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
        getGrade() {
            return this.$store.getters.getGrade;
        },
        get_ClassList_ByGradeId() {
            return this.$store.getters.get_ClassList_ByGradeId;
        },
    },
    methods: {
        handleRemove(file, fileList) { //照片移除回调
        this.fileList = {};
      },
         handlePreview(file) { //
      // console.log(file);
      this.imageUrlList = file.url;
      this.photoVisible = true;
    },
        photoChange(file) {
      // console.log(file)
      this.fileList = file;
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
        gradeChange(gradeId) {
            if(gradeId) {
                this.$store.dispatch('getClassListByGradeId', gradeId);
            }else{
                this.$store.commit('setClassListByGradeId', [])
            }
            // console.log('gradeId : ' + gradeId);
        },
        onSubmit(form, notice) { //通知添加
        this.$refs[form].validate(valid => {
            if(valid) {              
          let that = this;
          let file = this.fileList.raw;
          
          // console.log(file);
          let formData = new FormData();
          if(file) {
            formData.append('file', file);
          } 
           if(file!=undefined){

          this.$store.dispatch('uploadForUrl', formData)
          .then(res => {
             notice.content = {
                imageUrlList: [res],
                text: notice.text           
          }            
            this.$store.dispatch('publicNotice', notice)
            .then(() => {
            that.dialogVisible = false;
              that.notification = {};  
            })
          }).catch(err => {
            // console.log(err);
          })

           }else{
               notice.content = {
                 imageUrlList: [],
                text: notice.text 
              }
               this.$store.dispatch('publicNotice', notice)
            .then(() => {
            that.dialogVisible = false;
              that.notification = {};  
            
          }).catch(err => {
            // console.log(err);
          })
        }
           
        
        } else {
          return false;
        }
            // 等待动画
            // let loading = this.openLoading();
            //  let uploadFile = document.querySelector('#File1').files;
            // let formData = new FormData();
            // 对上传图像进行条件筛选
            // if(uploadFile && uploadFile.length) {
            //     let isSize = 0;
            //     let text = '';
            //     uploadFile.forEach(v => {
            //     console.log(v.size);
            //     isSize = v.size / 1024 < 1024;  // 照片大小小于500k
            //     if(!isSize) {
            //         text += v.name + ' ';
            //         }
            //         formData.append('file', v);
            //     })
            //     if(text) {
            //         this.$message.error({
            //         message: `图片 ${text}大小超出1M限制`,
            //         duration: 3000
            //         })
            //         loading.close()
            //         return ;
            //         }
            //         // 照片符合规格，而后获取照片对应字符串
            //         this.$store.dispatch('uploadImage', formData)
            //         .then(res => {
            //             console.log(res)
            //             notice.content = {
            //                 imageUrlList: [res],
            //                 text: notice.text
            //             }
            //             console.log(notice);
            //             this.$store.dispatch('publicNotice', notice)
            //             .then( () => {
            //                 this.notification = {};
            //                 document.querySelector('#File1').value = ''
            //                 loading.close();
            //             }).catch(() => {
            //                 loading.close();
            //             })
            //         }).catch(err => {
                        
            //         })
            //     }else{
            //         // 未传图片
            //         notice.content = {
            //             imageUrlList: [],
            //             text: notice.text
            //         }
            //         this.$store.dispatch('publicNotice', notice)
            //         .then(res => {
            //         this.notification = {};
            //         document.querySelector('#File1').value = ''
            //         loading.close();
            //         }).catch(err => {
            //         loading.close();
            //         })
            //     }
            
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.mainIn{
    height:100%;
    overflow-y:auto;
    .underline{
        width:90%;
        margin: 0 10px;
        padding:0;
        color:#1296db;
        .highLight{
            display: inline-block;
            border-bottom:solid 2px #1296db;
            padding-bottom:6px;
            // border:solid 1px;
        }
    }
    #uploadForm{
        width:80%;
        margin: 0px 10px 20px   ;
    }
    #File1{
        margin-left:30px;
    }
}

</style>