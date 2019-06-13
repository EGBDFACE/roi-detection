import * as React from 'react';
import { getPicHttp } from '../api';
import { CANCER_TYPE as cancerType, FILE_LIST_DISPLAY_NUMBER as listShowLength } from '../constant';
import '../css/global.scss';
import '../css/mainPage.scss';
import '../css/summaryPage.scss';
import history from '../router/history';
import { IFileListItem, IPicInfo, IRoiInfo, ISummaryItem, ISummaryStatisticsItem, ISummaryTotal } from '../store';
import { selectFileListPage } from '../actions';

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
    setPic: (pic: IPicInfo) => void,
    setStatistics: (data: ISummaryStatisticsItem[]) => void,
    // summary: ISummary;
    summaryDisplay: ISummaryItem[],
    summaryFilter: ISummaryItem[],
    summaryStatistics: ISummaryStatisticsItem[],
    summaryTotal: ISummaryTotal,
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
        const { fileList, selectAllRoi, selectRoi, selectSvs, setPic, setFileListPage, setFileListShow } = this.props;
        // this.props.selectSvs(this.state.selectedRoi.svsId);
        const { selectedRoi } = this.state;
        selectAllRoi(false);
        selectRoi(selectedRoi.roiId);
        selectSvs(selectedRoi.svsId);
        getPicHttp(selectedRoi.svsId).then( (res: any) => {
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
                svsId: selectedRoi.svsId
            };
            setPic(pic);
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
        const { setRoiPage, selectedRoisPage, setFilterDisplay, summaryFilter } = this.props;
        const newFilterDisplay:ISummaryItem[] = [];
        let i: number;
        // const length = summaryDisplay.length < 48 ? summaryDisplay.length : 48;
        const length = ((selectedRoisPage+2)*48 > summaryFilter.length) ? (summaryFilter.length - (selectedRoisPage+1)*48) : 48;
        // tslint:disable-next-line:no-console
        // console.log(length);
        for(i=0; i<length; i++){
            newFilterDisplay[i] = summaryFilter[(selectedRoisPage+1)*48+i];
        }
        // roiPageNext();
        setRoiPage(selectedRoisPage+1);
        // tslint:disable-next-line:no-console
        // console.log(newFilterDisplay);
        // tslint:disable-next-line:no-console
        // console.log(summaryFilter)
        setFilterDisplay(newFilterDisplay);
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
        this.props.setStatistics(newStatistics);
        let newSummaryData: ISummaryItem[] = [];
        const { setRoiPage, summaryTotal } = this.props;
        setRoiPage(0);
        let i: number;
        for(i=0; i<newStatistics.length; i++){
            // switch(nextProps.statistics[i].subject){
            //     case cancerType.N:
            //         if()
            // }
            if(newStatistics[i].selectFalse){
                newSummaryData = newSummaryData.concat(summaryTotal[newStatistics[i].subject].false);
            }
            if(newStatistics[i].selectTrue){
                newSummaryData = newSummaryData.concat(summaryTotal[newStatistics[i].subject].true);
            }
            if(newStatistics[i].selectUnlabelled){
                newSummaryData = newSummaryData.concat(summaryTotal[newStatistics[i].subject].unlabelled);
            }
            if(newStatistics[i].selectNotSure){
                newSummaryData = newSummaryData.concat(summaryTotal[newStatistics[i].subject].notSure);
            }
        }
        this.props.setFilter(newSummaryData);
        const initEightFilters: ISummaryItem[] = [];
        let j:number;
        if(newSummaryData.length){
           const length = newSummaryData.length > 48 ? 48 : newSummaryData.length;
           for(j=0; j<length; j++){
            initEightFilters[j] = newSummaryData[j];
           } 
        }
        this.props.setFilterDisplay(initEightFilters);
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
        const { summaryDisplay, selectedRoisPage, summaryFilter } = this.props;
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
            }else if(summaryFilter.length <= (selectedRoisPage+1)*48){
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