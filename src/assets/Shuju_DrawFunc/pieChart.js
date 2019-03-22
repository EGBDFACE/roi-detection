import * as d3 from 'd3';
import store from '../../store/store';
import { dataChartGet } from '../Shuju_data/dataFunc';

export default function drawPieChart(selectedVariable){
    let variant = '';
    selectedVariable.map(d=>{
        if(d){
            variant = d;
        }
    });
    var pieData = dataChartGet(variant);
    console.log(pieData);
    var pie = d3.pie();
    const width = 300,height = 300,
        outerRadius = width/2,innerRadius = width/4;
    var color = d3.scaleOrdinal(d3.schemeCategory10);
    var arc = d3.arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius);
    var svg = d3.select('#chart')
        .append('svg')
        .attr('width',width)
        .attr('height',height);
    var arcs = svg.selectAll('g.arc')
        .data(pie.value(function(d){return d.value})(pieData))
        .enter()
        .append('g')
        .attr('class','src')
        .attr('transform','translate('+outerRadius+','+outerRadius+')');
    arcs.append('path')
        .attr('fill',function(d,i){
            return color(i);
        })
        .attr('d',arc);
}