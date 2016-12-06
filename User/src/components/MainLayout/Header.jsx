import React,{propTypes} from 'react';
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
        <Menu.Item key="app" className={styles.MenuItem}>
          app
        </Menu.Item>
        <Menu.Item key="系统配置" className={styles.MenuItem}>
          系统配置
        </Menu.Item>
        <Menu.Item key="用户管理" className={styles.MenuItem}>
          用户管理
        </Menu.Item>
      </Menu>
  )
}

export default Header;
