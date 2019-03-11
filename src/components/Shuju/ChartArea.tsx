import * as React from 'react';
import './css_Variables.scss';

interface Props{}
interface States{}

export default class ChartArea extends React.Component<Props,States>{
    constructor(props:Props){
        super(props);
    }
    render(){
        return(
            <div className='chartArea'></div>
        )
    }
}