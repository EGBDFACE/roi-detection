import * as React from 'react';
import './css_Variables.scss';
import { variable_status } from '../../store/store';
import store from '../../store/store';
import * as actions from '../../actions/action';

interface Props{
    id:number,
    // stateArray: variable_status[]
    state: boolean,
    name: string,
    // category: string,
    // stateChange?: (key:number,category:string) => void
    stateChange?:(key:number) => void
}
interface States{}

export default class VariablesUnit extends React.Component<Props,States>{
    constructor(props:Props){
        super(props);
        // this.handleClick = this.handleClick.bind(this);
    }
    // handleClick(id:number){
    //     store.dispatch(actions.stateChange(id))
    // }
    render(){
        // const {id,state,name,stateChange,category} = this.props;
        // const { id,stateArray,stateChange } = this.props;
        const { id,state,name,stateChange } = this.props;
        // const {stateArray,stateChange} = this.props;
        // const id=0;
        // const state = stateArray[id].state;
        // const name = stateArray[id].name;
        // const category = stateArray[id].category;
        let disable = {
            opacity: 0.3,
            cursor: 'not-allowed',
            color: 'black'
        };
        // console.log(this.props);
        if(state){
            return(
                // <p onClick={()=>stateChange(id,category)}>{name}</p>
                <p onClick={()=>stateChange(id)}>{name}</p>
                // <p onClick={()=>this.handleClick(id)}>{name}</p>
            )
        }else{
            return(
                <p style={disable}>{name}</p>
            )
        }
    }
}