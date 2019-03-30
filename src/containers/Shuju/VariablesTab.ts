import * as actions from '../../actions/action';
import { Dispatch } from 'redux';
import { StoreState } from '../../store/store';
import { connect } from 'react-redux';
import VariablesTab from '../../components/Shuju/VariablesTab';

function mapStateToProps(state:StoreState){
    return{
        chartShowingType: state.shuju_variables.chartShowingType,
        color_store: state.chartStyle.color,
        shape_store: state.chartStyle.shape,
        size_store: state.chartStyle.size
    }
}

function mapDispatchToProps(dispatch:Dispatch<actions.VariablesTab>){
    return{
        colorChange: (color:string) => dispatch(actions.chart_color_change(color)),
        shapeChange: (shape:string) => dispatch(actions.chart_shape_change(shape)),
        sizeChange: (size:number) => dispatch(actions.chart_size_change(size))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(VariablesTab);