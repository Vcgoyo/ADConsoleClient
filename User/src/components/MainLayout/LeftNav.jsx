import React, { PropTypes } from 'react';
import {connect} from 'dva';
import { Menu, Icon, Switch } from 'antd';
import styles from './LeftNav.less';
const SubMenu = Menu.SubMenu;
const MenuItem=Menu.Item;




const ItemTree=[
  {id:1,pid:0,name:'父级菜单1',ismap:false},
  {id:2,pid:0,name:'父级菜单2',ismap:false},
  {id:3,pid:1,name:'子级菜单1',ismap:false}
]



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

function changeMode(value){
  dispatch({
    type:'changeMode',
    mode:value ? 'vertical' : 'inline'
  })
}

const LeftNav=({mode,dispatch})=>{
  const menus=LoadMenuTree(ItemTree);
  return (
    <div >
        <Switch  onChange={changeMode}/>
        <br />
        <br />
        <Menu
          className={styles.LeftNavCommon}
          defaultOpenKeys={['sub1']}
          mode={mode}
        >
          {menus}
          {/* <SubMenu key="sub1" title={<span><Icon type="mail" /><span>Navigation One</span></span>}>

          </SubMenu>
          <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>Navigation Two</span></span>}>
            <Menu.Item key="5">Option 5</Menu.Item>
            <Menu.Item key="6">Option 6</Menu.Item>
            <SubMenu key="sub3" title="Submenu">
              <Menu.Item key="7">Option 7</Menu.Item>
              <Menu.Item key="8">Option 8</Menu.Item>
            </SubMenu>
          </SubMenu>
          <SubMenu key="sub4" title={<span><Icon type="setting" /><span>Navigation Three</span></span>}>
            <Menu.Item key="9">Option 9</Menu.Item>
            <Menu.Item key="10">Option 10</Menu.Item>
            <Menu.Item key="11">Option 11</Menu.Item>
            <Menu.Item key="12">Option 12</Menu.Item>
          </SubMenu> */}

        </Menu>
      </div>
    );
  }

  function mapStateToProps({menus}){
    return {menus};
  }

  export default connect(mapStateToProps)(LeftNav);
