import * as d3 from 'd3';
import { dataChartGet } from '../Shuju_data/dataFunc';
import { dataSet } from '../Shuju_data/dataFunc';

export default function drawTidyTree(selectedVariables){
    var entries = [];
    for(var i = 0;i<selectedVariables.length;i++){
        if(i == 0){
            entries[0] = d3.nest().key(d=>d[selectedVariables[0]]);
        }else if(i == selectedVariables.length-1){
            entries[i] = entries[i-1].key(function(d){return d[selectedVariables[i]]})
                    .rollup(function(leaves){return leaves.length})
                    .entries(dataSet);
        }else{
            todo(i);
        }
        function todo(j){
            entries[j] = entries[j-1].key(function(d){return d[selectedVariables[j]]});
        }
    }
    var tempObj = new Object();
    tempObj.key = 'parient';
    tempObj.values = new Array();
    tempObj.values = entries[i-1];
    var json = JSON.parse(JSON.stringify(tempObj).replace(/key/g,"name"));
    var json2 = JSON.parse(JSON.stringify(json).replace(/values/g,"children"));
    var width = 500;
    function tree(data){
        var root = d3.hierarchy(data);
        root.dx = 10-selectedVariables.length; //第一个元素的初始位置
        root.dy = width/(root.height+1);
        // console.log(root);
        return d3.tree().nodeSize([root.dx,root.dy])(root);
    }
    const root = tree(json2);
    let x0 = Infinity;
    let x1 = -x0;
    root.each(d=>{
        if(d.x>x1)x1=d.x;
        if(d.x<x0)x0=d.x;
    })
    var svg = d3.select("#chart")
        .append("svg")
        .attr("width",width)
        .attr("height",500)
        .attr("overflow","visible");
    var g = svg.append("g")
        .attr("font-family","sans-serif")
        .attr("font-size",10)
        .attr("transform",`translate(${root.dy/3},${root.dx-x0})`);
    var link = g.append("g")
        .attr("fill","none")
        .attr("stroke","#555")
        .attr("stroke-opacity",0.4)
        .attr("stroke-width",1.5)
        .selectAll("path")
        .data(root.links())
        .enter().append("path")
        .attr("d",d3.linkHorizontal()
            .x(d=>d.y)
            .y(d=>d.x));
    const node = g.append("g")
        .attr("stroken-linejoin","round")
        .attr("stroke-width",3)
        .selectAll("g")
        .data(root.descendants().reverse())
        .enter().append("g")
        .attr("transform",d=>`translate(${d.y},${d.x})`);
    node.append("circle")
        .attr("fill",d => d.children?"#555":"#999")
        .attr("r",2.5);
    node.append("text")
        .attr("dy", "0.31em")
        .attr("x", d => d.children? -6 : 6)
        .attr("text-anchor", d => d.children? "end" : "start")
        .text(function(d){
            // console.log(d);
            return d.data.name;
        })
        .clone(true).lower()
        .attr("stroke", "white");
}