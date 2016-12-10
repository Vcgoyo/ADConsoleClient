import React,{propTypes} from 'react';
import { Link } from 'dva/router'
import { Menu, Icon } from 'antd';
import styles from './Header.less';
const SubMenu = Menu.SubMenu;

const Header=()=>{
  return (
    <Menu
        mode="horizontal"
        className={styles.MenuCommon}
      >
        <Menu.Item key="业务维护" className={styles.MenuItem}>
          业务维护
        </Menu.Item>
        <Menu.Item key="app配置" className={styles.MenuItem}>
          app
        </Menu.Item>
        <Menu.Item key="系统配置" className={styles.MenuItem}>
          <Link to='syssetting'>系统配置</Link>
        </Menu.Item>
        <Menu.Item key="用户管理"  className={styles.MenuItem}>
          <Link to='usermanage'>用户管理</Link>
        </Menu.Item>
      </Menu>
  )
}

export default Header;
