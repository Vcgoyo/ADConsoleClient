import React, { PropTypes }  from 'react';
import {connect} from 'dva';
import { Card } from 'antd';
import styles from './Home.less';


const Home=()=>{
  return (
    <div>
      <Card  className={styles.centent_head}>
        <div className={styles.title_card}>
          <ul className={styles.ul_card}>
            <li><img src='./resource/image/b2.jpg' className={styles.img_card}/></li>
            <li className={styles.loginer_msg} ><span>VcGo</span><p>address</p></li>
            <li className={styles.login_msg}>
              <ul>
                <li>
                  登录账号：Admin
                </li>
                <li>
                  登录次数：15
                </li>
                <li>
                  当前时间：2016-12-10
                </li>
                <li>
                  上次登录IP：177.251.25.1
                </li>
                <li>
                  上次登录时间：
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </Card>
    </div>
  )
}


export default Home;
