import * as React from 'react';
import {Link} from 'react-router-dom';
import TopNav from '../components/TopNav';

interface Props{

}
interface States{

}
export default class Huizhen extends React.Component<Props,States>{
    constructor(props:Props){
        super(props);
    }
    render(){
        return(
            <div>
                <p>Huizhen</p>
                <div><Link to='/jiezhen'>jiezhen</Link></div>
                <div><Link to='/'>shuju</Link></div>
            </div>
        )
    }
}