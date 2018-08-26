import React from "react";
import ReactDOM from "react-dom";
import DataProvider from "./DataProvider";
import Table from "./Table";
import DataTable from "./DataTable";
import { AllPosts, Post } from "./BlogPost"


//Registered users
const Users = () => (
  <DataProvider endpoint="/api/users/" render={data => <DataTable data={data} />} />
);
const userlist = document.getElementById("user-list");
userlist ? ReactDOM.render(<Users />, userlist) : null;

//User dashboard
const allposts = document.getElementById("index");
allposts ? ReactDOM.render(<AllPosts />, allposts) : null;

//User post
const singlepost = document.getElementById("show-post");
singlepost ? ReactDOM.render(<Post />, singlepost) : null;