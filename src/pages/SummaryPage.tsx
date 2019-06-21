import * as React from 'react';
import { getPicHttp, getSummaryDetail } from '../api';
import { CANCER_TYPE as cancerType, FILE_LIST_DISPLAY_NUMBER as listShowLength } from '../constant';
import '../css/global.scss';
import '../css/mainPage.scss';
import '../css/summaryPage.scss';
import history from '../router/history';
import { IFileListItem, IPicInfo, IRoiInfo, ISummaryItem, ISummaryStatisticsItem } from '../store';
import { getPicData } from '../utils/resolvePic';

interface IRoiReqsItem{
    cancer_id: number,
    cancer_type: string,
    false_req: boolean,
    not_sure_req: boolean,
    true_req: boolean,
    unlabeled_req: boolean
}
interface IRoiReqs{
    selected: IRoiReqsItem[],
    selectedPage: number
}
interface IProps{
    fileList: IFileListItem[],
    fileListPage: number,
    setRoiPage: (value: number) => void,
    selectedRoisPage: number,
    selectAllRoi: (flag: boolean) => void,
    selectRoi: (id: number) => void,
    selectSvs: (id: number) => void,
    // setSummary: (data: ISummary) => void,
    setFileListPage: (page: number) => void,
    setFileListShow: (list: IFileListItem[]) => void,
    setFilter: (data: ISummaryItem[]) => void,
    setFilterDisplay: (data: ISummaryItem[]) => void,
    setPicA: (pic: IPicInfo) => void,
    setPicB: (pic: IPicInfo) => void,
    setStatistics: (data: ISummaryStatisticsItem[]) => void,
    setSummaryTotalPage: (page: number) => void,
    // summary: ISummary;
    summaryDisplay: ISummaryItem[],
    // summaryFilter: ISummaryItem[],
    summaryStatistics: ISummaryStatisticsItem[],
    summaryTotalPage: number,
    // summaryTotal: ISummaryTotal,
    userName: string
}
interface IStates{
    // summaryFilter: ISummaryItem[];
    filterRoiPicUrl: string[],
    selectedRoi: ISummaryItem,
    selectedRoiIndex: number,
    selectedRoiFlag: boolean,
}

export default class SummaryPage extends React.Component<IProps, IStates>{
    constructor(props: IProps){
        super(props);
        this.state = {
            // summaryFilter: []
            filterRoiPicUrl: [],
            selectedRoi: {
                roiId: -1,
                roiUrl: '',
                status: '',
                svsId: -1,
                svsUrl: '',
                type: '',
                userName: ''
            },
            selectedRoiFlag: false,
            selectedRoiIndex: 0,
        }
        this.showDetailFlagChange = this.showDetailFlagChange.bind(this);
        this.filterRoi = this.filterRoi.bind(this);
        this.changeRoiPages = this.changeRoiPages.bind(this);
        this.showSingleRoi = this.showSingleRoi.bind(this);
        this.closeSingleRoi = this.closeSingleRoi.bind(this);
        this.preSingleRoi = this.preSingleRoi.bind(this);
        this.nextSingleRoi = this.nextSingleRoi.bind(this);
        this.editSingleRoi = this.editSingleRoi.bind(this);
    }
    public editSingleRoi(){
        const { fileList, selectAllRoi, selectRoi, selectSvs, setPicA, setPicB, setFileListPage, setFileListShow } = this.props;
        // this.props.selectSvs(this.state.selectedRoi.svsId);
        const { selectedRoi } = this.state;
        selectAllRoi(false);
        selectRoi(selectedRoi.roiId);
        selectSvs(selectedRoi.svsId);
        getPicHttp(selectedRoi.svsId).then( (res: any) => {
            const pic: IPicInfo = getPicData(res.data.response, selectedRoi.svsId);
            setPicA(pic);
            const newFileListPage = Math.ceil(pic.svsId/listShowLength);
            const newFileListShow: IFileListItem[] = [];
            const totalPage = Math.ceil(fileList.length/listShowLength);
            const length = (newFileListPage === totalPage) ? (fileList.length - (totalPage-1)*listShowLength) : listShowLength;
            for(let i=0; i<length; i++){
                newFileListShow[i] = fileList[(newFileListPage-1)*listShowLength + i];
            } 
            setFileListPage(newFileListPage);
            setFileListShow(newFileListShow);
            history.push('/mainPage');
            // history.push('/roi/mainPage');
        }).catch( error =>{
            // console.error(error);
        });
        getPicHttp(selectedRoi.svsId+1)
        .then( res => {
            const pic: IPicInfo = getPicData(res.data.response, selectedRoi.svsId+1);
            setPicB(pic);
        })
        .catch(err => {
            console.error(err.message);
        })
    }
    public showSingleRoi = (index: number) => (event: any) => {
        const { summaryDisplay } = this.props;
        this.setState({
            selectedRoi: summaryDisplay[index],
            selectedRoiFlag: true,
            selectedRoiIndex: index
        });
    }
    public closeSingleRoi(){
        this.setState({
            selectedRoiFlag: false
        });
    }
    public preSingleRoi(){
        const { summaryDisplay } = this.props;
        const { selectedRoiIndex } = this.state;
        let newSelectedRoiIndex: number;
        if(selectedRoiIndex === 0){
            newSelectedRoiIndex = 7;
        }else{
            newSelectedRoiIndex = selectedRoiIndex - 1;
        }
        this.setState({
            selectedRoi: summaryDisplay[newSelectedRoiIndex],
            selectedRoiIndex: newSelectedRoiIndex
        });
    }
    public nextSingleRoi(){
        const { summaryDisplay } = this.props;
        const { selectedRoiIndex } = this.state;
        let newSelectedRoiIndex : number;
        if(selectedRoiIndex === 7){
            newSelectedRoiIndex = 0;
        }else{
            newSelectedRoiIndex = selectedRoiIndex + 1;
        }
        this.setState({
            selectedRoi: summaryDisplay[newSelectedRoiIndex],
            selectedRoiIndex: newSelectedRoiIndex
        })
    }
    public changeRoiPages(){
        const { setRoiPage, selectedRoisPage, setFilter, summaryStatistics } = this.props;
        const newFilter:ISummaryItem[] = [];
        const newRoiPage: number = selectedRoisPage+1;
        const roiReqs: IRoiReqs = {
            selected: [],
            selectedPage: newRoiPage
        }
        for(let i=0; i<summaryStatistics.length; i++){
            roiReqs.selected[i] = {
                cancer_id: summaryStatistics[i].id,
                cancer_type: summaryStatistics[i].subject,
                false_req: summaryStatistics[i].selectFalse,
                not_sure_req: summaryStatistics[i].selectNotSure,
                true_req: summaryStatistics[i].selectTrue,
                unlabeled_req: summaryStatistics[i].selectUnlabelled
            }
        }
        getSummaryDetail(JSON.stringify(roiReqs))
        .then( (res:any)=>{
            const newFilter: ISummaryItem[] = [];
            for(let i=0; i<res.data.response.data.length; i++){
                const v = res.data.response.data[i];
                newFilter[i] = {
                    roiId: v.roi_id,
                    roiUrl: v.roi_url,
                    status: v.status,
                    svsId: v.svs_id,
                    svsUrl: v.svs_url,
                    type: v.cancer_type,
                    userName: v.user_name
                }
            }
            const imgEles = document.getElementsByTagName('img');
            for(let i=0; i<imgEles.length; i++){
                imgEles[i].src = '';
            }
            setFilter(newFilter);
        })
        .catch( err => {
            console.error(err.message);
        })
        // const length = summaryDisplay.length < 48 ? summaryDisplay.length : 48;
        // const length = ((selectedRoisPage+2)*48 > summaryFilter.length) ? (summaryFilter.length - (selectedRoisPage+1)*48) : 48;
        // // tslint:disable-next-line:no-console
        // // console.log(length);
        // for(i=0; i<length; i++){
        //     newFilterDisplay[i] = summaryFilter[(selectedRoisPage+1)*48+i];
        // }
        // roiPageNext();
        setRoiPage(newRoiPage);
        // tslint:disable-next-line:no-console
        // console.log(newFilterDisplay);
        // tslint:disable-next-line:no-console
        // console.log(summaryFilter)
    }
    public filterRoi = (index: number, label: string) => (event: any) => {
        const newStatistics:ISummaryStatisticsItem[] = JSON.parse(JSON.stringify(this.props.summaryStatistics));
        switch(label){
            case 'true':
                newStatistics[index].selectTrue = !newStatistics[index].selectTrue;
                break;
            case 'false':
                newStatistics[index].selectFalse = !newStatistics[index].selectFalse;
                break;
            case 'notLabelled':
                newStatistics[index].selectUnlabelled = !newStatistics[index].selectUnlabelled;
                break;
            case 'notSure':
                newStatistics[index].selectNotSure = !newStatistics[index].selectNotSure;
                break;
        }
        // let newSummaryData: ISummaryItem[] = [];
        const { setFilter, setStatistics, setSummaryTotalPage ,setRoiPage } = this.props;
        setRoiPage(1);
        setStatistics(newStatistics);
        const roiReqs:IRoiReqs = {
            selected: [],
            selectedPage: 1
        };
        for(let i=0; i<newStatistics.length; i++){
            roiReqs.selected[i] = {
                cancer_id: newStatistics[i].id,
                cancer_type: newStatistics[i].subject,
                false_req: newStatistics[i].selectFalse,
                not_sure_req: newStatistics[i].selectNotSure,
                true_req: newStatistics[i].selectTrue,
                unlabeled_req: newStatistics[i].selectUnlabelled
            }
        }
        getSummaryDetail(JSON.stringify(roiReqs))
        .then( (res: any) => {
            const newFilter: ISummaryItem[] = [];
            for(let i=0; i<res.data.response.data.length; i++){
                const v = res.data.response.data[i];
                newFilter[i] = {
                    roiId: v.roi_id,
                    roiUrl: v.roi_url,
                    status: v.status,
                    svsId: v.svs_id,
                    svsUrl: v.svs_url,
                    type: v.cancer_type,
                    userName: v.user_name
                }
            }
            setFilter(newFilter);
            const resTotalPage = res.data.response.totalPage;
            setSummaryTotalPage(resTotalPage);
        })
        .catch( error => {
            console.error(error.message);
        })
        // setRoiPage(0);
        // let i: number;
        // for(i=0; i<newStatistics.length; i++){
        //     // switch(nextProps.statistics[i].subject){
        //     //     case cancerType.N:
        //     //         if()
        //     // }
        //     if(newStatistics[i].selectFalse){
        //         newSummaryData = newSummaryData.concat(summaryTotal[newStatistics[i].subject].false);
        //     }
        //     if(newStatistics[i].selectTrue){
        //         newSummaryData = newSummaryData.concat(summaryTotal[newStatistics[i].subject].true);
        //     }
        //     if(newStatistics[i].selectUnlabelled){
        //         newSummaryData = newSummaryData.concat(summaryTotal[newStatistics[i].subject].unlabelled);
        //     }
        //     if(newStatistics[i].selectNotSure){
        //         newSummaryData = newSummaryData.concat(summaryTotal[newStatistics[i].subject].notSure);
        //     }
        // }
        // this.props.setFilter(newSummaryData);
        // const initEightFilters: ISummaryItem[] = [];
        // let j:number;
        // if(newSummaryData.length){
        //    const length = newSummaryData.length > 48 ? 48 : newSummaryData.length;
        //    for(j=0; j<length; j++){
        //     initEightFilters[j] = newSummaryData[j];
        //    } 
        // }
        // this.props.setFilterDisplay(initEightFilters);
    }
    public showDetailFlagChange = (index: number) => (event: any) =>{
        // const newSummaryData = this.state.summaryData;
        // newSummaryData[index].showDetialFlag = !this.state.summaryData[index].showDetialFlag;
        // this.setState({
        //     summaryData: newSummaryData
        // });
        // const newSummary = JSON.parse(JSON.stringify(this.props.summary));
        // newSummary.statistics[index].showDetialFlag = !newSummary.statistics[index].showDetialFlag;
        // this.props.setSummary(newSummary);
        const newStatistics: ISummaryStatisticsItem[] = JSON.parse(JSON.stringify(this.props.summaryStatistics));
        newStatistics[index].showDetialFlag = !newStatistics[index].showDetialFlag;
        this.props.setStatistics(newStatistics);
    }
    public mainPage(){
        history.push('/mainPage');
        // history.push('/roi/mainPage');
    }
    public renderSummaryLabelItemDetail(value: ISummaryStatisticsItem, index: number){
        if(value.showDetialFlag){
            return (
                <div className='summary__item__content'>
                    <div className='summary__item__content__true'>
                        {/* <input type='checkbox' 
                            onClick={this.filterRoi(index, 'true')} /> */}
                        <i className={value.selectTrue ? 'content__select__icon' : 'content__unselect__icon'}
                            onClick={this.filterRoi(index, 'true')} />
                        <span>True ({value.labelTrueNumber})</span>
                    </div>
                    <div className='summary__item__content__false'>
                        {/* <input type='checkbox' onClick={this.filterRoi(index, 'false')} /> */}
                        <i className={ value.selectFalse ? 'content__select__icon' : 'content__unselect__icon'}
                            onClick={this.filterRoi(index, 'false')} />
                        <span>False ({value.labelFalseNumber})</span>
                    </div>
                    <div className='summary__item__content__notLabeled'>
                        {/* <input type='checkbox' onClick={this.filterRoi(index, 'notLabelled')} /> */}
                        <i className={ value.selectUnlabelled ? 'content__select__icon' : 'content__unselect__icon'}
                            onClick={this.filterRoi(index, 'notLabelled')} />
                        <span>Non-labelled ({value.nonLabelNumber})</span>
                    </div>
                    <div className='summary__item__content__notSure'>
                        <i className={ value.selectNotSure ? 'content__select__icon' : 'content__unselect__icon' }
                            onClick={this.filterRoi(index,'notSure')} />
                        <span>Not Sure ({value.notSureNumber})</span>
                    </div>
                </div>
            )
        }else{
            return undefined
        }
    }
    public renderSummaryLabelItem(value:ISummaryStatisticsItem, index: number){
        return(
            <div className='summary__item' key={index}>
                <div className='summary__item__header'>
                    <span className='summary__item__header__title'>{cancerType[value.subject]} ({value.totalNumber})</span>
                    <i className={value.showDetialFlag ? 'summary__item__header__dropUpIcon' : 'summary__item__header__dropDownIcon'} 
                        // onClick={()=>this.showDetailFlagChange(index)} />
                        onClick={this.showDetailFlagChange(index)} />
                </div>
                {this.renderSummaryLabelItemDetail(value, index)}
            </div>
            
        )
    }
    public renderDisplayItem(index: number, value: ISummaryItem){
         // tslint:disable-next-line:no-console
        //  console.log(value);
        let labelClass: string = '';
        switch(value.status){
            case 'true':
                labelClass = 'rois__pic__label_true';
                break;
            case 'false':
                labelClass = 'rois__pic__label_false';
                break;
            case 'notsure': 
                labelClass = 'rois__pic__label_notSure';
                break;
            case 'unlabeled':
                // labelClass = 'rois__pic__label_unlabelled';
                labelClass = undefined;
                break;
        }
        return(
            <div className='rois' key={index}>
                <div className='rois__pic'>
                    <img src={value.roiUrl} 
                     onClick={this.showSingleRoi(index)} />
                    <i className={labelClass} />
                </div>
                <div>{cancerType[value.type]}</div>
                <div>from image {toFiveNumberString(value.svsId)}</div>
                <div>Editor: {value.userName || 'None'}</div>
            </div>
        )
    }
    public renderMainContent(){
        const { selectedRoiFlag, selectedRoi } = this.state;
        const { summaryDisplay, selectedRoisPage, summaryTotalPage } = this.props;
        if(summaryDisplay.length === 0){
            return null
        }else{
            if(selectedRoiFlag){
                return(
                    <div className='summary__content__single_pic'>
                        <div className='single_pic__title'>
                            <span>{cancerType[selectedRoi.type]}，</span>
                            <span>from Image {toFiveNumberString(selectedRoi.svsId)}，</span>
                            <span>Editor: {selectedRoi.userName || 'None'}</span>
                        </div>
                        <div className='single_pic__img'>
                            <img src={selectedRoi.svsUrl} />
                        </div>
                        <i className='single_pic__close' 
                            onClick={this.closeSingleRoi} />
                        <i className='single_pic__edit' 
                            onClick={this.editSingleRoi} />
                        <i className='single_pic__pre' 
                            onClick={this.preSingleRoi} />
                        <i className='single_pic__next'
                            onClick={this.nextSingleRoi} />
                    </div>
                )
            }else if(selectedRoisPage >= summaryTotalPage){
                return(
                    <div className='summary__content__rois'>
                        {summaryDisplay.map((value,index) => this.renderDisplayItem(index,value))}
                        {/* <div className='summary__content__next_area'>
                            <p>---end---</p>
                        </div> */}
                    </div>
                )
            }else{
                // tslint:disable-next-line:no-console
                // console.log(summaryDisplay);
                return(
                    <div className='summary__content__rois'>
                        {summaryDisplay.map((value,index) => this.renderDisplayItem(index,value))}
                        <div className='summary__content__next_area'>
                            <i className='summary__content__render_icon'
                                onClick={this.changeRoiPages} />
                        </div>
                    </div>
                )
            }
        }
    }
    public render(){
        if(!this.props.userName){
            // return null
            return(
                <div>please sign in</div>
            )
        }
        const { summaryStatistics } = this.props;
        const hidden = { display: 'none'};
        return (
            <div className='page'>
                <div className='main__header'>
                    <div>
                        <div className='header__icon'>Pathology.ai</div>
                        <div className='header__userInfo'>
                            <span className='userInfo__label'>Pathologist: </span>
                            <span className='userInfo__name'>tongjiA</span>
                            <i className='userInfo__menu__icon' />
                        </div>
                    </div>
                    <div className='summary__title'>Data Summary</div>
                    <div>
                        <span className='header__menu__dataSummary'
                            onClick={this.mainPage} >Back to Image List</span>
                    </div>
                </div>
                <div className='main__sideBar'>
                    <div className='sideBar__header'>
                        <span className='sideBar__header__title'>ROI分类</span>
                        <i className='sideBar__header__icon' 
                            style={hidden} />
                    </div>
                    <div className='summary__sideBar__content'>
                        {summaryStatistics.map((value: ISummaryStatisticsItem, index: number)=> this.renderSummaryLabelItem(value, index))}
                    </div>
                </div>
                <div className='main__content'>
                    {this.renderMainContent()}
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