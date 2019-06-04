import * as React from 'react';
import { getPicHttp, getSummaryHttp, setRoiStatus } from '../api';
// import { CANCER_TYPE as cancerType, PIC_SIZE as picSize, ROI_SCORE_THRESHOLD as threshold } from '../constant';
import { CANCER_TYPE as cancerType, PIC_SIZE as picSize } from '../constant';
import '../css/global.scss';
import '../css/mainPage.scss';
import history from '../router/history';
import { IFileListItem, IPicInfo, IRoiInfo, ISummaryStatisticsItem, ISummaryTotal } from '../store';
// import draw  from '../utils/drawPic';
import resolveSummary from '../utils/resolveSummary';
// interface IListItem{
//     id: string,
//     magn: number,
//     roiDone: number,
//     roiTotal: number
//     // ROIDone: number,
//     // ROITotal: number
// }
interface IProps{
    fileList: IFileListItem[],
    selectedRoiId: number,
    selectedSvsId: number,
    selectRoi: (id: number) => void,
    selectSvs: (id: number) => void,
    setFileList: (list: IFileListItem[]) => void,
    setPic: (pic: IPicInfo) => void,
    setStatistics: (data: ISummaryStatisticsItem[]) => void,
    setSummary: (data: ISummaryTotal) => void,
    statistics: ISummaryStatisticsItem[]
    userName: string,
    userSignOut: () => void,
    pic: IPicInfo
}
interface IStates{
    roiMenuItemIndex: number,
    selectedPicItem: number,
    selectedRoiId: number,
    showAllRoisFlag: boolean,
    showLogOutFlag: boolean,
    showShortListFlag: boolean,
    wantToChangeIndex: number
    // selectedRoiItem: number
}
export default class MainPage extends React.Component<IProps, IStates>{
    constructor(props: IProps){
        super(props);
        this.state = {
            roiMenuItemIndex: -1,
            selectedPicItem: 0,
            selectedRoiId: -1,
            // selectedRoiItem: -1,
            showAllRoisFlag: true,
            showLogOutFlag: false,
            showShortListFlag: false,
            wantToChangeIndex: -1
        }
        this.showShortList = this.showShortList.bind(this);
        this.switchPic = this.switchPic.bind(this);
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        // this.selectRoiFn = this.selectRoiFn.bind(this);
        this.dataSumary = this.dataSumary.bind(this);
        this.roiMouseEnter = this.roiMouseEnter.bind(this);
        this.roiMouseLeave = this.roiMouseLeave.bind(this);
        this.roiStatusChange = this.roiStatusChange.bind(this);
        this.wantToChange = this.wantToChange.bind(this);
        this.notWantToChange = this.notWantToChange.bind(this);
        this.showLogOutEnable = this.showLogOutEnable.bind(this);
        this.showLogOutDisable = this.showLogOutDisable.bind(this);
        this.logout = this.logout.bind(this);
        this.showAllRoisFlagChange = this.showAllRoisFlagChange.bind(this);
        this.setRoiMenuItemIndex = this.setRoiMenuItemIndex.bind(this);
        // this.hoverEnterRoi = this.hoverEnterRoi.bind(this);
        // this.hoverLeaveRoi = this.hoverLeaveRoi.bind(this);
    }
    public setRoiMenuItemIndex = (index: number) => (event:any) => {
        this.setState({
            roiMenuItemIndex: index
        })
    }
    public showAllRoisFlagChange(){
        this.setState({
            showAllRoisFlag: !this.state.showAllRoisFlag
        })
    }
    public logout(){
        const { userSignOut } = this.props;
        userSignOut();
        // history.push('/');
        history.push('/roi');
    }
    public showLogOutEnable(){
        this.setState({
            showLogOutFlag: true
        });
    }
    public showLogOutDisable(){
        this.setState({
            showLogOutFlag: false
        })
    }
    public notWantToChange(){
        this.setState({
            wantToChangeIndex: -1
        });
    }
    public wantToChange = (index: number) => (event:any) =>{
        this.setState({
            wantToChangeIndex: index
        });
    }
    public roiStatusChange = (id: number, newStatus: string, index: number) => (event: any) => {
        const { fileList, pic, setFileList, setPic } = this.props;
        const newRoiStatus = {
            roi_id: id,
            status: newStatus,
            svs_id: pic.svsId
        };
        const newFileList:IFileListItem[] = JSON.parse(JSON.stringify(fileList));
        for(let i=0; i<fileList.length; i++){
            if(newFileList[i].svsId === pic.svsId){
                if(pic.roi[index].status === 'unlabeled'){
                    newFileList[i].labeledCount = newFileList[i].labeledCount+1;
                    break;
                }
            }
        }
        setFileList(newFileList);
        setRoiStatus(newRoiStatus).then( res =>{
            // tslint:disable-next-line:no-console
            // console.log(res);
            getSummaryHttp().then( (resSum: any) => {
                // tslint:disable-next-line:no-console
                // console.log(res);
                    const summaryData = resolveSummary(resSum.data.response);
                    this.props.setSummary(summaryData.total);
                    this.props.setStatistics(summaryData.statistics);
                }).catch( error => {
                    // console.error(error);
                });
        }).catch(error => {
            // console.error(error);
        })
        const newPic:IPicInfo = JSON.parse(JSON.stringify(pic));
        newPic.roi[index].status = newStatus;
        setPic(newPic);
    }
    public roiMouseEnter = (id: number) => (event: any) => {
        this.setState({
            selectedRoiId: id
        });
    }
    public roiMouseLeave(){
        this.setState({
            selectedRoiId: -1
        });
    }
    // public selectRoiClick = (id: number) => (event: any) =>{
    //     this.props.sele
    // }
    // public componentDidMount(){
    //     draw(this.props.pic.picUrl);
    // }
    // public hoverEnterRoi = (id: number) => (event: any) => {
    //     this.props.selectRoi(id);
    //     // this.setState({
    //     //     selectedRoiItem: index
    //     // });
    // }
    // public hoverLeaveRoi(){
    //     this.props.selectRoi(-1);
    //     // this.setState({
    //     //     selectedRoiItem: -1
    //     // });
    // }
    // public selectRoiFn = (id: number) => (event:any) => {
    //     this.props.selectRoi(id);
    // }
    public next(){
        const { selectedPicItem } = this.state;
        const { fileList } = this.props;
        if(selectedPicItem === fileList.length-1){
            this.setState({
                selectedPicItem: 0
            });
            this.getPic(fileList[0].svsId)
        }else{
            this.getPic(fileList[this.state.selectedPicItem+1].svsId);
            this.setState({
                selectedPicItem: this.state.selectedPicItem+1
            });
        }
    }
    public previous(){
        const { selectedPicItem } = this.state;
        const { fileList } = this.props;
        // const { fileList } = this.props;
        if(selectedPicItem === 0){
            this.setState({
                selectedPicItem: fileList.length-1
            });
            const svsId = fileList[fileList.length-1].svsId;
            this.getPic(svsId)
        }else{
            this.getPic(fileList[this.state.selectedPicItem-1].svsId)
            this.setState({
                selectedPicItem: this.state.selectedPicItem-1
            })
        }
    }
    public switchPic = (index: number) => (event: any) => {
        const { fileList } = this.props;
        const svsId = fileList[index].svsId;
        this.setState({
            selectedPicItem: index
        });
        this.getPic(svsId);
    }
    public getPic(svsIdNumber: number){
        const { selectSvs, setPic } = this.props;
        selectSvs(svsIdNumber);
        getPicHttp(svsIdNumber).then( (res: any) => {
            const roiD: IRoiInfo[] = [];
            let j:number;
            for(j=0; j<res.data.response.rois_data.length; j++){
                const v = res.data.response.rois_data[j];
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
                picHeight: res.data.response.height,
                picUrl: res.data.response.svs_url,
                picWidth: res.data.response.width,
                roi: roiD,
                svsId: svsIdNumber
            };
            setPic(pic);
        }).catch( error =>{
            // console.error(error);
        });
    }
    public dataSumary(){
        if(this.props.statistics.length === 0){
            getSummaryHttp().then( (res: any) => {
            // tslint:disable-next-line:no-console
            // console.log(res);
                const summaryData = resolveSummary(res.data.response);
                this.props.setSummary(summaryData.total);
                this.props.setStatistics(summaryData.statistics);
            }).catch( error => {
                // console.error(error);
            });
        }
        
        // history.push('/dataSummary');
        history.push('/roi/dataSummary');
    }
    public showShortList(){
        this.setState({
            showShortListFlag: !this.state.showShortListFlag
        });
    }
    public renderRoiMenu(value: IRoiInfo, index: number){
        const { selectedRoiId, wantToChangeIndex } = this.state;
        // if(selectedRoiId === value.roiId){
        //     if(value.status === 'unlabeled'){
        //         return(
        //             <div className='main__content__roi__menu'>
        //                 <i className='roi__menu_true' />
        //                 <i className='roi__menu_false' />
        //             </div>
        //         )
        //     }else if(value.status === 'true'){

        //     }else if(value.status === 'false'){

        //     }
        //     return(
        //         <div className='main__content__roi__menu'>

        //         </div>
        //     )
        // }else {
        //     return null
        // }
        if(value.status === 'unlabeled'){
            if(selectedRoiId === value.roiId){
              return( 
                    <div className='main__content__roi__menu'>
                        <i className='roi__menu_true' 
                            onClick={this.roiStatusChange(value.roiId, 'true', index)} />
                        <i className='roi__menu_false' 
                            onClick={this.roiStatusChange(value.roiId, 'false', index)} />
                    </div>
                )  
            }else{
                return null
            }
        }else if(value.status === 'true'){
            if(wantToChangeIndex === index){
                return(
                    <div className='main__content__roi__menu'
                        onMouseLeave={this.notWantToChange} 
                        >
                        <i className='roi__menu_false'
                            onClick={this.roiStatusChange(value.roiId, 'false', index)} />
                        <i className='roi__menu_true_hl' 
                            onMouseEnter={this.wantToChange(index)} />
                    </div> 
                )
            }else{
                return(
                    <div className='main__content__roi__menu'
                        onMouseLeave={this.notWantToChange} 
                        >
                        <i className='roi__menu_true_hl' 
                            onMouseEnter={this.wantToChange(index)} />
                    </div>
                )
            }
        }else if(value.status === 'false'){
            if(wantToChangeIndex === index){
                return(
                    <div className='main__content__roi__menu'
                        onMouseLeave={this.notWantToChange}
                        >
                        <i className='roi__menu_true'
                            onClick={this.roiStatusChange(value.roiId, 'true', index)} />
                        <i className='roi__menu_false_hl' 
                            onMouseEnter={this.wantToChange(index)} />
                    </div>
                )
            }else{
                return(
                    <div className='main__content__roi__menu'
                        onMouseLeave={this.notWantToChange}
                        >
                        <i className='roi__menu_false_hl' 
                            onMouseEnter={this.wantToChange(index)} />
                    </div>
                )
            }
        }else{
            return null
        }
    }
    public renderRois(value: IRoiInfo,index:number){
        const { pic } = this.props;
        // const { selectedRoiId } = this.state;
        const { showAllRoisFlag, roiMenuItemIndex } = this.state;
        const roiPosX = (value.x1/pic.picWidth)*picSize + 'px';
        const roiPosY = (value.y1/pic.picHeight)*picSize +'px';
        const roiPosStyle={
            height: ((value.y2-value.y1)/pic.picHeight) * picSize + 'px',
            left: roiPosX,
            top: roiPosY,
            width: ((value.x2-value.x1)/pic.picWidth) * picSize + 'px',
        };
        const falseBorderStyle = {
            ...roiPosStyle,
            borderColor: '#FFE14F' 
        };
        const falseTitleStyle ={
            backgroundColor: '#FFE14F'
        };
        // const hidden = { display: 'none'};
        // const zIndexStyle = { 
        //     ...roiPosStyle,
        //     zIndex: 1
        // };
        // const roiTitlePosStyle = {
        //     left: roiPosX,
        //     top: roiPosY
        // };
        // if(value.score > threshold){
        //     return (
        //         <div className='main__content__roi' 
        //             // style={roiPosStyle} 
        //             key={index} 
        //             // onClick={this.selectRoiFn(value.roiId)}
        //             onMouseEnter={this.roiMouseEnter(value.roiId)}
        //             onMouseLeave={this.roiMouseLeave}
        //             // style={this.props.selectedRoiId === value.roiId ? zIndexStyle : roiPosStyle} 
        //             // style={ selectedRoiId === value.roiId ? zIndexStyle : roiPosStyle}
        //             style={roiPosStyle}
        //             >
        //             <div className='main__content__roi__title'>
        //                 <span className='main__content__roi__title__type'>{cancerType[value.type]}</span>
        //                 <span className='main__content__roi__title__score'>{value.score.toFixed(2)}</span>
        //             </div> 
        //             {this.renderRoiMenu(value, index)}
        //             {/* <div className='main__content__roi__menu'
        //                 style={this.props.selectedRoiId === value.roiId ? undefined : hidden}>
        //                 <i className='main__content__roi__menu__true' />
        //                 <i className='main__content__roi__menu__false' />
        //             </div>   */}
        //         </div>
        //     )
        // }else{
        //     return null
        // }
        if((showAllRoisFlag) || (roiMenuItemIndex === index)){
            return (
                <div className='main__content__roi' 
                    // style={roiPosStyle} 
                    key={index} 
                    // onClick={this.selectRoiFn(value.roiId)}
                    onMouseEnter={this.roiMouseEnter(value.roiId)}
                    onMouseLeave={this.roiMouseLeave}
                    // style={this.props.selectedRoiId === value.roiId ? zIndexStyle : roiPosStyle} 
                    // style={ selectedRoiId === value.roiId ? zIndexStyle : roiPosStyle}
                    style={(value.status === 'false') ? falseBorderStyle : roiPosStyle}
                    >
                    <div className='main__content__roi__title'
                        style={ value.status === 'false' ? falseTitleStyle : undefined} >
                        <span className='main__content__roi__title__type'>{cancerType[value.type]}</span>
                        <span className='main__content__roi__title__score'>{value.score.toFixed(2)}</span>
                    </div> 
                    {this.renderRoiMenu(value, index)}
                    {/* <div className='main__content__roi__menu'
                        style={this.props.selectedRoiId === value.roiId ? undefined : hidden}>
                        <i className='main__content__roi__menu__true' />
                        <i className='main__content__roi__menu__false' />
                    </div>   */}
                </div>
            )
        }else{
            return null
        }
    }
    public renderRoiSwitchBarItem(value: IRoiInfo, index: number){
        const { showAllRoisFlag, roiMenuItemIndex } = this.state;
        const greenStyle = { backgroundColor: '#79FF6F'};
        const yellowStyle = { backgroundColor: '#FFE14F'};
        const grayStyle = { backgroundColor: '#BBBBBB'};
        const selectedStyle = { backgroundColor: 'white'};
        let valueStyle: any;
        switch(value.status){
            case 'true':
                valueStyle = greenStyle;
                break;
            case 'false':
                valueStyle = yellowStyle;
                break;
            case 'unlabeled':
                valueStyle = grayStyle;
        }
        if(showAllRoisFlag){
            return(
                <div style={ valueStyle }
                    className='roi__switch_item'
                    key={index} 
                    >{index + 1}</div>
            )
        }else{
            const newSelectedStyle ={
                ...selectedStyle,
                cursor: 'pointer'
            };
            const newValueStyle ={
                ...valueStyle,
                cursor: 'pointer'
            };
            if(roiMenuItemIndex === index){
                return(
                    <div style={ newSelectedStyle }
                        className='roi__switch_item'
                        key={index}
                        > {index + 1} </div>
                )
            }else{
                return(
                    <div style={ newValueStyle } 
                        className='roi__switch_item'
                        onClick={this.setRoiMenuItemIndex(index)} 
                        key={index}
                        > {index + 1} </div> 
                )
            }
        }
    }
    public renderTable(index: number, value: IFileListItem){
        // const oddBgStyle = { backgroundColor: '#EEEEEE' };
        const id = toFiveNumberString(index+1);
        const oddIconStyle = { backgroundColor: '#613ED8', border: '1px solid #613ED8' };
        const selectedBg = { backgroundColor: '#E4DCFF' };
        // const selectedPicItem = this.state.selectedPicItem;
        const { selectedSvsId } = this.props;
        return(
            // <div className='table__item' key={index} 
            //     style={index%2 ? undefined : oddBgStyle}>
            <div className={index%2 ? 'table__item' : 'table__item__odd'}
                // style={selectedPicItem === index ? selectedBg : undefined}
                style={selectedSvsId ===value.svsId ? selectedBg : undefined}
                key={index}
                onClick={this.switchPic(index)}>
                <div className='table__item__id'>
                    <i className='table__item__id__icon' 
                        style={value.labeledCount ? oddIconStyle : undefined} />
                    <span className='table__item__id__value'>{id}</span>
                </div>
                {/* <div className='table__item__magn'> */}
                <span className='table__item__magn'>{value.magnification}</span>
                {/* </div> */}
                <div className='table__item__roi'>
                    <span className='table__item__roi__done'>{value.labeledCount}</span>
                    <span>/{value.totalCount}</span>
                    {/* <span>{value.ROIDone}</span>
                    <span>/{value.ROITotal}</span> */}
                </div>
            </div>
        )
    }
    public renderBriefTable(index: number, value: IFileListItem){
        const doneIconStyle = { backgroundColor: '#613ED8', border: '1px solid #613ED8' };
        // const selectedPicItem = this.state.selectedPicItem;
        const { selectedSvsId } = this.props;
        const selectedBg = { backgroundColor: '#E4DCFF' };
        return (
            <div className={index%2 ? 'table__item' : 'table__item__odd'}
                // style={selectedPicItem === index ? selectedBg : undefined}
                style={selectedSvsId === value.svsId ? selectedBg : undefined}
                key={index}
                onClick={this.switchPic(index)}>
                <div className='table__item__id'>
                    <i className='table__item__id__icon'
                        style={value.labeledCount ? doneIconStyle : undefined} />    
                </div>
                <div className='table__item__roi__brief'>
                    <span className='table__item__roi__done'>{value.labeledCount}</span>
                    <span>/{value.totalCount}</span>
                </div>
            </div>

        )
    }
    public render(){
        if(!this.props.userName){
            // return null;
            return(
                <div>please sign in</div>
            )
        }
        const { fileList, pic, selectedSvsId, userName } = this.props;
        // const { selectedPicItem } = this.state;
        const { showLogOutFlag, showAllRoisFlag } = this.state;
        const hidden = { display: 'none'};
        const shortListContentStyle = {
            left: '8%',
            width: '92%'
        };
        return(
            <div className='page'>
                <div className='main__header'>
                    <div>
                        <div className='header__icon'>Pathology.ai</div>
                        <div className='header__userInfo'>
                            <span className='userInfo__label'>Pathologist: </span>
                            <span className='userInfo__name'>{userName}</span>
                            <div className='userInfo__menu'
                                onMouseEnter={this.showLogOutEnable}
                                onMouseLeave={this.showLogOutDisable}
                                >
                                <i className='userInfo__menu_icon' />
                                <p className='userInfo__menu_logout'
                                    onMouseEnter={this.showLogOutEnable}
                                    onMouseLeave={this.showLogOutDisable}
                                    onClick={this.logout}
                                    style={showLogOutFlag ? undefined : hidden} >Log out</p>
                            </div>
                        </div>
                    </div>
                    <div className='header__menu__switch'>
                        <span className='switch__pre'
                            onClick={this.previous}>pre</span>
                        <div className='switch__label'>
                            {/* <span>imageID: {selectedPicItem + 1}/{fileList.length}</span> */}
                            <span>imageID: {selectedSvsId}/{fileList.length}</span>
                        </div>
                        <span className='switch__next'
                            onClick={this.next}>next</span>
                    </div>
                    <div>
                        <span className='header__menu__dataSummary'
                            onClick={this.dataSumary} >Data Summary</span>
                    </div>
                </div>
                <div className='main__sideBar' style={this.state.showShortListFlag ? hidden : undefined}>
                    <div className='sideBar__header'>
                        <span className='sideBar__header__title'>Image List</span>
                        <span className='sideBar__header__serialNumber'>30/{fileList.length}</span>
                        <i className='sideBar__header__icon' 
                            onClick={this.showShortList}/>
                    </div>
                    <div className='sideBar__table__header'>
                        <div className='table__header__id'>ID</div>
                        <div className='table__header__magn'>MAGN</div>
                        <div className='table__header__roi'>ROI</div>
                    </div>
                    <div className='sideBar__table__content'>
                        {fileList.map((value,index)=> this.renderTable(index, value))}
                    </div>
                </div>
                <div className='main__sideBar__brief' style={this.state.showShortListFlag ? undefined : hidden}>
                    <div className='sideBar__brief__header'>
                        <i className='sideBar__brief__header__icon' 
                            onClick={this.showShortList} />
                    </div>
                    <div className='sideBar__brief__table__header'>ROI</div>
                    <div className='sideBar__brief__table__content'>
                        {fileList.map((value, index)=> this.renderBriefTable(index, value))}
                    </div>
                </div>
                <div className='main__content'
                    style={this.state.showShortListFlag ? shortListContentStyle : undefined}>
                    <div className='main__content__pic__area'>
                        <img src={pic.picUrl} className='main__content__pic' />
                        {/* <canvas id='svsPic' /> */}
                        {pic.roi.map((value, index)=>this.renderRois(value, index))}
                    </div>
                    <div className='main__content__roi__switch'>
                        <div className='roi__switch_area'>
                            {pic.roi.map((value, index) => this.renderRoiSwitchBarItem(value, index))}
                        </div>
                        <i className={showAllRoisFlag ? 'roi__switch_all_enable' : 'roi__switch_all_disable'} 
                            onClick={this.showAllRoisFlagChange} />
                    </div>
                </div>
            </div>
        )
    }
}

function toFiveNumberString(i: number){
    const decimal = i / Math.pow(10,5);
    const decimalStr = decimal.toFixed(5)+'';
    return decimalStr.substr(decimalStr.indexOf('.')+1)
}