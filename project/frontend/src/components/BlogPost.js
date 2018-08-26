import React, { Component } from 'react';

class AllPosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
	const id = $("#userId").attr("value");
    $.ajax({
      url: `http://127.0.0.1:3000/show/posts/${id}`,
      dataType: 'json',
      cache: false,
      success: function(data) {
		//console.log(data);
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("show/posts", status, err.toString());
      }.bind(this)
    });
  }
  
  render() {
    const { data } = this.state;
	return (
      <div>
		<h3>Dashboard</h3>
        {data.map(post =>
          <div className="post" key={post._id}>
            <h4><a href={post._id}>{post.title}</a></h4>
			{post.imageURL != null &&
			<picture className="post-picture">
				<img className="post-picture-img" src={post.imageURL}/>
			</picture>
			}
			<p className="post-content">{post.content}</p>
			<p className="post-date">{post.createdAt}</p>
          </div>
        )}
      </div>
    );
 
  }
}

class Post extends Component {
	
}

export {
	AllPosts,
	Post,
}

