import * as d3 from 'd3';
import { dataChartGet } from '../Shuju_data/dataFunc';
import store from '../../store/store';
import * as actions from '../../actions/action';

export default function drawLineChart(selectedVariables,color,shape,size){
    var yVariablesLabel = selectedVariables[1];
    var dataArray = dataChartGet('ID',yVariablesLabel);
    var width = 700,height = 500, padding = 20;
    var svg = d3.select("#chart")
        .append("svg")
        .attr("width",width)
        .attr("height",height)
        .call(zoom);

    var xScale = d3.scalePoint()
        .domain(dataArray.map(d=>d['ID']))
        .range([2*padding,width-2*padding]);

    var yScale = d3.scaleLinear()
        .domain([0,1.1*Math.max(...dataArray.map(value=>value[yVariablesLabel]))])
        .range([height-3*padding,3*padding]);

    var xAxis = d3.axisBottom(xScale)
        .tickSize(0)
        .tickPadding(6)
        .tickValues(xScale.domain().filter(function(d,i){return !(i%10)}));    
    
    var yAxis = d3.axisLeft(yScale).tickSize(0);
    
    function make_y_axis(){
        return d3.axisLeft(yScale);
      }
      
    svg.append("defs").append("clipPath")
      .attr("id","myclip")
      .append("rect")
      .attr("x","40")
      .attr("y","0")
      .attr("width","630")
      .attr("height","500");
    function zoom(svg){
        const extent = [[2*padding,3*padding],[width-2*padding,height-3*padding]];
        svg.call(d3.zoom()
        .scaleExtent([1,20])
        .translateExtent(extent)// availabel translate extent of svg elements
        .extent(extent) // the max left border of translate viewport  and the min right border of translate viewport
        .on("zoom",zoomed));
        function zoomed(){
            xScale.range([2*padding,width-2*padding].map(d => d3.event.transform.applyX(d)));
            d3.select(".axis--x").call(xAxis);
            d3.select("#pathline").attr("d",line.x(function(d){return xScale(d["ID"]);}));
            if(shape == "circle"){
                d3.select("#svgcircles").selectAll("circle").attr("cx",line.x());
            }else if(shape == "rect"){
                d3.select("#svgrects").selectAll("rect").attr("x",function(d){
                return xScale(d["ID"]) - size/2;
                });
            }else if(shape == "ellipse"){
                d3.select("#svgellipses").selectAll("ellipse").attr("cx",line.x());
            }
        }
    }

    svg.append("g")
        .attr("stroke","lightgray")
        .attr("stroke-opacity","0.1")
        .attr("shape-rendering","crispEdges")
        .call(make_y_axis()
        .tickSize(-width+4*padding,0,0)
        .tickFormat(""))
        .attr("transform","translate("+(2*padding)+",0)");
    svg.append("g")
        .attr("class","axis axis--x")
        .attr("clip-path","url(#myclip)")
        .attr("transform","translate(0,"+(height-3*padding)+")")
        .call(xAxis)
        .selectAll("text")
        .attr("transform","rotate(90)"+"translate("+(1.4*padding)+(-padding)+")")
    svg.append("text")
        .attr("fill","black")
        .attr("text-anchor","end")
        .attr("font-size",10)
        .attr("x",width)
        .attr("y",height-2*padding)
        .text("肿瘤ID");
    svg.append("g")
        .attr("class","axis axis--y")
        .attr("transform","translate("+(2*padding)+",0)")
        .call(yAxis)
        .append("text")
        .attr("text-anchor","middle")
        .attr("font-size",10)
        .attr("fill","black")
        .attr("x",0)
        .attr("y",3*padding)
        .text(yVariablesLabel);
    svg.selectAll("text")
        .attr("fill","black");
    var line = d3.line()
        .x(function(d){return xScale(d["ID"])})
        .y(function(d){return yScale(d[yVariablesLabel])});
    svg.append("path")
        .datum(dataArray)
        .attr("id","pathline")
        .attr("clip-path","url(#myclip)")
        .attr("stroke",color)
        .attr("fill","none")
        .attr("d",line);
    if(shape == "circle"){
        var g = svg.append("g")
        .attr("id","svgcircles")
        .attr("clip-path","url(#myclip)")
        .selectAll("circle")
        .data(dataArray)
        .enter()
        .append("circle")
        .attr("class","linecircle")
        .attr("cx",line.x())
        .attr("cy",line.y())
        .attr("r",size)
        .attr("fill",color)
        .on('mouseover',function(d){
            d3.select(this).attr('fill','black');
            var xPosition = parseFloat(d3.select(this).attr('cx'));
            var yPosition = parseFloat(d3.select(this).attr('cy'));
            var e = event || window.event;
            let displayInfo = selectedVariables.map((value)=>{
                return{
                    label: value,
                    data: d[value]
                }
            })
            // store.dispatch(actions.tooltipInfoAdd(displayInfo,xPosition,yPosition));
            store.dispatch(actions.tooltipInfoAdd(displayInfo,e.clientX,e.clientY));
        })
        .on('mouseout',function(){
            d3.select(this).attr('fill',color);
            store.dispatch(actions.tooltipInfoClear());
        })
    }else if(shape == "rect"){
        var x =line.x();
        var y = line.y();
        var g = svg.append("g")
        .attr("id","svgrects")
        .attr("clip-path","url(#myclip)")
        .selectAll("rect")
        .data(dataArray)
        .enter()
        .append("rect")
        .attr("x",function(d){
          return xScale(d["ID"]) - size/2;
        })
        .attr("y",function(d){
          return yScale(d[yVariablesLabel]) - size/2;
        })
        .attr("width",size)
        .attr("height",size)
        .attr("fill",color)
        .on('mouseover',function(d){
            d3.select(this).attr('fill','black');
            var xPosition = parseFloat(d3.select(this).attr('x'));
            var yPosition = parseFloat(d3.select(this).attr('y'));
            var e = event || window.event;
            let displayInfo = selectedVariables.map((value)=>{
                return{
                    label: value,
                    data: d[value]
                }
            })
            // store.dispatch(actions.tooltipInfoAdd(displayInfo,xPosition,yPosition));
            store.dispatch(actions.tooltipInfoAdd(displayInfo,e.clientX,e.clientY));
        })
        .on('mouseout',function(){
            d3.select(this).attr('fill',color);
            store.dispatch(actions.tooltipInfoClear());
        })
    }else if(shape == "ellipse"){
        var g = svg.append("g")
        .attr("id","svgellipses")
        .attr("clip-path","url(#myclip)")
        .selectAll("ellipse")
        .data(dataArray)
        .enter()
        .append("ellipse")
        .attr("cx",line.x())
        .attr("cy",line.y())
        .attr("rx",size)
        .attr("ry",size/2)
        .attr("fill",color)
        .on('mouseover',function(d){
            d3.select(this).attr('fill','black');
            var xPosition = parseFloat(d3.select(this).attr('cx'));
            var yPosition = parseFloat(d3.select(this).attr('cy'));
            var e = event || window.event;
            let displayInfo = selectedVariables.map((value)=>{
                return{
                    label: value,
                    data: d[value]
                }
            })
            // store.dispatch(actions.tooltipInfoAdd(displayInfo,xPosition,yPosition));
            store.dispatch(actions.tooltipInfoAdd(displayInfo,e.clientX,e.clientY));
        })
        .on('mouseout',function(){
            d3.select(this).attr('fill',color);
            store.dispatch(actions.tooltipInfoClear());
        })
    }
}