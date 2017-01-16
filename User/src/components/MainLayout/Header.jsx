import React,{propTypes} from 'react';
import { Link } from 'dva/router'
import { Menu, Icon } from 'antd';
import styles from './Header.less';
const SubMenu = Menu.SubMenu;

const Header=({
      userName,
      handImage,
      settingPercent,
      isNewHelp,
      dropDownMenuVisible
    })=>{
    let isShow='none';
    const toggleDropMenu=()=>{
      isShow= dropDownMenuVisible==true?'block':'none';
    }

  return (
    <div className={styles.header_div}>
      <ul className={styles.header_right}>
        <li className={styles.dropdown}></li>
        <li className={styles.dropdown}>
          <a href="#"  className={styles.li_a}>
            <span className={styles.title_font}>
              VicGo
            </span>
            <Icon type="caret-down" />
            <span className={styles.img_span}>
              <img src='./resource/image/b2.jpg' className={styles.header_img}/>
            </span>
          </a>
        </li>
      </ul>

      <ul className={styles.dropdown_menu+' '+styles.animated+' '+styles.fadeInRight}  style={{display:isShow}}>
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

export default Header;
