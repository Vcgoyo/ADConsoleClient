import React,{Component,PropTypes} from 'react'
import {routerRedux} from 'dva/router';
import {connect} from 'dva';
//import MainLayout from '../components/MainLayout/MainLayout';

//import UserList from '../components/Users/UserList';
import CommonList from '../components/SysBaseComponents/List/CommonList'
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
  const columns=[{
    title:'姓名',
    dataIndex:'name',
    key:'name',
    render:(text)=><a href="#">{text}</a>,
  },{
    title:"年龄",
    dataIndex:"age",
    key:'age',
  },{
    title:"住址",
    dataIndex:'address',
    key:'address',
  }];
  const userListProps={
    total,
    current,
    loading,
    columns,
    type:'radio',
    dataSource:list,
    onPageChange(page){
      dispatch(routerRedux.push({
        pathname:'/users',
        query:{field,keyword,page}
      }));
    },
    onRowClick(record, index){
      console.info(record, index)
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
        <CommonList {...userListProps}/>
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
