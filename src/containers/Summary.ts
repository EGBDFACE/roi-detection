import { Dispatch } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import SummaryPage from '../pages/SummaryPage';
import { IPicInfo, IStoreState, ISummaryItem, ISummaryStatisticsItem } from '../store';

function mapStateToProps (state: IStoreState){
    return {
        selectedRoisPage: state.select.selectedRoisPage,
        summaryDisplay: state.summary.filterDisplay,
        summaryFilter: state.summary.filter,
        summaryStatistics: state.summary.statistics,
        summaryTotal: state.summary.total,
        // summary: state.summary,
        userName: state.user.name,
    }
}
function mapDispatchToProps (dispatch: Dispatch<any>){
    return {
        roiPageNext: () => dispatch(actions.roiPageNext()),
        selectSvs: (id: number) => dispatch(actions.selectSvs(id)),
        setFilter: (data: ISummaryItem[]) => dispatch(actions.setFilter(data)),
        setFilterDisplay: (data: ISummaryItem[]) => dispatch(actions.setFilterDisplay(data)),
        setPic: (pic: IPicInfo) => dispatch(actions.setPic(pic)),
        setStatistics: (data: ISummaryStatisticsItem[]) => dispatch(actions.setStatistics(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SummaryPage);