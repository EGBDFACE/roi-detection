import * as React from 'react';
import {Link} from 'react-router-dom';
import Hello from '../containers/Hello';

interface Props{

}
interface States{

}
export default class Shuju extends React.Component<Props,States>{
    constructor(props:Props){
        super(props);
    }
    render(){
        return(
            <div>
                <p>shuju</p>
                <Hello/>
                <div><Link to='/jiezhen'>jiezhen</Link></div>
                <div><Link to='/huizhen'>huizhen</Link></div>
            </div>
        )
    }
}