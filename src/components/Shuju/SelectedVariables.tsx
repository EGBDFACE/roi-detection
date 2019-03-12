import * as React from 'react';
import './css_Variables.scss';
import { variable_status } from '../../store/store'
import { selectedVarialeHover } from '../../actions/action';

interface Props{
    stateArray: variable_status[],
    mouseHover?: (index:number) => void,
    selectedDelete?: (index:number) => void
}
interface States{}

export default class SelectedVariables extends React.Component<Props,States>{
    constructor(props:Props){
        super(props);
        this.renderSelectedUnit = this.renderSelectedUnit.bind(this);
    }
    renderSelectedUnit(state:variable_status,index:number){
        let dimensions = {
            backgroundColor: '#ff4982'
        };
        let magnitude = {
            backgroundColor: '#a3dfee'
        };
        if(state.display){
            const selectedVariableMouse = this.props.mouseHover;
            const selectedDelete = this.props.selectedDelete;
            if(state.display_hover){
                return(
                    <div key={index} className='selectedVariable' style={state.category==='dimensions'?dimensions:magnitude} onMouseLeave={()=>selectedVariableMouse(index)}>
                        {state.name}
                        <i onClick={()=>selectedDelete(index)}></i>
                    </div>
                )
            }else{
                return(
                    <div key={index} className='selectedVariable' style={state.category==='dimensions'?dimensions:magnitude} onMouseEnter={()=>selectedVariableMouse(index)}>
                        {state.name}
                    </div>
                )
            }
            // if(state.category == 'dimensions'){
            //     if(state.display_hover){
            //         return(
            //             <div key={index} className='selectedDimensions' onMouseLeave={}><i></i>{state.name}</div>
            //         )
            //     }else{
            //         return(
            //         <div key={index} className='selectedDimensions'>{state.name}</div>
            //         )
            //     }
            // }else if(state.category == 'magnitude'){
            //     return(
            //         <div key={index} className='selectedMagnitude' onMouseEnter={}>{state.name}</div>
            //     )
            // }
        }
    }
    render(){
        const stateArray = this.props.stateArray;
        // console.log(stateArray);
        return(
            <div className='selectedVariables'>
                {stateArray.map((value,index)=>this.renderSelectedUnit(value,index))}
            </div>
        )
    }
}