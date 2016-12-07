import React,{propTypes} from 'react';
import { Menu, Icon } from 'antd';
import styles from './Footer.less';

const Footer=()=>{
  return (
    <div className={styles.FooterCommonjs}>
      <span>
          © 2016 CopyRight:VcGo AllMobilize, Inc. Licensed under MIT license.
      </span>
    </div>
  )
}

export default Footer;
