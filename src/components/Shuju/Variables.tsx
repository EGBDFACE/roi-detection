import * as React from 'react';
// import VariablesUnit from '../../containers/Shuju/VariablesUnit';
// import VariablesUnit from '../../components/Shuju/VariablesUnit';
import './css_Variables.scss';
import { variable_status } from '../../store/store';
// import { State } from 'pixi.js';

interface Props{
    stateArray: variable_status[],
    stateChange?: (id:number) => void
}
interface States {}

export default class Variables extends React.Component<Props,States>{
    constructor(props:Props){
        super(props);
        this.renderUnit = this.renderUnit.bind(this);
    }
    renderUnit(value:number){
        // console.log(this.props);
        const stateArray = this.props.stateArray;
        const stateChange = this.props.stateChange;
        const name = stateArray[value].name;
        const state = stateArray[value].state;
        const disableStyle = {
            opacity: 0.3,
            cursor: 'not-allowed',
            color: 'black'
        };
        // const category = stateArray[value].category;
        return(
            <p key={value} style={state?null:disableStyle} onClick={state?()=>stateChange(value):null}>{name}</p>
            // <VariablesUnit key={value} id={value} name={name} state={state} category={category} />
            // <VariablesUnit key={value} id={value} name={name} state={state} stateChange={stateChange}/>
        )
    }
    // shouldComponentUpdate(nextProps:Props,nextState:States):boolean{
    //     // for(let i = 0;)
    //     console.log(this.props);
    //     console.log('shouldComponentUpdate');
    //     return true;
    // }
    // componentWillReceiveProps(nextProps:Props){
    //     console.log('componentWillReceiveProps');
    //     console.log(nextProps.stateArray.length);
    //     // return nextProps;
    //     this.render();
    // }
    render(){
        // console.log(this.props.stateArray);
        // const dimensions = 'dimensions';
        // const magnitude = 'magnitude';
        // console.log(this.props.stateArray);
        // console.log(this.props.stateArray);
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