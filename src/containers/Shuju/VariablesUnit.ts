import VariablesUnit from '../../components/Shuju/VariablesUnit';
import * as actions from '../../actions/action';
import { connect } from 'react-redux';
import { Dispatch } from 'react';
import { StoreState } from '../../store/store';

// function mapStateToProps(state:StoreState){
//     return {
//         stateArray: state.shuju_variables.variables
//     }
// }
function mapDispatchToProps(dispatch:Dispatch<actions.VariableState>){
    return{
        stateChange: (key:number) => dispatch(actions.stateChange(key))
    }
}

// export default connect(mapStateToProps,mapDispatchToProps)(VariablesUnit);
export default connect(mapDispatchToProps)(VariablesUnit);