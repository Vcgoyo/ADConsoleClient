import React, { Component,PropTypes } from 'react';
import {connect} from 'dva';
import { Link } from 'dva/router'
import { Menu, Icon, Switch } from 'antd';
import styles from './LeftNav.less';
const SubMenu = Menu.SubMenu;
const MenuItem=Menu.Item;


//递归获取菜单ReactDOM节点
const LoadMenuTree=(ItemTree,ItemTreeall)=>{
    let menuReactDom=ItemTreeall.filter(item=>item.ismap==false)
    menuReactDom= ItemTree.map(Menu=>{
    if(Menu.ismap==false){
      Menu.ismap=true;
      let pTree;
      let cTree;
      let hasC=false;
      for (var i = 0; i < menuReactDom.length; i++) { //判断是否当前菜单有子项菜单
        if(menuReactDom[i].pid==Menu.id){
          hasC=true;
          break;
        }
      }
      if(hasC){
        let  cItemTree=menuReactDom.filter(item=>item.pid==Menu.id);//取出子菜单
        cTree=LoadMenuTree(cItemTree,ItemTreeall)
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
  const constItemTree=ItemTree;
  const NavMenu=LoadMenuTree(ItemTree,ItemTree);
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
        {/* <Switch  onChange={changeMode}/> */}
        
        <Menu
          className={styles.LeftNavCommon}
          defaultOpenKeys={['sub1']}
          mode='inline'
          theme='dark'
        >
          {NavMenu}
          {/* <SubMenu key="业务维护" title={<span><Icon type="mail" /><span>业务维护</span></span>} className={styles.MenuItem}>
            {NavMenu}
          </SubMenu>
          <SubMenu key="app配置" title={<span><Icon type="mail" /><span>app配置</span></span>} className={styles.MenuItem}>
            {NavMenu}
          </SubMenu>
          <SubMenu key="系统配置" title={<span><Icon type="mail" /><span>系统配置</span></span>} className={styles.MenuItem}>
            <Link to='syssetting'>{NavMenu}</Link>
          </SubMenu>
          <SubMenu key="用户管理"   title={<span><Icon type="mail" /><span>用户管理</span></span>}  className={styles.MenuItem}>
            <Link to='usermanage'>{NavMenu}</Link>
          </SubMenu> */}

        </Menu>
      </div>
    );
  }

  function mapStateToProps({menus}){
    return {menus};
  }

  export default connect(mapStateToProps)(LeftNav);
