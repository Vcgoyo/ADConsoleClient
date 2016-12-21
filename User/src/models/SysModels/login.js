
//import {hashHistory} from 'dva/router';

//import request from '../utils/request';

import {dologin} from '../../services/SysServices/login';
import { routerRedux } from 'dva/router';
import {parse} from 'qs';

export default {

  namespace: 'login',

  state: {

  },

  subscriptions:{
    // setup({dispatch,history}){
    //   history.listen(location=>{
    //     if(location.pathname==='/login')
    //       dispatch({
    //         type:'login',
    //         payload:location.query
    //       })
    //   });
    // },
  },

  effects: {
    *requestLogin({userloginmsg},{call,put}){
      yield put({type:'showLoading'});

      const {data}=yield call(dologin,userloginmsg);
      console.info(data);
      if(data&&data.success==true){
        sessionStorage['Token']=data.text;
        yield put(routerRedux.push('/index'));
      }
    },

  },

  reducers:{

    loginSuccess(state,action){
      return {...state,...action.userloginmsg};
    },
    changeMode(state,action){

      return{...state,...action.payload};
    }

  }


}
