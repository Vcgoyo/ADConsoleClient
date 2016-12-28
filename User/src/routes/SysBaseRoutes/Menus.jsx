import React,{PropTypes} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';

import CommonList from '../../components/SysBaseComponents/List/CommonList';
import MenuModal from '../../components/SysBaseComponents/Menus/MenuModal';


function Menus({dispatch,menus}){
  let selectedrow={};
  const{
    loading,list,total,current,field,keyword,
    currentItem,modalVisible,
    modalType
  }=menus;

  const columns=[{
    title:'菜单名称',
    dataIndex:'name',
    key:'name',
  },{
    title:"URL",
    dataIndex:"age",
    key:'age',
  },{
    title:"节点类型",
    dataIndex:'address',
    key:'address',
  }];
  const menuListProps={
    total,
    current,
    loading,
    columns,
    type:'radio',
    dataSource:list,
    onPageChange(page){
      dispatch(routerRedux.push({
        pathname:'/menulist',
        query:{field,keyword,page}
      }));
    },
    onRowClick(record, index){

    },
    onDeleteItem(id){
      dispatch({
       type: 'menus/delete',
       payload: id,
     });
   },
   onEditItem(item){
     dispatch({
       type:'menus/showModal',
       payload:{
         modalType:'update',
         currentItem:item,
       }
     })
   },
   onRowSelect(record, selected, selectedRows){
     selectedrow=selectedRows;
   }
  };

  const menuModalProps={
    visible:modalVisible,
    item:modalType=='create'?{}:currentItem,
    onOk(data){
      if(modalType=='create'){
          data.parentId=selectedrow.pid;
      }
      dispatch({
        type:'menus/'+modalType,
        payload:data
      })
    },
    onCancel(){
      dispatch({
        type:'menus/hideModal'
      })
    },
  }
  return(
    <div >
        <CommonList {...menuListProps}/>
        <MenuModal {...menuModalProps}/>
    </div>
  );
}

// Users.propTypes={
//   menus:PropTypes.object,
//   dispatch: PropTypes.func
// }

function mapStateToProps({menus}){
  return {menus};
}

export default connect(mapStateToProps)(Menus);
