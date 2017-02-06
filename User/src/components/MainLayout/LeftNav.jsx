import React, { Component,PropTypes } from 'react';
import {connect} from 'dva';
import { Link } from 'dva/router'
import { Menu, Icon, Switch } from 'antd';
import styles from './LeftNav.less';
import wapperComponentsLifecycle from '../../utils/componentsUtils'
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
        let  cItemTree=menuReactDom.filter(item=>item.parentid==Menu.id);//取出子菜单
        cTree=LoadMenuTree(cItemTree,ItemTreeall)
        pTree= (
          <SubMenu key={Menu.id} title={<span><Icon type={Menu.iconsclass} /><span>{Menu.itemname}</span></span>}>
          {cTree}
          </SubMenu>
        )
        return pTree;
      }else{
         return (<MenuItem key={Menu.id}><Link to={Menu.itemurl}><Icon type={Menu.iconsclass} />{Menu.itemname}</Link></MenuItem>);
      }
  }
  })
  if(menuReactDom){
    return menuReactDom;
  }
}

const LeftNavbefore=({baseSysModel,dispatch})=>{

  const{
    mode,Menus
  }=baseSysModel;

  //给每一项增加 ismap属性 提高菜单树生成效率
    Menus.forEach((e,i)=>{
      e.ismap=false;
    })
  const constItemTree=Menus;
  const NavMenu=LoadMenuTree(Menus,Menus);
  function changeMode(value){
    dispatch({
      type:'menus/changeMode',
      payload:{
        mode:value?'vertical':'inline',
        ItemTree:wapperMenus
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
        </Menu>
      </div>
    );
  }


  function DidMount({props}) {
    const{ dispatch}=props;
    dispatch({
      type:'baseSysModel/loadingMenus',
    })
  }

  let LeftNav=wapperComponentsLifecycle({DidMount})(LeftNavbefore);

  function mapStateToProps({baseSysModel}){
    return {baseSysModel};
  }

  export default connect(mapStateToProps)(LeftNav);
