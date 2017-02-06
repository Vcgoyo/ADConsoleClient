
//import {hashHistory} from 'dva/router';

//import request from '../utils/request';

import {query,menulist,create,update,remove,queryChilds} from '../../services/SysServices/menus';
import {parse} from 'qs';

export default {

  namespace: 'menus',

  state: {
    list:[],
    field:'',
    keyword:'',
    total:null,
    loading:false,
    currentPage:1,
    currentItem:{},
    modalVisible:false,
    modalType:'create',
    mode:'inline',
    ItemTree:[
      // {id:1,pid:0,name:'用户管理1',ismap:false},
      // {id:2,pid:1,name:'角色管理2',ismap:false},
      // {id:3,pid:2,name:'权限管理3',ismap:false},
      // {id:4,pid:3,name:'角色管理4',ismap:false},
      // {id:5,pid:4,name:'权限管理5',ismap:false},
      // {id:6,pid:5,name:'角色管理6',ismap:false},
      // {id:7,pid:6,name:'权限管理7',ismap:false}
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
        if(location.pathname==='/menuslist')
        {
          dispatch({
            type:'querylist',
            payload:location.querylist
          })
        }
      });
    },
  },

  effects: {
    *query({payload},{call,put}){
      yield put({type:'showLoading'});
      const  ItemTree=[
       {id:1,pid:0,name:'SEO设置',ismap:false},
       {id:2,pid:0,name:'站点配置',ismap:false},
       {id:3,pid:0,name:'负载均衡配置',ismap:false}
     ];
     yield put({
       type:'querySysMenus',
       payload:{
         ItemTree:ItemTree
       }
     })
    },
      *querylist({payload},{call,put}){
          yield put({type:'showLoading'});
          yield put({
            type:'updateQueryKey',
            payload:{currentPage:1,field:'',keyword:'',...payload}
          });
          const {data}=yield call(menulist,parse(payload));
          if(data.success){
            yield put({
              type:'querySuccess',
              payload:{
                list:data.data,
                total:data.recordCount,
                current:payload?payload.currentPage:1
              }
            });
          }
      },
      *queryChilds({payload},{call,put}){
        // yield put({type:'showLoading'});
        debugger;
        const {data}=yield call(queryChilds,payload);
        if(data&&data.success){
           yield put({
             type:'expandChild',
             payload:data.data,
           })
        }
      },
      *create({payload},{call,put,select}){
        yield put({type:'showLoading'});
        yield put({type:'hideModal'});
        const {data}=yield call(create,payload);
        if(data&&data.success){
          const currentPage=yield select(menus=>menus.currentPage)
          yield put({
            type:'createSuccess',
            payload:{
              list: data.data,
              total: data.recordCount,
              current: currentPage,
              field: '',
              keyword: '',
            }
          }
          )
        }
      },
      *update({payload},{call,put,select}){
        yield put({type:'showLoading'});
        // yield put({type:'hideModal'});
        //const id=yield select(({menus})=>menus.currentItem.pid);
        //const newMenus={...payload,id};
        const {data}=yield call(update,payload);
        if(data&&data.success){
          yield put({
            type:'updateSuccess',
            payload:newMenus
          }
          )
        }else{
          yield put({
            type:'errShow',
            payload:{
              errMessage:data.message
            }
          })
        }
      },
      *'delete'({payload},{call,put}){
        yield put({type:'showLoading'});
        const {data}=yield call(remove,{id:payload});
        if(data&&data.success){
          debugger;
          yield put({
            type:'deleteSuccess',
            payload,
          })
        }
      }

    },

  //},

  reducers:{
    // expandChild(state,action){
    //   const childs=action.payload;
    //   const newTree=state.list.map(menus=>{
    //     if(menus.id==childs[0].parentpid){
    //       menus.children=childs;
    //     }
    //     return menus;
    //   })
    //   return {...state,list:newTree}
    // },
    showLoading(state){
      return {...state,loading:true}
    },
    errShow(state,action){
      return {...state,...action.payload,errShow:'block',loading:false}
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
      return {...state,...action.payload};
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
    deleteSuccess(state,action){
      debugger;
      const deleteId=action.payload;
      const newUserList=state.list.filter(user=>user.id!=deleteId);
      return {...state,list:newUserList,loading: false};
    },
    updateSuccess(state,action){
      const updatemenus=action.payload;
      const newMenusList=state.list.map(menus=>{
        if(menus.id==updatemenus.id){
          return {...menus,...updatemenus};
        }
        return menus;
      })
      return {...state,list:newMenusList,loading:false,modalVisible:false};
    },
    updateQueryKey(state, action) {
      return { ...state, ...action.payload };
    },
  }
}
