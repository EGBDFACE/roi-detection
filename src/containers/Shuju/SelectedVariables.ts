import SelectedVariables from '../../components/Shuju/SelectedVariables';
import * as actions from '../../actions/action';
import { StoreState } from '../../store/store';
import { connect } from 'react-redux';
import { Dispatch } from 'react';

function mapStateToProps(state:StoreState){
    // console.log(state);
    return{
        stateArray: state.shuju_variables.variables
    }
}
function mapDispatchToProps(dispatch:Dispatch<actions.VariableState>){
    return{
        mouseHover: (index:number) => dispatch(actions.selectedVarialeHover(index)),
        selectedDelete: (index:number) => dispatch(actions.selectedVariableDelete(index))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(SelectedVariables);