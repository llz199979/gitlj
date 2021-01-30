import fx from '../../util/fx'
import api_ from '../../util/api_'
import { getItem } from '../../util/localStorage'

const admin = {
  state: {
    teachers: [],    //教师表,
    classroom: [],
    classData: [    //班级表格
    ],
    selects: [],    //班级筛选表
    grades: [],     //年级表
    typeList: [],   //考勤类型列表
    clockInList: [], //考勤表
    schedule: [],    //作息表,
    courseList: [],  //课程项目表,
    courseTable: [],  //课程表
    icon:[],//icon列表
    classes:[],
    leaveRecords: []  //离校记录
  },
  getters: {
    getIcon: state => state.icon, //获取列表数据
    getTeachers: state => state.teachers,
    getClasses: state => state.classData,
    getGrade: state => state.grades,
    getOptions: state => state.selects,
    get_ClockList: state => state.clockInList, //考勤列表
    get_TypeList: state => state.typeList, //考勤类型列表
    get_ClassroomList: state => state.classroom,
    get_schedule: state => state.schedule,
    get_CourseList: state => state.courseList, //获取课程列表
    getCourseTable: state => state.courseTable,
    get_leaveRecords: state => state.leaveRecords,
    get_classes: state => state.classes
  },
  mutations: {
    set_class_select(state) {
      state.classes = data;
    },
    set_LeaveRecords(state, data) { //设置离校记录
      state.leaveRecords = data;
    },
    set_teachers(state, data) {
      state.teachers = data;
    },
    set_Grade(state, data) {
      state.grades = data;
    },
  },
  actions: {
    //年级管理*********************
    // 1.获取年级信息
    GradeList({state,rootState}, commands) {
        var url = '/grade/getGradeList'
      fx.setConnect({ state }, { url })
      .then( res => {
        let arr = res.data.data;      
        state.grades = arr;
        commit('set_Grade', arr);
        }).catch(err => {
          console.log(err)
        })
    },
    //添加年级:
    addGrade({state,dispatch}, grade) {
      let url = "/grade/add"
      let methods = 'post'
      // let Authorization = rootState.Authorization;
      let data = grade;
      // console.log(grade)
      fx.setConnect({state}, {url, methods, data })
      .then( res => {
        dispatch('GradeList', 'add')
      }).catch( error => {
        console.log(error);
      })
    },
    //添加教室/place/add
    addClassroom({ state, rootState, dispatch }, classroom) {
      console.log(classroom)
      let url = "/place/add"
      let methods = 'post'
      // let Authorization = rootState.Authorization;
      let data = classroom;
      // console.log(classroom)
      fx.setConnect({state}, {url, methods, data })
      .then( res => {
        dispatch('getClassroomList');
      }).catch( error => {
        console.log(error);
      })
    },
    // 删除地点/place/{placeId}
    deletePlace({state, rootState, dispatch}, placeId) {
      let url = `place/${placeId}?placeId=${placeId}`;
      let methods = 'delete';
      // let Authorization = rootState.Authorization;
      fx.setConnect({state}, {url, methods})
      .then(res => {
        dispatch('getClassroomList');
      }).catch(err => {
        console.log(err);
      })
    },
    //获取教室列表/place/list
    getClassroomList( {state, rootState} ) {
      return new Promise((resolve, reject) => {
        let url = '/place/list'
        // let Authorization = rootState.Authorization;
        fx.setConnect({state}, {url})
        .then( res => {
          // console.log(res.data.data);
          let arr = res.data.data;
          state.classroom = arr;
          // fx.classSelect(state);
          resolve(res);
          // console.log(state.selects)
        }).catch(error => {
          // console.log(error);
        })
      })
  },
  //修改教室 /place/update
    updateClassroom({state, dispatch}, data ){
      let url = '/place/update';
      let methods = 'patch';
      fx.setConnect({state}, {url, methods, data})
      .then(res => {
        JSON.stringify(res)
        dispatch('getClassroomList')
      }).catch(err => {

      })
    },


    //添加班级********************
    addClass_ ({ state, rootState, dispatch }, class_) {
      console.log(class_)
      return new Promise((resolve, reject) => {
        let url = "/classinfo/add"
        let methods = 'post'
        // let Authorization = rootState.Authorization;
        let data = class_;
        // console.log(class_)
        console.log(state.classData)
        fx.setConnect({state}, {url, methods, data })
        .then( res => {
          dispatch('getClassSelect');
          resolve(1);
        }).catch( error => {
          console.log(error);
        })
      })
    },
    
    //添加班主任，如果已存在则更新 /classinfo/addClassTeacher
    addHeadMaster({state, rootState, dispatch}, data) {
      return new Promise((resolve, reject) => {
        let url = '/classinfo/addClassTeacher';
        let methods = 'patch';
        fx.setConnect({state}, {url, methods, data})
        .then(res => {
          resolve(1);
          dispatch('getClassSelect')
        }).catch(err => {
          console.log(err);
        })
      })
    },
    //获取班主任列表/teacher/getHeadTeacher
    // getHeadTeacher({state,commit},classId) {
    //   return new Promise((resolve, reject) => {
    //     if(!classId) {
    //       // classId = rootState.classId;
    //       classId = localStorage.getItem('classId');
    //     }
    //     let url = '/teacher/getHeadTeacher?classId=' + classId;
    //     // let Authorization = rootState.Authorization;
    //     fx.setConnect({ state }, { url })
    //     .then( res => {
    //       state.classStudent = res.data.data;
    //       commit('set_teachers', res.data.data)
    //       // console.log(res.data);
    //       resolve(res.data.data);
    //     }).catch(err => {
    //       // console.log(err)
    //     })
    //   }) 
    // }

    // 班级升年级 /classinfo/upgrade/{classId}
    upgrade({state, dispatch}, classId) {
      let url = `/classinfo/upgrade/${classId}?classId=${classId}`;
      let methods = 'patch';
      fx.setConnect({state}, {url, methods})
      .then(res => {
        dispatch('getClassSelect')
      })
    },
    // 修改班级信息 /classinfo/update
    updateClass( {state, dispatch}, data ){
      let url = '/classinfo/update';
      let methods = 'patch';
      fx.setConnect({state}, {url, methods, data})
      .then(res => {
        dispatch('getClassSelect')
      }).catch(err => {

      })
    },
    // 修改年级信息
    updateGrade( {state, dispatch}, data ){
      let url = '/grade/update';
      let methods = 'patch';
      fx.setConnect({state}, {url, methods, data})
      .then(res => {
        dispatch('getClassSelect')
      }).catch(err => {

      })
    },
    //获取班级信息
    getClassSelect( {state,rootState, commit }, byName) {
        return new Promise((resolve, reject) => {
          let url = '/classinfo/getClassList'
          // let Authorization = rootState.Authorization;
          fx.setConnect({state}, {url})
          .then( res => {
            // console.log(res.data.data);
            let arr = res.data.data;
            state.classData = arr;
            // if(byName) {
            //   fx.classSelect_Name(state);
            // }
            resolve(res.data.data);
            fx.classSelect(state);
            // console.log(state.selects)
            commit('set_class_select',res.data.data);
          }).catch(error => {
            // console.log(error);
          })
        })
    },
     //批量删除班级/classinfo/deleteBatch
     deleteClassBatch({state, dispatch}, data){
      return new Promise((resolve,reject)=>{
        let url = `/classinfo/deleteBatch`;
      let methods ='delete'
      fx.setConnect(state, {url, methods,data})
      .then(res => {
        dispatch('getClassSelect');
      }).catch(err => {
        console.log(err);
      })
      })
  },    
    // 1.老师添加**********************
    addTeacher ({ state, rootState, dispatch }, teacher) {
      // state.teachers.push(teacher)
      // console.log(teacher)
      // state.t_key = true;
      return new Promise((resolve, reject) => {
        var methods = 'post';
      var url = '/teacher/add';
      var data = teacher;
      fx.setConnect({state},{url,methods,data})
      .then(res => {
        // console.log(res);
        resolve(1)
        // state.teachers.push(teacher);
        dispatch('getTeachersInfo');
        // state.teachers.push(res.data.data);
      }).catch(err => {
        console.log(err);
      })
      })
    }, 
    // 删除教师信息 /teacher/{teacherId}
    deleteTeacher({state, dispatch}, teacherId){
        let url = `/teacher/${teacherId}?teacherId=${teacherId}`;
        let methods ='delete'
        fx.setConnect({state}, {url, methods})
        .then(res => {
          dispatch('getTeachersInfo');
        }).catch(err => {
          console.log(err);
        })
    },
    //批量删除教师信息/teacher/deleteBatch
    deleteTeacherBatch({state, dispatch}, data){
      return new Promise((resolve,reject)=>{
        let url = `/teacher/deleteBatch`;
      let methods ='delete'
      fx.setConnect(state, {url, methods,data})
      .then(res => {
        dispatch('getTeachersInfo');
      }).catch(err => {
        console.log(err);
      })
      })
  },
    // 修改老师信息/teacher/update
    updateTeacher( {state, rootState,dispatch}, data ) {
      return new Promise( (resolve, reject) => {
        let url = `/teacher/update`;
        let methods = 'patch';
        // console.log(data)
        fx.setConnect({state}, {url, methods, data})
        .then(res => {
              dispatch('getTeachersInfo');
              resolve(1);
        }).catch(err => {
          
        })
      //   api_({
      //     url: '/brand/updateTeacher',
      //     method: 'post',
      //     data: teacher
      //   }).then(res => {
      //     dispatch('getTeachersInfo');
      //     resolve(1);
      //   }).catch(err => {
      //     console.log(err);
      //   })
      })
    },
    // 2.获取老师信息 success;
    getTeachersInfo ({ state, commit }) {
      // state.teachers = [];
        var url = '/teacher/list'
      fx.setConnect({ state }, { url })
      .then( res => {
        let arr = res.data.data;
        // state.teachers = arr;
        commit('set_teachers', arr);
          console.log(res.data);
        }).catch(err => {
          // console.log(err)
        })
    },
    // 3./teacher/getType 获取教师具体分类
    getTeacherType({state}) {
      // var methods = 'post';
      var url = '/teacher/getType';
      fx.setConnect({state},{url})
      .then(res => {
        // console.log(res);
        // state.teachers.push(res.data.data);
      }).catch(err => {
        // console.log(err);
      })
    },
    
    // /icon/addIcon 添加icon 
    addIcon({ state,dispatch,rootState }, icon) {
      return new Promise((resolve, reject) => {
        var url = '/icon/addIcon';
        var methods = 'post';
        var data = icon;
        var Authorization = rootState.Authorization;
      fx.setConnect({state},{url,methods,data, Authorization})
      .then(res => {
        // console.log('获取icon图标'+res);
        dispatch('getIconImage');
        resolve(1)
      }).catch(err => {
        // console.log(err);
      })
      })
    },
    ///icon/listIcon 获取所有icon
    getIconImage({state, rootState}) {
      var url = '/icon/listIcon'
      var Authorization = rootState.Authorization;
      fx.setConnect({ state }, { url,Authorization })
      .then( res => {
         state.icon = res.data.data;
      }).catch(err => {
        // console.log(err)
      })
  },
  // /icon/deleteIconBatch 通过iconId批量删除icon
    deleteIcon({state, dispatch}, data){
      return new Promise((resolve,reject)=>{
        let url = `/icon/deleteIconBatch`;
      let methods ='delete'
      fx.setConnect(state, {url, methods,data})
      .then(res => {
        dispatch('getIconImage');
      }).catch(err => {
        // console.log(err);
      })
      })
  },

    //获取作息表列表 /clockin/activity-schedule-table/getActivityTableList
    getActivityTableList({state, rootState}) {
      return new Promise((resolve, reject) => {
        let url = '/clockin/activity-schedule-table/getActivityTableList';
        // let Authorization = rootState.Authorization;
        fx.setConnect({state},{url})
        .then(res => {
          // console.log(res.data.data);
          state.schedule = res.data.data;
          // state.teachers.push(res.data.data);
          resolve(res.data.data);
        }).catch(err => {
          // console.log(err);
        })
      })
    },
    // 添加作息表/clockin/activity-schedule-table/add
    workRestAdd({state, rootState, dispatch}, table) {
      return new Promise((resolve,reject) => {
        let url = "/clockin/activity-schedule-table/add";
        // let Authorization = rootState.Authorization;
        let methods = 'post';
        let data = table;
        fx.setConnect({state}, {url, methods, data})
        .then(res => {
          dispatch('getActivityTableList');
          resolve(res);
        }).catch(err => {
          // console.log(err)
        })
      })
    },
    // 删除作息表 /clockin/activity-schedule-table/{id}
    deleteWorkRest({state, rootState, dispatch}, id) {
      let url = `/clockin/activity-schedule-table/${id}?id=${id}`;
      let methods = 'delete';
      // let Authorization = rootState.Authorization;
      fx.setConnect({state}, {url, methods})
      .then(res => {
        dispatch('getActivityTableList');
      }).catch(err => {
        // console.log(err);
      })
    },
    //更新作息表 /clockin/activity-schedule-table/update
    updateWorkRest({state, rootState, dispatch}, table) {
      return new Promise((resolve,reject) => {
        let url = "/clockin/activity-schedule-table/update";
        // let Authorization = rootState.Authorization;
        let methods = 'patch';
        let data = table;
        // console.log(data)
        fx.setConnect({state}, {url, methods, data})
        .then(res => {
          dispatch('getActivityTableList');
          resolve(res);
        }).catch(err => {
          // console.log(err)
        })
      })
    },
    // 获取作息表项列表/clockin/activity-item/getActivityItemList/{tableId}
    getActivityItemList({state, rootState}, tableId) {
      return new Promise((resolve, reject) => {
        let url = `/clockin/activity-item/getActivityItemList/${tableId}?tableId=${tableId}`;
        // let Authorization = rootState.Authorization;
        fx.setConnect({state},{url})
        .then(res => {
          resolve(res.data.data); 
        }).catch(err => {
          // console.log(err);
        })
      })
    },
    // 删除作息表项 /clockin/activity-item/{id}
    deleteItem({state, rootState, dispatch}, id) {
      return new Promise( (resolve, reject) => {
        let url = `/clockin/activity-item/${id}?id=${id}`;
        let methods = 'delete';
        // let Authorization = rootState.Authorization;
        fx.setConnect({state}, {url, methods})
        .then(res => {
          resolve(1);
          // dispatch('getActivityTableList');
        }).catch(err => {
          // console.log(err);
        })
      })
    },
    //添加作息表项 /clockin/activity-schedule-table/addItem
    workRestItemAdd({state, rootState, dispatch}, table) {
      return new Promise((resolve,reject) => {
        let url = "/clockin/activity-schedule-table/addItem";
        // let Authorization = rootState.Authorization;
        let methods = 'post';
        let data = table;
        // console.log(data);
        fx.setConnect({state}, {url, methods, data})
        .then(res => {
          resolve(res);
        }).catch(err => {
          // console.log(err)
        })
      })
    },
    // 更新作息表项 /clockin/activity-item/update
    updateItemList({state, rootState, dispatch}, table) {
      return new Promise((resolve,reject) => {
        let url = "/clockin/activity-item/update";
        // let Authorization = rootState.Authorization;
        let methods = 'patch';
        let data = table;
        // console.log(data)
        fx.setConnect({state}, {url, methods, data})
        .then(res => {
          dispatch('getActivityItemList', table.tableId)
          .then(d => {
            resolve(d);
          })
        }).catch(err => {
          // console.log(err)
        })
      })
    }, 
    //获取课程列表 /course/getCourseList
    getCourseList({state, rootState}) {
      return new Promise((resolve, reject) => {
        let url = '/course/getCourseList';
        // let Authorization = rootState.Authorization;
        fx.setConnect({state},{url})
        .then(res => {
          // console.log(res.data.data);
          state.courseList = res.data.data;
          resolve(res.data.data);
        }).catch(err => {
          // console.log(err);
        })
      })
    },
    //添加课程 /course/add
    courseAdd({state, rootState, dispatch}, table) {
      return new Promise((resolve,reject) => {
        let url = "/course/add";
        // let Authorization = rootState.Authorization;
        let methods = 'post';
        let data = table;
        // console.log(data)
        fx.setConnect({state}, {url, methods, data})
        .then(res => {
          dispatch('getCourseList');
          resolve(res);
        }).catch(err => {
          // console.log(err)
        })
      })
    },
    //获取课程表列表 /course/course-table/getCourseTableList
    getCourseTable({state, rootState}) {
      return new Promise((resolve, reject) => {
        let url = '/course/course-table/getCourseTableList';
        // let Authorization = rootState.Authorization;
        fx.setConnect({state},{url})
        .then(res => {
          // console.log(res);
          // console.log(res.data.data);
          state.courseTable = res.data.data;
          resolve(res.data.data);
        }).catch(err => {
          // console.log(err);
        })
      })
    },
    //新建课程表 /course/course-table/add
    // scheduleAdd({state, rootState, dispatch}, schedule ){
    //   return new Promise((resolve, reject) => {
    //     let url = "/course/course-table/add";
    //     // let Authorization = rootState.Authorization;
    //     let methods = 'post';
    //     let data = schedule ;
    //     fx.setConnect({state}, {url, methods, data})
    //     .then(res => {
    //       resolve(res);
    //       dispatch('getCourseList');
    //       // console.log(res);
    //     }).catch(err => {
    //       // console.log(err)
    //     })
    //   })
    // },
    // 根据班级ID获取课程表项列表 /course/course-table/getCourseTable
    getCourseTableItem({state, rootState}, classId) {
      return new Promise((resolve, reject) => {
        if(!classId) {
          classId = rootState.classId? rootState.classId : '1266270271577264130';
        }
        let url = `/course/course-table/getCourseTable?classId=${classId}`;
        // let Authorization = rootState.Authorization;
        fx.setConnect({state},{url})
        .then(res => {
          // console.log(res);
          // console.log(res.data.data);
          // state.courseList = res.data.data;
          resolve(res.data.data);
        }).catch(err => {
          // console.log(err);
        })
      })
    },
    //添加课程表项 /course/course-item/add
    scheduleItemAdd({state, rootState, dispatch}, schedule){
      let url = "/course/course-item/addFullCourseTable";
      // let Authorization = rootState.Authorization;
      let methods = 'post';
      let data = schedule;
      fx.setConnect({state}, {url, methods, data})
      .then(res => {
        // dispatch('getClockInList');
        // console.log(res);
      }).catch(err => {
        // console.log(err)
      })
    },
    
    // 更新课程表项 /course/course-item/update
    updateCourseItem({state, rootState}, data) {
      return new Promise((resolve,reject) => {
        let url = "/course/course-item/update";
        // let Authorization = rootState.Authorization;
        let methods = 'patch';
        // console.log(data)
        fx.setConnect({state}, {url, methods, data})
        .then(res => {
          resolve(res);
          // dispatch('getActivityItemList', table.tableId)
          // .then(d => {
          //   resolve(d);
          // })
        }).catch(err => {
          // console.log(err)
        })
      })
    },
    // /clockin/activity-schedule-table/update  更新作息表

    
    // // 通过列表更新课程表项 /course/course-item/updateByList
    // updateCourseByList({state, rootState}, data) {
    //   // console.log(data)
    //   return new Promise((resolve,reject) => {
    //     let url = "/course/course-item/updateByList";
    //     // let Authorization = rootState.Authorization;
    //     let methods = 'patch';
    //     // console.log(data)
    //     fx.setConnect({state}, {url, methods, data})
    //     .then(res => {
    //       resolve(res);
    //       // dispatch('getActivityItemList', table.tableId)
    //       // .then(d => {
    //       //   resolve(d);
    //       // })
    //     }).catch(err => {
    //       console.log(err)
    //     })
    //   })
    // },
    // // 通过文件导入教师/teacher/importByFile
    // uploadTeachers({state, rootState}, data) {
    //   return new Promise((resolve,reject) => {
    //     let url = "/teacher/importByFile";
    //     // let Authorization = rootState.Authorization;
    //     let methods = 'post';
    //     console.log(data)
    //     fx.setConnect({state}, {url, methods, data})
    //     .then(res => {
    //       resolve(res);
    //     }).catch(err => {
    //       console.log(err)
    //     })
    //   })
    // },
    //添加考勤类型：/clockin/clock-in/add
    clockListAdd({state, rootState, dispatch}, attendence){
      return new Promise((resolve, reject) => {
        let url = "/clockin/clock-in/add";
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
    //获取考勤列表：/clockin/clock-in/getClockInList
    // getClockInList({state, rootState}) {
    //   let url = "/clockin/clock-in/getClockInList";
    //   // let Authorization = rootState.Authorization;
    //   fx.setConnect({state}, {url})
    //   .then(res => {
    //     state.clockInList = res.data.data;
    //     // console.log(res);
    //   }).catch(err => {
    //     // console.log(err)
    //   })
    // },
    //获取考勤类型列表 /clockin/clock-in-type/getClockInTypeList
    getClockInTypeList({state, rootState}) {
      let url = "/clockin/clock-in-type/getClockInTypeList";
      // let Authorization = rootState.Authorization;
      fx.setConnect({state}, {url})
      .then(res => {
        state.typeList = res.data.data;
        // console.log(res);
      }).catch(err => {
        // console.log(err)
      })
    },
    //  获取离校记录/leaveschool/list
    getLeaveRecords({state, commit, rootState}) {
      return new Promise((resolve, reject) => {
        // console.log('获取考试信息')
        let url = '/leaveschool/list';
        // let Authorization = rootState.Authorization;
        fx.setConnect({state}, {url})
        .then(res => {
          // console.log(res);
          commit('set_LeaveRecords', res.data.data);
          resolve(res);
        }).catch(err => {
          reject(err);
        })
      })
    },
  }
}
export default admin
