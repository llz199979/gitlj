import fx from '../../util/fx'
import { getItem } from '../../util/localStorage'
import api_ from '../../util/api_'

const classes = {
  state: {
    classAttendenceList: [],  //班级考勤列表
    oneCourseAttendence: [],  //所有班级在某节课的考勤list表
    gradeId_ClassList: [],    //一个年级的所有班级列表
    classNotice: [],          //班级通知列表
    AttendenceListByDate: [], //通过日期获取考勤列表
    classroomAttendence: [],  //通过班级ID、考勤ID获取某班某天考勤列表
    allClassId:[],
    teacherClockList:[],
    studentClockList:[]
  },
  getters: {
    get_AllClassId: state => state.allClassId,
    get_ClassAttendence_List: state => state.classAttendenceList,
    get_ClassList_ByGradeId: state => state.gradeId_ClassList,
    get_ClassNotice: state => state.classNotice,
    get_AttendenceList_ByDate: state => state.AttendenceListByDate,
    get_ClassroomAttendence: state => state.classroomAttendence,
    get_TeacherClockInList: state => state.teacherClockList,
    get_StudentClockInList: state => state.studentClockList
  },
  mutations: {
    setAllByClassId:(state, data) => state.allClassId = data,
    setInfoClassId: (state, data) => state.classId_getInfoId = data,
    setClassListByGradeId: (state, data) => state.gradeId_ClassList = data,
    setClassNotice: (state, data) => state.classNotice = data,
    set_AttendenceListByDate: (state, data) => state.AttendenceListByDate = data,
    set_ClassroomAttendence: (state, data) => state.classroomAttendence = data,
    set_TeacherClockInList: (state, data) => state.teacherClockList = data,
    set_StudentClockInList: (state, data) => state.studentClockList = data,
  },
  actions: {
    // 获取班级考勤概览 /clockin/class-clock-in-record/getClassClockInOverview/{classId}/{clockInId}
    // getOneCourseAttendence({state, rootState}, data) {
    //   return new Promise((resolve, reject) => {
    //     let url = `/clockin/class-clock-in-record/getClassClockInOverview/${data.classId}/${data.clockInId}`
    //     let Authorization = rootState.Authorization;
    //     fx.setConnect({state},{url, Authorization})
    //     .then(res => {
    //       // console.log(res.data.data);
    //       state.oneCourseAttendence = res.data.data;
    //       resolve(res.data.data);
    //     }).catch(err => {
    //       // console.log(err);
    //     })
    //   }) 
    // },
    // 根据日期获取考勤列表 /clockin/clock-in/getClockInListByDate/{date}
    // ByClockinList({state, rootState}, date) {
    //   return new Promise((resolve, reject) => {
    //     let url = `/clockin/clock-in/getClockInListByDate/${date}?date=${date}`
    //     let Authorization = rootState.Authorization;
    //     fx.setConnect({state},{url, Authorization})
    //     .then(res => {
    //       // console.log(res.data.data);
    //       state.classAttendenceList = res.data.data;
    //       resolve(res.data.data);
    //     }).catch(err => {
    //       // console.log(err);
    //     })
    //   }) 
    // },
    // 根据年级id获取某年级班级列表 /classinfo/getClassListByGradeId
    getClassListByGradeId({state, rootState, commit}, gradeId) {
      return new Promise((resolve, reject) => {
        let url = `/classinfo/getClassListByGradeId?gradeId=${gradeId}`;
        let Authorization = rootState.Authorization;
        fx.setConnect({state},{url, Authorization})
        .then(res => {
          commit('setClassListByGradeId', res.data.data);
          resolve(res.data.data);
        }).catch(err => {
          // console.log(err);
        })
      }) 
    },
      // 根据班级id查询通知 get /notification/getAllByclassId
      getAllByclassId({state,commit,rootState}, classId) {
        return new Promise((resolve, reject) => {
          if(!classId) {
            classId = classId? classId : '1266270271577264130';
          }
          // let classId = rootState.classId;
          let url = `/notification/getAllByclassId?classId=${classId}`;
          // let Authorization = rootState.Authorization;
          fx.setConnect({state},{url})
          .then(res => {
            // console.log(res.data.data);
            commit('setAllByClassId', res.data.data);
            resolve(res.data.data);
          }).catch(err => {
            // console.log(err);
          })
        })
      },
    //获取公告信息
    getClassNotice({state, commit, rootState}, classId){
      return new Promise((resolve, reject) => {
        // console.log('获取公告信息')
        if(!classId) {
          classId = rootState.classId;
        }
        api_({
          url: `/brand/getNotificationByClassId?classId=${classId}`,
          method: 'get',
        }).then(res => {
          
          // commit('setClassNotice', res.data.data);
          // resolve(res);
        }).catch(err => {
          reject(err);
        })
      })
    },
    // 查询某人某天考勤列表 /clockin/student-clock-in-record/getRecordList
    getSomeoneRecords({state, commit, rootState}) {
      return new Promise((resolve, reject) => {
        // console.log('获取考试信息')
        let url = '/clockin/student-clock-in-record/getRecordList';
        let Authorization = rootState.Authorization;
        fx.setConnect({state}, {url, Authorization})
        .then(res => {
          // console.log(res);
          commit('set_LeaveRecords', res.data.data);
          resolve(res);
        }).catch(err => {
          reject(err);
        })
      })
    },
    // 根据日期获取考勤列表 /clockin/clock-in/getClockInListByDate/{date}
    // getAttendenceListByDate({state, commit, rootState}, date) {
    //   return new Promise((resolve, reject) => {
    //     let url = `/clockin/clock-in/getClockInListByDate/${date}?date=${date}`;
    //     let Authorization = rootState.Authorization;
    //     fx.setConnect({state}, {url, Authorization})
    //     .then(res => {
    //       // console.log(res);
    //       commit('set_AttendenceListByDate', res.data.data);
    //       resolve(res.data.data);
    //     }).catch(err => {
    //       reject(err);
    //     })
    //   })
    // },
    
  
    // 获取班级考勤概览 /clockin/class-clock-in-record/getClassClockInOverview/{classId}/{clockInId}
    // getClassClockInOverview({state, commit, rootState}, obj) {
    //   return new Promise((resolve, reject) => {
    //     // console.log(obj)
    //     let url = `/clockin/class-clock-in-record/getClassClockInOverview/${obj.classId}/${obj.id}?classId=${obj.classId}&clockInId=${obj.id}`;
    //     // console.log(url)
    //     let Authorization = rootState.Authorization;
    //     fx.setConnect({state}, {url, Authorization})
    //     .then(res => {
    //       // console.log(res);
    //       commit('set_ClassroomAttendence', res.data.data);
    //       resolve(res.data.data);
    //     }).catch(err => {
    //       reject(err);
    //     })
    //   })
    // }

    // 获取班级考勤概览/record/getClassClockInOverview
    getClassClockInOverview({state, commit, rootState},data) {
      return new Promise((resolve, reject) => {
        let url = `/record/getClassClockInOverview?classId=${data.classId}&clockInName=${data.clockInName}&date=${data.nowTime}`;
        // console.log(url)
        let Authorization = rootState.Authorization;
        fx.setConnect({state}, {url, Authorization})
        .then(res => {
          // console.log(res);
          commit('set_ClassroomAttendence', res.data.data);
          resolve(res.data.data);
        }).catch(err => {
          reject(err);
        })
      })
    },

    //添加学生考勤 /record/clock-in-info/addStudentClockIn
    addStudentClockIn({state, rootState, dispatch}, attendence){
      return new Promise((resolve, reject) => {
        let url = "/record/clock-in-info/addStudentClockIn";
      // let Authorization = rootState.Authorization;
      let methods = 'post';
      let data = attendence;
      fx.setConnect({state}, {url, methods, data})
      .then(res => {
        dispatch('getStudentClockInList');
        resolve(1);
      }).catch(err => {
        // console.log(err)
      })
      })
    },
      //获取学生考勤列表/record/clock-in-info/getStudentClockInList
      getStudentClockInList({state, commit, rootState}) {
        return new Promise((resolve, reject) => {
          let url = '/record/clock-in-info/getStudentClockInList';
          let Authorization = rootState.Authorization;
          fx.setConnect({state}, {url, Authorization})
          .then(res => {
            console.log(res);
            commit('set_StudentClockInList', res.data.data);
            resolve(res);
          }).catch(err => {
            reject(err);
          })
        })
      },
      //添加教师考勤 /record/clock-in-info/addTeacherClockIn
      addTeacherClockIn({state, rootState, dispatch}, data){
        return new Promise((resolve, reject) => {
          let url = "/record/clock-in-info/addTeacherClockIn";
        // let Authorization = rootState.Authorization;
        let methods = 'post';
        fx.setConnect({state}, {url, methods, data})
        .then(res => {
          dispatch('getTeacherClockInList');
          resolve(1);
        }).catch(err => {
          // console.log(err)
        })
        })
      },
       //获取老师考勤列表/record/clock-in-info/getTeacherClockInList
       getTeacherClockInList({state, commit, rootState}) {
        return new Promise((resolve, reject) => {
          let url = '/record/clock-in-info/getTeacherClockInList';
          let Authorization = rootState.Authorization;
          fx.setConnect({state}, {url, Authorization})
          .then(res => {
            console.log(res);
            commit('set_TeacherClockInList', res.data.data);
            resolve(res);
          }).catch(err => {
            reject(err);
          })
        })
      },
      // 考勤批量删除/record/clock-in-info/deleteBatch
      deleteTeacherClockBatch({state, dispatch}, data){
        return new Promise((resolve,reject)=>{
          let url = `/record/clock-in-info/deleteBatch`;
        let methods ='delete'
        fx.setConnect(state, {url, methods,data})
        .then(res => {
          dispatch('getTeacherClockInList');
        }).catch(err => {
          console.log(err);
        })
        })
     },    
      // 考勤批量删除/record/clock-in-info/deleteBatch
      deleteStudentClockBatch({state, dispatch}, data){
        return new Promise((resolve,reject)=>{
          let url = `/record/clock-in-info/deleteBatch`;
        let methods ='delete'
        fx.setConnect(state, {url, methods,data})
        .then(res => {
          dispatch('getStudentClockInList');
        }).catch(err => {
          console.log(err);
        })
        })
     },  
    //  修改教师考勤/record/clock-in-info/updateClockIn  
    updateTeacherClock( {state, dispatch}, data ){
      let url = '/record/clock-in-info/updateClockIn';
      let methods = 'patch';
      fx.setConnect({state}, {url, methods, data})
      .then(res => {
        dispatch('getTeacherClockInList')
      }).catch(err => {

      })
    },
     //  修改学生考勤/record/clock-in-info/updateClockIn  
     updateStudentClock( {state, dispatch}, data ){
      let url = '/record/clock-in-info/updateClockIn';
      let methods = 'patch';
      fx.setConnect({state}, {url, methods, data})
      .then(res => {
        dispatch('getStudentClockInList')
      }).catch(err => {

      })
    },
  }
}
export default classes
