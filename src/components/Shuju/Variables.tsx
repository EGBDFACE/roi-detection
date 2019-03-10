import * as React from 'react';
import VariablesUnit from './VariablesUnit';
import './css_Variables.scss';
import {variables} from '../../store/store';

interface Props{
    totalVariablesState:variables
}
interface States {}

export default class Variables extends React.Component<Props,States>{
    constructor(props:Props){
        super(props);
    }
    render(){
        return(
            <div></div>
        )
    }
}