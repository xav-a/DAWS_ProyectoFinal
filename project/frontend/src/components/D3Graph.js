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
		.rangeRound([0, width])
		
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
		
		return div.toReact();
	})()
  );
PostCounts.propTypes = {
  data: PropTypes.array.isRequired
};

const PostCounts2 = ({ data }) =>
  !data.length ? 
  ( <p>Nothing to show</p> ) : 
  (
	(function() {
	  const div = new ReactFauxDOM.createElement('div');
	  var text = "";

	  var width = $("#post-counts-2").width() * 0.75;
	  var height = width;
	  var thickness = 40;
	  var duration = 750;
	  var padding = 10;
	  var opacity = .8;
	  var opacityHover = 1;
	  var otherOpacityOnHover = .8;
	  var tooltipMargin = 13;
	  
	  var radius = Math.min(width-padding, height-padding) / 2;
	  var color = d3.scaleOrdinal(d3.schemeCategory10);
	  
	  var svg = d3.select(div).append('svg')
	  .attr('class', 'pie')
	  .attr('width', width)
	  .attr('height', height);
	  
	  var g = svg.append('g')
	  .attr('transform', `translate(${width/2},${height/2})`);
	  
	  var arc = d3.arc()
	  .innerRadius(0)
	  .outerRadius(radius);
	  
	  var pie = d3.pie()
	  .value(function(d) { return d.count; })
	  .sort(null);
	  
	  var path = g.selectAll('path')
	  .data(pie(data))
	  .enter()
	  .append("g")  
	  .append('path')
	  .attr('d', arc)
	  .attr('fill', (d,i) => color(i))
	  .style('opacity', opacity)
	  .style('stroke', 'white') 
	  .each(function(d, i) { this._current = i; });
	  
	    let legend = d3.select(div).append('div')
	  			.attr('class', 'legend')
	  			.style('margin-top', '30px');
	  
	    let keys = legend.selectAll('.key')
	  			.data(data)
	  			.enter().append('div')
	  			.attr('class', 'key')
	  			.style('display', 'flex')
	  			.style('align-items', 'center')
	  			.style('margin-right', '20px');
	  
	  		keys.append('div')
	  			.attr('class', 'symbol')
	  			.style('height', '10px')
	  			.style('width', '10px')
	  			.style('margin', '5px 5px')
	  			.style('background-color', (d, i) => color(i));
	  
	  		keys.append('div')
	  			.attr('class', '_id')
	  			.text(d => `User ID ${d._id} / Value ${d.count}`);
	  
	  		keys.exit().remove();
		return div.toReact();
	  })()
  );
PostCounts2.propTypes = {
  data: PropTypes.array.isRequired
};

export { PostCounts, PostCounts2 };
