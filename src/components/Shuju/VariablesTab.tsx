import * as React from 'react';
import './css_VariablesTab.scss';

interface Props{
    chartShowingType: string,
    colorChange: (color:string) => void,
    shapeChange: (shape:string) => void,
    sizeChange: (size:number) => void
}
interface States{}

export default class VariablesTab extends React.Component<Props,States>{
    constructor(props:Props){
        super(props);
        // this.renderColor = this.renderColor.bind(this);
        // this.renderRange = this.renderRange.bind(this);
        // this.renderShape = this.renderShape.bind(this);
    }
    // renderColor(){
    //     const chartShowingType = this.props.chartShowingType;
    //     if((chartShowingType === 'barChart')||(chartShowingType === 'pie')||(chartShowingType === 'areaChart')||(chartShowingType === 'lineChart')||(chartShowingType === 'scatterSolid')||(chartShowingType === 'scatterHollow')){
    //         return(
    //             <p>颜色<input type='color'></input></p>
    //         )
    //     }else{
    //         return(
    //             <p>颜色</p>
    //         )
    //     }
    // }
    // renderRange(){
    //     const chartShowingType = this.props.chartShowingType;
    //     if((chartShowingType === 'areaChart')||(chartShowingType === 'lineChart')||(chartShowingType === 'scatterSolid')||(chartShowingType === 'scatterHollow')){
    //         return(
    //             <p>大小<input type='range' max='10' min='1'></input></p>
    //         )
    //     }else{
    //         return(
    //             null
    //         )
    //     }
    // }
    // renderShape(){
    //     const chartShowingType = this.props.chartShowingType;
    //     if((chartShowingType === 'areaChart')||(chartShowingType === 'lineChart')||(chartShowingType === 'scatterSolid')||(chartShowingType === 'scatterHollow')){
    //         return(
    //             <li>
    //               <p>形状</p>
    //               <div className='reac'></div>
    //               <div className='ellipse'></div>
    //               <div className='circle'></div>
    //             </li>
    //         )
    //     }else{
    //         return(
    //             <li>
    //               <p>形状</p>
    //             </li>
    //         )
    //     }

    // }
    render(){
        // const chartShowingType = this.props.chartShowingType;
        const { chartShowingType,colorChange,shapeChange,sizeChange } = this.props;
        if(chartShowingType === 'barChart'){
            return(
                <ul>
                    <li><p>颜色<input className='inputColor' type='color' onChange={(e)=>colorChange(e.target.value)}></input></p></li>
                </ul>
            )
        }else if((chartShowingType === 'areaChart')||(chartShowingType === 'lineChart')||(chartShowingType === 'scatterSolid')||(chartShowingType === 'scatterHollow')){
            return(
                <ul>
                    <li><p>颜色<input className='inputColor' type='color' onChange={(e)=>colorChange(e.target.value)}></input></p></li>
                    <li><p>大小<input className='inputSize' type='range' max='10' min='1' onChange={(e)=>sizeChange(+e.target.value)}></input></p></li>
                    <li>
                        <p>形状</p>
                        <i className='tabRect' onClick={()=>shapeChange('rect')}></i>
                        <i className='tabEllipse' onClick={()=>shapeChange('ellipse')}></i>
                        <i className='tabCircle' onClick={()=>shapeChange('circle')}></i>
                    </li>
                </ul>
            )
        }else{
            return null
        }
        // return(
        //     <ul>
        //         <li>{this.renderColor()}</li>
        //         <li>{this.renderRange()}</li>
        //         {this.renderShape()}
        //     </ul>
        // )
    }
}