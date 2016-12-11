import React,{PropTypes} from 'react';
import { Row, Col } from 'antd';
import LeftNav from './LeftNav';
import ContentLayout from './ContentLayout';
import Header from './Header';
import Footer from './Footer';

const MainLayout=({children })=>{
  return (
    <div >
   <Row>
     <Col span={6}>col-12</Col>
     <Col span={18}>
       <Header/>
     </Col>
   </Row>
   <Row >
     <Col span={4}>
       <LeftNav />
     </Col>
     <Col span={20}>
        <ContentLayout style={{'padding-left':'10px'}}>
          {children}
        </ContentLayout>
     </Col>
   </Row>
   <Row>
     <Col span={24} >
       <Footer/>
     </Col>
   </Row>
 </div>
  )
}

export default MainLayout;
