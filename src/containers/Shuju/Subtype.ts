import Subtype from '../../components/Shuju/Subtype';
import { StoreState } from '../../store/store';
import { connect } from 'react-redux';
import { Dispatch } from 'react';
import * as actions from '../../actions/action';

function mapStateToProps(state:StoreState){
    return{
        chartList: state.shuju_variables.chartList
    }
}

function mapDispatchToProps(dispatch:Dispatch<actions.ChartDisplay>){
    return{
        chartClick: (index:number) => dispatch(actions.drawChart(index))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Subtype);