import React,{Component,PropTypes} from 'react'
import {routerRedux} from 'dva/router';
import {connect} from 'dva';
//import MainLayout from '../components/MainLayout/MainLayout';

//import UserList from '../components/Users/UserList';
import CommonList from '../../components/SysBaseComponents/List/CommonList'
//import UserSearch from '../../components/Users/UserSearch';
import UserModal from '../../components/SysBaseComponents/Users/UserModal';
import ListHead from '../../components/SysBaseComponents/list/ListHead';
import TableWapper from '../../components/MainLayout/TableWapper';
import styles from './Users.less';

function Users({location,dispatch,users}){

  const{
    loading,list,total,currentPage,field,keyword,
    currentItem,modalVisible,
    modalType,allrolelist
  }=users;

  const userlistHeadProps={
    field,
    keyword,
    onAdd(){
      dispatch({
        type:'users/showModalWithRemote',
        payload:{
          modalType:'create'
        }
      })
    },
    // onSearch(fieldsValue){
    //   console.info(fieldsValue);
    //   dispatch(routerRedux.push({
    //     pathname:'/users',
    //     query:{...fieldsValue,currentPage:1}
    //   }));
    // },
  }
  const columns=[
    {
      title:'昵称',
      dataIndex:'aliasname',
      key:'aliasname',
      width:100
    },
    {
      title:'用户名',
      dataIndex:'username',
      key:'username',
      width:100
      // render:(text)=><a href="#">{text}</a>,
    },{
      title:'用户类型',
      dataIndex:'usertype',
      key:'usertype',
      width:100
    }
    ,{
      title:'用户所属角色',
      dataIndex:'roleNames',
      key:'roleNames',
      width:100
    },
    {
    title:'性别',
    dataIndex:'sex',
    key:'sex',
    width:100
  },{
    title:"出生年月",
    dataIndex:"birthday",
    key:'birthday',
    width:100
  },{
    title:"最后登录日期",
    dataIndex:'lastlogindate',
    key:'lastlogindate',
    width:100
  },{
    title:"最后登录IP",
    dataIndex:'lastloginip',
    key:'lastloginip',
    width:100
  },{
    title:"用户状态状态",
    dataIndex:'status',
    key:'status',
    width:100
  },{
    title:"所属组织机构",
    dataIndex:'sysorg_id',
    key:'sysorg_id',
    width:100
  }];
  const userListProps={
    total,
    currentPage,
    loading,
    columns,
    type:'checkbox',
    dataSource:list,
    onPageChange(page){
      dispatch(routerRedux.push({
        pathname:'/users',
        query:{field,keyword,currentPage:page}
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
       type:'users/showModalWithRemote',
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
    roleList:allrolelist,
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
      <TableWapper>
        {/* <UserSearch /> */}
        <ListHead {...userlistHeadProps}/>
        <CommonList {...userListProps}/>
        {modalVisible?<UserModal {...userModalProps}/>:""}
      </TableWapper>
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
