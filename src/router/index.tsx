import * as React from 'react';
import Loadable from 'react-loadable';
import { Route, Router } from 'react-router-dom';
// import store from '../store';
import '../css/global.scss';
import history from './history';

import LoadingMask from '../components/LoadingMask';
// import SignIn from '../pages/SignIn';
import SignIn from '../containers/SignIn';
const Main = Loadable({
    // loader: () => import('../pages/MainPage'),
    loader: () => import('../containers/Main'),
    loading: () => <LoadingMask/>
});
const Summary = Loadable({
    // loader: () => import('../pages/SummaryPage'),
    loader: () => import('../containers/Summary'),
    loading: () => <LoadingMask/>
})

// const userName = store.getState().user.name;
export default(
    <Router history={history}>
        <div className='page'>
            {/* <Route exact={true} path='/' component={ SignIn }/>
            <Route path='/mainPage' component={Main} />
            <Route path='/dataSummary' component={Summary} /> */}
            <Route exact={true} path='/roi' component={ SignIn } />
            <Route path='/roi/mainPage' component={ Main } />
            <Route path='/roi/dataSummary' component={ Summary } />
        </div>
    </Router>
)