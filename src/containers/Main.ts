import { Dispatch } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import MainPage from '../pages/MainPage';
import { IFileListItem, IPicInfo, IStoreState, ISummaryStatisticsItem, ISummaryTotal } from '../store';

function mapStateToProps (state: IStoreState){
    return {
        fileList: state.fileList,
        pic: state.pic,
        selectedRoiId: state.select.selectedRoiId,
        selectedSvsId: state.select.selectedSvsId,
        // statistics: state.summaryStatistics,
        statistics: state.summary.statistics,
        userName: state.user.name
    }
}
function mapDispatchToProps (dispatch: Dispatch<any>){
    return {
        selectRoi: (id: number) => dispatch(actions.selectRoi(id)),
        selectSvs: (id: number) => dispatch(actions.selectSvs(id)),
        setFileList: (list: IFileListItem[]) => dispatch(actions.setFileList(list)),
        setPic: (pic: IPicInfo) => dispatch(actions.setPic(pic)),
        setStatistics: (data: ISummaryStatisticsItem[]) => dispatch(actions.setStatistics(data)),
        setSummary: (data: ISummaryTotal) => dispatch(actions.setSummary(data)),
        userSignOut: () => dispatch(actions.userSignOut())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MainPage);