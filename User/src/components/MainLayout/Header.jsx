import React, { PropTypes } from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'dva/router';

const getMenuKeyFromUrl=(pathname)=>{
  let key='';
  try {
    key = pathname.match(/\/([^\/]*)/i)[1];
  } catch (e) {
    return key;
  }
}

const Header=({location})=>{
  return (
  <Menu
  selectedKeys={[getMenuKeyFromUrl(location.pathname)]}
  mode='horizontal'
  theme='light'
  >
    <Menu.Item key='users'>
      <Link to="/users"><Icon type="bars" />Users</Link>
    </Menu.Item >
    <Menu.Item key="home">
        <Link to="/"><Icon type="home" />Home</Link>
      </Menu.Item>
      <Menu.Item key="404">
        <Link to="/page-you-dont-know"><Icon type="frown-circle" />404</Link>
      </Menu.Item>
      <Menu.Item key="antd">
        <a href="https://github.com/dvajs/dva" target="_blank">dva</a>
      </Menu.Item>
  </Menu>)
}

Header.propTypes={
   location: PropTypes.object,
}

export default Header;
