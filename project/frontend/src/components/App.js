import React from "react";
import ReactDOM from "react-dom";
import DataProvider from "./DataProvider";
import DataTable from "./DataTable";
import { AllRecentPosts, AllPosts, Post, NewPost, EditPost } from "./BlogPost";
import UserCombo from "./Form.js";

//Registered users
const Users = () => (
  <DataProvider
    endpoint="/api/users/"
    render={data => <DataTable data={data} />}
  />
);
const BlogsPosts = () => (
  <DataProvider
    endpoint="http://127.0.0.1:3000/show/posts"
    render={data => <DataTable data={data} />}
  />
);
const userlist = document.getElementById("user-list");
userlist ? ReactDOM.render(<Users />, userlist) : null;

const bloglist = document.getElementById("blog-list");
bloglist ? ReactDOM.render(<BlogsPosts />, bloglist) : null;

const Ucombo = document.getElementById("Ucombo");
Ucombo ? ReactDOM.render(<UserCombo />, Ucombo) : null;

//all recent posts
const allRecentposts = document.getElementById("recent");
allRecentposts ? ReactDOM.render(<AllRecentPosts />, allRecentposts) : null;

//User dashboard
const allposts = document.getElementById("index");
allposts ? ReactDOM.render(<AllPosts />, allposts) : null;

//User post
const singlepost = document.getElementById("show-post");
singlepost ? ReactDOM.render(<Post />, singlepost) : null;

//New post
const newpost = document.getElementById("new-post-form");
newpost ? ReactDOM.render(<NewPost />, newpost) : null;

//Edit post
const editpost = document.getElementById("edit-post-container");
editpost ? ReactDOM.render(<EditPost />, editpost) : null;
