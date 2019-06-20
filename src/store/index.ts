import { createStore } from 'redux';
import Reducer from '../reducers';

export interface IFileListItem{
    labeledCount: number,
    magnification: number,
    // selectedFlag: boolean,
    svsId: number,
    totalCount: number
}
export interface IPicInfo{
    picHeight: number,
    picUrl: string,
    picWidth: number,
    roi: IRoiInfo[],
    svsId: number
}
export interface IRoiInfo{
    roiId: number,
    roiUrl: string,
    score: number,
    status: string,
    type: string,
    userName: string,
    x1: number,
    x2: number,
    y1: number,
    y2: number
}
export interface ISelect{
    selectedAllRoiFlag: boolean,
    selectedFileList: IFileListItem[],
    selectedFileListPage: number,
    selectedRoiId: number,
    selectedRoisPage: number,
    selectedSvsId: number,
}
export interface IUserInfo{
    name: string;
}
export interface IStoreState{
    fileList: IFileListItem[],
    pic: IPicInfo,
    select: ISelect,
    // summary: ISummary,
    // summaryFilter: ISummaryItem[],
    // summaryStatistics: ISummaryStatisticsItem[],
    summary: ISummary,
    user: IUserInfo
}
export interface ISummary{
    filter: ISummaryItem[],
    // filterDisplay: ISummaryItem[],
    statistics: ISummaryStatisticsItem[],
    totalPage: number,
    // total: ISummaryTotal,
}
export interface ISummaryItem{
    roiId: number,
    roiUrl: string,
    status: string,
    svsId: number,
    svsUrl: string,
    type: string,
    userName: string
    // labelFalseNumber: number;
    // labelTrueNumber: number;
    // nonLabelNumber: number;
    // showDetialFlag: boolean;
    // subject: string;
    // totalNumber: number;
}
// export interface ISummaryTotal{
//     [N:string]: ISummaryStatus,
//     R: ISummaryStatus,
//     S: ISummaryStatus,
//     // statistics: ISummaryStatisticsItem[]
//     T: ISummaryStatus,
//     X: ISummaryStatus
// }
export interface ISummaryStatisticsItem{
    labelFalseNumber: number;
    labelTrueNumber: number;
    id: number
    nonLabelNumber: number;
    notSureNumber: number;
    selectFalse: boolean;
    selectNotSure: boolean;
    selectTrue: boolean;
    selectUnlabelled: boolean;
    showDetialFlag: boolean;
    // subject: string;
    subject: any,
    totalNumber: number;
}
export interface ISummaryStatus{
    false: ISummaryItem[],
    notSure: ISummaryItem[],
    true: ISummaryItem[],
    unlabelled: ISummaryItem[]
}
export const initSummaryStatus: ISummaryStatus = {
    false: [],
    notSure: [],
    true: [],
    unlabelled: []
}
const initialState: IStoreState = {
    fileList: [],
    pic: {
        picHeight: 0,
        picUrl: '',
        picWidth: 0,
        roi: [],
        svsId: -1
    },
    select: {
        selectedAllRoiFlag: true,
        selectedFileList: [],
        selectedFileListPage: 1,
        selectedRoiId: -1,
        selectedRoisPage: 1,
        selectedSvsId: -1,
    },
    summary: {
        filter: [],
        // filterDisplay: [],
        statistics: [],
        totalPage: 1
        // total: {
        //     N: initSummaryStatus,
        //     R: initSummaryStatus,
        //     S: initSummaryStatus,
        //     T: initSummaryStatus,
        //     X: initSummaryStatus,
        // }
    },
    // summary: {
    //     N: initSummaryStatus,
    //     R: initSummaryStatus,
    //     S: initSummaryStatus,
    //     T: initSummaryStatus,
    //     X: initSummaryStatus,
    //     // statistics: [],
    // },
    // summaryFilter: [],
    // summaryStatistics: [],
    // summaryFilter: [],
    user: {
        name: ''
    }
}
let store:any;
store = createStore(Reducer, initialState);
export default store;