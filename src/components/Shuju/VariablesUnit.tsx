import * as React from 'react';
import './css_Variables.scss';
import { variable_status } from '../../store/store';

interface Props{
    id:number,
    // stateArray: variable_status[]
    state: boolean,
    name: string,
    category: string,
    // stateChange?: (key:number,category:string) => void
    stateChange?:(key:number) => void
}
interface States{}

export default class VariablesUnit extends React.Component<Props,States>{
    constructor(props:Props){
        super(props);
    }

    render(){
        const {id,state,name,stateChange,category} = this.props;
        // const { id,stateArray,stateChange } = this.props;
        // const state = stateArray[id].state;
        // const name = stateArray[id].name;
        // const category = stateArray[id].category;
        let disable = {
            opacity: 0.3,
            cursor: 'not-allowed'
        };
        console.log(this.props);
        if(state){
            return(
                // <p onClick={()=>stateChange(id,category)}>{name}</p>
                <p onClick={()=>stateChange(id)}>{name}</p>
            )
        }else{
            return(
                <p style={disable}>{name}</p>
            )
        }
    }
}