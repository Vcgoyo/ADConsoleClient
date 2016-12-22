
//import {hashHistory} from 'dva/router';

//import request from '../utils/request';

import {query,create,update,remove} from '../../services/SysServices/menus';
import {parse} from 'qs';

export default {

  namespace: 'menus',

  state: {
    mode:'inline',
    ItemTree:[
      {id:1,pid:0,name:'用户管理',ismap:false},
      {id:2,pid:0,name:'角色管理',ismap:false},
      {id:3,pid:0,name:'权限管理',ismap:false}
    ]
  },

  subscriptions:{
    setup({dispatch,history}){
      history.listen(location=>{
        if(location.pathname==='/syssetting')
        {
          dispatch({
            type:'query',
            payload:{
              menuType:'SysSetting'
            }
          })
        }
        if(location.pathname==='/usermanage')
        {
          dispatch({
            type:'query',
            payload:{
              menuType:'UserManage'
            }
          })
        }
        if(location.pathname==='/menulist')
        {
          dispatch({
            type:'querylist',
          })
        }
      });
    },
  },

  effects: {
    *query({payload},{call,put}){
      yield put({type:'showLoading'});
      let ItemTree;
      if(payload.menuType=='SysSetting'){
        ItemTree=[
         {id:1,pid:0,name:'SEO设置',ismap:false},
         {id:2,pid:0,name:'站点配置',ismap:false},
         {id:3,pid:0,name:'负载均衡配置',ismap:false}
       ];
      }
      if(payload.menuType=='UserManage'){
        ItemTree=[
         {id:1,pid:0,name:'用户管理',ismap:false},
         {id:2,pid:0,name:'角色管理',ismap:false},
         {id:3,pid:0,name:'权限管理',ismap:false}
       ];
     }},
      *querylist({payload},{call,put}){
          yield put({type:'showLoading'});
          yield put({
            type:'updateQueryKey',
            payload:{page:1,field:'',keyword:'',...payload}
          });
          const {data}=yield call(menulist,parse(payload));
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
      }
      //const {data}=yield call(query,parse(payload));
      // if(true){
      //   yield put({
      //     type:'querySuccess',
      //     payload:{
      //       ItemTree:ItemTree
      //     }
      //   });
      // }
    },

  //},

  reducers:{
    // showLoading(state){
    //   return {...state,loading:true}
    // },
    querySuccess(state,action){
      return {...state,...action.payload};
    },
    querySysMenus(state,action){
      return {...state,...action.payload.ItemTree};
    },
    changeMode(state,action){
      return{...state,...action.payload};
    },
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
    updateQueryKey(state, action) {
      return { ...state, ...action.payload };
    },
  }


}
