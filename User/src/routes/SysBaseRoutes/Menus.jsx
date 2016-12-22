import React,{PropTypes} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';

import CommonList from '../components/SysBaseComponents/List/CommonList'


function Menus({dispatch,users}){

  const{
    loading,list,total,current,field,keyword,
    currentItem,modalVisible,
    modalType
  }=users;

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
      console.info(record, index)
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
   }
  };

  return(
    <div >
        <CommonList {...menuListProps}/>
    </div>
  );
}

Users.propTypes={
  menus:PropTypes.object,
  dispatch: PropTypes.func
}

function mapStateToProps({menus}){
  return {menus};
}

export default connect(mapStateToProps)(Menus);
