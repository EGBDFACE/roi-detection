import * as d3 from 'd3';
import { dataPccsGet } from '../Shuju_data/dataFunc';

export default function drawChordDiagram(selectedVariables){
    var width = 500, height = 500;

    var dataArray = dataPccsGet(...selectedVariables);

    var svg = d3.select("#chart")
        .append("svg")
        .attr("width",width)
        .attr("height",height)
        .attr("viewBox",[-width/2,-height/2,width,height])
        .attr("font-size",10)
        .attr("font-family","sans-serif");
        
    var pccs = new Array();
    for(var i =0;i<dataArray.length;i++){
        pccs[i] = new Array();
        for (var j = 0;j<dataArray.length;j++){
            // console.log(temp[i]);
            // console.log(temp[j]);
            pccs[i][j] = calculate(dataArray[i],dataArray[j]);
        }
    }

    function groupTicks(d,step){
        var k = (d.endAngle - d.startAngle)/d.value;
        return d3.range(0,d.value,step).map(value=>{
            return {value:value,angle:value*k+d.startAngle};
        });
    }
    var outerRadius = Math.min(width,height)*0.5-30;
    var innerRadius = outerRadius - 20;
    var s = d3.formatSpecifier("f");
    s.precision = d3.precisionFixed(0.1);
    var f = d3.format(s);
    var chord = d3.chord()
        .padAngle(0.05)
        .sortSubgroups(d3.descending);
    
    var arc = d3.arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius);
    var ribbon = d3.ribbon()
        .radius(innerRadius);
    var color = d3.scaleOrdinal()
        .domain(d3.range(12))
        .range(d3.schemePaired);
    var chords = chord(pccs);

    var group = svg.append("g")
        .selectAll("g")
        .data(chords.groups)
        .enter()
        .append("g");
    group.append("path")
        .attr("fill",d=>color(d.index))
        .attr("stroke",d=>d3.rgb(color(d.index)).darker())
        .attr("d",arc);
    group.append("text")
        .each(function(d,i){
            d.angle = (d.startAngle + d.endAngle)/2;
            d.name = selectedVariables[i];
        })
        .attr("dy",".35em")
        .attr("transform",function(d){
            return "rotate("+(d.angle*180/Math.PI)+")"+
            "translate(-10,"+ -1*(outerRadius-15)+")"+
            (((d.angle>Math.PI*3/4)&&(d.angle<Math.PI*5/4))?"rotate(180)":"");
        })
        .text(d=>d.name);
    var groupTick = group.append("g")
        .selectAll("g")
        .data(d=>groupTicks(d,0.5))
        .enter()
        .append("g")
        .attr("transform",d=>`rotate(${d.angle*180/Math.PI-90})translate(${outerRadius},0)`);
    groupTick.append("line")
        .attr("stroke","#000")
        .attr("x2",6);
    groupTick.filter(d=>f(d.value)%0.5===0)
        .append("text")
        .attr("x",8)
        .attr("dy",".35em")
        .attr("transform",d=>d.angle>Math.PI?"rotate(180)translate(-16)":null)
        .attr("text-anchor",d=>d.angle>Math.PI?"end":null)
        .text(d=>f(d.value));

    svg.append("g")
        .attr("fill-opacity",0.67)
        .selectAll("path")
        .data(chords)
        .enter()
        .append("path")
        .attr("d",ribbon)
        .attr("fill",d=>color(d.target.index))
        .attr("stroke",d=>d3.rgb(color(d.target.index)).darker());
}

function average(m){
    var sum_m=0,ave_m=0;
    for(var i=0;i<m.length;i++){
        sum_m += m[i];
    }
    ave_m = sum_m/m.length;
    return ave_m;
}


function standard_deviation(m){
    var average_m = average(m);
    var sum=0;
    for(var i=0;i<m.length;i++){
        var x = Math.pow((m[i]-average_m),2);
        sum += x; 
    }
    var standard_deviation_m = Math.sqrt(sum);
    // console.log("standard_deviation_m");
    // console.log(standard_deviation_m);
    return standard_deviation_m;
}

function calculate(x,y){
    var ave_x = average(x);
    var ave_y = average(y);
    var sd_x = standard_deviation(x);
    var sd_y = standard_deviation(y);
    var numerator=0,denominator=0;
    for(var i=0;i<x.length;i++){
        numerator += (x[i]-ave_x)*(y[i]-ave_y);
    }
    denominator = sd_x*sd_y;
    return Math.abs(numerator/denominator);
}