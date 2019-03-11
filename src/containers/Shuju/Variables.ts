import Variables from '../../components/Shuju/Variables';
import { StoreState } from '../../store/store';
import { connect } from 'react-redux';
import { Dispatch } from 'react';

function mapStateToProps(state:StoreState){
    return{
       stateArray: state.shuju_variables.variables
    }
}
export default connect(mapStateToProps)(Variables);