import * as React from 'react';
import * as ReactDom from 'react-dom';
import { getPicHttp, getSummaryHttp, setRoiStatus } from '../api';
// import { CANCER_TYPE as cancerType, PIC_SIZE as picSize, ROI_SCORE_THRESHOLD as threshold } from '../constant';
import { CANCER_TYPE as cancerType, FILE_LIST_DISPLAY_NUMBER as listShowLength, PIC_SIZE as picSize, ROI_MENU_MAX_LENGTH as menuMaxLength } from '../constant';
import '../css/global.scss';
import '../css/mainPage.scss';
import history from '../router/history';
import { IFileListItem, IPicInfo, IRoiInfo, ISummaryStatisticsItem, } from '../store';
// import draw  from '../utils/drawPic';
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
    setPic: (pic: IPicInfo) => void,
    setStatistics: (data: ISummaryStatisticsItem[]) => void,
    // setSummary: (data: ISummaryTotal) => void,
    showAllRoisFlag: boolean,
    statistics: ISummaryStatisticsItem[]
    userName: string,
    userSignOut: () => void,
    pic: IPicInfo
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
        this.handleTableScroll = this.handleTableScroll.bind(this);
        this.zoomInFlagChange = this.zoomInFlagChange.bind(this);
        this.handleImgWheel = this.handleImgWheel.bind(this);
        // this.handleImgDrag = this.handleImgDrag.bind(this);
        this.handleImgMouseDown = this.handleImgMouseDown.bind(this);
        // this.handleImgMouseUp = this.handleImgMouseUp.bind(this);
        this.getPic = this.getPic.bind(this);
        this.handleSvsIdInputChange = this.handleSvsIdInputChange.bind(this);
        this.handleSvsIdEnter = this.handleSvsIdEnter.bind(this);
        // this.hoverEnterRoi = this.hoverEnterRoi.bind(this);
        // this.hoverLeaveRoi = this.hoverLeaveRoi.bind(this);
    }
    public handleSvsIdEnter(e: any){
        const { searchSvsIdInput } = this.state;
        const { fileList, fileListPage, selectSvs, setFileListPage, setFileListShow, setPic} = this.props;
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
    public handleImgMouseDown(e:any){
        // console.log(e);
        // this.setState({
        //     imgDragFlag: true,
        //     imgDragPrePos: {
        //         x: e.clientX,
        //         y: e.clientY
        //     }
        // })
        e.preventDefault();
        const { imgDragPrePos } = this.state;
        const disx = e.pageX - imgDragPrePos.x || 0 ;
        const disy = e.pageY - imgDragPrePos.y || 0 ;
        let _this = this;
        document.onmouseup = function() {
            // document.getElementById('svs_img').onmouseup = function(){
                document.onmousemove = null;
                document.onmousedown = null;
            }
        document.onmousemove = function(ev: any){
        // document.getElementById('svs_img').onmousemove = function(ev: any){
            _this.setState({
                imgDragPrePos: {
                    x: ev.pageX - disx,
                    y: ev.pageY - disy
                }
            })
        }
       
    }
    // public handleImgMouseUp(e: any){
    //     console.log(e);
    //     this.setState({
    //         imgDragFlag: false
    //     })
    // }
    // public handleImgDrag(e:any){
    //     const { imgDragFlag, imgDragPrePos, imgZoomStyle } = this.state;
    //     if(imgDragFlag){
    //         const newPosX = imgZoomStyle.left || 0 + e.clientX - imgDragPrePos.x + 'px';
    //         const newPosY = imgZoomStyle.top || 0 + e.clientY - imgDragPrePos.y + 'px';
    //         this.setState({
    //             imgZoomStyle: {
    //                 ...imgZoomStyle,
    //                 left: newPosX,
    //                 top: newPosY
    //             }
    //         })
    //         console.log(newPosX);
    //     }
    // }
    public handleImgWheel(e:any){
        // console.log(e.deltaY);
        const eve = e||window.event;
        const { imgZoomScale, imgZoomStyle } = this.state; 
        // let scale =  scale + e.deltaY * -0.01;
        let scale = imgZoomScale + eve.deltaY * -0.01;
        // Restrict scale
        scale = Math.min(Math.max(.125, scale), 4);
        this.setState({
            imgZoomScale: scale,
            // imgZoomStyle: {
            //     ...imgZoomStyle,
            //     transform: `scale(${scale})`
            // }
        })

        // const imgEle = document.getElementById('svg_img');
        // const oldWidth = imgEle.offsetWidth;
        // const oldHeight = imgEle.offsetHeight;
        // const oldLeft = imgEle.offsetLeft;
        // const oldTop = imgEle.offsetTop;
        // const scaleX = (e.clientX - oldLeft) / oldWidth;
        // const scaleY = (e.clientY - oldTop) / oldHeight;
        // if(e.deltaY > 0 ) {
        //     this.setState({
        //         imgZoomStyle: {
        //             height: imgEle.offsetHeight * 0.9 + 'px',
        //             width: imgEle.offsetWidth * 0.9 + 'px'
        //         }
        //     })
        // }else{
        //     this.setState({
        //         imgZoomStyle: {
        //             height: imgEle.offsetHeight * 1.1 + 'px',
        //             width: imgEle.offsetWidth * 1.1 + 'px'
        //         }
        //     })
        // }
    }
    public zoomInFlagChange = (value: boolean) => (event:any) => {
        if(this.props.selectedRoiDisplayId !== -1){
            this.setState({
                showZoomInFlag: value
            })
        }
    }
    // public componentDidMount(){
    //     const clientHeight = document.getElementsByClassName('sideBar__table__content')[0].clientHeight;
    //     console.log(clientHeight);
    // }
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
            // else if(fileListPage === (totalPage-1) ){
            //     // for(i=0; i<(fileList.length-fileListPage*(listShowLength-10)); i++){
            //     //     newFileListShow[i] = fileList[fileListPage*(listShowLength-10)+i];
            //     // }
            //     for(i=0; i<(fileList.length-fileListPage*listShowLength); i++){
            //         newFileListShow[i] = fileList[fileListPage*listShowLength + i];
            //     }
            //     setFileListPage(totalPage);
            //     setFileListShow(newFileListShow);
            //     // element.scrollTop = 100;
            //     // elementBrief.scrollTop = 100;
            //     element.scrollTop = 10;
            //     elementBrief.scrollTop = 10;
            // }
        }
        // if(scrollTop < 50){
        if(scrollTop === 0){
            if(fileListPage !== 1){
                const newFileListPage = fileListPage - 1;
                const newFileList: IFileListItem[] = [];
                let i: number;
                // if(fileListPage === 2){
                //     for(i=0; i<listShowLength; i++){
                //         newFileList[i] = fileList[i];
                //     }
                // }else{
                //     for(i=0; i<listShowLength; i++){
                //         newFileList[i] = fileList[(fileListPage-2)*(listShowLength-10) + i]
                //     }
                // }
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
    // public handleTableScroll(e:any){
    //     const { fileList, fileListPage, setFileListShow, setFileListPage } = this.props;
    //     const { preScrollTop } = this.state;
    //     const totalPage = Math.ceil(fileList.length/((listShowLength/3)*2));
    //     const scrollHeight = e.target.scrollHeight;
    //     const clientHeight = e.target.clientHeight;
    //     const scrollTop = e.target.scrollTop;
    //     // console.log('scrollTop'+scrollTop);
    //     // console.log('clientHeight'+clientHeight);
    //     // console.log('scrollHeight'+scrollHeight);
    //     if(Math.abs(scrollTop - clientHeight) < 80){
    //         if(preScrollTop <= scrollTop){
    //             console.log('xia');
    //             if(fileListPage !== totalPage - 1){
    //                 const newFileListPage = fileListPage + 1;
    //                 const newFileListShow: IFileListItem[] = [];
    //                 let i: number;
    //                 for(i=0; i<listShowLength; i++){
    //                     newFileListShow[i] = fileList[fileListPage*((listShowLength/3)*2)+i];
    //                 }
    //                 setFileListPage(newFileListPage);
    //                 setFileListShow(newFileListShow);
    //                 document.getElementsByClassName('sideBar__table__content')[0].scrollTop = 0;
    //             }else{
    //                 const lastFileListShow: IFileListItem[] = [];
    //                 let i: number;
    //                 const length = fileList.length - fileListPage*((listShowLength/3)*2);
    //                 for(i=0; i<length; i++){
    //                     lastFileListShow[i] = fileList[fileListPage*((listShowLength/3)*2)+i];
    //                 }
    //                 setFileListShow(lastFileListShow);
    //                 document.getElementsByClassName('sideBar__table__content')[0].scrollTop = 0;
    //             }
    //         }else if(preScrollTop > scrollTop){
    //             console.log('shang');
    //             if(fileListPage !== 1){
    //                 const newFileListPage = fileListPage - 1;
    //                 const newFileListShow: IFileListItem[] = [];
    //                 let i: number;
    //                 for(i=0; i<listShowLength; i++){
    //                     newFileListShow[i] = fileList[(fileListPage-2)*((listShowLength/3)*2)+i];
    //                 }
    //                 setFileListPage(newFileListPage);
    //                 setFileListShow(newFileListShow);
    //                 document.getElementsByClassName('sideBar__table__content')[0].scrollTop = clientHeight * 2;
    //             }
    //         }
    //     }
    //     setTimeout(()=>{
    //         this.setState({
    //             preScrollTop: scrollTop
    //         })
    //     },0)
    // }
    public setRoiMenuItemIndex = (index: number) => (event:any) => {
        // this.setState({
        //     roiMenuItemIndex: index
        // })
        this.props.selectRoi(index);
    }
    public showAllRoisFlagChange = (flag: boolean) => (event: any) => {
        this.props.selectAllRoi(flag);
        if(flag){
            this.props.selectRoi(-1);
        }
        // this.setState({
        //     showAllRoisFlag: !this.state.showAllRoisFlag
        // })
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
        const { fileList, fileListPage, fileListShow,  pic, setFileList, setFileListShow, setPic, statistics } = this.props;
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
                // tslint:disable-next-line:no-console
                // console.log(res);
                    // const summaryData = resolveSummary(resSum.data.response);
                    // for(let i=0; i<summaryData.statistics.length; i++){
                    //     for(let j=0; j<statistics.length; j++){
                    //         if(summaryData.statistics[i].subject === statistics[j].subject){
                    //             summaryData.statistics[i].selectFalse = statistics[j].selectFalse;
                    //             summaryData.statistics[i].selectTrue = statistics[j].selectTrue;
                    //             summaryData.statistics[i].selectNotSure = statistics[j].selectNotSure;
                    //             summaryData.statistics[j].selectUnlabelled = statistics[j].selectUnlabelled;
                    //         }
                    //     }
                    // }
                    const newStatistic = resolveNewSummary(resSum.data.response, statistics);
                    // for(let i=0; i<newStatistic.length; i++){
                    //     for(let j=0; j<statistics.length; j++){
                    //         if(newStatistic[i].subject === statistics[j].subject){
                    //             newStatistic[i].selectFalse = statistics[j].selectFalse;
                    //             newStatistic[i].selectNotSure = statistics[j].selectNotSure;
                    //             newStatistic[i].selectTrue = statistics[j].selectTrue;
                    //             newStatistic[i].selectUnlabelled = statistics[j].selectUnlabelled;
                    //         }
                    //     }
                    // }
                    // this.props.setSummary(summaryData.total);
                    // this.props.setStatistics(summaryData.statistics);
                    this.props.setStatistics(newStatistic);
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
            // selectedRoiId: id
            hoveredRoiId: id
        });
        // this.props.selectRoi(id);
    }
    public roiMouseLeave(){
        this.setState({
            // selectedRoiId: -1
            hoveredRoiId: -1
        });
        // this.props.selectRoi(-1);
    }
    // public selectRoiClick = (id: number) => (event: any) =>{
    //     this.props.sele
    // }
    // public componentDidMount(){
    //     draw(this.props.pic);
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
        const { selectSvs, setPic } = this.props;
        this.setState({
            imgDragPrePos: {
                x: 0,
                y: 0
            },
            imgZoomScale: 1
        })
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
            const eleImg:any = document.getElementById('svs-pic');
            eleImg.src = '';
            eleImg.src = pic.picUrl;        
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
    public renderRoiMenu(value: IRoiInfo, index: number){
        // const { selectedRoiId, wantToChangeIndex } = this.state;
        const { wantToChangeIndex, hoveredRoiId } = this.state;
        const { pic } = this.props;
        const roiWidth = ((value.x2-value.x1)/pic.picWidth) * picSize;
        const smallRoiMenuStyle = {
            // width: '25px',
            // height: '25px',
            // marginLeft: '5px',
            width: roiWidth/5 + 'px',
            height: roiWidth/5 + 'px',
            marginLeft: roiWidth/15 + 'px',
            // width: roiWidth/3 + 'px',
            // height: roiWidth/3 + 'px',
            // marginLeft: roiWidth/8 + 'px',
            backgroundSize: 'cover'
        }
        const smallRoiMenuAreaStyle = {
            right: roiWidth/20 + 'px',
            bottom: roiWidth/20 + 'px'
        };
        const wantToChangeStyle ={
            // width: '20px',
            // height: '20px',
            // marginLeft: '5px',
            width: roiWidth/7 + 'px',
            height: roiWidth/7 + 'px',
            marginLeft: roiWidth/15 + 'px',
            backgroundSize: 'cover'
        };
        if(value.status === 'unlabeled'){
            if(hoveredRoiId === value.roiId){
              return( 
                    <div className='main__content__roi__menu'
                        style={roiWidth < menuMaxLength ? smallRoiMenuAreaStyle : undefined} >
                        <i className='roi__menu_notSure'
                            style={ roiWidth < menuMaxLength ? smallRoiMenuStyle : undefined }
                            onClick={this.roiStatusChange(value.roiId,'notsure',index)} />
                        <i className='roi__menu_true' 
                            style={ roiWidth < menuMaxLength ? smallRoiMenuStyle : undefined}
                            onClick={this.roiStatusChange(value.roiId, 'true', index)} />
                        <i className='roi__menu_false' 
                            style={ roiWidth < menuMaxLength ? smallRoiMenuStyle : undefined}
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
                        style={roiWidth < menuMaxLength ? smallRoiMenuAreaStyle : undefined} 
                        >
                        <i className='roi__menu_notSure'
                            style={ roiWidth < menuMaxLength ? wantToChangeStyle : undefined}
                            onClick={this.roiStatusChange(value.roiId, 'notsure',index)} />
                        <i className='roi__menu_false'
                            style= { roiWidth < menuMaxLength ? wantToChangeStyle : undefined}
                            onClick={this.roiStatusChange(value.roiId, 'false', index)} />
                        <i className='roi__menu_true_hl' 
                            style={ roiWidth < menuMaxLength ? smallRoiMenuStyle : undefined}
                            onMouseEnter={this.wantToChange(index)} />
                    </div> 
                )
            }else{
                return(
                    <div className='main__content__roi__menu'
                        onMouseLeave={this.notWantToChange} 
                        style={roiWidth < menuMaxLength ? smallRoiMenuAreaStyle : undefined} 
                        >
                        <i className='roi__menu_true_hl'
                            style={ roiWidth < menuMaxLength ? smallRoiMenuStyle : undefined} 
                            onMouseEnter={this.wantToChange(index)} />
                    </div>
                )
            }
        }else if(value.status === 'false'){
            if(wantToChangeIndex === index){
                return(
                    <div className='main__content__roi__menu'
                        onMouseLeave={this.notWantToChange}
                        style={roiWidth < menuMaxLength ? smallRoiMenuAreaStyle : undefined} 
                        >
                        <i className='roi__menu_notSure'
                            style={ roiWidth < menuMaxLength ? wantToChangeStyle : undefined}
                            onClick = { this.roiStatusChange(value.roiId, 'notsure', index)} />
                        <i className='roi__menu_true'
                            style= { roiWidth < menuMaxLength ? wantToChangeStyle : undefined}
                            onClick={this.roiStatusChange(value.roiId, 'true', index)} />
                        <i className='roi__menu_false_hl' 
                            style={ roiWidth < menuMaxLength ? smallRoiMenuStyle : undefined}
                            onMouseEnter={this.wantToChange(index)} />
                    </div>
                )
            }else{
                return(
                    <div className='main__content__roi__menu'
                        onMouseLeave={this.notWantToChange}
                        style={roiWidth < menuMaxLength ? smallRoiMenuAreaStyle : undefined} 
                        >
                        <i className='roi__menu_false_hl' 
                            style={ roiWidth < menuMaxLength ? smallRoiMenuStyle : undefined}
                            onMouseEnter={this.wantToChange(index)} />
                    </div>
                )
            }
        }else if(value.status === 'notsure'){
            if(wantToChangeIndex === index){
                return(
                    <div className='main__content__roi__menu'
                        onMouseLeave={this.notWantToChange}
                        style={ roiWidth < menuMaxLength ? smallRoiMenuAreaStyle: undefined}
                        >
                        <i className='roi__menu_true'
                            style={ roiWidth < menuMaxLength ? wantToChangeStyle : undefined}
                            onClick={ this.roiStatusChange(value.roiId, 'true', index)} />
                        <i className='roi__menu_false'
                            style={ roiWidth < menuMaxLength ? wantToChangeStyle : undefined}
                            onClick={ this.roiStatusChange(value.roiId, 'false', index)} />
                        <i className='roi__menu_notSure_hl'
                            style={ roiWidth < menuMaxLength ? smallRoiMenuStyle : undefined}
                            onMouseEnter={this.wantToChange(index)} />
                    </div>
                )
            }else{
                return(
                    <div className='main__content__roi__menu'
                        onMouseLeave={this.notWantToChange}
                        style={roiWidth < menuMaxLength ? smallRoiMenuAreaStyle : undefined}
                        >
                        <i className='roi__menu_notSure_hl'
                            style={ roiWidth < menuMaxLength ? smallRoiMenuStyle : undefined}
                            onMouseEnter={this.wantToChange(index)} />
                    </div>
                )
            }
        }else{
            return null
        }
    }
    public renderRois(value: IRoiInfo,index:number){
        const { pic, showAllRoisFlag, selectedRoiDisplayId } = this.props;
        // const { selectedRoiId } = this.state;
        // const { roiMenuItemIndex } = this.state;
        // const { showZoomInFlag } = this.state;
        // const roiPosX = (value.x1/pic.picWidth)*picSize;
        // const roiPosY = (value.y1/pic.picHeight)*picSize;
        // const roiWidth = ((value.x2-value.x1)/pic.picWidth) * picSize;
        // const roiHeight = ((value.y2-value.y1)/pic.picHeight) * picSize;
        const roiPosX = (value.x1/pic.picWidth)*100;
        const roiPosY = (value.y1/pic.picWidth)*100;
        const roiWidth = ((value.x2-value.x1)/pic.picWidth) * 100;
        const roiHeight = ((value.y2-value.y1)/pic.picHeight) *100;
        let roiPosStyle = undefined,
            commonRoiTitleStyle = undefined;
            // proportion;
        // if(selectedRoiDisplayId !== value.roiId){
        // roiPosStyle = {
        //     left: roiPosX + 'px',
        //     height: roiHeight + 'px',
        //     top: roiPosY + 'px',
        //     width: roiWidth + 'px',
        // };
        roiPosStyle = {
            left: roiPosX + '%',
            height: roiHeight + '%',
            top: roiPosY + '%',
            width: roiWidth + '%'
        };
        // if(roiWidth < 86){
        //     commonRoiTitleStyle = {
        //         width: roiWidth + 'px'
        //     };
        // }else{
        //     commonRoiTitleStyle = undefined;
        // }
        if((roiWidth*picSize/100) < 86){
            commonRoiTitleStyle = {
                // width: roiWidth*picSize/100 + 'px'
                width: '100%'
            };
        }
        // }else{
        // if(showZoomInFlag && (selectedRoiDisplayId === value.roiId)){
        //     if(roiWidth >= roiHeight){
        //         proportion = picSize / roiWidth;
        //         roiPosStyle = {
        //             left: roiPosX*proportion + 'px',
        //             top: roiPosY*proportion + 'px',
        //             width: picSize + 'px',
        //             height: roiHeight*proportion + 'px'
        //         }
        //     }else{
        //         proportion = picSize / roiHeight;
        //         roiPosStyle = {
        //             left: roiPosX*proportion + 'px',
        //             top: roiPosY*proportion + 'px',
        //             width: roiWidth*proportion + 'px',
        //             height: picSize + 'px'
        //         }
        //     }
        // }
        
        // const smallRoiTitleTypeStyle = {
        //     fontSize: '14px'
        // };
        // const smallRoiTitleScoreStyle ={
        //     fontSize: '12px'
        // };
        const falseBorderStyle = {
            ...roiPosStyle,
            borderColor: '#FFE14F' 
        };
        const falseTitleStyle = {
            ...commonRoiTitleStyle,
            backgroundColor: '#FFE14F'
        };
        const tureBorderStyle = {
            ...roiPosStyle,
            borderColor: '#79FF6F'
        };
        const trueTitleStyle = {
            ...commonRoiTitleStyle,
            backgroundColor: '#79FF6F'
        };
        const notSureBorderStyle = {
            ...roiPosStyle,
            borderColor: '#FFC997'
        };
        const notSureTitleStyle = {
            ...commonRoiTitleStyle,
            backgroundColor: '#FFC997'
        };
        let roiTitleStyle, roiBorderStyle;
        switch(value.status){
            case 'true':
                roiTitleStyle = trueTitleStyle;
                roiBorderStyle = tureBorderStyle;
                break;
            case 'false':
                roiTitleStyle = falseTitleStyle;
                roiBorderStyle = falseBorderStyle;
                break;
            case 'unlabeled':
                roiTitleStyle = commonRoiTitleStyle;
                roiBorderStyle = roiPosStyle;
                break;
            case 'notsure':
                roiBorderStyle = notSureBorderStyle;
                roiTitleStyle = notSureTitleStyle;
                break;
        }
        if((roiPosY*picSize/100) < 23){
            roiTitleStyle = {
                ...roiTitleStyle,
                top: '0px'
            }
        }
        // if((showAllRoisFlag) || (roiMenuItemIndex === index)){
        if((showAllRoisFlag) || (selectedRoiDisplayId === value.roiId)){
            return (
                <div className='main__content__roi' 
                    // style={roiPosStyle} 
                    key={index} 
                    // onClick={this.selectRoiFn(value.roiId)}
                    onMouseEnter={this.roiMouseEnter(value.roiId)}
                    onMouseLeave={this.roiMouseLeave}
                    // style={this.props.selectedRoiId === value.roiId ? zIndexStyle : roiPosStyle} 
                    // style={ selectedRoiId === value.roiId ? zIndexStyle : roiPosStyle}
                    style={roiBorderStyle}
                    >
                    <div className='main__content__roi__title'
                        style={ roiTitleStyle } >
                        <span className='main__content__roi__title__type'
                            >{cancerType[value.type]}</span>
                        <span className='main__content__roi__title__score'
                            >{value.score.toFixed(2)}</span>
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
        // const { roiMenuItemIndex } = this.state;
        const {  selectedRoiDisplayId ,showAllRoisFlag } = this.props;
        const greenStyle = { backgroundColor: '#79FF6F'};
        const yellowStyle = { backgroundColor: '#FFE14F'};
        const grayStyle = { backgroundColor: '#BBBBBB'};
        const notSureStyle = { backgroundColor : '#FFC997'};
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
                break;
            case 'notsure':
                valueStyle = notSureStyle;
                break;
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
            // if(roiMenuItemIndex === index){
            if(selectedRoiDisplayId === value.roiId){
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
                        onClick={this.setRoiMenuItemIndex(value.roiId)} 
                        key={index}
                        > {index + 1} </div> 
                )
            }
        }
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
        const { fileList, fileListShow, pic, selectedSvsId, showAllRoisFlag, userName } = this.props;
        // const { selectedPicItem } = this.state;
        // const totalPage = Math.ceil(fileList.length/listShowLength);
        const { searchSvsIdInput } = this.state;
        const { imgDragPrePos, imgZoomScale, showLogOutFlag, showZoomInFlag } = this.state;
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
                        { !showZoomInFlag && <i className='header__menu__switch_zoom_in' 
                            onClick={this.zoomInFlagChange(true)} />}
                        { showZoomInFlag && <i className='header__menu__switch_zoom_out' 
                            onClick={this.zoomInFlagChange(false)} />}
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
                <div className='main__content'
                    style={this.state.showShortListFlag ? shortListContentStyle : undefined}>
                    <div className='main__content__pic__area'>
                        <div id='svs_img' 
                            style={{
                                left: imgDragPrePos.x,
                                top: imgDragPrePos.y,
                                transform: `scale(${imgZoomScale})`,
                                position: 'relative'
                            }}
                            onWheel={this.handleImgWheel}
                            // onMouseMove={this.handleImgDrag}
                            onMouseDown={this.handleImgMouseDown}
                            // onMouseUp={this.handleImgMouseUp}
                            >
                            <img id='svs-pic' 
                                src={pic.picUrl} 
                                className='main__content__pic'
                                // style={zoomInImgStyle} 
                                />
                            {/* <canvas id='svsPic' /> */}
                            {pic.roi.map((value, index)=>this.renderRois(value, index))}
                        </div>
                    </div>
                    <div className='main__content__roi__switch'>
                        <div className='roi__switch_area'>
                            {pic.roi.map((value, index) => this.renderRoiSwitchBarItem(value, index))}
                        </div>
                        {/* <i className={showAllRoisFlag ? 'roi__switch_all_enable' : 'roi__switch_all_disable'} 
                            onClick={this.showAllRoisFlagChange} /> */}
                        <i className='roi__switch_all_enable' 
                            style={ showAllRoisFlag ? undefined : hidden}
                            onClick={this.showAllRoisFlagChange(false)} />
                        <i className='roi__switch_all_disable' 
                            style={ showAllRoisFlag ? hidden : undefined}
                            onClick={this.showAllRoisFlagChange(true)} />
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