import React from "react";
import ReactDOM from "react-dom";
import DataProvider from "./DataProvider";
import Table from "./Table";
import DataTable from "./DataTable";

const Index = () => (
  <DataProvider endpoint="/api/usuarios/" render={data => <Table data={data} />} />
);
const wrapper = document.getElementById("index");
wrapper ? ReactDOM.render(<Index />, wrapper) : null;


const Users = () => (
  <DataProvider endpoint="/api/users/" render={data => <DataTable data={data} />} />
);
const userlist = document.getElementById("user-list");
userlist ? ReactDOM.render(<Users />, userlist) : null;


