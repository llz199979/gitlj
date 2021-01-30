import fx from '../../util/fx'
// import { getItem } from '../../util/localStorage'
const wristband = {
  state: {
    w_key: true,
    options: [],
    wristband: [], // 手环总表
    wristband_bindings: [], // 已绑定手环列表
    bluetooth: [],
    equipment:[],//设备列表
    bindingList: [],
    getOpen:[],
    bandTimeList:[]
  },
  getters: {
    getWristData: state => state.wristband,
    getBlueTooth: state => state.bluetooth,
    getEquipment: state => state.equipment,
    get_bindingList: state => state.bindingList,
    get_wristband_bindings: state => state.wristband_bindings,
    get_Open:state => state.getOpen,
    get_Time:state=> state.bandTimeList
  },
  mutations: {
  },
  actions: {
    // 1.手环搜索
    WristbandData ({state, rootState}) {
      // console.log('手环查询')
        var url = '/band/getBandList'
        var Authorization = rootState.Authorization;
        fx.setConnect({ state }, { url, Authorization })
        .then( res => {
          // let arr = res.data.data;
          state.wristband = res.data.data;
          // arr.forEach((v,i) => {
          //   state.wristband.push(v)
          // })
          // console.log(res.data);
        }).catch(err => {
          // console.log(err)
        })
    },
    // 2.手环添加
    wristbandAdd ({ state, rootState, dispatch}, info) {
      // console.log('手环添加')
      // console.log(info)
      let url = "/band/add"
      let methods = 'post'
      let Authorization = rootState.Authorization;
      let data = info;
      fx.setConnect({state}, {url, methods, data, Authorization })
      .then( res => {
        // info.id = res.data.data;
        // state.wristband.push(info);
        dispatch('WristbandData');
        // console.log(res);
      }).catch( error => {
        // console.log(error);
      })
    },
    //3.手环绑定
    wristBind ({state, rootState}, info) {
      // console.log('手环绑定');
      //   console.log(info)
        let url = "/band/bind"
        let methods = 'post'
        let Authorization = rootState.Authorization;
        let data = info;
        fx.setConnect({state}, {url, methods, data, Authorization })
        .then( res => {
          // info.id = res.data.data;
          // state.wristband.push(info);
          // console.log(res);
        }).catch( error => {
          // console.log(error);
        })
    },
    // 4.手环丢失
    wristbandLose ({ state, commit }, info) {
      // console.log('手环丢失')
      // console.log(info)
    },
    // 删除手环 /band/{bandId}
    wristbandDelete({state, dispatch}, bandId) {
      let url = `/band/${bandId}?bandId=${bandId}`;
      let methods = 'delete';
      fx.setConnect({state}, {url, methods})
      .then(res => {
        dispatch('WristbandData');
      }).catch(err => {
        // console.log(err)
      })
    },
    // 获取学生手环绑定列表 /band/getStudentBandList
    getStudentBandList ({state, rootState}) {
      return new Promise((resolve, reject) => {
        var url = '/band/getStudentBandList'
        var Authorization = rootState.Authorization;
        fx.setConnect({ state }, { url, Authorization })
        .then( res => {
          state.wristband_bindings = res.data.data;
          // state.wristband = arr;
          // console.log(res.data);
          resolve(res.data.data);
        }).catch(err => {
          // console.log(err)
        })
      })        
    },
    //获取蓝牙App列表
    bluetoothData({state, rootState}) {
        var url = '/bluetoothap/getBluetoothAPList'
        var Authorization = rootState.Authorization;
        fx.setConnect({ state }, { url, Authorization })
        .then( res => {
              state.bluetooth = res.data.data;
        }).catch(err => {
          // console.log(err)
        })
    },
    //获取绑定详情列表/bluetoothap/getBindingList
    getBindingList({state, rootState}) {
      var url = '/bluetoothap/getBindingList';
        var Authorization = rootState.Authorization;
        fx.setConnect({ state }, { url, Authorization })
        .then( res => {
              state.bindingList = res.data.data;
        }).catch(err => {
          // console.log(err);
        })
    },
    // //通过文件绑定手环/band/importByFile
    // uploadBandFile({state, rootState}, file) {
    //   return new Promise((resolve,reject) => {
    //     let url = '/band/importByFile';
    //     let methods = 'post';
    //     let data = file;
    //     let Authorization = rootState.Authorization;
    //     fx.uploadConnect({state}, {url, methods, data, Authorization})
    //     .then(res => {
    //       console.log(res.data.data);
    //       resolve(1);
    //     }).catch(err => {
    //       console.log(err);
    //     })
    //   })
    // },
    //网关时间修改 /Gateway/updateOpenCloseGateway
    gateWayUpdate({state,dispatch},data){
      let url = '/Gateway/updateOpenCloseGateway';
      let methods = 'post';
      fx.setConnect({state},{url,methods,data}) 
      .then(res=>{
        console.log(res)
      })
    },
    

    // /Gateway/getOpenCloseGateway查看网关开始关闭时间
    getOpenCloseGateway({state,rootState,dispatch}){
      let url = '/Gateway/getOpenCloseGateway';
      let Authorization = rootState.Authorization;
      fx.setConnect({state},{url,Authorization})
      .then(res=>{
        console.log(res.data.data)
        state.getOpen = res.data.data;
      })
    },

    //蓝牙添加
    bluetoothAdd({state, dispatch, rootState}, bluetooth) {
      return new Promise((resolve,reject) => {
        let url = "/bluetoothap/add"
        let methods = 'post'
        let Authorization = rootState.Authorization;
        let data = bluetooth;
        fx.setConnect({state}, {url, methods, data, Authorization })
        .then( res => {
          // info.id = res.data.data;
          dispatch('bluetoothData');
          resolve(1);
        }).catch( error => {
          // console.log(error);
        })
      })
    },
    //蓝牙绑定/bluetoothap/bind
    bluetoothBind({state, dispatch, rootState}, bluetooth) {
      return new Promise((resolve,reject) => {
        let url = "/bluetoothap/bind"
        let methods = 'post'
        let Authorization = rootState.Authorization;
        let data = bluetooth;
        fx.setConnect({state}, {url, methods, data, Authorization })
        .then( res => {
          // info.id = res.data.data;
          dispatch('bluetoothData');
          dispatch('getBindingList');
          resolve(1);
          // console.log(res);
        }).catch( error => {
          // console.log(error);
        })
      })
    },
    // 删除蓝牙网关 /bluetoothap/{bluetoothAPId}
    deleteBluetooth({state, rootState, dispatch}, bluetoothAPId) {
      let url = `/bluetoothap/${bluetoothAPId}?bluetoothAPId=${bluetoothAPId}`;
      let Authorization = rootState.Authorization;
      let methods = 'delete';
      fx.setConnect({state}, {url, Authorization, methods})
      .then(res => {
        dispatch('bluetoothData');
      }).catch(err => {
        // console.log(err)
      })
    },
    // 设备添加  /equipment/addEquipment
    equipmentAdd({state, dispatch, rootState}, equipment) {
      return new Promise((resolve,reject) => {
        let url = "/equipment/addEquipment"
        let methods = 'post'
        let Authorization = rootState.Authorization;
        let data = equipment;
        fx.setConnect({state}, {url, methods, data, Authorization })
        .then( res => {
          dispatch('equipmentData');
          resolve(1);
        }).catch( error => {
          // console.log(error);
        })
      })
    },
    // 获取所有设备列表
    equipmentData({state, rootState}) {
      var url = '/equipment/list'
      var Authorization = rootState.Authorization;
      fx.setConnect({ state }, { url,Authorization })
      .then( res => {
         state.equipment = res.data.data;
      }).catch(err => {
      })
  },
   //批量设备/equipment/deleteBatch
   deleteEquipment({state, dispatch}, data){
    return new Promise((resolve,reject)=>{
      let url = `/equipment/deleteBatch`;
    let methods ='delete'
    fx.setConnect(state, {url, methods,data})
    .then(res => {
      dispatch('equipmentData');
    }).catch(err => {
      console.log(err);
    })
    })
  },
  // /band/getBandTimeOnline 查找手环最后上线时间    
  bandTimeData({state, rootState},macId) {
    let url = `/band/getBandTimeOnline?macId=${macId}` 
    let Authorization = rootState.Authorization;  
    fx.setConnect({state}, { url,Authorization})
    .then( res => {
       state.bandTimeList = res.data.data;
       console.log('手环时间',res.data.data)
    }).catch(err => {
    })
    },
  }
}
export default wristband
