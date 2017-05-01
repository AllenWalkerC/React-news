import React from 'react';
import { Row, Col } from 'antd';
import {message, Form, Input,Button,Card,notification} from 'antd';
import {Router, Route, Link, browserHistory} from 'react-router';
const FormItem = Form.Item;

class Comment extends React.Component{
  constructor(){
    super();
    this.state = {
      comments: ''
    }
  };
  handleSubmit(e){
    e.preventDefault()
    var myFetch = {
      method: 'GET'
    };
    var formData = this.props.form.getFieldsValue();
    fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid='+localStorage.userId+'&uniquekey='+this.props.uniquekey+'&commnet='+formData.commentcText,myFetch)
    .then(response=>response.json())
    .then(this.componentDidMount());

  };
  collect(){
    var myFetch = {
      method: 'GET'
    };
    fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid='+localStorage.userId+'&uniquekey'+this.props.uniquekey,myFetch)
    .then(response=>response.json())
    .then(json=>{
      notification['success']({
        message: 'React-News',
        description: '收藏成功'
      });
    })
  }
  componentDidMount(){
    const myFetch = {
      method: 'GET'
    };
    fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey='+this.props.uniquekey,myFetch)
    .then(response=>response.json())
    .then(json=>this.setState({comments:json}));
  };
  render(){
    let {getFieldDecorator} = this.props.form;
    const {comments} = this.state;
    const commentList = comments.length
    ?
    comments.map((comment,index)=>(
      <Card key={index} title={"用户"+comment.UserName} extra={<a href="#">发表于{comment.datetime}</a>}>
        <p>{comment.Comments}</p>
      </Card>
    ))
    :
    "没有评论";
    return(
      <div>
       <Row>
        <Col span={24}>
          {commentList}
          <Form onSubmit = {this.handleSubmit.bind(this)}>
            <FormItem label="你的评论">
              {getFieldDecorator('commentcText')(
                     <Input type="textarea" placeholder="说点什么吧"/>
              )}
            </FormItem>
            <Button type="primary" htmlType="submit">提交评论</Button>
            &nbsp;&nbsp;
            <Button type="primary" htmlType="button" onClick={this.collect.bind(this)}>收藏文章</Button>
          </Form>
        </Col>
       </Row>
      </div>
    )
  };
}
export default Comment = Form.create({})(Comment);
