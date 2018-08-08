import React from "react";
import ReactDOM from "react-dom";
import DataProvider from "./DataProvider";
import Table from "./Table";

const Index = () => (
  <DataProvider endpoint="api/usuarios/" render={data => <Table data={data} />} />
);

const wrapper = document.getElementById("index");
wrapper ? ReactDOM.render(<Index />, wrapper) : null;

