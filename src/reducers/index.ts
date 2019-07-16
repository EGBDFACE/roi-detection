import { IFileListAction, IPicAction, ISelectAction, ISummaryAction, IUserAction  } from '../actions';
import { IFileListItem, IPicInfo, IPics, ISelect, IStoreState, ISummary, IUserInfo } from "../store";


const Reducer = (state: IStoreState, action: any) => {
    return {
        fileList: setFileList(state.fileList, action),
        // pic: setPic(state.pic, action),
        pics: setPic(state.pics, action),
        select: setSelect(state.select, action),
        summary: setSummary(state.summary, action),
        // summaryFilter: setSummaryFilter(state.summaryFilter, action),
        // summaryStatistics: setStatistics(state.summaryStatistics, action),
        user: user(state.user, action)
    }
}

function  user(state: IUserInfo, action: IUserAction){
    switch(action.type){
        case 'USER_SIGN_IN':
            if(!localStorage.hasOwnProperty('userName')||(localStorage.getItem('userName')!==action.name)){
                localStorage.setItem('userName',action.name);
            }
            return{
                ...state,
                name: action.name
            }
        case 'USER_SIGN_OUT':
            return{
                ...state,
                name: ''
            }
        default: return state
    }
}
function setFileList(state: IFileListItem[], action: IFileListAction){
    switch(action.type){
        case 'SET_FILE_LIST':
            return action.list
        default: return state
    }
}   
function setPic(state: IPics, action: IPicAction){
    switch(action.type){
        case 'SET_PIC_A':
            return {
                ...state,
                picA: action.pic
            }
        case 'SET_PIC_B':
            return{
                ...state,
                picB: action.pic
            }
        default: return state
    }
}
function setSummary(state: ISummary, action: ISummaryAction){
    switch(action.type){
        // case 'SET_SUMMARY': 
        //     // return action.summary
        //     return {
        //         ...state,
        //         total: action.total
        //     }
        case 'SET_STATISTICS':
            return {
                ...state,
                statistics: action.statistics
            }
        case 'SET_FILTER':
            return{
                ...state,
                filter: action.filter
            }
        case 'SET_FILTER_DISPLAY':
            return{
                ...state,
                filterDisplay: action.filterDisplay
            }
        case 'SET_SUMMARY_TOTAL_PAGE':
            return{
                ...state,
                totalPage: action.totalPage
            }
        // case 'SET_STATISTICS':
        //     return action.statistics
        // case 'SET_SUMMARY_SHOW_DETAIL':
        //     const newSummaryStatistics = state.statistics;
        //     newSummaryStatistics[action.index]
        //     return{
        //         ...state,
        //         statistics: newSummaryStatistics
        //     }
        default: return state
    }
}
// function setStatistics(state: ISummaryStatisticsItem[], action: ISummaryAction){
//     switch(action.type){
//         case 'SET_STATISTICS':
//             return action.statistics
//         default: return state
//     }
// }
function setSelect(state: ISelect, action: ISelectAction){
    switch(action.type){
        case 'SELECT_ROI':
            return{
                ...state,
                selectedRoiId: action.id
            }
        case 'SELECT_SVS':
            return{
                ...state,
                selectedSvsId: action.id
            }
        case 'SELECT_ROI_PAGE_NEXT':
            return{
                ...state,
                selectedRoisPage: action.page
            }
        case 'SELECT_ALL_ROI':
            return{
                ...state,
                selectedAllRoiFlag: action.flag
            }
        case 'SELECT_FILE_LIST_PAGE':
            return{
                ...state,
                selectedFileListPage: action.page
            }
        case 'SELECT_FILE_LIST':
            return{
                ...state,
                selectedFileList: action.list
            }
        default: return state
    }
}

export default Reducer;