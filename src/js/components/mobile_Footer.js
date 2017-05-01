import React from 'react';
import { Row, Col } from 'antd';
class MobileFooter extends React.Component{
  render(){
    return(
      <footer>
          <Row>
           <Col span={2}></Col>
           <Col span={20} class="footer">
               &copy;&nbsp; 2017 React&nbsp;News. All Right Reserved.
           </Col>
           <Col span={2}></Col>
          </Row>
      </footer>
    )
  }
};
export default MobileFooter;
