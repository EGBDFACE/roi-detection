import * as React from 'react';
import VariablesUnit from '../../containers/Shuju/VariablesUnit';
import './css_Variables.scss';
import { variable_status } from '../../store/store';

interface Props{
    stateArray: variable_status[]
}
interface States {}

export default class Variables extends React.Component<Props,States>{
    constructor(props:Props){
        super(props);
        this.renderUnit = this.renderUnit.bind(this);
    }
    renderUnit(value:number){
        const stateArray = this.props.stateArray;
        const name = stateArray[value].name;
        const state = stateArray[value].state;
        const category = stateArray[value].category;
        return(
            <VariablesUnit key={value} id={value} name={name} state={state} category={category} />
        )
    }
    render(){
        const dimensions = 'dimensions';
        const magnitude = 'magnitude';
        return(
            <div className='variables'>
                <div className='dimensions'>
                    <i className='dimensionsPhoto'><h3>选择量度</h3></i>
                    <ul>
                        <li>
                            <h6>预录信息</h6>
                            {[0,1,2].map((value)=>this.renderUnit(value))}
                        </li>
                        <li>
                            <h6>表征</h6>
                            {[3,4].map((value)=>this.renderUnit(value))}
                        </li>
                        <li>
                            <h6>肿瘤学特征</h6>
                            {[5,6,7].map((value)=>this.renderUnit(value))}
                        </li>
                        <li>
                            <h6>内科</h6>
                            {[8,9].map((value)=>this.renderUnit(value))}
                        </li>
                    </ul>
                </div>
                <div className='magnitude'>
                    <i className='magnitudePhoto'><h3>选择量度</h3></i>
                    <ul>
                        <li>
                            <h6>预录信息</h6>
                            {this.renderUnit(10)}
                        </li>
                        <li>
                            <h6>表征</h6>
                            {this.renderUnit(11)}
                        </li>
                        <li>
                            <h6>肿瘤学特征</h6>
                        {[12,13,14,15,16,17,18,19,20].map((value)=>this.renderUnit(value))}
                        </li>
                        <li>
                            <h6>内科</h6>
                            {[21,22].map((value)=>this.renderUnit(value))}
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}