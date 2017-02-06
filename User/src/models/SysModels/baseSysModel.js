import {menusLoading,userLoading,logOutReq} from '../../services/SysServices/baseSysService';
import { routerRedux } from 'dva/router';

export default {
  namespace:'baseSysModel',
  state:{
    /**
    菜单
    */
    Menus:[],
    /**
    用户信息
    */
    curUser:{},
    handImage:'./resource/image/b2.jpg',
    dropDownMenuVisible:'none',
  },
  subscriptions:{},
  effects:{
    *loadingMenus({},{call,put}){
      const {data} =yield call(menusLoading,{});
      if(data&&data.success){
        yield put({
          type:'loadingMenusSuccess',
          payload:data.data
        })
      }
    },
    *userMsgLoading({},{call,put}){
        const {data}=yield call(userLoading,{})
        if(data&&data.success){
          yield put({
            type:'userMsgLoadingSuccess',
            payload:data.data
          })
        }
    },
    *logOut({},{call,put}){
      const {data}=yield call(logOutReq,{});
      if(data&&data.success){
        sessionStorage['Token']='';
        yield put({
          type:'logOutSuccess'
        })
          yield put(routerRedux.push('/login'));

      }
    }
  },
  reducers:{
    loadingMenusSuccess(state,action){
      return {...state,Menus:action.payload};
    },
    userMsgLoadingSuccess(state,action){
      return {...state,curUser:action.payload};
    },
    logOutSuccess(state,action){
      return {...state,Menus:[],curUser:{},handImage:{}}
    },
    toggleDropDownMenu(state){
      let nowVisible;
      if(state.dropDownMenuVisible=='none'){
        nowVisible='block';
      }else{
        nowVisible='none';
      }
      return {...state,dropDownMenuVisible:nowVisible}
    },
  }
}
