import React from 'react';
import { Row, Col } from 'antd';
import {Tabs,Button,Card,BackTop} from 'antd';
import {Router, Route, Link, browserHistory} from 'react-router';
import PCHeader from './pc_Header.js';
import PCFooter from './pc_Footer.js';
const TabPane = Tabs.TabPane;
class PCpersonalcenter extends React.Component{
  constructor(){
    super();
    this.state = {
      usercollect: '',
      usercomment: ''
    }
  };
  componentDidMount(){
    var myFetch = {
      methed: 'GET'
    };
    fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid='+localStorage.userId,myFetch)
    .then(response=>response.json())
    .then(json=>{
      this.setState({usercollect:json})
    });
    fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid='+localStorage.userId,myFetch)
    .then(response=>response.json())
    .then(json=>{
      this.setState({usercomment:json})
    });
  };
  render(){
    const {usercollect,usercomment} = this.state;
    const usercollectList = usercollect.length
    ?
    usercollect.map((text,index)=>(
      <Card title={text.uniquekey} key={index} extra={<Link to={`/details/${text.uniquekey}`} target="_blank">查看</Link>}>
       <p>{text.Title}</p>
      </Card>
    ))
    :
    '你还没有收藏任何新闻';
    const usercommentList = usercomment.length
    ?
    usercomment.map((text,index)=>(
      <Card title={'用户'+text.UserName} key={index} extra={<Link to={`/details/${text.uniquekey}`} target="_blank">{text.datetime}</Link>}>
       <p>{text.Comments}</p>
      </Card>
    ))
    :
    '你还没有任何评论';
    return(
      <div>
        <PCHeader/>
        <Row>
          <Col span={2}></Col>
          <Col span={20}>
            <Tabs>
              <TabPane tab="收藏列表" key="1">
              <Row>
               <Col span={24}>
                 {usercollectList}
               </Col>
              </Row>
              </TabPane>
              <TabPane tab="评论列表" key="2">
              <Row>
               <Col span={24}>
                 {usercommentList}
               </Col>
              </Row>
              </TabPane>
            </Tabs>
          </Col>
          <Col span={2}></Col>
        </Row>
        <PCFooter/>
        <BackTop/>
      </div>
    )
  }
};
export default PCpersonalcenter;
