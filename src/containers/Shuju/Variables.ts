import Variables from '../../components/Shuju/Variables';
import { StoreState } from '../../store/store';
import { connect } from 'react-redux';
import { Dispatch } from 'react';
import * as actions from '../../actions/action';

function mapStateToProps(state:StoreState){
    // console.log(state.shuju_variables.variables);
    return{
       stateArray: state.shuju_variables.variables
    }
}
function mapDispatchToProps(dispatch:Dispatch<actions.VariableState>){
    return{
        stateChange: (key:number) => dispatch(actions.stateChange(key))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Variables);