import * as d3 from 'd3';
import { dataSet } from '../Shuju_data/dataFunc';

export default function drawIcicle(selectedVariables){
    var width = 500, height = 500 , entries = [];
    for(var i=0;i<selectedVariables.length;i++){
        if(i == 0){
            entries[0] = d3.nest().key(function(d){return d[selectedVariables[0]]});
        }else if(i == selectedVariables.length-1){
            entries[i] = entries[i-1].key(function(d){return d[selectedVariables[i]]})
                .rollup(function(leaves){return leaves.length})
                .entries(dataSet);
        }else {
            todo(i);
        }
        function todo(j){
            entries[j] = entries[j-1].key(function(d){return d[selectedVariables[j]]});
        }
    }
    var dataObj = new Object();
    dataObj.key = "patient";
    dataObj.values = new Array();
    dataObj.values = entries[i-1];
    var json = JSON.parse(JSON.stringify(dataObj).replace(/key/g,"name"));
    var json2 = JSON.parse(JSON.stringify(json).replace(/values/g,"children"));
    var partition = data=> 
        d3.partition()
        .size([height,width])
        .padding(1)
        (d3.hierarchy(data)
        .sum(d=>d.value)
        );
    var color = d3.scaleOrdinal().range(d3.quantize(d3.interpolateRainbow,dataObj.values.length+1));
    var format = d3.format(',d');
    var root = partition(json2);
    var svg = d3.select("#chart")
        .append("svg")
        .attr("width",width)
        .attr("height",height)
        .attr("font-size","10")
        .attr("font-family","sans-serif");
    var cell = svg.selectAll("g")
        .data(root.descendants())
        .enter().append("g")
        .attr("transform",d=>`translate(${d.y0},${d.x0})`);
    cell.append("rect")
        .attr("width",d => d.y1-d.y0)
        .attr("height",d => d.x1-d.x0)
        .attr("fill-opacity",0.6)
        .attr("fill",d => {
            if(!d.depth)return "#ccc";
            while(d.depth>1)d=d.parent;
            return color(d.data.name);
        });
    var text = cell.filter(d =>(d.x1-d.x0)>16).append("text")
        .attr("x",4)
        .attr("y",13);
    text.append("tspan")
        .text(function(d){
            // console.log(d);
            // console.log(d.data)
            // console.log(d.data.name)
            return d.data.name;
        });
    text.append("tspan")
        .attr("fill-opacity",0.7)
        .text(d=>`${format(d.value)}`);
    cell.append("title")
        .text(d=>`${d.ancestors().map(d=>d.data.name).reverse().join("/")}\n${format(d.value)}`);
}