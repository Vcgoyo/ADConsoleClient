import React,{Component,PropTypes} from 'react'
import {routerRedux} from 'dva/router';
import {connect} from 'dva';

import CommonList from '../../components/SysBaseComponents/List/CommonList'
import RoleModal from '../../components/SysBaseComponents/Roles/RoleModal'
import ListHead from '../../components/SysBaseComponents/list/ListHead';
import TableWapper from '../../components/MainLayout/TableWapper';

const Roles=({location,dispatch,roles})=>{

    const {
      total,currentPage,list,modalVisible,modalType,currentItem,loading,allMenusList
    }=roles;

    const rolelistHeadProps={
      onAdd(){
        dispatch({
          type:'roles/showModalWithRemote',
          payload:{
            modalType:'create'
          }
        })
      }
    }

    const columns=[
      {
        title:'角色名称',
        dataIndex:'rolename',
        key:'rolename',
        width:100
      },
      {
        title:'角色编码',
        dataIndex:'rolecode',
        key:'rolecode',
        width:100
      },
    ]

    const roleListProps={
      total,
      columns,
      loading,
      currentPage,
      dataSource:list,
      type:'checkbox',
      onPageChange(page){

      },
      onDeleteItem(id){
          dispatch({
            type:'roles/delete',
            payload:id
          })
      },
      onEditItem(item){
          dispatch({
            type:'roles/showModalWithRemote',
            payload:{
              modalType:'update',
              currentItem:item,
            }
          })
      },
    }

    const roleModalProps={
        visible:modalVisible,
        modalType,
        allMenusList,
        item:modalType=='create'?{}:currentItem,
        onOk(data){
          dispatch({
            type:'roles/'+modalType,
            payload:data
          })
        },
        onCancel(){
          dispatch({
            type:'roles/hideModal'
          })
        }
    }

    return (
      <TableWapper>
        <ListHead {...rolelistHeadProps}/>
        <CommonList {...roleListProps}/>
        {modalVisible?<RoleModal {...roleModalProps}/>:''}
      </TableWapper>
    )
}


function mapStateToProps({roles}){
  return {roles};
}

export default connect(mapStateToProps)(Roles)
