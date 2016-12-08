
//import {hashHistory} from 'dva/router';

//import request from '../utils/request';

import {query,create,update,remove} from '../../services/SysServices/menus';
import {parse} from 'qs';

export default {

  namespace: 'menus',

  state: {
    ItemTree:[
      {id:1,pid:0,name:'父级菜单1',ismap:false},
      {id:2,pid:0,name:'父级菜单2',ismap:false},
      {id:3,pid:1,name:'子级菜单1',ismap:false}
    ],
    mode:'inline',
  },

  subscriptions:{
    setup({dispatch,history}){
      history.listen(location=>{
        if(location.pathname==='/')
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
        payload:{mode,...payload}
      });
      const {data}=yield call(query,parse(payload));
      if(data){
        yield put({
          type:'querySuccess',
          payload:{
            ItemTree:data
          }
        });
      }
    },
    // *create({payload},{call,put}){
    //   yield put({type:'showLoading'});
    //   yield put({type:'hideModal'});
    //   const {data}=yield call(create,payload);
    //   if(data&&data.success){
    //     yield put({
    //       type:'createSuccess',
    //       payload:{
    //         list: data.data,
    //         total: data.page.total,
    //         current: data.page.current,
    //         field: '',
    //         keyword: '',
    //       }
    //     }
    //     )
    //   }
    // },
    // *'delete'({payload},{call,put}){
    //   yield put({type:'showLoading'});
    //   const {data}=yield call(remove,payload);
    //   if(data&&data.success){
    //     yield put({
    //       type:'deleteSuccess',
    //       payload
    //     }
    //     )
    //   }
    // },
    // *update({payload},{call,put,select}){
    //   yield put({type:'showLoading'});
    //   yield put({type:'hideModal'});
    //   const id=yield select(({users})=>users.currentItem.id);
    //   const newUsers={...payload,id};
    //   const {data}=yield call(update,newUsers);
    //   if(data&&data.success){
    //     yield put({
    //       type:'updateSuccess',
    //       payload:newUsers
    //     }
    //     )
    //   }
    // },
  },

  reducers:{
    // showLoading(state){
    //   return {...state,loading:true}
    // },
    querySuccess(state,action){
      return {...state,...action.payload};
    },
    changeMode(state,action){
     
      return{...state,...action.payload};
    }
    // createSuccess(state,action){
    //   return { ...state, ...action.payload, loading: false };
    // },
    // deleteSuccess(state,action){
    //   const deleteId=action.payload;
    //   const newUserList=state.list.filter(user=>user.id!=deleteId);
    //   return {...state,list:newUserList,loading: false};
    // },
    // updateSuccess(state,action){
    //   const updateUser=action.payload;
    //   const newUserList=state.list.map(user=>{
    //     if(user.id==updateUser.id){
    //       return {...user,...updateUser};
    //     }
    //     return user;
    //   })
    //   return {...state,list:newUserList,loading:false};
    // },
    // updateQueryKey(state, action) {
    //   return { ...state, ...action.payload };
    // },
  }


}
