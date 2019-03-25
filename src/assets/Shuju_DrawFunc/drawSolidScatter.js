import * as d3 from 'd3';
import { dataChartGet } from '../Shuju_data/dataFunc';
import store from '../../store/store';
import * as actions from '../../actions/action';

export default function drawSolidScatter(selectedVariables,color,shape,size){
    var dataArray = dataChartGet(...selectedVariables);
    var width = 500, height = 500, padding = 20;
    var svg = d3.select('#chart')
        .append("svg")
        .attr("id","solid")
        .attr("width",width)
        .attr("height",height)

    var xAxisWidth = Math.max(...dataArray.map(value=>value[selectedVariables[0]]));
    var yAxisWidth = Math.max(...dataArray.map(value=>value[selectedVariables[1]]));

    var xScale = d3.scaleLinear()
        .domain([0,1.1*xAxisWidth])
        .range([2*padding,width-padding*2]);
    
    var yScale = d3.scaleLinear()
        .domain([0,1.1*yAxisWidth])
        .range([height-padding,padding]);

    if(shape == "circle"){
        var circle =svg.append("g")
            .attr("id","svgcircles")
            .attr("clip-path","url(#myclip)")
            .selectAll("circle")
            .data(dataArray)
            .enter()
            .append("circle")
            .attr("fill",color)
            .attr("cx",function(d){
             return xScale(d[selectedVariables[0]]);
            })
            .attr("cy",function(d){
             return yScale(d[selectedVariables[1]]);
            })
            .attr("r",size)
            .on('mouseover',function(d){
              d3.select(this).attr('fill','black');
              var xPosition = parseFloat(d3.select(this).attr('cx'));
              var yPosition = parseFloat(d3.select(this).attr('cy'));
              let displayInfo = selectedVariables.map((value)=>{
                  return{
                      label: value,
                      data: d[value]
                  }
              })
              store.dispatch(actions.tooltipInfoAdd(displayInfo,xPosition,yPosition));
            })
            .on('mouseout',function(){
                d3.select(this).attr('fill',color);
                store.dispatch(actions.tooltipInfoClear());
            })
    }else if(shape == "rect"){
            var g = svg.append("g")
            .attr("id","svgrects")
            .attr("clip-path","url(#myclip)")
            .selectAll("rect")
            .data(dataArray)
            .enter()
            .append("rect")
            .attr("x",function(d){
              return xScale(d[selectedVariables[0]]) - size/2;
            })
            .attr("y",function(d){
              return yScale(d[selectedVariables[1]]) - size/2;
            })
            .attr("width",size)
            .attr("height",size)
            .attr("fill",color)
            .on('mouseover',function(d){
              d3.select(this).attr('fill','black');
              var xPosition = parseFloat(d3.select(this).attr('x'));
              var yPosition = parseFloat(d3.select(this).attr('y'));
              let displayInfo = selectedVariables.map((value)=>{
                  return{
                      label: value,
                      data: d[value]
                  }
              })
              store.dispatch(actions.tooltipInfoAdd(displayInfo,xPosition,yPosition));
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
            .attr("cx",function(d){
              return xScale(d[selectedVariables[0]]);
            })
            .attr("cy",function(d){
              return yScale(d[selectedVariables[1]]);
            })
            .attr("rx",size)
            .attr("ry",size/2)
            .attr("fill",color)
            .on('mouseover',function(d){
              d3.select(this).attr('fill','black');
              var xPosition = parseFloat(d3.select(this).attr('cx'));
              var yPosition = parseFloat(d3.select(this).attr('cy'));
              let displayInfo = selectedVariables.map((value)=>{
                  return{
                      label: value,
                      data: d[value]
                  }
              })
              store.dispatch(actions.tooltipInfoAdd(displayInfo,xPosition,yPosition));
            })
            .on('mouseout',function(){
                d3.select(this).attr('fill',color);
                store.dispatch(actions.tooltipInfoClear());
            })
        }

    var xAxis = d3.axisBottom(xScale).tickSize(0,0,0);
    var yAxis = d3.axisLeft(yScale).tickSize(0,0,0);
    function make_x_axis(){
        return d3.axisBottom(xScale);
      }
    function make_y_axis(){
        return d3.axisLeft(yScale);
    }
    svg.append("g")
      .attr("calss","grid grid--x")
      .attr("stroke","lightgray")
      .attr("stroke-opacity","0.1")
      .attr("shape-rendering","crispEdges")
      .call(make_x_axis()
        .tickSize(height-2*padding,0,0)
        .tickFormat("")
      )
      .attr("transform","translate(0,"+padding+")");
    svg.append("g")
        .attr("class","grid grid--y")
        .attr("stroke","lightgray")
        .attr("stroke-opacity","0.1")
        .attr("shape-rendering","crispEdges")
        .call(make_y_axis()
        .tickSize(-width+4*padding,0,0)
        .tickFormat("")
        )
        .attr("transform","translate("+(2*padding)+",0)");
    svg.append("g")
        .attr("class","axis axis--x")
        .attr("transform","translate(0,"+(height-padding)+")")
        .call(xAxis)
        .append("text")
        .attr("fill","black")
        .attr("text-anchor","end")
        .attr("font-size",10)
        .attr("x",width)
        .attr("y",0)
        .text(selectedVariables[0]);
    
    svg.append("g")
        .attr("class","axis axis--y")
        .attr("transform","translate("+(2*padding)+",0)")
        .call(yAxis)
        .append("text")
        .attr("fill","black")
        .attr("text-anchor","middle")
        .attr("font-size",10)
        .attr("x",0)
        .attr("y",padding)
        .text(selectedVariables[1]);
  
    svg.selectAll("text")
        .attr("fill","black");

    svg.append("defs").append("clipPath")
        .attr("id","myclip")
        .append("rect")
        .attr("x","40")
        .attr("y","20")
        .attr("width","420")
        .attr("height","460");

    var brush = d3.brush().on("end",brushended),
        idleTimeout,
        idleDelay = 350;
    svg.append("g")
        .attr("id","brush")
        .call(brush);
    d3.select(".overlay").attr("pointer-events","none");
    d3.select("svg")
        .on("mousedown",function(){
            d3.select(".overlay").attr("pointer-events","all");
        });
        
    function brushended(){
      var s = d3.event.selection;
      if(!s){
        if(!idleTimeout){
          return idleTimeout = setTimeout(idled,idleDelay);
        }
        xScale.domain([0,1.1*xAxisWidth]);
        yScale.domain([0,1.1*yAxisWidth]);
      }else{
        xScale.domain([s[0][0],s[1][0]].map(xScale.invert,xScale));
        yScale.domain([s[1][1],s[0][1]].map(yScale.invert,yScale));
        svg.select("#brush").call(brush.move,null);
      }
      d3.select(".overlay").attr("pointer-events","none");
      zoom();
    }
    function idled(){
      idleTimeout = null;
    }
    function zoom(){
      var t = svg.transition().duration(750);
      svg.select(".axis--x").transition(t).call(xAxis);
      svg.select(".axis--y").transition(t).call(yAxis);
      svg.select(".grid--x").transition(t).call(make_x_axis()
      .tickSize(height-2*padding,0,0)
      .tickFormat(""));
      svg.select(".grid--y").transition(t).call(make_y_axis()
      .tickSize(-width+4*padding,0,0)
      .tickFormat(""));
      if(shape == "circle"){
        d3.select("#svgcircles").selectAll("circle").transition(t)
          .attr("cx",function(d){return xScale(d[selectedVariables[0]]);})
          .attr("cy",function(d){return yScale(d[selectedVariables[1]]);});
      }else if(shape == "rect"){
        d3.select("#svgrects").selectAll("rect").transition(t)
          .attr("x",function(d){
            return xScale(d[selectedVariables[0]]) - size/2;
          })
          .attr("y",function(d){
            return yScale(d[selectedVariables[1]]) - size/2;
          });
      }else if(shape == "ellipse"){
        d3.select("#svgellipses").selectAll("ellipse").transition(t)
        .attr("cx",function(d){return xScale(d[selectedVariables[0]])})
        .attr("cy",function(d){return yScale(d[selectedVariables[1]])});
      }
    }
}