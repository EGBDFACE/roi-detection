import * as React from 'react';
import './css_inputSearchTime.scss';

interface Props{}
interface States{}

export default class InputSearchTime extends React.Component<Props,States>{
    constructor(props:Props){
        super(props);
    }
    render(){
        return(
            <div className='inputTime'>
                <p>输入筛选时间</p>
                <div className='startTime'>
                    <div className='inputYear'>
                        <input type='text' name='startYear'></input>
                    </div>
                    <p>年</p>
                    <div className='inputDayMon'>
                        <input type='text' name='startMonth'></input>
                    </div>
                    <p>月</p>
                    <div className='inputDayMon'>
                        <input type='text' name='startDay'></input>
                    </div>
                    <p>日</p>
                </div>
                <p>至</p>
                <div className='endTime'>
                    <div className='inputYear'>
                        <input type='text' name='endYear'></input>
                    </div>
                    <p>年</p>
                    <div className='inputDayMon'>
                        <input type='text' name='endMonth'></input>
                    </div>
                    <p>月</p>
                    <div className='inputDayMon'>
                        <input type='text' name='endDay'></input>
                    </div>
                    <p>日</p>
                </div>
                <p>范围选择</p>
                <div className='inputRange'></div>
            </div>
        )
    }
}