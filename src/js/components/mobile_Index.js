import React from 'react';
import {Tabs,Carousel,BackTop} from 'antd';
import MobileHeader from './mobile_Header.js';
import MobileFooter from './mobile_Footer.js';
import MobileList from './mobile_List.js';
const TabPane = Tabs.TabPane;
class MobileIndex extends React.Component{
  render(){
    return(
      <div>
       <MobileHeader />
       <Tabs defaultActiveKey="1">
        <TabPane tab="头条" key="1">
          <div class="m_carousel">
            <Carousel autoplay>
              <div><img src="./src/images/Carousel1.jpg"/></div>
              <div><img src="./src/images/Carousel2.jpg"/></div>
              <div><img src="./src/images/Carousel3.jpg"/></div>
              <div><img src="./src/images/Carousel4.jpg"/></div>
            </Carousel>
          </div>
          <MobileList type="top" count="20" />
        </TabPane>
        <TabPane tab="国内" key="2">
          <MobileList type="guonei" count="20" />
        </TabPane>
        <TabPane tab="国际" key="3">
          <MobileList type="guoji" count="20" />
        </TabPane>
        <TabPane tab="财经" key="4">
         <MobileList type="caijing" count="20" />
        </TabPane>
        <TabPane tab="娱乐" key="5">
         <MobileList type="yule" count="20" />
        </TabPane>
        <TabPane tab="军事" key="6">
          <MobileList type="junshi" count="20" />
        </TabPane>
        <TabPane tab="体育" key="7">
          <MobileList type="tiyu" count="20" />
        </TabPane>
        <TabPane tab="科技" key="8">
          <MobileList type="keji" count="20" />
        </TabPane>
        <TabPane tab="社会" key="9">
         <MobileList type="shehui" count="20" />
        </TabPane>
       </Tabs>
       <MobileFooter />
       <BackTop />
      </div>
    )
  };
}
export default MobileIndex
