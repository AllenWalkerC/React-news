import React from 'react';
import {Router,Route,hashHistory,Link} from 'react-router';
import Tloader from 'react-touch-loader';
import {Row,Col} from 'antd';
class MobileList extends React.Component{
  constructor(){
    super();
    this.state = {
      news: '',
      count: 20,
			hasMore: 0,
			initializing: 1,
			refreshedAt: Date.now()
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
  loadMore(resolve){
		setTimeout(()=>{
			var count = this.state.count;
			this.setState({
				count: count+5,
			});

			var myFetchOptions = {
				method: 'GET'
			};
			fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=" + this.props.type + "&count=" + this.state.count, myFetchOptions).then(response => response.json()).then(json => this.setState({news: json}));

		this.setState({
			hasMore: count>0 && count<50
		});

		resolve();

		},2e3);
	};

	componentDidMount(){
		setTimeout(()=>{
			this.setState({
				hasMore: 1,
				initializing: 2
			});
		},2e3);
	};
  render(){
    var {hasMore,initializing,refreshedAt} = this.state;
    const news = this.state.news;
    const newsList = news.length
    ?
    news.map((newsItem,index)=>(
        <section key={index}>
          <Link to={`details/${newsItem.uniquekey}`}>
            <div class="m_img">
              <img src={newsItem.thumbnail_pic_s}/>
            </div>
            <div class="m_article_title">
              <h3>{newsItem.title}</h3>
              <div class="m_article_info">
                <p class="type">{newsItem.realtype}</p>
                <p>{newsItem.date}</p>
              </div>
            </div>
          </Link>
        </section>))
    :
    "没有加载任何数据";
    return(
      <div>
        <Row>
          <Col span={24}>
            <Tloader className="main" onLoadMore={this.loadMore.bind(this)} hasMore={hasMore} initializing={initializing}>
                 {newsList}
            </Tloader>
          </Col>
        </Row>
      </div>
    )
  }
};
export default MobileList;
