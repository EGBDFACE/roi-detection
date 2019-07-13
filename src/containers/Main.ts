import { Dispatch } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import MainPage from '../pages/MainPage';
import { IFileListItem, IPicInfo, IStoreState, ISummaryStatisticsItem } from '../store';

function mapStateToProps (state: IStoreState){
    return {
        fileList: state.fileList,
        fileListPage: state.select.selectedFileListPage,
        fileListShow: state.select.selectedFileList,
        picA: state.pics.picA,
        picB: state.pics.picB,
        selectedRoiDisplayId: state.select.selectedRoiId,
        selectedSvsId: state.select.selectedSvsId,
        showAllRoisFlag: state.select.selectedAllRoiFlag,
        // statistics: state.summaryStatistics,
        statistics: state.summary.statistics,
        userName: state.user.name
    }
}
function mapDispatchToProps (dispatch: Dispatch<any>){
    return {
        selectAllRoi: (flag: boolean) => dispatch(actions.selectAllRoiFlagChange(flag)),
        selectRoi: (id: number) => dispatch(actions.selectRoi(id)),
        selectSvs: (id: number) => dispatch(actions.selectSvs(id)),
        setFileList: (list: IFileListItem[]) => dispatch(actions.setFileList(list)),
        setFileListPage: (page: number) => dispatch(actions.selectFileListPage(page)),
        setFileListShow: (list: IFileListItem[]) => dispatch(actions.selectFileList(list)),
        setPicA: (pic: IPicInfo) => dispatch(actions.setPicA(pic)),
        setPicB: (pic: IPicInfo) => dispatch(actions.setPicB(pic)),
        setStatistics: (data: ISummaryStatisticsItem[]) => dispatch(actions.setStatistics(data)),
        // setSummary: (data: ISummaryTotal) => dispatch(actions.setSummary(data)),
        userSignIn: (name:string) => dispatch(actions.userSignIn(name)),
        userSignOut: () => dispatch(actions.userSignOut())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MainPage);