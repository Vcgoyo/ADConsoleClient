import React,{PropTypes} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import Groble from '../../utils/groble';
import TableWapper from '../../components/MainLayout/TableWapper';

import CommonList from '../../components/SysBaseComponents/List/CommonList';
import MenuModal from '../../components/SysBaseComponents/Menus/MenuModal';
import ListHead from '../../components/SysBaseComponents/list/ListHead';


function Menus({dispatch,menus}){

  const{
    loading,list,total,currentPage,field,keyword,
    currentItem,modalVisible,errShow,errMessage,
    modalType
  }=menus;

  const columns=[{
    title:'菜单名称',
    dataIndex:'itemname',
    key:'itemname',
  },{
    title:"URL",
    dataIndex:"itemurl",
    key:'itemurl',
  },{
    title:"菜单类型",
    dataIndex:'itemtype',
    key:'itemtype',
  }];
  const menuListProps={
    total,
    currentPage,
    loading,
    columns,
    pageShow:'none',
    indentSize:15,
    // expandedRowRender(record){
    //
    // },
    // onExpand(expanded, record){
    //   dispatch({
    //     type:'menus/queryChilds',
    //     payload:{
    //       id:record.id
    //     }
    //   })
    // },
    type:'radio',
    dataSource:list,
    onPageChange(page){
      dispatch(routerRedux.push({
        pathname:'/menulist',
        query:{field,keyword,currentPage:page}
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
         currentItem:item
       }
     })
   },
   onRowSelect(record, selected, selectedRows){
    Groble.params={selectedrow:selectedRows[0]};
   }
  };

  const menuModalProps={
    visible:modalVisible,
    item:modalType=='create'?{}:currentItem,
    errMessage,
    errShow,
    //currentItem,
    onOk(data){
      if(modalType=='create'){
        if(Groble.params.selectedrow){
          data.parentid=Groble.params.selectedrow.id;
        }else {
          data.parentid=0;
        }
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

const ListHeadProps={

  onAdd(){
    dispatch({
      type:'menus/showModal',
      payload:{
        modalType:'create',
        //item:{},
      }
    })
  }
}

  return(
      <TableWapper>
        <ListHead  {...ListHeadProps}/>
        <CommonList {...menuListProps}/>
        <MenuModal {...menuModalProps}/>
      </TableWapper>
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
