
//import {hashHistory} from 'dva/router';

//import request from '../utils/request';

//import {login} from '../../services/SysServices/login';
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

      //const {data}=yield call(query,parse(payload));
      if(true){
        yield put(routerRedux.push('/users'));
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
