import React from 'react';
import {Router,Route,hashHistory,Link} from 'react-router';
import {Card} from 'antd';
class PCNewsBlock extends React.Component{
  constructor(){
    super();
    this.state = {
      news: ''
    }
  };
  componentWillMount(){
    const myFetch = {
      method: 'GET'
    };
    fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type='+this.props.type+'&count='+this.props.count,myFetch)
    .then(response=>response.json())
    .then(json=>this.setState({news:json}));
  };
  render(){
    const news = this.state.news;
    const newsList = news.length
    ?
    news.map((newsItem,index)=>(
      <li key={index}>
        <Link to={`details/${newsItem.uniquekey}`} target="_blank">
             {newsItem.title}
        </Link>
      </li>
    ))
    :
    "没有加载任何数据";
    return(
      <div class="newslist">
        <Card title={this.props.realtype+'头条'}>
          <ul>
           {newsList}
          </ul>
        </Card>
      </div>
    )
  }
};
export default PCNewsBlock;
