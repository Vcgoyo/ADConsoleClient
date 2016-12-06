
//import {hashHistory} from 'dva/router';

//import request from '../utils/request';

import {query,create,update,remove} from '../services/users';
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
      console.info(payload);
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
      yield put({type:'hideModal'});
      const {data}=yield call(create,payload);
      if(data&&data.success){
        yield put({
          type:'createSuccess',
          payload:{
            list: data.data,
            total: data.page.total,
            current: data.page.current,
            field: '',
            keyword: '',
          }
        }
        )
      }
    },
    *'delete'({payload},{call,put}){
      yield put({type:'showLoading'});
      const {data}=yield call(remove,payload);
      if(data&&data.success){
        yield put({
          type:'deleteSuccess',
          payload
        }
        )
      }
    },
    *update({payload},{call,put,select}){
      yield put({type:'showLoading'});
      yield put({type:'hideModal'});
      const id=yield select(({users})=>users.currentItem.id);
      const newUsers={...payload,id};
      const {data}=yield call(update,newUsers);
      if(data&&data.success){
        yield put({
          type:'updateSuccess',
          payload:newUsers
        }
        )
      }
    },
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
      return { ...state, ...action.payload, loading: false };
    },
    deleteSuccess(state,action){
      const deleteId=action.payload;
      const newUserList=state.list.filter(user=>user.id!=deleteId);
      return {...state,list:newUserList,loading: false};
    },
    updateSuccess(state,action){
      const updateUser=action.payload;
      const newUserList=state.list.map(user=>{
        if(user.id==updateUser.id){
          return {...user,...updateUser};
        }
        return user;
      })
      return {...state,list:newUserList,loading:false};
    },
    updateQueryKey(state, action) {
      return { ...state, ...action.payload };
    },
  }


}
