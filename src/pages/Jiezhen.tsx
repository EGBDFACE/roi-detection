import * as React from 'react';
import {Link} from 'react-router-dom';
interface Props{

}
interface States{

}
export default class Jiezhen extends React.Component<Props,States>{
    constructor(props:Props){
        super(props);
    }
    render(){
        return(
            <div className='leftNav'>
                <ul>
                    <li><Link to='/jiezhen'>
                        <i className='jiezhenPage'></i>
                        <p>接诊</p>
                    </Link></li>
                    <li><Link to='/huizhen'>
                        <i className='huizhen'></i>
                        <p>会诊</p>
                    </Link></li>
                    <li><Link to='/'>
                        <i className='mydata'></i>
                        <p>我的数据</p>
                    </Link></li>
                </ul>
            </div>
        )
    }
}