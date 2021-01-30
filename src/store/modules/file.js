import { asyncRouterMap } from '../../router/asyncRouterMap'
import router from '../../router/index'
import fx from '../../util/fx';
import axios from 'axios'
const file = {
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    // 文件上传(视频、图片) post /media/upload
    uploadFileToServe({state}, data) {
      return new Promise((resolve, reject) => {
        let url = `/media/upload`,
            methods = 'post';
            fx.setConnect({state}, {url, methods, data})
            .then(res => {
              resolve(res.data.data);
            }).catch(err => {
              reject();
            })
      })
    },
    // 上传文件 返回 url post /media/uploadForUrl
    uploadForUrl({state}, data) {
      return new Promise((resolve, reject) => {
        let url = `/media/uploadForUrl`,
            methods = 'post';
            fx.setConnect({state}, {url, methods, data})
            .then(res => {
              resolve(res.data.data);
            }).catch(err => {
              reject();
            })
      })
    },
    // I)图片上传 /media/uploadImage
    uploadImage ({ state, rootState, dispatch}, file) {
      return new Promise((resolve, reject) => {
        // let url = "/media/uploadImage"
        // let methods = 'post'
        let Authorization = rootState.Authorization;
        // let data = file;
        // fx.setConnect({state}, {url, methods, data, Authorization })
        axios({
          url: 'http://120.24.253.177:8777/media/uploadImage',
          method: 'post',
          headers: {
            'Authorization': Authorization
          },
          data: file
        }).then( res => {
          // console.log(res);
          resolve(res.data.data);
        })
        .catch( error => {
          // console.log(error);
        })
      })
    },
     // /student/uploadBatch 批量上传学生照片
     uploadBatch ({ state, rootState, dispatch}, files) {
      return new Promise((resolve, reject) => {
        let url = "/student/uploadBatch"
        let methods = 'post'
        let Authorization = rootState.Authorization;
        let data = files;
        fx.setConnect({state}, {url, methods, data, Authorization })
        }).then( res => {
          // console.log(res);
          resolve(res.data.data);
        })
        .catch( error => {
          // console.log(error);
        })
      // })
    },
    // // 添加微课 post /microclass/add
    // addMicroClass({state}, data) {
    //   console.log(data);
    //   let url = `/microclass/add`,
    //       methods = 'post';
    //       fx.setConnect({state}, {url, methods, data})
    // },
    // // 获取微课列表 /microclass/getMicroClassList
    // getMicroClassList() {
    //   let url = `/microclass/getMicroClassList`;
    //   fx.setConnect({state}, {url})
    //   .then(res => {

    //   }).catch(err => {

    //   })
    // },
    // 通过文件导入教师/teacher/importByFile
    uploadTeachers({state, rootState}, data) {
      return new Promise((resolve,reject) => {
        let url = "/teacher/importByFile";
        // let Authorization = rootState.Authorization;
        let methods = 'post';
        // console.log(data)
        fx.setConnect({state}, {url, methods, data})
        .then(res => {
          resolve(res);
        }).catch(err => {
          // console.log(err)
        })
      })
    },
    // 通过列表更新课程表项 /course/course-item/updateByList
    updateCourseByList({state, rootState}, data) {
      // console.log(data)
      return new Promise((resolve,reject) => {
        let url = "/course/course-item/updateByList";
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
    //5.上传学生列表
    uploadStudentFile({state}, file) {
      return new Promise((resolve,reject) => {
        let url = '/student/importByFile';
        let methods = 'post';
        let data = file;
        // let Authorization = rootState.Authorization;
        fx.uploadConnect({state}, {url, methods, data})
        .then(res => {
          // console.log(res.data.data);
          resolve(1);
        }).catch(err => {
          // console.log(err);
        })
      })
      
    },
    //通过文件绑定手环/band/importByFile
    uploadBandFile({state, rootState}, file) {
      return new Promise((resolve,reject) => {
        let url = '/band/importByFile';
        let methods = 'post';
        let data = file;
        let Authorization = rootState.Authorization;
        fx.uploadConnect({state}, {url, methods, data,Authorization})
        .then(res => {
          // console.log(res.data.data);
          resolve(1);
        }).catch(err => {
          // console.log(err);
        })
      })
    },
  }
}
export default file
