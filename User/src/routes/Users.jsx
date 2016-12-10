import React,{Component,PropTypes} from 'react'
import {routerRedux} from 'dva/router';
import {connect} from 'dva';
import MainLayout from '../components/MainLayout/MainLayout';

import UserList from '../components/Users/UserList';
import UserSearch from '../components/Users/UserSearch';
import UserModal from '../components/Users/UserModal';

import styles from './Users.less';

function Users({location,dispatch,users}){

  const{
    loading,list,total,current,field,keyword,
    currentItem,modalVisible,
    modalType
  }=users;

  const userSearchProps={
    field,
    keyword,
    onAdd(){
      dispatch({
        type:'users/showModal',
        payload:{
          modalType:'create'
        }
      })
    },
    onSearch(fieldsValue){
      console.info(fieldsValue);
      dispatch(routerRedux.push({
        pathname:'/users',
        query:{...fieldsValue,page:1}
      }));
    },
  }

  const userListProps={
    total,
    current,
    loading,
    dataSource:list,
    onPageChange(page){
      dispatch(routerRedux.push({
        pathname:'/users',
        query:{field,keyword,page}
      }));
    },
    onDeleteItem(id){
      dispatch({
       type: 'users/delete',
       payload: id,
     });
   },
   onEditItem(item){
     dispatch({
       type:'users/showModal',
       payload:{
         modalType:'update',
         currentItem:item,
       }
     })
   }
  };
  const userModalProps={
    visible:modalVisible,
    item:modalType=='create'?{}:currentItem,
    type:modalType,
    onOk(data){
      dispatch({
        type:'users/'+modalType,
        payload:data
      })
    },
    onCancel(){
      dispatch({
        type:'users/hideModal'
      })
    }
  };

  return(
    //<MainLayout location={location}>
    <div className={styles.normal}>
        <UserSearch {...userSearchProps}/>
        <UserList {...userListProps}/>
        <UserModal {...userModalProps}/>
    </div>
    //</MainLayout>
  );
}

Users.propTypes={
  users:PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func
}

function mapStateToProps({users}){
  return {users};
}

export default connect(mapStateToProps)(Users);
