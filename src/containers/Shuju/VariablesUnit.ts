import VariablesUnit from '../../components/Shuju/VariablesUnit';
import * as actions from '../../actions/action';
import { connect } from 'react-redux';
import { Dispatch } from 'react';

function mapDispatchToProps(dispatch:Dispatch<actions.VariableState>){
    return{
        stateChange: (name:string,category:string) => dispatch(actions.stateChange(name,category))
    }
}

export default connect(mapDispatchToProps)(VariablesUnit);