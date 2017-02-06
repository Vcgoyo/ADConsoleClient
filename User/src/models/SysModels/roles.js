
import {query,create,update,remove,menusList,queryOne} from '../../services/SysServices/roles';

export default {

  namespace:'roles',

  state:{
    list:[],
    total:null,
    currentPage:1,
    pageSize:20,
    allMenusList:[],
    powerItems:[],
    currentItem:{},
    modalVisible:false,
    modalType:'create',
  },

  subscriptions:{
    setup({dispatch,history}){
      history.listen(location=>{
        if(location.pathname==='/roles')
          dispatch({
            type:'query',
            payload:location.query
          })
      });
    },
  },

  effects:{
    *query({payload},{call,put}){
      yield put({
        type:'updateQueryKey',
        payload:{
          currentPage:1,
          pageSize:20,
          ...payload,
        }
      })
      const {data}=yield call(query,payload);
      if(data&&data.success){
      yield put({
          type:'querySuccess',
          payload:{
            list:data.data,
            total:data.recordCount,
            currentPage:payload.currentPage,
          }
        })
      }
    },
    *create({payload},{call,put,select}){
      const {data}=yield call(create,payload);
      if(data&&data.success){
        const currentPage=yield select(state=>state.roles.currentPage);
        yield  put({
                 type:'createSuccess',
                 payload:{
                   list:data.data,
                   total:data.recordCount,
                   currentPage
                 }
                })
      }
    },
    *update({payload},{call,put,select}){
      const id=yield select (({roles})=>roles.currentItem.id);
      const newRole={...payload,id};
      const {data}=yield call(update,newRole);
      if(data&&data.success){
        yield put({
          type:'updateSuccess',
          payload:{
            newRole:data.data
          }
        })
      }
    },
    *'delete'({payload},{call,put}){
      const {data}=yield call(remove,payload);
      if(data&&data.success){
        yield put({
          type:'deleteSuccess',
          payload
        })
      }
    },
    *showModalWithRemote({payload},{call,put}){
       yield put({
         type:'showModal',
         payload
       })
       const {data}=yield call(menusList,payload);
       if(data&&data.success){
         yield put({
           type:'loadingData',
           payload:{
             allMenusList:data.data
           }
         })
       }

       if(payload.modalType=='update'){
          const {data}=yield call(queryOne,payload.currentItem.id);
          if(data&&data.success){
            yield put({
              type:'loadingData',
              payload:{
                currentItem:data.data
              }
            })
          }
       }


    }
  },

  reducers:{
    updateQueryKey(state,action){
      return {...state,...action.payload};
    },
    querySuccess(state,action){
      return {...state,...action.payload};
    },
    showModal(state,action){
      return {...state,...action.payload,modalVisible:true}
    },
    loadingData(state,action){
      return {...state,...action.payload}
    },
    hideModal(state){
      return {...state,modalVisible:false}
    },
    createSuccess(state,action){
      return {...state,...action.payload,modalVisible:false}
    },
    updateSuccess(state,action){
      const updateRole=action.payload.newRole;
      const newList=state.list.map(role=>{
        if(role.id==updateRole.id){
          return {...role,...updateRole};
        }
        return role;
      })
      return {...state,list:newList,modalVisible:false}
    },
    deleteSuccess(state,action){
      const id=action.payload;
      const newList=state.list.filter(role=>role.id!=id);
      return {...state,list:newList}
    }
  }

}
