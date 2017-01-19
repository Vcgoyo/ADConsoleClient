import React,{PropTypes} from 'react';
import addons from 'react-addons';
import { Row, Col,Card,Breadcrumb, Icon} from 'antd';
import LeftNav from '../components/MainLayout/LeftNav';
import ContentLayout from '../components/MainLayout/ContentLayout';
import Header from '../components/MainLayout/Header';
import Footer from '../components/MainLayout/Footer';
import StaticCard from '../components/MainLayout/StaticCard';
import Home from './Home';
import styles from  './MainLayout.css';

const MainLayout=({children })=>{
  // const cx = addons.classSet;
  return (
    <div className={styles.app}>
          <Row className={styles.app_header+' '+styles.fixhead}>
            <Col span={3} className={styles.app_header+' '+styles.bg_dark}>Logo</Col>
            <Col span={21} className={styles.app_header_right}>
              <Header/>
            </Col>
          </Row>
          <Row className={styles.app_main}>
            <Col span={3} className={styles.bg_dark}>
                <div className={styles.app_main}>
                  <LeftNav />
                </div>
            </Col>
            <Col span={16}>
                  <ContentLayout  className={styles.app_content}>
                    {children||Home}
                  </ContentLayout>
            </Col>
            <Col span={5} className={styles.app_aside_right}>
              <div >
                 asideright
              </div>
            </Col>
            </Row>
          <Row>
            <Col span={3}  className={styles.bg_dark}>

            </Col>
            <Col span={21}>
                <Footer/>
            </Col>
          </Row>
    </div>
  )
}


export default MainLayout;
