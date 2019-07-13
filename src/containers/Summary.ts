import { Dispatch } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import SummaryPage from '../pages/SummaryPage';
import { IFileListItem, IPicInfo, IStoreState, ISummaryItem, ISummaryStatisticsItem } from '../store';

function mapStateToProps (state: IStoreState){
    return {
        fileList: state.fileList,
        fileListPage: state.select.selectedFileListPage,
        // selectedRoiDisplayId: state.select.selectedRoiId,
        selectedRoisPage: state.select.selectedRoisPage,
        // summaryDisplay: state.summary.filterDisplay,
        summaryDisplay: state.summary.filter,
        // summaryFilter: state.summary.filter,
        summaryStatistics: state.summary.statistics,
        summaryTotalPage: state.summary.totalPage,
        // summaryTotal: state.summary.total,
        // summary: state.summary,
        userName: state.user.name,
    }
}
function mapDispatchToProps (dispatch: Dispatch<any>){
    return {
        setRoiPage: (value: number) => dispatch(actions.setRoiPage(value)),
        selectAllRoi: (flag: boolean) => dispatch(actions.selectAllRoiFlagChange(flag)),
        selectRoi: (id: number) => dispatch(actions.selectRoi(id)),
        selectSvs: (id: number) => dispatch(actions.selectSvs(id)),
        setFileListPage: (page: number) => dispatch(actions.selectFileListPage(page)),
        setFileListShow: (list: IFileListItem[]) => dispatch(actions.selectFileList(list)),
        setFilter: (data: ISummaryItem[]) => dispatch(actions.setFilter(data)),
        setFilterDisplay: (data: ISummaryItem[]) => dispatch(actions.setFilterDisplay(data)),
        setPicA: (pic: IPicInfo) => dispatch(actions.setPicA(pic)),
        setPicB: (pic: IPicInfo) => dispatch(actions.setPicB(pic)),
        setStatistics: (data: ISummaryStatisticsItem[]) => dispatch(actions.setStatistics(data)),
        setSummaryTotalPage: (page: number) => dispatch(actions.setSummaryTotalPage(page)),
        userSignIn: (name:string) => dispatch(actions.userSignIn(name)),
        userSignOut: () => dispatch(actions.userSignOut())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SummaryPage);