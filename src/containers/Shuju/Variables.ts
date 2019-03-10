import Variables from '../../components/Shuju/Variables';
import { StoreState } from '../../store/store';
import { connect } from 'react-redux';
import { Dispatch } from 'react';

function mapStateToProps(state:StoreState){
    return{
        totalVariablesState: state.variables
    }
}
export default connect(mapStateToProps)(Variables);