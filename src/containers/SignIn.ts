import { Dispatch } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import SignIn from '../pages/SignIn';
import { IFileListItem, IPicInfo, IStoreState } from '../store';

function mapStateToProps (state: IStoreState){
    return {
        userName: state.user.name
    }
}

function mapDispatchToProps (dispatch: Dispatch<any>){
    return {
        selectFileList: (list: IFileListItem[]) => dispatch(actions.selectFileList(list)),
        selectSvs: (id: number) => dispatch(actions.selectSvs(id)),
        setFileList: (list: IFileListItem[]) => dispatch(actions.setFileList(list)),
        setPic: (pic: IPicInfo) => dispatch(actions.setPic(pic)),
        userSign: (name: string) => dispatch(actions.userSignIn(name))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);