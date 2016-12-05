
//import {hashHistory} from 'dva/router';

//import request from '../utils/request';

import {query,create} from '../services/users';
import {parse} from 'qs';

export default {

  namespace: 'users',

  state: {
    list:[],
    field:'',
    keyword:'',
    total:null,
    loading:false,
    current:1,
    currentItem:{},
    modalVisible:false,
    modalType:'create',
  },

  subscriptions:{
    setup({dispatch,history}){
      history.listen(location=>{
        if(location.pathname==='/users')
          dispatch({
            type:'query',
            payload:location.query
          })
      });
    },
  },

  effects: {
    *query({payload},{call,put}){
      yield put({type:'showLoading'});
      yield put({
        type:'updateQueryKey',
        payload:{page:1,field:'',keyword:'',...payload}
      });
      const {data}=yield call(query,parse(payload));
      if(data){
        yield put({
          type:'querySuccess',
          payload:{
            list:data.data,
            total:data.page.total,
            current:data.page.current
          }
        });
      }
    },
    *create({payload},{call,put}){
      yield put({type:'showLoading'});
      //yield put({type:'hideModal'});
      const data=yield call(create,payload);
      if(data&&data.success){
        yield put(
          type:createSuccess,
          payload:{
            list: data.data,
            total: data.page.total,
            current: data.page.current,
            field: '',
            keyword: '',
          }
        )
      }
    },
    *'delete'(){},
    *update(){},
  },

  reducers:{
    showLoading(state){
      return {...state,loading:true}
    },
    showModal(state,action){
      return {...state,...action.payload,modalVisible: true};
    },
    hideModal(state){
      return {...state,modalVisible:false}
    },
    querySuccess(state,action){
      return {...state,...action.payload,loading:false};
    },
    createSuccess(state,action){
      return {...state,...action.payload,loading:false,modalVisible:false};
    },
    deleteSuccess(){},
    updateSuccess(state,action){
      //return {...state,...action.payload};
    },
    updateQueryKey(state, action) {
      return { ...state, ...action.payload };
    },
  }


}
