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
      url: `http://127.0.0.1:3000/show/posts/${id}`, //userId
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
            <h4 className="post-header"><a href={`/post/${post._id}`}>{post.title}</a></h4>
			{post.imageURL != null &&
			<picture className="post-picture">
				<img className="post-picture-img" src={post.imageURL}/>
			</picture>
			}
			<p className="post-content" dangerouslySetInnerHTML={{__html: post.content}}/>
			<p className="post-date">{post.createdAt}</p>
          </div>
        )}
      </div>
    );
 
  }
}

class Post extends Component {
	constructor(props) {
    super(props);
    this.state = {
      post: null,
    };
  }
  
  deletePost(postId) {
	console.log("delete?");
	$.ajax({
      url: `http://127.0.0.1:3000/delete/post/${postId}`,
	  method: 'DELETE',
      cache: false,
      success: function(result) {
		console.log(result);
		$(location).attr('href', '/');
      },
      error: function(xhr, status, err) {
        console.error(`delete/post/${postId}`, status, err.toString());
      }
    });
  }

  componentDidMount() {
	const postId = $("#show-post").attr("data-post-id");
	//console.log(postId);
    $.ajax({
      url: `http://127.0.0.1:3000/show/post/${postId}`,
      dataType: 'json',
      cache: false,
      success: function(postData) {
		console.log(postData);
        this.setState({post: postData});
		$("#delete-post").click(function() {this.deletePost(postId)}.bind(this));
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(`show/post/${postId}`, status, err.toString());
      }.bind(this)
    });
  }
  render() {
    const { post } = this.state;
	
	let ImgElement = (post != null && post.imageURL != null) ? (
					<picture className="post-picture">
						<img className="post-picture-img" src={post.imageURL}/>
					</picture>
				) : <React.Fragment></React.Fragment>;
	
	let PostElement = (post != null) ? (
			<React.Fragment>
				<h3 className="post-header">{post.title}</h3>		
				<React.Fragment>{ImgElement}</React.Fragment>
				<p className="post-content" dangerouslySetInnerHTML={{__html: post.content}}/>
				<p className="post-date">{`Posted: ${post.createdAt}`}</p>
				<p className="post-date">{`Update: ${post.updatedAt}`}</p>
			</React.Fragment>
        ) : <h1>Loading....</h1>;
	
	return PostElement;
       
  }
}


class NewPost extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
	//console.log(data);

	const object = {};
	data.forEach(function(value, key){
		object[key] = value;
	});
	object["userId"] = parseInt($("#userId").attr("value"), 10);
	object["imageURL"] = (object["imageURL"].trim() === "") ? null : object["imageURL"].trim();
	const json = JSON.stringify(object);
    //console.log(json);
   $.ajax({
      url: `http://127.0.0.1:3000/new/post`,
	  type: 'POST',
      cache: false,
	  data: json,
	  contentType: "application/json",
      complete: function(response) {
		console.log(response);
		$(location).attr('href', '/');
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(`new/post/`, status, err.toString());
      }.bind(this)
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="title">Title</label>
        <input id="title" name="title" type="text" />

        <label htmlFor="content">Post</label>
        <textarea id="content" name="content" />

        <label htmlFor="imageURL">(Opcional) Imagen</label>
		<input id="imageURL" name="imageURL" type="url"/>
		
        <button>Post!</button>
      </form>
    );
  }

	
}

export {
	AllPosts,
	Post,
	NewPost,
}

