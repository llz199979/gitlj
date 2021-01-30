import { asyncRouterMap } from '../../router/asyncRouterMap'
import router from '../../router/index'
import fx from '../../util/fx'
// 学校事务请求模块
const adminAffair = {
  state: {
    notice: [],             // 公告消息表
    video: [],              // 微课列表
    gradeVideo: [],  // 某年级微课列表
    schoolHonor: [],        // 学校荣誉
    examination: [],        // 考试通知
    goodTeachers: [],       // 优秀教师列表
    job: [],                // 班干部职务列表
  },
  getters: {
    get_notice: state => state.notice,
    get_video: state => state.video,
    get_gradeVideo: state => state.gradeVideo,
    get_schoolHonor: state => state.schoolHonor,
    get_examination: state => state.examination,
    getGoodTeachers: state => state.goodTeachers,
    get_Job: state => state.job
  },
  mutations: {
    set_GoodTeachers: (state, data) => state.goodTeachers = data,
    setNotice(state, data) {
      state.notice = data;
    },
    setVideo(state, data) {
      // console.log('setVideo')
      state.video = data;
    },
    setSchoolHonor(state, data) {
      state.schoolHonor = data;
    },
    setExamination(state, data) {
      state.examination = data;  
    },
    set_gradeVideo(state, data) {
      state.gradeVideo = data;
    },
    set_Job(state, data) {
      state.job = data;
    }
  },
  actions: {
    //  // 批量上传学生照片 /student/uploadBatch
    //  uploadBatch({state}, data) {
    //   return new Promise((resolve, reject) => {
    //     let url = `/student/uploadBatch?files=${data}`;
    //     let methods = 'post'
    //     console.log(data)
    //     fx.setConnect({state}, {url, methods, data})
    //     .then(res => {
    //       JSON.stringify(res)
    //       resolve(res)
    //     }).catch(err => {
    //       reject()
    //     })
    //   })
    // }, 
    // 添加班干部职务 /classleader/addTitle
    addClassJob({state, dispatch}, data){
      return new Promise((resolve, reject) => {
        let url = `/classleader/addTitle`;
        let methods = 'post'
        // console.log(data)
        fx.setConnect({state}, {url, methods, data})
        .then(res => {
          // dispatch('searchTeachers');
          dispatch('getJob');
          resolve()
        }).catch(err => {
          reject()
        })
      })
    },
    // 删除班干部职务 /classleader/title/{titleId}

    deleteJob({state, rootState, dispatch}, id){
      // console.log(id)
      let methods = 'delete';
      let url = `/classleader/title/${id}?titleId=${id}`;
      fx.setConnect({state}, {url, methods})
      .then(res => {
        dispatch('getJob');
      }).catch(err => {

      })
    },
    // 获取班干部职务列表 get /classleader/listTitle
    getJob({state, rootState, commit, dispatch}){
      let url = `/classleader/listTitle`;
      fx.setConnect({state}, {url})
      .then(res => {
        commit('set_Job', res.data.data)
      }).catch(() => {

      })
    },
    // 添加优秀教师 post /teacher/excellentTeacher
     addGoodTeacher({state, dispatch}, data){
      return new Promise((resolve, reject) => {
        let url = `/teacher/excellentTeacher`;
        let methods = 'post'
        fx.setConnect({state}, {url, methods, data})
        .then(res => {
          // dispatch('searchTeachers');
          dispatch('getGoodTeacherList');
          resolve()
        }).catch(err => {
          reject()
        })
      })
    },
    // 获取优秀教师列表 get /teacher/excellentTeacher/list
    getGoodTeacherList({state, rootState, commit, dispatch}){
      let url = `/teacher/excellentTeacher/list`;
      fx.setConnect({state}, {url})
      .then(res => {
        commit('set_GoodTeachers', res.data.data)
      })
    },
    // 删除优秀教师 delete /teacher/excellentTeacher/{teacherId}
      deleteGoodTeacher({state, rootState, dispatch}, id){
        // console.log(id)
        let methods = 'delete';
        let url = `/teacher/excellentTeacher/${id}?teacherId=${id}`
        fx.setConnect({state}, {url, methods})
        .then(res => {
          dispatch('searchTeachers');
          dispatch('getGoodTeacherList');
        }).catch(err => {

        })
      },
    // 添加微课 post /microclass/add
    addMicroClass({state, dispatch}, data) {
      return new Promise((resolve, reject) => {
        let url = `/microclass/add`,
          methods = 'post';
          fx.setConnect({state}, {url, methods, data})
          .then(() => {
            resolve();
            dispatch('getMicroClassList')
          }).catch(() => {
            reject();
          })
      })
    },
    // 发布微课到年级 post /microclass/publish
    publishMicroClass({state, dispatch}, data) {
      return new Promise((resolve, reject) => {
        let url = `/microclass/publish`,
          methods = 'post';
          fx.setConnect({state}, {url, methods, data})
          .then(() => {
            resolve();
            // dispatch('getMicroClassList')
          }).catch(() => {
            reject();
          })
      })
    },
    // 删除微课(同时删除发布到年级的微课) delete /microclass/{microClassId}
    deleteMicroClass({state}, id) {
      let url = `/microclass/${id}?microClassId=${id}`,
          methods = 'post';
          fx.setConnect({state}, {url, methods})
          .then(() => {

          })
    },
    // 取消发布微课 /microclass/{microClassId}/{gradeId}
    deleteVideoByGradeId({state, dispatch}, IdObj) {
      console.log(IdObj)
      // console.log(gradeId)
      // console.log(id)
      let url = `/microclass/${IdObj.microClassId}/${IdObj.gradeId}?gradeId=${IdObj.gradeId}&microClassId=${IdObj.microClassId}`,
          methods = 'delete';
          fx.setConnect({state}, {url, methods})
          .then(() => {
            dispatch('getGradeVideo', IdObj.gradeId)
          })
    },
    // 获取微课列表 /microclass/getMicroClassList
    getMicroClassList({state, commit}) {
      let url = `/microclass/getMicroClassList`;
      fx.setConnect({state}, {url})
      .then(res => {
        commit('setVideo', res.data.data);
      }).catch(err => {
        
      })
    },
    // 通过年级Id获取微课列表 get /microclass/getMicroClassListByGradeId
    getGradeVideo({state, commit}, gradeId) {
      let url = `/microclass/getMicroClassListByGradeId?gradeId=${gradeId}`;
      fx.setConnect({state}, {url})
      .then(res => {
        commit('set_gradeVideo', res.data.data)
      }).catch(err => {
        
      })
    },
        // 添加公告
        addNotice({state, dispatch, rootState}, notice){
          return new Promise((resolve,reject) => {
            api_({
              url:'/brand/setNotification',
              method: 'post',
              data: notice
            }).then(res => {
              dispatch('getNotice');
              resolve(res);
            }).catch(err => {
              reject(err);
            })
          })
        },
        //获取公告信息
        getNotice({state, commit, rootState}){
          return new Promise((resolve, reject) => {
            // console.log('获取公告信息')
            api_({
              url: '/brand/getNotificationList',
              method: 'get',
            }).then(res => {
              commit('setNotice', res.data.data);
              resolve(res);
            }).catch(err => {
              reject(err);
            })
          })
        },
        //删除公告消息
        deleteNotice({state, rootState,dispatch}, id) {
          return new Promise((resolve, reject) => {
            api_({
              url: `/brand/delNotificationById?id=${id}`,
              method: 'post',
            }).then(res => {
              dispatch('getNotice').then(resp => {
                resolve(resp);
              }).catch(error => {
                // console.log(error)
              })
            }).catch(err => {
              // console.log(err)
            })
          })
        },
        //添加考试通知
        addExamination({state, commit, dispatch, rootState}, examNotification){
          return new Promise((resolve,reject) => {
            api_({
              url:'/brand/setExamNotification',
              method: 'post',
              data: examNotification
            }).then(res => {
              resolve(res);
              dispatch('getExamination');
            }).catch(err => {
              reject(err);
            })
          })
        },
        //获取考试通知
        getExamination({state, commit, dispatch, rootState}) {
          return new Promise((resolve, reject) => {
            // console.log('获取考试信息')
            api_({
              url: '/brand/getExamNotifications',
              method: 'get',
            }).then(res => {
              commit('setExamination', res.data.data);
              resolve(res);
            }).catch(err => {
              reject(err);
            })
          })
        },
        //删除考试通知
        delExamination({state, rootState,dispatch}, id){
          return new Promise((resolve, reject) => {
            api_({
              url: `/brand/delExamNotification?id=${id}`,
              method: 'post',
            }).then(res => {
              dispatch('getExamination').then(resp => {
                resolve(resp);
              }).catch(error => {
                // console.log(error)
              })
            }).catch(err => {
              // console.log(err)
            })
          })
        },
        // 获取微课列表 get /media/listVideo
        getVideo({state, commit, rootState}){
          return new Promise((resolve, reject) => {
            // console.log('获取视频信息')
            let url = `/media/listVideo`;
            fx.setConnect({state}, {url})
            .then(res => {
                  commit('setVideo', res.data.data);
                  resolve(res);
                }).catch(err => {
                  reject(err);
                })
          })
        },
        // 删除微课 delete /microclass/{microClassId}
        deleteVideo({state, rootState,dispatch}, id) {
          return new Promise((resolve, reject) => {
            let url = `/microclass/${id}?microClassId=${id}`,
                methods = 'delete';
                fx.setConnect(state, {url, methods})
                .then(res => {
                  dispatch('getMicroClassList')
                  resolve(resp);
                }).catch(err => {
                  // console.log(err)
                })
            // }).catch(err => {
            //   console.log(err)
            // })
          })
        },
        //添加学校荣誉
        addHonour({state, rootState, dispatch}, data) {
          return new Promise((resolve, reject) => {
            let url = `/honour/addSchoolHonour`;
            let methods = 'post';
            fx.setConnect(state, {url, methods, data})
            .then(res => {
              dispatch('getHonor')
              resolve();
            }).catch(err => {
              reject();
            })
          })
        },
        //添加荣誉图片
          addHonorPic({state, rootState, dispatch}, uploadFile) {
            return new Promise((resolve, reject) => {
              api_({
                url: '/brand/addHonorPic',
                method: 'post',
                data: uploadFile
              }).then(res => {
                dispatch('getHonor')
                resolve(1);
                // console.log(res);
              }).catch(err => {
                // console.log(err);
              })
            })
          },
        // 获取学校荣誉 /honour/getSchoolHonourList
          getHonor({state, commit, rootState}) {
            return new Promise((resolve, reject) => {
              // console.log('获取学校荣誉')
              let url = `/honour/getSchoolHonourList`;
              fx.setConnect(state, {url})
              .then(res => {
                commit('setSchoolHonor', res.data.data);
              })
              // api_({
              //   url: '/honour/getSchoolHonorList',
              //   method: 'get',
              // }).then(res => {
              //   console.log(res);
              //   let data = res.data.data;
              //   data.forEach(v => v.showClose = false);
              //   commit('setSchoolHonor', res.data.data);
              //   resolve(res);
              // }).catch(err => {
              //   reject(err);
              // })
            })
          },
          // 删除荣誉 delete /honour/delete

          deleteHonor({state, dispatch, rootState}, data) {
            return new Promise((resolve, reject) => {
              let url = `/honour/delete`;
              let methods = 'delete';
              fx.setConnect(state, {url, methods, data})
              .then(res => {
                dispatch('getHonor')
              }).catch(err => {
  
              })
            })
            // return new Promise((resolve, reject) => {
            //   api_({
            //     url: `/brand/delHonorById?id=${id}`,
            //     method: 'get',
            //   }).then(res => {
            //     dispatch('getHonor')
            //   }).catch(err => {
            //     console.log(err)
            //   })
            // })
          }, 
          publicNotice({state, dispatch, rootState}, data){
            return new Promise((resolve,reject) => {
              let url = '';
              // 根据传递的对象中是否存在年级Id、班级Id 来判断是否通知对象！！！
              if( data.classId) {
                // 发布班级通知 /notification/publishClassNotification
                url = `/notification/publishClassNotification?classId=${data.classId}`;
              }else if(data.gradeId){
                // 发布年级通知 /notification/publishGradeNotification
                url = `/notification/publishGradeNotification?gradeId=${data.gradeId}`;
              }else {
                // 发布全校通知 /notification/publishSchoolNotification
                url = `/notification/publishSchoolNotification`;
              }
              let methods = 'post';
              fx.setConnect(state, {url, methods, data})
              .then(res => {
                // dispatch('getNotice');
                resolve(res);
              }).catch(err => {
                reject(err);
              })
            })
          },
          //  删除通知 delete /notification/deleteNotification
           deleteNotice({state, dispatch, rootState}, id) {
            return new Promise((resolve, reject) => {
              let url = `/notification/deleteNotification?id=${id}`;
              let methods = 'delete';
              fx.setConnect(state, {url, methods})
              .then(res => {
                dispatch('getAllByclassId')
              }).catch(err => {
  
              })
            })
          },    
          //批量删除通知/notification/deleteNotificationBatch
          deleteClassInfoBatch({state, dispatch}, data){
            return new Promise((resolve,reject)=>{
              let url = `/notification/deleteNotificationBatch`;
            let methods ='delete'
            fx.setConnect(state, {url, methods,data})
            .then(res => {
              dispatch('getAllByclassId');
            }).catch(err => {
              console.log(err);
            })
            })
        },    
  }
}
export default adminAffair
