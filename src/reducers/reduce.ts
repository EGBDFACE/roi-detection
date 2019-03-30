import { Shuju,EnthusiasmAction,VariableState, selectedVariableDelete, VariablesTab, tooltipInfoAdd } from '../actions/action';
import { StoreState, enthusiasm,variable_status, shuju_variable, chartToDisplay, tooltipInfo, displayUnitInfo } from '../store/store';
import drawPieChart from '../assets/Shuju_DrawFunc/pieChart.js';
import drawBarChart from '../assets/Shuju_DrawFunc/drawBarChart.js';
import drawAreaChart from '../assets/Shuju_DrawFunc/drawAreaChart';
import drawLineChart from '../assets/Shuju_DrawFunc/drawLineChart';
import drawSolidScatter from '../assets/Shuju_DrawFunc/drawSolidScatter';
import drawSolidHollow from '../assets/Shuju_DrawFunc/drawSolidHollow';
import drawTidyTree from '../assets/Shuju_DrawFunc/drawTidyTree';
import drawChordDiagram from '../assets/Shuju_DrawFunc/drawChordDiagram';
import drawIcicle from '../assets/Shuju_DrawFunc/drawIcicle';
import drawSunburst from '../assets/Shuju_DrawFunc/drawSunburst';
import Tooltip from '../components/Shuju/Tooltip';


const Reducer = (state:StoreState,action:any) => {
    return{
        enthusiasm: enthusiasm(state.enthusiasm,action),
        shuju_variables: variables(state.shuju_variables,action,state.chartStyle.color,state.chartStyle.shape,state.chartStyle.size),
        chartStyle: chartStyle(state,action),
        tooltip: tooltip(state.tooltip,action)
    }
}
function tooltip(state:tooltipInfo,action:any){
    switch(action.type){
        case 'TOOLTIP_INFO_ADD':
            // let tempArray:tooltipInfo[] = state;
            // tempArray.push({label: action.label,data: action.data,left:action.left,top:action.top});
            // // console.log(tempArray);
            // return tempArray;
            return {
                // ...state,
                top: action.top,
                left: action.left,
                unitInfo: action.unitInfo.map((value:displayUnitInfo)=>value)
            }
        case 'PIE_TOOLTIP_INFO_ADD':
            // let pieTempArray:tooltipInfo[] = state;
            // pieTempArray.push({label: action.label, data: action.data, left: action.left, top: action.top,proportion:action.proportion});
            // // console.log(pieTempArray);
            // return pieTempArray;
            // return [
            //     ...state,
            //     {label: action.label, data: action.data, left: action.left, top: action.top, proportion: action.proportion}
            // ]
            return {
                // ...state,
                top: action.top,
                left: action.left,
                unitInfo: action.unitInfo.map((value:displayUnitInfo)=>value),
                proportion: action.proportion
            }
        case 'TOOLTIP_INFO_CLEAR':
            // setTimeout('console.log(dsf)',4000);
            return {
                unitInfo:[],
                top: 0,
                left: 0,
                proportion: 0
            };
        default: return state;
    }
}
function chartStyle(state:StoreState,action:VariablesTab){
    if((action.type === 'CHART_COLOR_CHANGE')||(action.type ==='CHART_SHAPE_CHANGE')||(action.type === 'CHART_SIZE_CHANGE')){
        if(document.getElementsByTagName('svg').length != 0){
            document.getElementById('chart').removeChild(document.getElementsByTagName('svg')[0]);
        }
        // console.log(action);
        // console.log(state);
        // console.log((action.size ===state.chartStyle.size)?state.chartStyle.size:action.size);
        // console.log(((action.shape === state.chartStyle.shape)||(!action.shape))?state.chartStyle.shape:action.shape);
        switch(state.shuju_variables.chartShowingType){
            case 'barChart':
                // console.log(action.color);
                // console.log(state.chartStyle.color);
                drawBarChart(state.shuju_variables.variables.filter(d=>{if(d.display){return d}}).map(d=>d.name),((action.color === state.chartStyle.color)||(!action.color))?state.chartStyle.color:action.color);
                break;
            case 'areaChart':
                // console.log((!action.shape)?action.shape:'');
                // console.log(action.shape);
                // console.log(state.chartStyle.shape);
                drawAreaChart(state.shuju_variables.variables.filter(d=>{if(d.display){return d}}).map(d=>d.name),((action.color === state.chartStyle.color)||(!action.color))?state.chartStyle.color:action.color,((action.shape === state.chartStyle.shape)||(!action.shape))?state.chartStyle.shape:action.shape,((action.size ===state.chartStyle.size)||(!action.size))?state.chartStyle.size:action.size);
                break;
            case 'lineChart':
                drawLineChart(state.shuju_variables.variables.filter(d=>{if(d.display){return d}}).map(d=>d.name),((action.color === state.chartStyle.color)||(!action.color))?state.chartStyle.color:action.color,((action.shape === state.chartStyle.shape)||(!action.shape))?state.chartStyle.shape:action.shape,((action.size ===state.chartStyle.size)||(!action.size))?state.chartStyle.size:action.size);
                break;
            case 'scatterSolid':
                drawSolidScatter(state.shuju_variables.variables.filter(d=>{if(d.display){return d}}).map(d=>d.name),((action.color === state.chartStyle.color)||(!action.color))?state.chartStyle.color:action.color,((action.shape === state.chartStyle.shape)||(!action.shape))?state.chartStyle.shape:action.shape,((action.size ===state.chartStyle.size)||(!action.size))?state.chartStyle.size:action.size);
                break;
            case 'scatterHollow':
                drawSolidHollow(state.shuju_variables.variables.filter(d=>{if(d.display){return d}}).map(d=>d.name),((action.color === state.chartStyle.color)||(!action.color))?state.chartStyle.color:action.color,((action.shape === state.chartStyle.shape)||(!action.shape))?state.chartStyle.shape:action.shape,((action.size ===state.chartStyle.size)||(!action.size))?state.chartStyle.size:action.size);
                break;
        }
    }
    switch(action.type){
        case 'CHART_COLOR_CHANGE':
            return{
                shape: state.chartStyle.shape,
                color: action.color,
                size: state.chartStyle.size
            }
        case 'CHART_SHAPE_CHANGE':
            return{
                color: state.chartStyle.color,
                shape: action.shape,
                size: state.chartStyle.size
            }
        case 'CHART_SIZE_CHANGE':
            return{
                color: state.chartStyle.color,
                size: action.size,
                shape: state.chartStyle.shape
            }
        default: return {
            color: state.chartStyle.color,
            shape: state.chartStyle.shape,
            size: state.chartStyle.size
        }
    }
}
function enthusiasm (state:enthusiasm,action:EnthusiasmAction){
    switch(action.type){
        case 'INCREMENT_ENTHUSIASM':
            console.log('run increment');
            console.log(state.enthusiasmLevel);
            return {
                ...state,
                enthusiasmLevel:state.enthusiasmLevel+1
            };
        case 'DECREMENT_ENTHUSIASM':
            console.log('run decrement');
            return {
                ...state,
                enthusiasmLevel:state.enthusiasmLevel-1
            };
        default: return state;
    }
}
function variables(state:shuju_variable,action:Shuju,color:string,shape:string,size:number):shuju_variable{
    // console.log(state);
    switch(action.type){
        case 'VARIABLE_STATE_CHANGE':
            return{
                ...state,
                variables: stateChange(state.variables,action.key),
                selectedVariablesNumber: state.selectedVariablesNumber+1,
                chartList: chartStateAdd(state,action.key),
                chartShowingType: ''
                // variables: state.variables.map((value,index)=>{
                //     if(index == action.key){
                //         return {
                //             ...value,
                //             // name: value.name,
                //             state: !value.state,
                //             display: !value.display,
                //             // category: value.category,
                //             // display_hover: value.display_hover
                //         }
                //     }else{return value}
                // })
            }
        case 'VARIABLE_DISPLAY_MOUSE_HOVER':
            return{
                ...state,
                // variables: displayHover(state,action.key)
                variables: state.variables.map((value,index)=>{
                    if(index == action.key){
                        return{
                            ...value,
                            display_hover: !value.display_hover
                        }
                    }else{return value}
                })
            }
        case 'VARIABLE_DISPLAY_DELETE':
            return{
                ...state,
                // variables: state.variables.map((value,index)=>{
                //     if(index == action.key){
                //         return{
                //             ...value,
                //             display: !value.display,
                //             state: !value.state,
                //             display_hover: false
                //         }
                //     }else{return value}
                // }),
                variables: displayDelete(state,action.key),
                selectedVariablesNumber: state.selectedVariablesNumber-1,
                chartList: chartStateDelete(state,action.key),
                chartShowingType: ''
            }
        case 'CHART_DISPLAY':
            if(document.getElementsByTagName('svg').length != 0){
                document.getElementById('chart').removeChild(document.getElementsByTagName('svg')[0]);
            }
            switch(action.key){
                case 0:
                    // drawBarChart(state.variables.map(d=>{if(d.display){ return d.name;}}));
                    drawBarChart(state.variables.filter(d=>{if(d.display){return d}}).map(d=>d.name),color);
                    return{
                        ...state,
                        chartShowingType: 'barChart'
                    }
                case 1:
                    drawPieChart(state.variables.filter(d=>{if(d.display){return d}}).map(d=>d.name));
                    return{
                        ...state,
                        chartShowingType: 'pie'
                    }
                case 2: 
                    // drawAreaChart(state.variables.filter(d=>{if(d.display){return d}}).map(d=>d.name),color,'circle',1);
                    drawAreaChart(state.variables.filter(d=>{if(d.display){return d}}).map(d=>d.name),color,shape,size);
                    return{
                        ...state,
                        chartShowingType: 'areaChart'
                    }
                case 3:
                    // drawLineChart(state.variables.filter(d=>{if(d.display){return d}}).map(d=>d.name),color,'circle',1);
                    drawLineChart(state.variables.filter(d=>{if(d.display){return d}}).map(d=>d.name),color,shape,size);
                    return{
                        ...state,
                        chartShowingType: 'lineChart'
                    }
                case 4: 
                    // drawSolidScatter(state.variables.filter(d=>{if(d.display){return d}}).map(d=>d.name),color,'circle',1);
                    drawSolidScatter(state.variables.filter(d=>{if(d.display){return d}}).map(d=>d.name),color,shape,size);
                    return{
                        ...state,
                        chartShowingType: 'scatterSolid'
                    }
                case 5: 
                    // drawSolidHollow(state.variables.filter(d=>{if(d.display){return d}}).map(d=>d.name),color,'circle',1);
                    drawSolidHollow(state.variables.filter(d=>{if(d.display){return d}}).map(d=>d.name),color,shape,size);
                    return{
                        ...state,
                        chartShowingType: 'scatterHollow'
                    }
                case 6:
                    drawTidyTree(state.variables.filter(d=>{if(d.display){return d}}).map(d=>d.name));
                    return{
                        ...state,
                        chartShowingType: 'tidyTree'
                    }
                case 7:
                    drawChordDiagram(state.variables.filter(d=>{if(d.display){return d}}).map(d=>d.name));
                    return{
                        ...state,
                        chartShowingType: 'chordDiagram'
                    }
                case 8:
                    drawIcicle(state.variables.filter(d=>{if(d.display){return d}}).map(d=>d.name));
                    return{
                        ...state,
                        chartShowingType: 'icicle'
                    }
                case 9:
                    drawSunburst(state.variables.filter(d=>{if(d.display){return d}}).map(d=>d.name));
                    return{
                        ...state,
                        chartShowingType: 'sunburst'
                    }
            }
        default: return state
    }
}
function stateChange(state:variable_status[],index:number):variable_status[]{
    // console.log(defaultState.shuju_variables.variables);
    let newState: variable_status[] = [];
    if((index<2)||((index>2)&&(index<10))){
        for(let i=0;i<10;i++){
            newState[i] = state[i];
        }
        newState[2].state = false;
        newState[index].state = false;
        newState[index].display = true;
        for(let i=10;i<state.length;i++){
            newState[i] = {...state[i],state:false};
        }
    }else if((index == 2)||(index == 10)||((index>11)&&(index<22))){
        for(let i=0;i<state.length;i++){
            if((i<10)&&(i!=2)){
                newState[i] = {...state[i],state: false}
            }else{
                newState[i] = state[i];
            }
        }
        newState[index].state = false;
        newState[index].display = true;
    }
    return newState;
}
function displayDelete(state:shuju_variable,key:number):variable_status[]{
    let newState : variable_status[] = [];
    if(state.selectedVariablesNumber == 1){
        for(let i=0;i<state.variables.length;i++){
            newState[i] = {...state.variables[i],state:true,display:false,display_hover:false};
        }
        newState[11].state = false;
        newState[22].state = false;
        return newState;
    }else{
        return state.variables.map((value,index)=>{
            if(index == key){
                return {
                    ...value,
                    display: false,
                    state: true,
                    display_hover: false
                }
            }else{return value}
        })
    }
}
function chartStateAdd(state:shuju_variable,key:number):chartToDisplay[]{
    if(document.getElementsByTagName('svg').length != 0){
        document.getElementById('chart').removeChild(document.getElementsByTagName('svg')[0]);
    }
    let newChartList: chartToDisplay[] = [];
    for(let i=0;i<state.chartList.length;i++){
        newChartList[i] = {...state.chartList[i],state:false};
    }
    if(state.selectedVariablesNumber == 0){
        // console.log(newChartList);
        if((key<2)||((key>2)&&(key<11))||(key == 21)){
            newChartList[1] = {...state.chartList[1],state:true};
        }
    }else if(state.selectedVariablesNumber > 0){
        if((key<2)||((key>2)&&(key<10))){
            newChartList[1].state = false;
            newChartList[6].state = true;
            newChartList[8].state = true;
            newChartList[9].state = true;
        }else{
            if(state.selectedVariablesNumber == 1){
                if((key==2)||(state.variables[2].display)){
                    newChartList[0].state = true;
                    newChartList[2].state = true;
                    newChartList[3].state = true;
                }else{
                    newChartList[4].state = true;
                    newChartList[5].state = true;
                }
            }
            newChartList[7].state = true;
        }
    }
    return newChartList;
}
function chartStateDelete(state:shuju_variable,key:number):chartToDisplay[]{
    if(document.getElementsByTagName('svg').length != 0){
        document.getElementById('chart').removeChild(document.getElementsByTagName('svg')[0]);
    }
    let newChartList: chartToDisplay[] = [];
    for(let i = 0;i<state.chartList.length;i++){
        newChartList[i] = {...state.chartList[i],state:false};
    }
    // if((key<2)||((key>2)&&(key<10))){
    //     if(state.selectedVariablesNumber == 2){
    //         newChartList[1].state = true;
    //     }else if(state.selectedVariablesNumber > 2){
    //         newChartList[6].state = true;
    //         newChartList[8].state = true;
    //         newChartList[9].state = true;
    //     }
    // }else if((state.selectedVariablesNumber == 2)&&(((state.variables[10].display)&&(key != 10))||(state.variables[21].display)&&(key != 21))){
    //     newChartList[1].state = true;
    // }else{
    //     if()
    // }
    if(state.selectedVariablesNumber == 2){
        if((key<2)||((key>2)&&(key<10))||((state.variables[10].display)&&(key != 10))||((state.variables[21].display)&&(key != 21))){
            newChartList[1].state = true;
        }
    }else if(state.selectedVariablesNumber == 3){
        if((key<2)||((key>2)&&(key<10))){
            newChartList[6].state = true;
            newChartList[8].state = true;
            newChartList[9].state = true;
        }else{
            if((state.variables[2].display)&&(key != 2)){
                newChartList[0].state = true;
                newChartList[2].state = true;
                newChartList[3].state = true;
            }else{
                newChartList[4].state = true;
                newChartList[5].state = true;
            }
            newChartList[7].state = true;
        }
    }else if(state.selectedVariablesNumber > 3){
        if((key<2)||((key>2)&&(key<10))){
            newChartList[6].state = true;
            newChartList[8].state = true;
            newChartList[9].state = true;
        }else{
            newChartList[7].state = true;
        }
    }
    return newChartList;
}
// function displayHover(state:shuju_variable,key:number):variable_status[]{
//     if(state.selectedVariablesNumber == 0){
//         console.log('return init in hover');
//         return defaultState.shuju_variables.variables;
//     }else{
//         return state.variables.map((value,index)=>{
//             console.log('hover');
//             if(index == key){
//                 return{
//                     ...value,
//                     display_hover: !value.display_hover
//                 }
//             }else{return value}
//         })
//     }
// }
export default Reducer;