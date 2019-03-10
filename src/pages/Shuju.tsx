import * as React from 'react';
import {Link} from 'react-router-dom';
import InputSearchTime from '../components/Shuju/InputSearchTime';
import '../index.scss';

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
                </div>
                <div className='mainContent'>
                    <div className='variables'>
                        
                    </div>
                    <div className='choosedVariables'>
                    
                    </div>
                    <div className='rightSideBar'>
                    
                    </div>
                </div>
            </div>
        )
    }
}