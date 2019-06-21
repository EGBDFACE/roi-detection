import * as React from 'react';
import * as ReactDom from 'react-dom';
import { getPicHttp, getSummaryHttp, setRoiStatus } from '../api';
// import { CANCER_TYPE as cancerType, PIC_SIZE as picSize, ROI_SCORE_THRESHOLD as threshold } from '../constant';
import PicContent from '../components/PicContent';
import { CANCER_TYPE as cancerType, FILE_LIST_DISPLAY_NUMBER as listShowLength, PIC_SIZE as picSize, ROI_MENU_MAX_LENGTH as menuMaxLength } from '../constant';
import '../css/global.scss';
import '../css/mainPage.scss';
import history from '../router/history';
import { IFileListItem, IPicInfo, IRoiInfo, ISummaryStatisticsItem, } from '../store';
// import draw  from '../utils/drawPic';
import { getPicData } from '../utils/resolvePic';
import { resolveSummary, resolveNewSummary } from '../utils/resolveSummary';
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
    fileListPage: number,
    fileListShow: IFileListItem[],
    selectedRoiDisplayId: number,
    selectedSvsId: number,
    selectAllRoi: (flag: boolean) => void,
    selectRoi: (id: number) => void,
    selectSvs: (id: number) => void,
    setFileList: (list: IFileListItem[]) => void,
    setFileListPage: (page: number) => void,
    setFileListShow: (list: IFileListItem[]) => void,
    setPicA: (pic: IPicInfo) => void,
    setPicB: (pic: IPicInfo) => void,
    setStatistics: (data: ISummaryStatisticsItem[]) => void,
    // setSummary: (data: ISummaryTotal) => void,
    showAllRoisFlag: boolean,
    statistics: ISummaryStatisticsItem[]
    userName: string,
    userSignOut: () => void,
    picA: IPicInfo,
    picB: IPicInfo
}
interface IStates{
    hoveredRoiId: number,
    imgDragFlag: boolean,
    imgDragPrePos: {
        x: number,
        y: number
    }
    imgZoomScale: number,
    imgZoomStyle: any,
    // roiMenuItemIndex: number,
    // selectedPicId: number,
    // selectedRoiId: number,
    // showAllRoisFlag: boolean,
    selectedSvsIndex: number,
    searchSvsIdInput: string,
    showLogOutFlag: boolean,
    showShortListFlag: boolean,
    showZoomInFlag: boolean,
    preScrollTop: number,
    wantToChangeIndex: number
    // selectedRoiItem: number
}
export default class MainPage extends React.Component<IProps, IStates>{
    constructor(props: IProps){
        super(props);
        this.state = {
            hoveredRoiId: -1,
            imgDragFlag: false,
            imgDragPrePos: {
                x: 0,
                y: 0
            },
            imgZoomScale: 1,
            imgZoomStyle: undefined,
            selectedSvsIndex: 0,
            searchSvsIdInput: '',
            showLogOutFlag: false,
            showShortListFlag: false,
            showZoomInFlag: false,
            preScrollTop: 0,
            wantToChangeIndex: -1
        }
        this.showShortList = this.showShortList.bind(this);
        this.switchPic = this.switchPic.bind(this);
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        // this.selectRoiFn = this.selectRoiFn.bind(this);
        this.dataSumary = this.dataSumary.bind(this);
        this.roiStatusChange = this.roiStatusChange.bind(this);
        this.showLogOutEnable = this.showLogOutEnable.bind(this);
        this.showLogOutDisable = this.showLogOutDisable.bind(this);
        this.logout = this.logout.bind(this);
        this.handleTableScroll = this.handleTableScroll.bind(this);
        this.getPic = this.getPic.bind(this);
        this.handleSvsIdInputChange = this.handleSvsIdInputChange.bind(this);
        this.handleSvsIdEnter = this.handleSvsIdEnter.bind(this);
        // this.hoverEnterRoi = this.hoverEnterRoi.bind(this);
        // this.hoverLeaveRoi = this.hoverLeaveRoi.bind(this);
    }
    public handleSvsIdEnter(e: any){
        const { searchSvsIdInput } = this.state;
        const { fileList, fileListPage, selectSvs, setFileListPage, setFileListShow} = this.props;
        if(e.keyCode === 13){
            const svsId = parseInt(searchSvsIdInput);
            if((svsId !== NaN)&&(svsId <=fileList[fileList.length-1].svsId)&&(svsId > 0)){
                if(((svsId)>=(fileListPage-1)*listShowLength+1)&&((svsId)<=fileListPage*listShowLength)){
                    this.setState({
                        selectedSvsIndex: (svsId%listShowLength===0) ? (listShowLength-1) : (svsId%listShowLength-1)
                    })
                    selectSvs(svsId);
                    this.getPic(svsId);
                }else{
                    const totalPage = Math.ceil(fileList.length/listShowLength);
                    const newFileListPage = Math.ceil(svsId/listShowLength);
                    const newFileListShow:IFileListItem[] = [];
                    const length = (newFileListPage === totalPage) ? (fileList.length -(totalPage-1)*listShowLength) : listShowLength;
                    for(let i=0; i<length; i++){
                        newFileListShow[i] = fileList[(newFileListPage-1)*listShowLength+i];
                    }
                    setFileListPage(newFileListPage);
                    setFileListShow(newFileListShow);
                    selectSvs(svsId);
                    this.getPic(svsId);
                }
            }
        }
    }
    public handleSvsIdInputChange(event:any){
        const value = event.target.value;
        this.setState({
            searchSvsIdInput: value
        })
    }
   
    // 去抖版本
    public handleTableScroll = debounce((e:any)=>{
        const { fileList, fileListPage, setFileListShow, setFileListPage } = this.props;
        const scrollHeight = e.target.scrollHeight;
        const clientHeight = e.target.clientHeight;
        const scrollTop = e.target.scrollTop;
        const element: any = document.getElementsByClassName('sideBar__table__content')[0];
        const elementBrief :any = document.getElementsByClassName('sideBar__brief__table__content')[0];
        // if(scrollTop + clientHeight >= (scrollHeight - 50)){
        const totalPage = Math.ceil(fileList.length/listShowLength);
        if((fileList.length%listShowLength < 30)&&(fileListPage === totalPage)){
            return;
        }
        if(scrollTop + clientHeight === scrollHeight){
            const totalPage = Math.ceil(fileList.length/listShowLength);
            // const totalPage = fileList.length%listShowLength < 50 ? Math.ceil(fileList.length/listShowLength)-1 : Math.ceil(fileList.length/listShowLength);
            const newFileListShow: IFileListItem[] = [];
            let i: number;
            if(fileListPage <= (totalPage - 1)){ 
                const newFileListPage = fileListPage + 1;
                const length = (fileListPage === (totalPage-1)) ? (fileList.length-fileListPage*(listShowLength)) : listShowLength;
                for(i=0; i<length; i++){
                    // newFileListShow[i] = fileList[fileListPage*(listShowLength-10)+i];
                    newFileListShow[i] = fileList[fileListPage*listShowLength+i];
                }
                setFileListPage(newFileListPage);
                setFileListShow(newFileListShow);
                // element.scrollTop = 100;
                // elementBrief.scrollTop = 100;
                element.scrollTop = 10;
                elementBrief.scrollTop = 10;
            }
        }
        if(scrollTop === 0){
            if(fileListPage !== 1){
                const newFileListPage = fileListPage - 1;
                const newFileList: IFileListItem[] = [];
                let i: number;
                for(i=0; i<listShowLength; i++){
                    newFileList[i] = fileList[(fileListPage-2)*listShowLength+i];
                }
                setFileListPage(newFileListPage);
                setFileListShow(newFileList);
                // element.scrollTop = scrollHeight - clientHeight - 100;
                // elementBrief.scrollTop = scrollHeight - clientHeight - 100;
                element.scrollTop = scrollHeight - clientHeight - 10;
                element.scrollTop = scrollHeight - clientHeight - 10;
            }
        }
    })
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
    public roiStatusChange(id: number, newStatus: string, index: number) {
        const { fileList, fileListPage, fileListShow,  
                picA, picB, selectedSvsId, setFileList, setFileListShow, 
                setPicA, setPicB, statistics } = this.props;
        const pic: IPicInfo = (selectedSvsId === picA.svsId) ? picA : picB;
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
        let newFileListShow: IFileListItem[] = [];
        for(let i=0; i<fileListShow.length; i++){
            newFileListShow[i] = newFileList[(fileListPage-1)*listShowLength + i];
        }
        setFileListShow(newFileListShow);
        setRoiStatus(newRoiStatus).then( res =>{
            // tslint:disable-next-line:no-console
            // console.log(res);
            getSummaryHttp().then( (resSum: any) => {
                    const newStatistic = resolveNewSummary(resSum.data.response, statistics);
                    this.props.setStatistics(newStatistic);
                }).catch( error => {
                    // console.error(error);
                });
        }).catch(error => {
            // console.error(error);
        })
        const newPic:IPicInfo = JSON.parse(JSON.stringify(pic));
        newPic.roi[index].status = newStatus;
        if(selectedSvsId === picA.svsId){
            setPicA(newPic);
        }else{
            setPicB(newPic);
        }
    }
    public next(){
        // const { selectedPicId } = this.state;
        const { fileList, fileListPage, setFileListPage, setFileListShow, selectedSvsId } = this.props;
        const element  = document.getElementsByClassName('sideBar__table__content')[0];
        const elementBrief = document.getElementsByClassName('sideBar__brief__table__content')[0];
        const totalPage = Math.ceil(fileList.length/listShowLength);
        // const totalPage = fileList.length%listShowLength < 50 ? Math.ceil(fileList.length/listShowLength)-1 : Math.ceil(fileList.length/listShowLength);
        const newFileListShow: IFileListItem[] = [];
        // if(selectedPicId === fileList[fileList.length-1].svsId){
        if(selectedSvsId === fileList[fileList.length-1].svsId){
            // this.setState({
            //     selectedPicId: 1
            // });
            this.getPic(1);
            let i: number;
            const length = fileList.length > listShowLength ? listShowLength : fileList.length;
            for(i=0; i<length; i++){
                newFileListShow[i] = fileList[i];
            }
            setFileListPage(1);
            setFileListShow(newFileListShow);
            element.scrollTop = 0;
            elementBrief.scrollTop = 0;
            this.setState({
                selectedSvsIndex: 0
            })
        }else{
            // this.getPic(selectedPicId+1);
            // if((selectedSvsId+2)>fileList[(fileListPage-1)*(listShowLength-10)+listShowLength].svsId){
            // if((selectedSvsId+1)>listShowLength*fileListPage){
            if(((selectedSvsId+1)<=listShowLength*fileListPage)&&((selectedSvsId+1)>=(fileListPage-1)*listShowLength+1)){
                // 当前页面内
                this.setState({
                    selectedSvsIndex: this.state.selectedSvsIndex+1
                })
            }else{
                // const totalPage = Math.ceil(fileList.length/listShowLength);
                const newFileListShow: IFileListItem[] = [];
                const newFileListPage = Math.ceil((selectedSvsId+1) / listShowLength);
                let i: number;
                // if(fileListPage <= (totalPage - 1)){ 
                    // const newFileListPage = fileListPage + 1;
                    // for(i=0; i<listShowLength; i++){
                    //     newFileListShow[i] = fileList[fileListPage*(listShowLength-10)+i];
                    // }
                    const length = (newFileListPage === totalPage) ? (fileList.length-(totalPage-1)*listShowLength) : listShowLength;
                    for(i=0; i<length; i++){
                        newFileListShow[i] = fileList[(newFileListPage-1)*listShowLength+i];
                    }
                    setFileListPage(newFileListPage);
                    setFileListShow(newFileListShow);
                    // element.scrollTop = 100;
                    // elementBrief.scrollTop = 100;
                    element.scrollTop = 10;
                    elementBrief.scrollTop = 10;
                // }
                this.setState({
                    selectedSvsIndex: ((selectedSvsId+1)%listShowLength === 0) ? (listShowLength-1) : ((selectedSvsId+1)%listShowLength-1)
                })
            }
            this.getPic(selectedSvsId+1);
        }
    }
    public previous(){
        // const { selectedPicId } = this.state;
        const { fileList, fileListPage, setFileListPage, setFileListShow, selectedSvsId } = this.props;
        const element  = document.getElementsByClassName('sideBar__table__content')[0];
        const elementBrief = document.getElementsByClassName('sideBar__brief__table__content')[0];
        const totalPage = Math.ceil(fileList.length/listShowLength);
        // const totalPage = fileList.length%listShowLength < 50 ? Math.ceil(fileList.length/listShowLength)-1 : Math.ceil(fileList.length/listShowLength);
        const newFileListShow: IFileListItem[] = [];
        // const { fileList } = this.props;
        // if(selectedPicId === 1){
        if(selectedSvsId === 1){
            // this.setState({
            //     selectedPicId: fileList[fileList.length-1].svsId
            // });
            const svsId = fileList[fileList.length-1].svsId;
            this.getPic(svsId)
            const newFileListPage = totalPage;
            let i: number;
            // for(i=0; i<(fileList.length-(totalPage-1)*(listShowLength-10)); i++){
            //     // newFileListShow[i] = fileList[(totalPage-1)*listShowLength - 10 + i];
            //     newFileListShow[i] = fileList[(totalPage-1)*(listShowLength-10)+i];
            // }
            for(i=0; i<(fileList.length-(totalPage-1)*listShowLength); i++){
                newFileListShow[i] = fileList[(totalPage-1)*listShowLength+i];
            }
            setFileListPage(newFileListPage);
            setFileListShow(newFileListShow);
            this.setState({
                selectedSvsIndex: fileList.length-(totalPage-1)*listShowLength-1
            });
            // element.scrollTop = element.scrollHeight - element.clientHeight -100;
        }else{
            // this.getPic(selectedPicId-1)
            // if((selectedSvsId-1)<fileList[(fileListPage-1)*(listShowLength-10)].svsId){
            if(((selectedSvsId-1)>=(fileListPage-1)*listShowLength+1)&&((selectedSvsId-1)<=fileListPage*listShowLength)){
                // 当前页面内
                this.setState({
                    selectedSvsIndex: this.state.selectedSvsIndex-1
                })
            }else{
                const newFileListPage = Math.ceil((selectedSvsId-1)/listShowLength);
                let i: number;
                const length = (newFileListPage === totalPage) ? (fileList.length - (totalPage-1)*listShowLength) : listShowLength;
                for(i=0; i<length; i++){
                    newFileListShow[i] = fileList[(newFileListPage-1)*listShowLength+i]
                }
                // console.log(newFileListShow);
                setFileListPage(newFileListPage);
                setFileListShow(newFileListShow);
                this.setState({
                    selectedSvsIndex: ((selectedSvsId+1)%listShowLength === 0) ? (listShowLength-1) : ((selectedSvsId+1)%listShowLength-1)
                })
            }
            this.getPic(selectedSvsId-1);
            // this.setState({
            //     selectedPicId: selectedPicId-1
            // })
        }
    }
    public switchPic = (svsId: number, index: number) => (event: any) => {
        // const { fileList } = this.props;
        // const svsId = fileList[index].svsId;
        // this.setState({
        //     selectedPicId: svsId
        // });
        this.setState({
            selectedSvsIndex: index
        });
        this.getPic(svsId);
    }
    public getPic(svsIdNumber: number){
        const { picA, picB, selectSvs, setPicA, setPicB } = this.props;
        this.setState({
            imgDragPrePos: {
                x: 0,
                y: 0
            },
            imgZoomScale: 1
        })
        selectSvs(svsIdNumber);
        if(svsIdNumber === picA.svsId){
            getPicHttp(svsIdNumber+1)
            .then( res =>{
                const pic: IPicInfo = getPicData(res.data.response, svsIdNumber+1);
                setPicB(pic);
            })
            .catch( err => {
                console.error(err.message);
            })
        }else if(svsIdNumber === picB.svsId){
            getPicHttp(svsIdNumber+1)
            .then( res => {
                const pic: IPicInfo = getPicData(res.data.response, svsIdNumber+1);
                setPicA(pic);
            })
            .catch( err => {
                console.error(err.message);
            })
        }else{
            getPicHttp(svsIdNumber)
            .then( res => {
                const pic: IPicInfo = getPicData(res.data.response, svsIdNumber);
                setPicA(pic);
            })
            .catch( err => {
                console.error(err.message);
            })
            getPicHttp(svsIdNumber+1)
            .then( res => {
                const pic: IPicInfo = getPicData(res.data.response, svsIdNumber+1);
                setPicB(pic);
            })
            .catch( err => {
                console.error(err.message);
            })
        }
    }
    public dataSumary(){
        if(this.props.statistics.length === 0){
            getSummaryHttp().then( (res: any) => {
            // tslint:disable-next-line:no-console
            // console.log(res);
                const summaryStatistic = resolveSummary(res.data.response);
                // this.props.setSummary(summaryData.total);
                // this.props.setStatistics(summaryData.statistics);
                this.props.setStatistics(summaryStatistic);
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
    public renderTable(index: number, value: IFileListItem){
        // const oddBgStyle = { backgroundColor: '#EEEEEE' };
        const id = toFiveNumberString(value.svsId);
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
                onClick={this.switchPic(value.svsId, index)}>
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
                onClick={this.switchPic(value.svsId, index)}>
                <div className='table__item__id'>
                    <i  className='table__item__id__icon'
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
        const { fileList, fileListShow, 
                picA, picB, selectedRoiDisplayId, 
                selectAllRoi, selectedSvsId,
                selectRoi, showAllRoisFlag, 
                userName } = this.props;
        // const { selectedPicItem } = this.state;
        // const totalPage = Math.ceil(fileList.length/listShowLength);
        const { searchSvsIdInput } = this.state;
        const { imgDragPrePos, imgZoomScale, 
            showLogOutFlag, showZoomInFlag,
            showShortListFlag } = this.state;
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
                        <span className='sideBar__header__serialNumber'>{fileList.length < 30 ? fileList.length : 30}/{fileList.length}</span>
                        <i className='sideBar__header__icon' 
                            onClick={this.showShortList}/>
                    </div>
                    <div className='sideBar__search'>
                        <i className='search-icon'/>
                        <input type='text' 
                            value={searchSvsIdInput}
                            className='search-input'
                            placeholder='Search by ID'
                            onKeyUp={this.handleSvsIdEnter}
                            onChange={this.handleSvsIdInputChange}/>
                    </div>
                    <div className='sideBar__table__header'>
                        <div className='table__header__id'>ID</div>
                        <div className='table__header__magn'>MAGN</div>
                        <div className='table__header__roi'>ROI</div>
                    </div>
                    <div className='sideBar__table__content'
                        onScroll={this.handleTableScroll}>
                        {fileListShow.map((value,index)=> this.renderTable(index, value))}
                    </div>
                </div>
                <div className='main__sideBar__brief' style={this.state.showShortListFlag ? undefined : hidden}>
                    <div className='sideBar__brief__header'>
                        <i className='sideBar__brief__header__icon' 
                            onClick={this.showShortList} />
                    </div>
                    <div className='sideBar__brief__table__header'>ROI</div>
                    <div className='sideBar__brief__table__content'
                            onScroll={this.handleTableScroll}
                            // onScroll={ (Math.ceil(fileList.length/listShowLength)<50)&&(fileListPage === totalPage) ? undefined : this.handleImgWheel}
                            >
                        {fileListShow.map((value, index)=> this.renderBriefTable(index, value))}
                    </div>
                </div>
                <PicContent 
                    roiStatusChange={this.roiStatusChange}
                    selectedSvsId={selectedSvsId}
                    selectedRoiDisplayId={selectedRoiDisplayId}
                    selectAllRoi={selectAllRoi}
                    selectRoi={selectRoi}
                    showAllRoisFlag={showAllRoisFlag}
                    showShortListFlag={showShortListFlag}
                    pic={picA}
                /> 
                <PicContent
                    roiStatusChange={this.roiStatusChange}
                    selectedSvsId={selectedSvsId}
                    selectedRoiDisplayId={selectedRoiDisplayId}
                    selectAllRoi={selectAllRoi}
                    selectRoi={selectRoi}
                    showAllRoisFlag={showAllRoisFlag}
                    showShortListFlag={showShortListFlag}
                    pic={picB}
                />
            </div>
        )
    }
}

function toFiveNumberString(i: number){
    const decimal = i / Math.pow(10,5);
    const decimalStr = decimal.toFixed(5)+'';
    return decimalStr.substr(decimalStr.indexOf('.')+1)
}
// function debounce(method: any, context: any) {
//     clearTimeout(method.tId);
//     method.tId = setTimeout(function() {
//       method.call(context);
//     }, 1000);
//   }
function debounce(func:any, wait=500) {
    let timeout:any;  // 定时器变量
    return function(event:any){
        clearTimeout(timeout);  // 每次触发时先清除上一次的定时器,然后重新计时
        event.persist && event.persist()   //保留对事件的引用
        //const event = e && {...e}   //深拷贝事件对象
        timeout = setTimeout(()=>{
            func(event)
        }, wait);  // 指定 xx ms 后触发真正想进行的操作 handler
    };
}