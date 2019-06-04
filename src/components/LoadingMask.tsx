import * as React from 'react';

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