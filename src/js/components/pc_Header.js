import React from 'react';
import { Row, Col } from 'antd';
import { Menu, Icon ,Tabs, message, Form, Input,Button, CheckBox,Modal} from 'antd';
import {Router, Route, Link, browserHistory} from 'react-router';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
class PCHeader extends React.Component{
  constructor(){
    super();
    this.state = {
      current: "top",
      modaleVisible: false,
      action: 'login',
      hasLogined: false,
      userName: '',
      userId: 0
    };
  };
  setModuleVisible(bool){
    this.setState({modaleVisible: bool});
  };
  componentWillMount(){
    if(localStorage.userId !== ''){
      this.setState({hasLogined:true});
      this.setState({userName:localStorage.userName,userId:localStorage.userId});
    }

  };
  handleClick(e){
    if(e.key === 'register'){
      this.setState({current: 'register'});
      this.setState({modaleVisible: true});
    }else{
      this.setState({current: e.key});
    }
  };
  handleSubmit(e){
     e.preventDefault();
     var fetchOptions = {
       methed: 'GET'
     }
     var formData = this.props.form.getFieldsValue();
     fetch("http://newsapi.gugujiankong.com/Handler.ashx?action="
     +this.state.action+"&username="+formData.r_userName+"&password="
     +formData.r_password+"&r_userName="+formData.r_userName+"&r_password="
     +formData.r_password+"&r_confirmPassword="+formData.r_passwordAgain,fetchOptions)
     .then(response=>response.json())
     .then(json=>{
       this.setState({
         userName: json.NickUserName,
         userId: json.UserId
       });
       if(this.state.action ==="login"){
         this.setState({
           hasLogined:true
         });
         localStorage.userId = json.UserId;
         localStorage.userName = json.NickUserName;
         console.log(localStorage.userId )
         message.success("登录成功！")
       }else if(this.state.action ==="register"){
         message.success("注册成功！")
       }
     });
     this.setModuleVisible(false);
  };
  toggle(key){
    if(key === '1'){
      this.setState({action: 'login'});
    }else if(key === '2'){
      this.setState({action: 'register'});
    }
  };
  logout(){
    localStorage.userId = '';
    localStorage.userName = '';
    this.setState({hasLogined: false})
  };
  render(){
    let {getFieldDecorator} = this.props.form;
    const userShow = this.state.hasLogined
                     ?
                     <Menu.Item key="logout" class="register">
                       <Icon type="user"/>{this.state.userName}
                       <Link to={'/personalcenter'} target="_blank"><Button type="ghost" htmlType="button">个人中心</Button></Link>
                       <Button type="ghost" htmlType="button" onClick={this.logout.bind(this)}>登出</Button>
                     </Menu.Item>
                     :
                     <Menu.Item key="register" class="register">
                       <Icon type="user-add" />登录/注册
                     </Menu.Item>;

    return(
      <header>
          <Row>
           <Col span={2}></Col>
           <Col span={3}>
               <Link to="/" class="logo">
                 <img src="./src/images/logo512x512.png" alt="logp" />
                 <h1>React News</h1>
               </Link>
           </Col>
           <Col span={17}>
             <Menu mode="horizontal" selectedKeys={[this.state.current]} onClick={this.handleClick.bind(this)}>
               <Menu.Item key="top">
                <Link to={'/'}><Icon type="appstore" />头条</Link>
               </Menu.Item>
               <Menu.Item key="guonei">
                <Link to={'/'}><Icon type="appstore" />国内</Link>
               </Menu.Item>
               <Menu.Item key="guoji">
                <Link to={'/'}><Icon type="appstore" />国际</Link>
               </Menu.Item>
               <Menu.Item key="caijing">
                <Link to={'/'}><Icon type="appstore" />财经</Link>
               </Menu.Item>
               <Menu.Item key="yule">
                <Link to={'/'}><Icon type="appstore" />娱乐</Link>
               </Menu.Item>
               <Menu.Item key="junshi">
                <Link to={'/'}><Icon type="appstore" />军事</Link>
               </Menu.Item>
               <Menu.Item key="tiyu">
                <Link to={'/'}><Icon type="appstore" />体育</Link>
               </Menu.Item>
               <Menu.Item key="keji">
                <Link to={'/'}><Icon type="appstore" />科技</Link>
               </Menu.Item>
               {userShow}
             </Menu>
             <Modal title="用户中心" wrapClassName="vertical-center-module" visible={this.state.modaleVisible} onCancel={()=>this.setModuleVisible(false)} onOk={()=>this.setModuleVisible(false)}>
                <Tabs type="card"  onChange={this.toggle.bind(this)}>
                <TabPane tab="登录" key='1'>
                    <Form layout="horizontal" onSubmit = {this.handleSubmit.bind(this)}>
                      <FormItem label="账户">
                        {getFieldDecorator('r_userName')(
                               <Input placeholder="请输入账号"/>
                        )}
                      </FormItem>
                      <FormItem label="密码">
                        {getFieldDecorator('r_password')(
                              <Input type="password" placeholder="请输入密码"/>
                        )}
                      </FormItem>
                      <Button type="primary" htmlType="submit">登录</Button>
                    </Form>
                </TabPane>
                  <TabPane tab="注册" key='2'>
                      <Form layout="horizontal" onSubmit = {this.handleSubmit.bind(this)}>
                        <FormItem label="账户">
                          {getFieldDecorator('r_userName')(
                                 <Input placeholder="请输入账号"/>
                          )}
                        </FormItem>
                        <FormItem label="密码">
                          {getFieldDecorator('r_password')(
                                <Input type="password" placeholder="请输入密码"/>
                          )}
                        </FormItem>
                        <FormItem label="确认密码">
                          {getFieldDecorator('r_passwordAgain')(
                                <Input type="password" placeholder="请再次输入您的密码"/>
                          )}
                        </FormItem>
                        <Button type="primary" htmlType="submit">注册</Button>
                      </Form>
                  </TabPane>
                </Tabs>
             </Modal>
           </Col>
           <Col span={2}></Col>
          </Row>
      </header>
    )
  }
};
export default PCHeader = Form.create({})(PCHeader);
