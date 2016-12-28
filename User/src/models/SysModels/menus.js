
//import {hashHistory} from 'dva/router';

//import request from '../utils/request';

import {query,create,update,remove} from '../../services/SysServices/menus';
import {parse} from 'qs';

export default {

  namespace: 'menus',

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
        if(location.pathname==='/menus')
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

          let list = [{
            key: 1,
            name: 'John Brown sr.',
            age: 60,
            address: 'New York No. 1 Lake Park',
            children: [{
              key: 11,
              name: 'John Brown',
              age: 42,
              address: 'New York No. 2 Lake Park',
            }, {
              key: 12,
              name: 'John Brown jr.',
              age: 30,
              address: 'New York No. 3 Lake Park',
              children: [{
                key: 121,
                name: 'Jimmy Brown',
                age: 16,
                address: 'New York No. 3 Lake Park',
              }],
            }, {
              key: 13,
              name: 'Jim Green sr.',
              age: 72,
              address: 'London No. 1 Lake Park',
              children: [{
                key: 131,
                name: 'Jim Green',
                age: 42,
                address: 'London No. 2 Lake Park',
                children: [{
                  key: 1311,
                  name: 'Jim Green jr.',
                  age: 25,
                  address: 'London No. 3 Lake Park',
                }, {
                  key: 1312,
                  name: 'Jimmy Green sr.',
                  age: 18,
                  address: 'London No. 4 Lake Park',
                }],
              }],
            }],
          }, {
            key: 2,
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
          }];
          yield put({
            type:'querySuccess',
            payload:{
              list:list,
              total:23,
              current:1
            }
          });

          // yield put({
          //   type:'updateQueryKey',
          //   payload:{page:1,field:'',keyword:'',...payload}
          // });
          // const {data}=yield call(menulist,parse(payload));
          // if(data){
          //   yield put({
          //     type:'querySuccess',
          //     payload:{
          //       list:data.data,
          //       total:data.page.total,
          //       current:data.page.current
          //     }
          //   });
          // }
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
      *update({payload},{call,put,select}){
        yield put({type:'showLoading'});
        yield put({type:'hideModal'});
        const id=yield select(({menus})=>menus.currentItem.pid);
        const newMenus={...payload,id};
        const {data}=yield call(update,newUsers);
        if(data&&data.success){
          yield put({
            type:'updateSuccess',
            payload:newMenus
          }
          )
        }
      },

    },

  //},

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
    querySysMenus(state,action){
      return {...state,...action.payload.ItemTree};
    },
    hideModal(state){
      return {...state,modalVisible:false}
    },
    changeMode(state,action){
      return{...state,...action.payload};
    },
    createSuccess(state,action){
      return { ...state, ...action.payload, loading: false };
    },
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
