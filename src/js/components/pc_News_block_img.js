import React from 'react';
import {Router,Route,hashHistory,Link} from 'react-router';
import {Card} from 'antd';
class PCImagesBlock extends React.Component{
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
    const imgStyle = {
      height: this.props.imgWidth,
      width: this.props.imgWidth
    };
    const h3Style = {
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      fontSize: '15px',
      color: '#444',
      width: this.props.imgWidth
    };
    const pStyle = {
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      fontSize: '12px',
      color: '#666',
      width: this.props.imgWidth
    }
    const news = this.state.news;
    const newsList = news.length
    ?
    news.map((newsItem,index)=>(
      <li key={index}>
        <Link to={`details/${newsItem.uniquekey}`} target="_blank">
             <img src={newsItem.thumbnail_pic_s} style={imgStyle}/>
             <h3 style={h3Style}>{newsItem.title}</h3>
             <p style={pStyle}>{newsItem.author_name}</p>
        </Link>
      </li>
    ))
    :
    "没有加载任何数据";
    return(
      <div class="imgBlock">
        <Card title={this.props.title}>
          <ul>
           {newsList}
          </ul>
        </Card>
      </div>
    )
  }
};
export default PCImagesBlock;
