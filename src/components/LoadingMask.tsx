import * as React from 'react';
import '../css/loadingMask.scss';

class LoadingMask extends React.Component {
    public render(){
        return(
            <div className='loadingPage'>
                <div className='sk-rotating-plane'/>
            </div>
        )
    }
}

export default LoadingMask;