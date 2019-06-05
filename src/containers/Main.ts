import { Dispatch } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import MainPage from '../pages/MainPage';
import { IFileListItem, IPicInfo, IStoreState, ISummaryStatisticsItem, ISummaryTotal } from '../store';

function mapStateToProps (state: IStoreState){
    return {
        fileList: state.fileList,
        fileListPage: state.select.selectedFileListPage,
        fileListShow: state.select.selectedFileList,
        pic: state.pic,
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
        setPic: (pic: IPicInfo) => dispatch(actions.setPic(pic)),
        setStatistics: (data: ISummaryStatisticsItem[]) => dispatch(actions.setStatistics(data)),
        setSummary: (data: ISummaryTotal) => dispatch(actions.setSummary(data)),
        userSignOut: () => dispatch(actions.userSignOut())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MainPage);