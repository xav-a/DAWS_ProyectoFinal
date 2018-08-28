import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
var ReactFauxDOM = require('react-faux-dom');

const PostCounts = ({ data }) =>
  !data.length ? 
  ( <p>Nothing to show</p> ) : 
  (
	(function() {
		const div = new ReactFauxDOM.createElement('div');
   
		let margin = {top: 20, right: 20, bottom: 30, left: 40},
		width = $("#post-counts").width() - margin.left - margin.right,
		height = 400 - margin.top - margin.bottom;
		
		let x = d3.scaleBand()
		.rangeRound([0, width/2])
		
		let y = d3.scaleLinear()
		.range([height, 0])
		
		let xAxis = d3.axisBottom()
		.scale(x);
		
		let yAxis = d3.axisLeft()
		.scale(y);
		
		//Pass it to d3.select and proceed as normal
		let svg = d3.select(div).append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", `translate(${margin.left},${margin.top})`);
		
		x.domain(data.map((d) => d._id));
		y.domain([0, d3.max(data, (d) => d.count)]);
		
		svg.append("g")
		.attr("class", "x axis")
		.attr("transform", `translate(0,${height})`)
		.call(xAxis);
		
		svg.append("g")
		.attr("class", "y axis")
		.call(yAxis)
		.append("text")
		.attr("transform", "rotate(-90)")
		.attr("y", 6)
		.attr("dy", ".71em")
		.style("text-anchor", "end")
		.text("Frequency");
		
		svg.selectAll(".bar")
		.data(data)
		.enter().append("rect")
		.attr("class", "bar")
		.attr("x", (d) => x(d._id))
		.attr("width", 25)
		.attr("y", (d) => y(d.count))
		.attr("height", (d) => {return height - y(d.count)});
		
		console.log("here biatch");
		return div.toReact();
	})()
  );
PostCounts.propTypes = {
  data: PropTypes.array.isRequired
};


export { PostCounts };
