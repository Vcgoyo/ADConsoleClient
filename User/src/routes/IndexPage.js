import React, { Component, PropTypes } from 'react';
import { Card, Col, Row,Calendar,Carousel  } from 'antd';
import { connect } from 'dva';
import { Link } from 'dva/router';
import styles from './IndexPage.less';

function IndexPage({location}) {
  return (
    <div className={styles.HomeDiv}>
      首页
      <hr/>

      <div>
          <Row>
            <Col span="6">
              <Card title="您的登录信息:" bordered={false}>
                <div>
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
                  </div>
              </Card>
            </Col>
            <Col span="10">
              <Card title="Calendar" bordered={false}>
{/* 
                    <Carousel autoplay style={{width:'290px'}}>
                      <div><h3>1</h3></div>
                      <div><h3>2</h3></div>
                      <div><h3>3</h3></div>
                      <div><h3>4</h3></div>
                    </Carousel> */}

              </Card>
            </Col>
            <Col span="8">
              <Card title="日历" bordered={false}>
                <div style={{ width: 290 }}>
                  <Calendar fullscreen={false}  />
                </div>
              </Card>
            </Col>
          </Row>
        </div>




    </div>
  );
}

IndexPage.propTypes = {
};

export default IndexPage;
