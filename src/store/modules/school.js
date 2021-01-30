import fx from '../../util/fx'
import { setItem, getItem } from '../../util/localStorage'
// MJK 明进康请求模块
const school = {
  state: {
    school: [],
    soft_:[],
    teachers: [
    ],
    grades: [],
    schoolLogo:[]

  },
  getters: {
    getSchool: state => state.school,
    getSchoolLogo:state=>state.schoolLogo,
    getSoft:state=>state.soft_
  },
  mutations: {
    // setSoft:(state, data) => state.soft_ = data,
    // setSchoolInfo(state, data) {
    //   state.schoolLogo = data;
    // },
  },
  actions: {   
    //学校添加**********************
    addSchool({state, rootState}, school_) {
      // console.log('addSchool')
        let url = "/school/add"
        let methods = 'post'
        let Authorization = rootState.Authorization;
        let data = school_;
        fx.setConnect({state}, {url, methods, data, Authorization })
        .then( res => {
         
        }).catch( error => {
         
        })
      },
    //获取学校列表 /school/getSchoolList
    getSchoolList({state, rootState}) {
      let url = "/school/getSchoolList"
      let Authorization = rootState.Authorization; 
      fx.setConnect({state}, {url, Authorization })
      .then( res => {
        state.school = res.data.data;
      }).catch( error => {
        
      })
    }, 
    // 获取学校列表 登录时用/school/getSchoolInfo
    getSchoolInfo({state, rootState}) {
      let url = "/school/getSchoolInfo"
      let Authorization = rootState.Authorization; 
      let methods ='post'
      fx.setConnect({state}, {url, Authorization,methods })
      .then( res => {  
        state.schoolLogo = res.data.data;
        // commit('setSchoolInfo', res.data.data.name)      
      }).catch( error => {      
      })
    },
    // /school/deleteSchool 删除学校
    deleteSchool({state, dispatch}, schoolId){
      let url = `/school/deleteSchool?schoolId=${schoolId}`;
      let methods ='delete'
      fx.setConnect({state}, {url, methods})
      .then(res => {
        dispatch('getSchoolList');
      }).catch(err => {
        console.log(err);
      })
  },
    //添加系统管理员
    addSysManager({state, rootState}, manager) {
      let url = "/sysmanager/add"
      let methods = 'post'
      let Authorization = rootState.Authorization;
      let data = manager;
      fx.setConnect({state}, {url, methods, data, Authorization })
      .then( res => {
        // console.log(res);
      }).catch( error => {
        // console.log(error);
      })
    },
    // /setting/software/publish  发布软件
    publishSoft({state, rootState}, soft_) {
      // console.log('addSchool')
        let url = "/setting/software/publish"
        let methods = 'post'
        let Authorization = rootState.Authorization;
        let data = soft_;
        fx.setConnect({state}, {url, methods, data, Authorization })
        .then( res => {
         
        }).catch( error => {
         
        })
      },
      // /setting/software/getAll 获取所有软件版本
      getSoftList({state, rootState}) {
        let url = "/setting/software/getAll"
        let Authorization = rootState.Authorization; 
        fx.setConnect({state}, {url, Authorization })
        .then( res => {
          state.soft_ = res.data.data;
          // commit('setSoft', res.data.data)
        }).catch( error => {
        
        })
       
      },

  }
}
export default school
