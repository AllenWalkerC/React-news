import React from 'react';
import { Row, Col,BackTop } from 'antd';
import MobileHeader from './mobile_Header.js';
import MobileFooter from './mobile_Footer.js';
import Comment from './comment.js';
class MobileDetails extends React.Component{
  constructor(){
    super();
    this.state = {
      newInfo: ''
    }
  };
  componentDidMount(){
    const myFetch = {
      method: 'GET'
    };
    console.log(this.props.params)
    fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey='+this.props.params.uniquekey,myFetch)
    .then(response=>response.json())
    .then(json=>this.setState({newInfo:json}));
    document.title = this.state.newInfo.title;
  };
  create(){
    return{__html:this.state.newInfo.pagecontent}
  };
  render(){
    return(
      <div>
      <MobileHeader/>
       <Row>
         <Col span={24}>
          <div dangerouslySetInnerHTML={this.create()} class="m_details"/>
          <div class="comment-ct">
           <Comment uniquekey={this.props.params.uniquekey}/>
          </div>
         </Col>
       </Row>
       <MobileFooter />
       <BackTop />
      </div>
    )
  }
};
export default MobileDetails
