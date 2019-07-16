import * as React from 'react';
import history from '../router/history';

interface IProps{
    next?: () => void,
    pathName: string,
    previous?: () => void,
    selectedSvsId?: number,
    totalLength?: number,
    userName: string,
    userSignOut: () => void
}

interface IStates{
    showLogOutFlag: boolean
}

export default class Header extends React.Component<IProps, IStates>{
    constructor(props: IProps){
        super(props);
        this.state = {
            showLogOutFlag: false
        }
        this.showLogOutFlagChange = this.showLogOutFlagChange.bind(this);
        this.logout = this.logout.bind(this);
    }

    public showLogOutFlagChange = (value: boolean) => (e: any) => {
        this.setState({
            showLogOutFlag: value
        })
    }

    public logout(){
        this.props.userSignOut();
        history.push('/');
        // location.pathname = '/';
    }

    public gotoMain(){
        history.push('/mainPage');
        // location.pathname = '/mainPage';
    }

    public gotoSummary(){
        history.push('/dataSummary');
    }
    
    public renderCommon(){
        return(
            <div>
                <div className='header__icon'>Pathology.ai</div>
                <div className='header__userInfo'>
                    <span className='userInfo__label'>Pathologist: </span>
                    <span className='userInfo__name'>{this.props.userName}</span>
                    <div className='userInfo__menu'
                        onMouseEnter={this.showLogOutFlagChange(true)}
                        onMouseLeave={this.showLogOutFlagChange(false)}
                    >
                        <i className='userInfo__menu_icon' />
                        { this.state.showLogOutFlag && <p className='userInfo__menu_logout'
                            onMouseEnter={this.showLogOutFlagChange(true)}
                            onMouseLeave={this.showLogOutFlagChange(false)}
                            onClick={this.logout}
                            >Log out</p>
                        }
                    </div>
                </div>
            </div>
        )
    }
    public render(){
        const {  next, pathName, previous, selectedSvsId, totalLength } = this.props;
        if(pathName === 'main'){
            return(
                <div className='main__header'>
                    {this.renderCommon()}
                    <div className='header__menu__switch'>
                        <span className='switch__pre'
                            onClick={previous}>pre</span>
                        <div className='switch__label'>
                            <span>imageID: {selectedSvsId}/{totalLength}</span>
                        </div>
                        <span className='switch__next'
                            onClick={next}>next</span>
                    </div>
                    <div>
                        <span className='header__menu__dataSummary'
                            onClick={this.gotoSummary} >Data Summary</span>
                    </div>
                </div>
            )
        }else if(pathName == 'summary'){
            return(
                <div className='main__header'>
                    {this.renderCommon()}
                    <div className='summary__title'>Data Summary</div>
                    <div>
                        <span className='header__menu__dataSummary' 
                            onClick={this.gotoMain}>Back to Image List</span>
                    </div>
                </div>
            )
        }
    }
}