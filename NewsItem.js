import React, { Component } from 'react'

export class NewsItem extends Component {
    
  


  render() {
    let {title, description,imgurl,newsurl,author,date,source }=this.props;
    return (
      <div className="my-3">
        <div className="card" >
                <img src={!imgurl?"https://i.ytimg.com/vi/tt3BSseLSWk/maxresdefault.jpg":imgurl} className="card-img-top" alt="..."/>
                <span class="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left: '90%', zIndex: '1'}}> {source}
                        </span>
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <p className='card-text'><small className='text-muted'>By {!author?"Unkown":author} on {date}</small></p>
                    <a rel="noreferrer" href={newsurl} target='_blank' className="btn btn-sm btn-primary">Read More</a>
                </div>
</div>
      </div>
    )
  }
}

export default NewsItem
