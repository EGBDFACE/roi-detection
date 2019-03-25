import * as d3 from 'd3';
import store from '../../store/store';
import { dataChartGet,dataSet } from '../Shuju_data/dataFunc';
import * as actions from '../../actions/action';

export default function drawPieChart(selectedVariable){
    // let variant = '';
    // selectedVariable.map(d=>{
    //     if(d){
    //         variant = d;
    //     }
    // });
    // var pieData = dataChartGet(variant);
    // var pieData = dataChartGet(selectedVariable.filter(d=>d)[0])
    var pieData = dataChartGet(selectedVariable);
    // console.log(pieData);
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
    var currentColor = '';
    arcs.append('path')
        .attr('fill',function(d,i){
            return color(i);
        })
        .attr('d',arc)
        .on('mouseover',function(d){
            currentColor = d3.select(this).attr('fill');
            d3.select(this)
              .attr('fill','black');
            var e = event || window.event;
            store.dispatch(actions.pieTooltipInfoAdd(selectedVariable[0],d.data['key'],e.clientX-1200,e.clientY-600,toPercent(d.value/dataSet.length)));
        })
        .on('mouseout',function(){
            d3.select(this).attr('fill',currentColor);
            // setTimeout("store.dispatch(actions.tooltipInfoClear())",1000);
            store.dispatch(actions.tooltipInfoClear());
        })
}
function toPercent(point){
    var str = Number(point*100).toFixed(2);
    str += '%';
    return str;
}