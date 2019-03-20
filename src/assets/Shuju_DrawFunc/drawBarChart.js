// import * as d3 from 'd3';
// import { dataChartGet } from '../Shuju_data/dataFunc';

// export default function drawBarChart(){
//     var width = 700,height= 500,padding = 20;
//     var dataArray = dataChartGet();
//     var svg = d3.select('#chart')
//         .append('svg')
//         .attr('id','bar_chart')
//         .attr('width',width)
//         .attr('height',height)
//         .call(zoom);
    
//     var xScale = d3.scaleBand()
//         .domain(dataArray.I)
//         .rangeRound([2*padding,width-2*padding]);
//     var yScale = d3.scaleLinear()
//         .domain([0,1.1*Math.max(dataArray.II)])
//         .range([height-3*padding,3*padding]);
//     var xAxis = d3.axisBottom(xScale)
//         .tickSize(0)
//         .tickPadding(6)
//         .tickValues(xScale.domain().filter(function(d,i){return !(i%10)}));
//     var yAxis = d3.axisLeft(yScale).tickSize(0);

//     function zoom(svg){
//         const extent = [[2*padding,3*padding],[width-2*padding,height-3*padding]];
//         svg.call(d3.zoom()
//           .scaleExtent([1,20])
//           .translateExtent(extent)
//           .extent(extent)
//           .on("zoom",zoomed));
//         function zoomed(){
//           xScale.range([2*padding,width-2*padding].map(d => d3.event.transform.applyX(d)));
//           svg.select("#svgrects")
//             .selectAll("rect")
//             .attr("x",function(d){
//               return xScale(d["ID "])+xScale.bandwidth()/2;
//             })
//             .attr("width",xScale.bandwidth());
//           svg.select(".axis--x").call(xAxis);
//         }
//     }
//     svg.append("defs").append("clipPath")
//         .attr("id","myclip")
//         .append("rect")
//         .attr("x","40")
//         .attr("y","0")
//         .attr("width","600")
//         .attr("height","500");
//     function make_y_axis(){
//         return d3.axisLeft(yScale);
//         }
//     svg.append("g")
//         .attr("stroke","lightgray")
//         .attr("stroke-opacity","0.1")
//         .attr("shape-rendering","crispEdges")
//         .call(make_y_axis()
//             .tickSize(-width+4*padding,0,0)
//             .tickFormat(""))
//         .attr("transform","translate("+(2*padding)+",0)");
//     svg.append("text")
//         .attr("fill","black")
//         .attr("text-anchor","end")
//         .attr("font-size",10)
//         .attr("x",width-padding)
//         .attr("y",height-2*padding)
//         .text("肿瘤ID");
//     svg.append("g")
//         .attr("class","axis axis--y")
//         .attr("transform","translate("+(2*padding)+",0)")
//         .call(yAxis)
//         .append("text")
//         .attr("text-anchor","middle")
//         .attr("font-size",10)
//         .attr("fill","black")
//         .attr("x",0)
//         .attr("y",3*padding)
//         .text(s);
// }