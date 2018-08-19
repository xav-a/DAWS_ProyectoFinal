import React from "react";
import PropTypes from "prop-types";
import key from "weak-key";

const Table = ({ data }) =>
  !data.length ? 
  ( <p>Nothing to show</p> ) : 
  (
	<div>
		<h3>Number of registerd users: {data.length}</h3>
		<table className="table is-striped" id="table-user-list">
			<thead>
			<tr>
				{Object.entries(data[0]).map(el => <th key={key(el)}>{el[0]}</th>)}
			</tr>
			</thead>
			<tbody>
			{data.map(el => (
				<tr key={el.id}>
				{Object.entries(el).map(el => <td key={key(el)}>{el[1]}</td>)}
				</tr>
			))}
			</tbody>
		</table>
	</div>
    );
	
Table.propTypes = {
  data: PropTypes.array.isRequired
};

const DataTable = Table;
export default DataTable;