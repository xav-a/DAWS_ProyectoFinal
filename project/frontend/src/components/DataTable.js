import React from "react";
import PropTypes from "prop-types";
import key from "weak-key";

import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';

const Table = ({ data }) =>
  !data.length ? 
  ( <p>Nothing to show</p> ) : 
  (
	(function () {
		//username	email	id	first_name	last_name
		const columns = [{
		  dataField: 'id',
		  text: 'User ID',
		  sort: true
		}, {
		  dataField: 'username',
		  text: 'Username',
		  filter: textFilter()
		}, {
		  dataField: 'first_name',
		  text: 'First Name'
		}, {
		  dataField: 'last_name',
		  text: 'Last Name'
		}, {
		  dataField: 'email',
		  text: 'E-mail',
		  filter: textFilter()
		}];
		
		return (<BootstrapTable 
			striped
			hover
			keyField="id" 
			data={ data } 
			columns={ columns } 
			filter={ filterFactory() } />);	
	})()
  );
	
Table.propTypes = {
  data: PropTypes.array.isRequired
};

const DataTable = Table;
export default DataTable;