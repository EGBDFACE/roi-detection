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
            <div>
                <p>jiezhen</p>
                <div><Link to='/huizhen'>huizhen</Link></div>
                <div><Link to='/'>shuju</Link></div>
            </div>
        )
    }
}