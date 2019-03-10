import * as React from 'react';
import '../css_Variables.scss';

interface Props{
    state: boolean,
    name: string,
    category: string,
    stateChange?: (propsName:string,category:string) => void
}
interface States{}

export default class VariablesUnit extends React.Component<Props,States>{
    constructor(props:Props){
        super(props);
    }

    render(){
        const {state,name,stateChange,category} = this.props;
        if(state){
            return(
                <span>{name}</span>
            )
        }else{
            return(
                <button onClick={()=>stateChange(name,category)}>{name}</button>
            )
        }
    }
}