import React from 'react';
import { Row, Col } from 'antd';
import {Tabs,Carousel} from 'antd';
import PCNewsBlock from './pc_News_block.js';
import PCImagesBlock from './pc_News_block_img.js';
const TabPane = Tabs.TabPane;
class PCNewsCt extends React.Component{
  render(){
    return(
      <div>
        <Row>
          <Col span={2}></Col>
          <Col span={20}>
            <div class="leftCt">
              <div class="carousel-ct">
                <Carousel autoplay>
                  <div><img src="./src/images/Carousel1.jpg"/></div>
                  <div><img src="./src/images/Carousel2.jpg"/></div>
                  <div><img src="./src/images/Carousel3.jpg"/></div>
                  <div><img src="./src/images/Carousel4.jpg"/></div>
                </Carousel>
              </div>
              <PCImagesBlock type="shehui" count={6} width='400px' imgWidth='106px' title="社会头条"/>
            </div>
            <PCNewsBlock type="top" count={21} realtype='新闻'/>
            <PCNewsBlock type="junshi" count={20} realtype='军事'/>
            <div>
              <PCImagesBlock type="guonei" count={16}  width="100%" imgWidth='132px' title="国内头条"/>
              <PCImagesBlock type="yule" count={16}  width="100%" imgWidth='132px' title="娱乐头条"/>
            </div>
          </Col>
          <Col span={2}></Col>
        </Row>
      </div>
    )
  }
}

export default PCNewsCt;
