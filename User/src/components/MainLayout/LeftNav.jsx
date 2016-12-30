import React, { Component,PropTypes } from 'react';
import {connect} from 'dva';
import { Menu, Icon, Switch } from 'antd';
import styles from './LeftNav.less';
const SubMenu = Menu.SubMenu;
const MenuItem=Menu.Item;


//递归获取菜单ReactDOM节点
const LoadMenuTree=(ItemTree)=>{
  let menuReactDom=ItemTree.filter(item=>item.ismap==Menu.true)
    menuReactDom= ItemTree.map(Menu=>{
    if(Menu.ismap==false){
      Menu.ismap=true;
      let pTree;
      let cTree;
      let hasC=false;
      for (var i = 0; i < ItemTree.length; i++) { //判断是否当前菜单有子项菜单
        if(ItemTree[i].pid==Menu.id){
          hasC=true;
          break;
        }
      }
      if(hasC){
        let  cItemTree=ItemTree.filter(item=>item.pid==Menu.id);//取出子菜单
        cTree=LoadMenuTree(cItemTree)
        pTree= (
          <SubMenu key={Menu.id} title={<span><Icon type="mail" /><span>{Menu.name}</span></span>}>
          {cTree}
          </SubMenu>
        )
        return pTree;
      }else{
         return (<MenuItem key={Menu.id}>{Menu.name}</MenuItem>);
      }
  }
  })
  if(menuReactDom){
    return menuReactDom;
  }
}

const LeftNav=({menus,dispatch})=>{
  const{
    mode,ItemTree
  }=menus;
  debugger;
  const constItemTree=ItemTree;
  const NavMenu=LoadMenuTree(ItemTree);
  function changeMode(value){
    dispatch({
      type:'menus/changeMode',
      payload:{
        mode:value?'vertical':'inline',
        ItemTree:ItemTree
      }
    })
  }
  return (
    <div >
        <Switch  onChange={changeMode}/>
        <br />
        <br />
        <Menu
          className={styles.LeftNavCommon}
          defaultOpenKeys={['sub1']}
          mode={mode}
          theme='Dark'
        >
          {NavMenu}
        </Menu>
      </div>
    );
  }

  function mapStateToProps({menus}){
    return {menus};
  }

  export default connect(mapStateToProps)(LeftNav);
