import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'


export class News extends Component {

    static defaultProps = {
        country: 'in',
        pageSize: 8, 
        category: 'general',
      }

      static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number, 
        category: PropTypes.string,
      }

    articles= []

   
    capitalizeFirstLatter =(string)=>{
      return string.charAt(0).toUpperCase()+string.slice(1);
    }

    constructor(props)
    {
        super(props);
        console.log("i am constructor");
        this.state={
            articles:this.articles,
            loading:false,
            page:1
        }

        document.title=`${this.capitalizeFirstLatter(this.props.category)} - Daily News`;
    }

    async updateNews(pageNo)
    {
        const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9fd47cfcc67a43e8aa9d089e7ebe10ab&page=${this.state.page}&pageSize=${this.props.pagesize}} `;
        let data=await fetch(url);
        let parsedata=await data.json();
        this.setState({articles:parsedata.articles, totalResults:parsedata.totalResults})
    }

    async componentDidMount(){
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9fd47cfcc67a43e8aa9d089e7ebe10ab&page=${this.state.page}&pageSize=${this.props.pagesize}} `;
        let data=await fetch(url);
        let parsedata=await data.json();
        this.setState({articles:parsedata.articles, totalResults:parsedata.totalResults})
    }

    handleNextClick= async()=>
    {
        if(!(this.state.page+1>Math.ceil(this.state.totalResults/20)))
        {
            console.log("next click");
            let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9fd47cfcc67a43e8aa9d089e7ebe10ab&page=${this.state.page+1}&pageSize=${this.props.pagesize}}`;
            this.setState({loading:true});
            let data=await fetch(url);
            let parsedata=await data.json();
            this.setState({articles:parsedata.articles})
            this.setState({
                page:this.state.page+1,
                articles:parsedata.articles,
                loading:false
            })
        
        
    }
}

    handlePrevClick=async()=>
    {
        console.log("Prev click");
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9fd47cfcc67a43e8aa9d089e7ebe10ab&page=${this.state.page-11}&pageSize=${this.props.pagesize}`;
        this.setState({loading:true});
        let data=await fetch(url);
        let parsedata=await data.json();
        this.setState({articles:parsedata.articles})
        this.setState({
            page:this.state.page-1,
            articles:parsedata.articles,
            loading:false
        })
    }


  //   async componentDidMount(){
  //     this.updateNews();
  // }

    // handleNextClick = async () => {
    //   this.setState({ page: this.state.page + 1 });
    //   this.updateNews();
  

//   handlePrevClick = async () => {
//     this.setState({ page: this.state.page - 1 });
//     this.updateNews();
// }

  render() {
    return (
      <div className='container my-3'>
        <h2 className="my-3 text-center" style={{margin:"30px 0px"}}>Daily News - Top Headlines from {this.capitalizeFirstLatter(this.props.category)}</h2>
        {this.state.loading &&<Spinner/>}
        
        <div className='row'>
        { this.state.articles.map((element)=>{
            return <div className='col-md-4' key={element.url}>
                <NewsItem  title={element.title.slice(0,30)} description={element.description} imgurl={element.urlToImage} newsurl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
            </div>
        })}
            
        </div>

        <div className='container d-flex justify-content-between'>
        <button type="button" disabled={this.state.page<=1} claaName="btn btn-success " onClick={this.handlePrevClick}> &larr; Previous</button>
        <button type="button" disabled={this.state.page+1>Math.ceil(this.state.totalResults/20)} claaName="btn btn-success" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
       
        
        
      </div>
    )
  }
}

export default News
