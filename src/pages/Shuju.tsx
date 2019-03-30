import * as React from 'react';
import {Link} from 'react-router-dom';
import InputSearchTime from '../components/Shuju/InputSearchTime';
import '../index.scss';
// import Variables from '../components/Shuju/Variables';
import Variables from '../containers/Shuju/Variables';
import '../components/Shuju/css_Variables.scss';
import SelectedVariables from '../containers/Shuju/SelectedVariables';
import ChartArea from '../components/Shuju/ChartArea';
import Subtype from '../containers/Shuju/Subtype';
import VariablesTab from '../containers/Shuju/VariablesTab';
import TopNav from '../components/TopNav';
import Tooltip from '../containers/Shuju/Tooltip';
// import Tooltip from '../containers/Shuju/Tooltip';
// import Tooltip from '../components/Shuju/Tooltip';

interface Props{

}
interface States{

}

export const firstRouterLabelPic = require('../images/界面切换符.png');
export default class Shuju extends React.Component<Props,States>{
    constructor(props:Props){
        super(props);
    }
    render(){
        return(
            <div>
                <TopNav/>
                <div className='main'>
                <div className='leftNav'>
                <ul>
                    <li><Link to='/jiezhen'>
                        <i className='jiezhen'></i>
                        <p>接诊</p>
                    </Link></li>
                    <li><Link to='/huizhen'>
                        <i className='huizhen'></i>
                        <p>会诊</p>
                    </Link></li>
                    <li>
                        <img className='firstRouterLabel' src={firstRouterLabelPic}/>
                        <Link to='/'>
                        <i className='mydataPage'></i>
                        <p>我的数据</p>
                    </Link></li>
                </ul>
                </div>
                <div className='content'>
                    <InputSearchTime/>
                    <div className='mainContent'>
                    <Variables/>
                    <div className='choosedVariables'>
                        <i className='choosedPhoto'><h3>已添加变量</h3></i>
                        <SelectedVariables/>
                        <ChartArea/>
                    </div>
                    <div className='rightSideBar'>
                        <div className='subType'>
                            <i className='subTypeHeader'><h3>图表类型</h3></i>
                            <Subtype/>
                        </div>
                        <div className='variablesTab'>
                            <i className='variablesTabBG'><h3>变量标记</h3></i>
                            <VariablesTab/>
                        </div>
                    </div>
                </div>
                </div>
            </div>
            <Tooltip/>
            </div>
            
        )
    }
}