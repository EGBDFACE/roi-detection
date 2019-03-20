import * as React from 'react';
import { chartToDisplay } from '../../store/store';
import './css_subtype.scss';

interface Props{
    chartList: chartToDisplay[],
    chartShowingType: string,
    chartClick: (index:number) => void
}
interface States{}

export default class Subtype extends React.Component<Props,States>{
    constructor(props:Props){
        super(props);
        this.renderChartLabel = this.renderChartLabel.bind(this);
    }
    renderChartLabel(index:number){
        const disableStyle = {
            opacity: 0.15,
            cursor: 'not-allowed',
            color: 'black'
        };
        const chartObject = this.props.chartList[index];
        const chartShowingType = this.props.chartShowingType;
        const chartClick = this.props.chartClick;
        return(
            <th key={index} onClick={chartObject.state?()=>chartClick(index):null} style={chartObject.state?null:disableStyle} className={chartObject.state?((chartShowingType===chartObject.label)?`${chartObject.label}Display`:`${chartObject.label}Enable`):`${chartObject.label}Normal`}>
                <i></i>
                <p>{chartObject.name}</p>
            </th>
        )
        // switch(chartObject.name){
        //     case 'barChart':
        //         return(
        //             <td key={index} onClick={chartObject.state?()=>}></td>
        //         )
        // }
    }
    render(){
        // const {chartList} = this.props;
        console.log(this.props.chartList);
        return(
            <table>
                <tbody>
                    <tr>
                        {[0,1].map((value)=>this.renderChartLabel(value))}
                        {/* <th onClick={chartList[0].state?()=>}></th> */}
                    </tr>
                    <tr>
                        {[2,3].map((value)=>this.renderChartLabel(value))}
                    </tr>
                    <tr>
                        {[4,5].map((value)=>this.renderChartLabel(value))}
                    </tr>
                    <tr>
                        {[6,7].map((value)=>this.renderChartLabel(value))}
                    </tr>
                    <tr>
                        {[8,9].map((value)=>this.renderChartLabel(value))}
                    </tr>
                </tbody>
            </table>
        )
    }
}