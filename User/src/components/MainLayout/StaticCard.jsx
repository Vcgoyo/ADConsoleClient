import React,{PropTypes} from 'react';
import { Card, Col, Row } from 'antd';

const StaticCard=()=>{
  return (
    <Row>
      <Col span="8">
        <Card  bordered={true}>Card content</Card>
      </Col>
      <Col span="8">
        <Card  bordered={true}>Card content</Card>
      </Col>
      <Col span="8">
        <Card  bordered={true}>Card content</Card>
      </Col>
    </Row>
  )
}

export default StaticCard;
