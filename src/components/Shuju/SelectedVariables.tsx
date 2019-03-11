import * as React from 'react';
import './css_Variables.scss';
import { variable_status } from '../../store/store'

interface Props{
    stateArray: variable_status[]
}
interface States{}

export default class SelectedVariables extends React.Component<Props,States>{
    constructor(props:Props){
        super(props);
        this.renderSelectedUnit = this.renderSelectedUnit.bind(this);
    }
    renderSelectedUnit(state:variable_status){
        if(state.display){
            if(state.category == 'dimensions'){
                return(
                    <div className='selectedDimensions'>{state.name}</div>
                )
            }else if(state.category == 'magnitude'){
                return(
                    <div className='selectedMagnitude'>{state.name}</div>
                )
            }
        }
    }
    render(){
        const stateArray = this.props.stateArray;
        console.log(stateArray);
        return(
            <div className='selectedVariables'>
                {stateArray.map((value)=>this.renderSelectedUnit(value))}
            </div>
        )
    }
}