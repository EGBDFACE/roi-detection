import * as React from 'react';
// import * as actions from '../actions';
import { getFileList, getPicHttp, signInHttp } from '../api';
import '../css/global.scss';
import '../css/homePage.scss';
import history from '../router/history';
import { IFileListItem, IPicInfo, IRoiInfo } from '../store';
// import store  from '../store';

// import axios  from 'axios';
// import { BASE_URL } from '../constant';


interface IProps{
    selectSvs: (id: number) => void,
    setFileList: (list: IFileListItem[]) => void,
    setPic: (pic: IPicInfo) => void,
    userName: string,
    userSign: (name: string) => void,
}
interface IStates{
    errorFlag: boolean,
    id: string,
    password: string,
    showSignInError: boolean
}
// interface IEvent{
//     target: {
//         value: ''
//     }
// }
export default class SignIn extends React.Component<IProps,IStates>{
    constructor(props: IProps){
        super(props);
        this.state = {
            errorFlag: false,
            id: '',
            password: '',
            showSignInError: false
        }
        this.passwordInput = this.passwordInput.bind(this);
        this.idInput = this.idInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    public passwordInput(event: any){
        const value = event.target.value;
        this.setState({
            errorFlag: false,
            password: value
        });
    }
    public idInput(event: any){
        const value = event.target.value;
        this.setState({
            errorFlag: false,
            id: value
        })
    }
    public handleSubmit(){
        if((this.state.id)&&(this.state.password)){
            const user = {
                password: this.state.password,
                username: this.state.id
            };
            // const userSign = this.props.userSign;
            // const setFileList = this.props.setFileList;
            // const setPic = this.props.setPic;
            const { selectSvs, setFileList, setPic, userSign } = this.props;
            signInHttp(user).then( (res: any) => {
                // tslint:disable-next-line:no-console
                // console.log(res);
                if(res.data.status === 1){
                    userSign(user.username);
                    getFileList().then( (resList: any) => {
                        // tslint:disable-next-line:no-console
                        // console.log(resList)
                        const list: IFileListItem[] = [];
                        let i:number;
                        for(i=0; i<resList.data.response.length; i++){
                            const v = resList.data.response[i];
                            list[i] = {
                                labeledCount: v.labeled_count,
                                magnification: v.magnification,
                                // selectedFlag: false,
                                svsId: v.svs_id,
                                totalCount: v.total_count
                            };
                        }
                        // list[0].selectedFlag = true;
                        setFileList(list);
                        getPicHttp(list[0].svsId).then( (resPic: any) => {
                            // tslint:disable-next-line:no-console
                            // console.log(resPic);
                            const roiD: IRoiInfo[] = [];
                            let j:number;
                            for(j=0; j<resPic.data.response.rois_data.length; j++){
                                const v = resPic.data.response.rois_data[j];
                                roiD[j] = {
                                    roiId: v.roi_id,
                                    roiUrl: v.roi_url,
                                    score: v.score,
                                    status: v.status,
                                    type: v.cancer_type,
                                    userName: v.user_name,
                                    x1: v.x1,
                                    x2: v.x2,
                                    y1: v.y1,
                                    y2: v.y2
                                }
                            }
                            const pic: IPicInfo = {
                                picHeight: resPic.data.response.height,
                                picUrl: resPic.data.response.svs_url,
                                picWidth: resPic.data.response.width,
                                roi: roiD,
                                svsId: list[0].svsId
                            };
                            setPic(pic);
                            selectSvs(list[0].svsId)
                            // history.push('/mainPage');
                            history.push('/roi/mainPage');
                        })
                    }).catch( error => {
                        // console.error(error);
                    })
                }else{
                    alert('incorrect name or password');
                }
            }).catch( () => {
                // console.error(error);
            })
        }else{
            this.setState({
                errorFlag: true
            })
        }
    }
    public render(){
        const placeHolder = {
            id: '用户ID',
            password: '密码'
        };
        const placeHolderError = {
            id: '请输入用户ID',
            password: '请输入密码'
        };
        const errorFlag = this.state.errorFlag;
        return(
            <div>
                <div className='home__bg' />
                <div className='home__header'>
                    <span className='header__title'>Pathology.ai</span>
                </div>
                <div className='home__content'>
                    <div className='content__introduction'>
                        <h1 className='content__introduction__title'>Histological Pathology Tool for Detected ROIs</h1>
                        <p className='content__introduction__supplement'>A weak-supervised method for data augmentation</p>
                    </div>
                    {/* <div className='content__interactive'> */}
                    <div className='content__interactive'>
                        <div className='content__interactive__login__id'>
                            <label htmlFor='login_id' className='login__id__label'>Pathologist ID</label>
                            <input className={errorFlag?'login__id__input inputError':'login__id__input'}
                                type='text'
                                name='login_id'
                                id='login_id'
                                value={this.state.id}
                                onChange={this.idInput}
                                placeholder={errorFlag?placeHolderError.id:placeHolder.id}
                                // style={errorFlag?{color: 'red'}:undefined}
                            />
                        </div>
                        <div className='content__interactive__login__password'>
                            <label htmlFor='login_password' className='login__password__label'>Password</label>
                            <input className={errorFlag?'login__password__input inputError':'login__password__input'} 
                                type='password'
                                name='login_password'
                                id='login_password'
                                value={this.state.password}
                                onChange={this.passwordInput}
                                placeholder={errorFlag?placeHolderError.password:placeHolder.password}
                                // style={errorFlag?{color: 'red'}:undefined}
                            />
                        </div>
                        <div className='content__interactive__submit' onClick={this.handleSubmit}>Sign In</div>
                    </div>
                </div>
                <div className='home__footer'>
                    <div className='footer__copyright'>
                        <i className='footer__copyright__icon'/>
                        <div className='footer__copyright__title'>Pathology.ai</div>
                    </div>
                    <div className='footer__contact'>
                        contact: makehust@gmail.com
                    </div>
                </div>
            </div>
        )
    }
}