import { IFileListItem, IPicInfo, ISummaryItem, ISummaryStatisticsItem, ISummaryTotal } from '../store';

export interface IUserAction{
    name?: string
    type: string
}
export interface IFileListAction{
    list: IFileListItem[],
    type: string
}
export interface IPicAction{
    pic: IPicInfo,
    type: string
}
export interface ISelectAction{
    id?: number,
    type: string
}
export interface ISummaryAction{
    // data?: ISummary,
    // index?: number,
    filter?: ISummaryItem[],
    filterDisplay?: ISummaryItem[],
    statistics?: ISummaryStatisticsItem[],
    total?: ISummaryTotal,
    type: string
}
const USER_SIGN_IN = 'USER_SIGN_IN';
const USER_SIGN_OUT = 'USER_SIGN_OUT';
const SET_FILE_LIST = 'SET_FILE_LIST';
const SET_PIC = 'SET_PIC';
const SET_SUMMARY = 'SET_SUMMARY';
const SET_STATISTICS = 'SET_STATISTICS';
const SET_FILTER = 'SET_FILTER';
const SET_FILTER_DISPLAY = 'SET_FILTER_DISPLAY';
// const SET_SUMMARY_SHOW_DETAIL = 'SET_SUMMARY_SHOW_DETAIL';
const SELECT_SVS = 'SELECT_SVS';
const SELECT_ROI = 'SELECT_ROI';
const SELECT_ROI_PAGE_NEXT = 'SELECT_ROI_PAGE_NEXT';

export function userSignIn(name: string): IUserAction{
    return{
        name,
        type: USER_SIGN_IN
    }
}
export function userSignOut(): IUserAction{
    return{
        type: USER_SIGN_OUT
    }
}
export function setFileList(list: IFileListItem[]): IFileListAction{
    return{
        list,
        type: SET_FILE_LIST
    }
}
export function setPic(pic: IPicInfo): IPicAction{
    return{
        pic,
        type: SET_PIC
    }
}
export function setSummary(total: ISummaryTotal): ISummaryAction{
    return{
        total,
        type: SET_SUMMARY
    }
}
export function setStatistics(statistics: ISummaryStatisticsItem[]): ISummaryAction{
    return{
        statistics,
        type: SET_STATISTICS
    }
}
export function setFilter(filter: ISummaryItem[]) : ISummaryAction{
    return{
        filter,
        type: SET_FILTER
    }
}
export function setFilterDisplay(filterDisplay: ISummaryItem[]): ISummaryAction{
    return{
        filterDisplay,
        type: SET_FILTER_DISPLAY
    }
}
// export function setSummaryShowDetial(index: number): ISummaryAction{
//     return {
//         index,
//         type: SET_SUMMARY_SHOW_DETAIL
//     }
// }
export function selectRoi(id: number): ISelectAction{
    return{
        id,
        type: SELECT_ROI
    }
}
export function selectSvs(id: number): ISelectAction{
    return{
        id,
        type: SELECT_SVS
    }
}
export function roiPageNext(): ISelectAction{
    return{
        type: SELECT_ROI_PAGE_NEXT
    }
}