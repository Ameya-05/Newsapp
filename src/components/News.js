import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


export class News extends Component {
  static defaultProps={
    country:'in',
    pageSize:8,
    category:'general'
  }
  static propTypes={
    country: PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string
  }

  capitalizeFirstLetter=(string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props){
    super(props);
    this.state={
      articles: [],
      loading: false,
      page:1,
      totalResults:0
    }
    document.title=`${this.capitalizeFirstLetter(this.props.category)} - FastNews`
  }

  async updateNews(){
    this.props.setProgress(10);
    const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=cc8da506db4f4bb99cac24e11378bfb1&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data=await fetch(url);
    let parsedData=await data.json();
    this.setState({
      articles:parsedData.articles, 
      totalResults:parsedData.totalResults, 
      loading:false
    })
    this.props.setProgress(100)
  }

  async componentDidMount(){
    this.updateNews();
  }
  

  fetchMoreData = async () => {
    this.setState({page:this.state.page+1})
    const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=cc8da506db4f4bb99cac24e11378bfb1
    &page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    let data=await fetch(url);
    let parsedData=await data.json();
    this.setState({
      articles:this.state.articles.concat(parsedData.articles), 
      totalResults:parsedData.totalResults, 
    })
  };

  render() {
    return (
      <>
        <h3 className="text-center" style={{margin:'20px 0px', marginTop:'80px'}}>FastNews - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h3>
        {this.state.loading && <Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.state.totalResults}
          loader={<Spinner/>}
        >
        <div className="container">
        <div className="row">
        {this.state.articles.map((element)=>{         
          return <div className="col-md-4" key={element.url}>
                  <NewsItem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                  </div>
        })}  
        </div>
        </div>
        </InfiniteScroll>
        </>
      
    )
  }
}

export default News
