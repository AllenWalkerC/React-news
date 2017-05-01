import React from 'react';
import { Row, Col,BackTop } from 'antd';
import PCHeader from './pc_Header.js';
import PCFooter from './pc_Footer.js';
import PCImagesBlock from './pc_News_block_img.js';
import Comment from './comment.js';
class PCDetails extends React.Component{
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
    fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey='+this.props.params.uniquekey,myFetch)
    .then(response=>response.json())
    .then(json=>{this.setState({newInfo:json});
          document.title = this.state.newInfo.title;
    });
  };
  create(){
    return{__html:this.state.newInfo.pagecontent}
  }
  render(){
    return(
      <div>
      <PCHeader/>
       <Row>
        <Col span={2}></Col>
         <Col span={14}>
          <div dangerouslySetInnerHTML={this.create()} class="details"/>
          <Comment uniquekey={this.props.params.uniquekey}/>
         </Col>
         <Col span={6}>
          <div class="details-img-ct">
           <PCImagesBlock count={20} width='100%' imgWidth='138px' type="top"/>
          </div>
         </Col>
         <Col span={2}></Col>
       </Row>
       <PCFooter />
       <BackTop />
      </div>
    )
  }
};
export default PCDetails
