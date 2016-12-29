import React,{PropTypes} from 'react';
import { Row, Col,Card,Breadcrumb, Icon} from 'antd';
import LeftNav from './LeftNav';
import ContentLayout from './ContentLayout';
import Header from './Header';
import Footer from './Footer';
import StaticCard from './StaticCard';
import styles from './MainLayout.less';

const MainLayout=({children })=>{
  return (
    <div >
   <Row gutter={24}>
     <Col span={4} >
       <div styles={{height:'80px'}} >

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
       <div>
          <LeftNav />
       </div>
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
 </div>
  )
}

export default MainLayout;
