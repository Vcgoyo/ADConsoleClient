import React,{PropTypes} from 'react';
import addons from 'react-addons';
import { Row, Col,Card,Breadcrumb, Icon} from 'antd';
import LeftNav from './LeftNav';
import ContentLayout from './ContentLayout';
import Header from './Header';
import Footer from './Footer';
import StaticCard from './StaticCard';
import styles from  './MainLayout.css';

const MainLayout=({children })=>{
  // const cx = addons.classSet;
  return (
    <div className={styles.app}>
          <Row className={styles.app_header}>
            <Col span={3} className={styles.app_header+' '+styles.bg_dark}>Logo</Col>
            <Col span={21}>
              <Header/>
            </Col>
          </Row>
          <Row className={styles.app_main}>
            <Col span={3} className={styles.bg_dark}>
                <div className={styles.app_main}>
                  <LeftNav />
                </div>
            </Col>
            <Col span={17}>
                <div className='app-content'>
                  <Card  bordered={false} >
                    <Breadcrumb >
                      <Breadcrumb.Item href="">
                        <Icon type="home" />
                      </Breadcrumb.Item>
                      <Breadcrumb.Item href="">
                        <Icon type="user" />
                        <span>当前路径</span>
                      </Breadcrumb.Item>
                      <Breadcrumb.Item>
                        当前节点
                      </Breadcrumb.Item>
                    </Breadcrumb>
                    <br/>
                  <StaticCard />
                    <br/>
                  <ContentLayout >
                    {children}
                  </ContentLayout>
                  </Card>
                </div>
            </Col>
            <Col span={4}>
              <div className='app-aside-right'>
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

   /* <Row type="flex" justify="start">
     <Col span={4} >
       <div styles={{height:'80px'}} >
          <LeftNav />
       </div>
     </Col>
     <Col span={20}>
       <div>
       <Header/>
       </div>
     </Col>
   </Row>
   <Row gutter={24}>
     <Col span={4} >

     </Col>
     <Col span={20} >
        <div id='ContentID'>
          <Card  bordered={false} className={styles.ContentCard}>
            <Breadcrumb >
              <Breadcrumb.Item href="">
                <Icon type="home" />
              </Breadcrumb.Item>
              <Breadcrumb.Item href="">
                <Icon type="user" />
                <span>当前路径</span>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                当前节点
              </Breadcrumb.Item>
            </Breadcrumb>
<br/>
          <StaticCard />
<br/>
          <ContentLayout >
            {children}
          </ContentLayout>

          </Card>
        </div>
     </Col>
   </Row>
   <Row>
     <Col span={24} >
       <div >
            <Footer/>
       </div>
     </Col>
   </Row>
 */


export default MainLayout;
