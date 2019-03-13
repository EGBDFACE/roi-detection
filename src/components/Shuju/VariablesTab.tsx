import * as React from 'react';

interface Props{
    chartShowingType: string
}
interface States{}

export default class VariablesTab extends React.Component<Props,States>{
    constructor(props:Props){
        super(props);
        this.renderColor = this.renderColor.bind(this);
        this.renderRange = this.renderRange.bind(this);
        this.renderShape = this.renderShape.bind(this);
    }
    renderColor(){
        const chartShowingType = this.props.chartShowingType;
        if((chartShowingType === 'barChart')||(chartShowingType === 'pie')||(chartShowingType === 'areaChart')||(chartShowingType === 'lineChart')||(chartShowingType === 'scatterSolid')||(chartShowingType === 'scatterHollow')){
            return(
                <p>颜色<input type='color'></input></p>
            )
        }else{
            return(
                <p>颜色</p>
            )
        }
    }
    renderRange(){
        const chartShowingType = this.props.chartShowingType;
        if((chartShowingType === 'areaChart')||(chartShowingType === 'lineChart')||(chartShowingType === 'scatterSolid')||(chartShowingType === 'scatterHollow')){
            return(
                <p>大小<input type='range' max='10' min='1'></input></p>
            )
        }else{
            return(
                <p>大小</p>
            )
        }
    }
    renderShape(){
        const chartShowingType = this.props.chartShowingType;
        if((chartShowingType === 'areaChart')||(chartShowingType === 'lineChart')||(chartShowingType === 'scatterSolid')||(chartShowingType === 'scatterHollow')){
            return(
                <li>
                  <p>形状</p>
                  <div className='reac'></div>
                  <div className='ellipse'></div>
                  <div className='circle'></div>
                </li>
            )
        }else{
            return(
                <li>
                  <p>形状</p>
                </li>
            )
        }

    }
    render(){
        return(
            <ul>
                <li>{this.renderColor()}</li>
                <li>{this.renderRange()}</li>
                {this.renderShape()}
            </ul>
        )
    }
}