import * as React from 'react';
import './css_Variables.scss';
// import { csv } from 'd3-fetch';
import { dataInit } from '../../assets/Shuju_data/dataFunc';
import './css_chart.scss';
import Tooltip from '../../containers/Shuju/Tooltip';

interface Props{}
interface States{
    // dataArray: any[]
}
// interface pieDataObj{
//     key: string,
//     value: number
// }

export default class ChartArea extends React.Component<Props,States>{
    // public static dataArray : any[];
    constructor(props:Props){
        super(props);
    }
    componentDidMount(){
    //     csv('')
    //     this.setState
        // console.log('component mount')
        dataInit();
    }
    render(){
        return(
            <div className='chartArea'>
                <div id='chart'></div>
                {/* <Tooltip/> */}
            </div>
        )
    }
}