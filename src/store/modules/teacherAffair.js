import fx from '../../util/fx'
import { getItem } from '../../util/localStorage'
import api_ from '../../util/api_'
import { Notification } from 'element-ui';
// import { resolve } from 'core-js/fn/promise';
const teacherAffair = {
  state: {
    ordinaryTeachers: [],   //普通老师列表（不含优秀教师）
    // goodTeachers: [],       //优秀教师列表
    classTeachers: [],      //班级任课老师列表
    dutyList: [],           //值日生列表
    classLeader: [],         //班干部列表
    classPictures: [],       //班级相册
    classHonors: [],         //班级荣誉
    classWorks: [],           //班级作品
    classId: '',
    getInfoId:[],
    titleList:[],
  },
  getters: {
    // getGoodTeachers: state => state.goodTeachers,
    getOrdinaryTeachers: state => state.ordinaryTeachers,
    get_ClassTeachers: state => state.classTeachers,
    get_dutyList: state => state.dutyList,
    get_TitleList: state => state.titleList,
    get_classLeader: state => state.classLeader,
    get_ClassPictures: state => state.classPictures,
    get_ClassHonors: state => state.classHonors, 
    get_ClassWorks: state => state.classWorks,
  },
  mutations: {
    set_OrdinaryTeachers: (state, data) => state.ordinaryTeachers = data,
    // set_GoodTeachers: (state, data) => state.goodTeachers = data,
    set_ClassTeachers: (state, data) => state.classTeachers = data,
    set_dutyList: (state, data) => state.dutyList = data,
    set_TitleList: (state, data) => state.titleList = data,
    set_ClassLeader: (state, data) => state.classLeader = data,
    set_ClassPictures: (state, data) => state.classPictures = data,
    set_ClassHonors: (state, data) => state.classHonors = data,
    set_ClassWorks: (state, data) => state.classWorks = data
  },
  actions: {
    //获取未评定教师列表
    searchTeachers({state, rootState, commit}) {
      api_.get('/brand/getTeacherList')
      .then(res => {
        // console.log(res.data.data)
        if(res.data.data){
          commit('set_OrdinaryTeachers', res.data.data)
        }
      })
    },
   
      //值日安排 
      addDutyList({state, rootState, dispatch}, data){
        return new Promise((resolve, reject) => {
          let url = `/onduty/addOnduty`,
            methods = 'post';          
            data.classId = getItem('classId');
            fx.setConnect(state, {url, methods, data})
            .then(res => {
              dispatch('getDutyList')
              
              resolve()
            }).catch(err => {

            })
        })
      },
      // 获取值日生 get /onduty/list
      getDutyList({state, rootState, commit}, classId){
        return new Promise((resolve, reject) => {
        let classId = rootState.classId;
        let url = `/onduty/list?classId=${classId}`
        fx.setConnect(state, {url})
        .then(res => {
          // console.log(res)
          commit('set_dutyList', res.data.data)
          resolve(res.data.data)
        }).catch(err => {
          // console.log(err)
        })
      })
    },
      // 删除值日生记录 delete /onduty/{ondutyId}
      delOnDutyListById({state, dispatch}, data) {
        return new Promise((resolve, reject) => {
          let url =  `/onduty/deleteBatch`,
          methods = 'delete';
          fx.setConnect(state, {url, methods,data})
          .then(res => {
            // console.log(res);
            dispatch('getDutyList');
          }).catch(err => {
            // console.log(err)
          })
        })
      },
      // 添加班干部 post /classleader/addLeader
      addClassLeader({state, rootState, dispatch}, data) {
        let url = `/classleader/addLeader`,
        methods = 'post';
        data.classId = getItem('classId');
        fx.setConnect(state, {url, methods, data})
        .then(res => {
          dispatch('getClassLeader');
        }).catch(err => {
          // console.log(err)
        })
      },
      // 删除班干部 /classleader/leader/{leaderId}
      delClassLeader({state, rootState, dispatch}, id) {
        return new Promise((resolve, reject) => {
          let url = `/classleader/leader/${id}?leaderId=${id}`,
          methods = 'delete';
          fx.setConnect(state, {url, methods})
          .then(res => {
            // console.log(res);
            dispatch('getClassLeader');
          }).catch(err => {
            // console.log(err)
          })
        })
      },
      // 获取班干部列表 /classleader/listClassLeader/{classId}
      getClassLeader({state, rootState, commit},classId) {
        return new Promise((resolve, reject) => {
          // if(!classId) {
          //   classId = rootState.classId? rootState.classId : '1266270271577264130';
          // }
          let classId = rootState.classId;
          let url = `/classleader/listClassLeader?classId=${classId}`;
          fx.setConnect(state, {url})
          .then(res => {
            // console.log(res)
            commit('set_ClassLeader', res.data.data)
            resolve(res.data.data);
          }).catch(err => {
            // console.log(err);
          })
        })
      },
      //添加任课老师
      addClassTeacher({state, rootState, dispatch}, data) {
        return new Promise((resolve, reject) => {
          let url = `/classteacher/add`,
          methods = 'post';
          data.classId = getItem('classId')
          fx.setConnect(state, {url, methods, data})
          .then(res => {
            resolve(res);
            dispatch('getClassTeachers');
          }).catch(err => {
            reject(err)
            // console.log(err)
          })
        })
      },
      // 删除任课老师 delete /classteacher
      delClassTeacher({state, dispatch}, data) {
        return new Promise((resolve, reject) => {
          data.classId = getItem('classId')
          let url = `/classteacher/deleteBatch`,
          methods = 'delete';
          fx.setConnect(state, {url, methods,data})
          .then(res => {
            dispatch('getClassTeachers');
          }).catch(err => {
            // console.log(err)
          })
        })
      },
      // 获取班级任课老师列表 get /classteacher/list
      getClassTeachers({state, rootState, commit},classId) {
        return new Promise((resolve, reject) => {
          let classId = rootState.classId;
          let url = `/classteacher/list?classId=${classId}`; 
          fx.setConnect(state, {url})
          .then(res => {
            // console.log(res)
            commit('set_ClassTeachers', res.data.data)
          }).catch(err => {
            // console.log(err);
          })
        })
      },
   // 添加班级相册/classPhoto/addBatch
   uploadAlbum({state, rootState, commit}, data) {
    return new Promise((resolve, reject) => {
      let url = `/classPhoto/addBatch`,
      methods = 'post';
      data.classId = getItem('classId')
      fx.setConnect(state, {url,methods,data})
      .then(res =>{
         resolve(res);
      }).catch(err => {
        // console.log(err);
      })
    })
  },
  // 查询班级相册/classPhoto/listByClassId
  getClassPictures({state, rootState, commit}, classId) {
    return new Promise((resolve, reject) => {
      let classId = rootState.classId; 
      //  if(!classId) {
      //   classId = rootState.classId? rootState.classId : '1266270271577264130';
      // }
      let url = `/classPhoto/listByClassId?classId=${classId}`;
      fx.setConnect(state, {url})
      // api_.get(`/classPhoto/listByClassId?classId=${classId}`)
      .then(res => {
        // console.log(' res.data.data.classPhotoItemList'+ res.data.data.classPhotoItemList)
        commit('set_ClassPictures', res.data.data.classPhotoItemList)
      }).catch(err => {
        // console.log(err);
      })
    })
  },
      // 班级相册 批量删除 /deleteByClassId
      delClassPictureByIds({state, rootState, commit, dispatch}, data) {
        return new Promise((resolve, reject) => {
         
          let classId = rootState.classId;
          let url = `/classPhoto/deleteByClassId?classId=${classId}`,
          methods = 'delete';
          fx.setConnect(state, {url, methods,data})
          .then(res => {
            // console.log('delete'+res);
            dispatch('getClassPictures');
          }).catch(err => {
            // console.log(err)
          })
        })
      },
        // 班级相册 照片id删除 /classPhoto/deleteById
        deletePhotoById({state, rootState, commit, dispatch}, data) {
          return new Promise((resolve, reject) => {
            let url = `/classPhoto/deleteById?id=${data}`,
            methods = 'delete';
            fx.setConnect(state, {url, methods,data})
            .then(res => {
              // console.log('delete'+res);
              dispatch('getClassPictures');
            }).catch(err => {
              // console.log(err)
            })
          })
        },
      
    //添加班级荣誉图片
      addClassHonorPic({state, rootState, dispatch}, uploadFile) {
        return new Promise((resolve, reject) => {
          api_({
            url: '/brand/addHonorPic',
            method: 'post',
            data: uploadFile
          }).then(res => {
            // dispatch('getHonor')
            resolve(1);
            // console.log(res);
          }).catch(err => {
            // console.log(err);
          })
        })
      },
      // 班级荣誉添加 post /honour/addClassHonour
      addClassHonor({state, rootState, commit, dispatch}, data) {
        return new Promise((resolve, reject) => {
          let url = `/honour/addClassHonour`,
          methods = 'post';
          data.classId = getItem('classId')
          fx.setConnect(state, {url, methods, data})
          .then(res => {
              // console.log('0830--->'+JSON.stringify(res));
          }).catch(err => {
            // console.log(err);
          })
        })
      },
      // 查询班级荣誉 get v
      getClassHonors({state, rootState, commit}, classId) {
        return new Promise((resolve, reject) => {
          if(!classId) {
            classId = rootState.classId? rootState.classId : '1266270271577264130';
          }
          let url = `/honour/getClassHonourList?classId=${classId}`;
          fx.setConnect(state, {url})
          .then(res => {
            commit('set_ClassHonors', res.data.data)
          }).catch(err => {
            // console.log(err);
          })
        })
      },
      // 删除荣誉 /honour/delete
      delClassHonorByIds({state, rootState, dispatch}, data) {
        return new Promise((resolve, reject) => {
          let url = `/honour/delete`;
          let methods = 'delete';
          fx.setConnect(state, {url, methods,data})
          .then(res => {
            // console.log(res);
            dispatch('getClassHonors');
          }).catch(err => {
            // console.log(err)
          })
        })
      },
      // 添加班级作品 /studentWorks
      addClassWorks( {state, rootState, commit, dispatch}, data) {
        return new Promise((resolve, reject) => {         
          let url = `/studentWorks`,
          methods = 'post';
          data.classId = getItem('classId')
          fx.setConnect(state, {url, methods, data})
          .then(res => {
            // console.log(res)
            dispatch('getClassWorks')
            resolve(res)
          }).catch(err => {
            // console.log(err);
          })
        });
      },
      
      // 查询班级作品/studentWorks/listByClassId  
      getClassWorks({state, rootState, commit}, classId) {
        // console.log('查询班级作品')
        return new Promise((resolve, reject) => {
          let classId = rootState.classId; 
          let url = `/studentWorks/listByClassId?classId=${classId}`;
          fx.setConnect(state, {url})
          .then(res => {
            // console.log('1111'+JSON.stringify(res));
            resolve(res)
           commit('set_ClassWorks', res.data.data)
          }).catch(err => {
            // console.log(err);
          })
        })
      },
      // 班级作品删除 /delClassAuthor
      delClassWorks({state, rootState, commit, dispatch}, data) {
        return new Promise((resolve, reject) => {
          let url = `/studentWorks`;
          let methods = 'delete';
          fx.setConnect(state, {url, methods,data})
          .then(res => {
            // console.log('666'+res);
            dispatch('getClassWorks');
          }).catch(err => {
            // console.log(err)
          })
        })
      },
         
  }
}
export default teacherAffair
