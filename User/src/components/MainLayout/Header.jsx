import React,{propTypes} from 'react';
import {connect} from 'dva';
import { Link } from 'dva/router'
import { Menu, Icon } from 'antd';
import styles from './Header.less';
const SubMenu = Menu.SubMenu;

const Header=({header,dispatch})=>{

  const {
          userName,
          handImage,
          settingPercent,
          isNewHelp,
          dropDownMenuVisible
        }=header;

        const toggleDropDownMenu=()=>{
          debugger;
          dispatch({
            type:'header/toggleDropDownMenu',
          })
        }

  return (
    <div className={styles.header_div}>
      <ul className={styles.header_right}>
        <li className={styles.dropdown}></li>
        <li className={styles.dropdown}>
          <a href="#" onClick={toggleDropDownMenu}  className={styles.li_a}>
            <span className={styles.title_font}>
              {userName}
            </span>
            <Icon type="caret-down" />
            <span className={styles.img_span}>
              <img src={handImage} className={styles.header_img}/>
            </span>
          </a>
        </li>
      </ul>

      <ul onBlur={toggleDropDownMenu} className={styles.dropdown_menu+' '+styles.animated+' '+styles.fadeInRight}  style={{display:dropDownMenuVisible}}>
              <li className={styles.bg_light}>
                <div>
                  <p>300mb of 500mb used</p>
                </div>
              </li>
              <li>
                <Link to='/syssetting'>
                  Settings
                  {/* <span>30%</span>
                  <span>Settings</span> */}
                </Link>
              </li>
              <li>
                <Link >
                  Profile
                </Link>
              </li>
              <li>
                <Link >
                  <span>new</span>
                  Help
                </Link>
              </li>
              <li className={styles.divider}>
              </li>
              <li>
                <Link to='syssetting'>
                  Logout
                </Link>
              </li>
            </ul>
    </div>


   )
}

  function mapStateToProps({header}){
    return {header};
  }

export default connect(mapStateToProps)(Header);
