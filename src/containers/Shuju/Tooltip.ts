import * as actions from '../../actions/action';
import { StoreState } from '../../store/store';
import { connect } from 'react-redux';
import Tooltip from '../../components/Shuju/Tooltip';

function mapStateToProps(state:StoreState){
    // console.log(state.tooltip)
    return{
        tooltip: state.tooltip
    }
}
export default connect(mapStateToProps)(Tooltip);