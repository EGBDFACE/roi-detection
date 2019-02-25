import * as React from 'react';
import Loadable from 'react-loadable';
import {Route,BrowserRouter as Router} from 'react-router-dom';
import Shuju from '../pages/Shuju';

const Jiezhen = Loadable({
    loader: () => import('../pages/Jiezhen'),
    loading: () => <div>loading...</div>
});
const Huizhen = Loadable({
    loader: () => import('../pages/Huizhen'),
    loading: () => <div>loading...</div>
});
const TopNav = Loadable({
    loader: () => import('../components/TopNav'),
    loading: () => <div>loading...</div>
});

export default (
    <Router>
        <div className='page'>
            <TopNav/>
            <div className='main'>
                <Route exact path="/" component={Shuju}/>
                <Route path="/jiezhen" component={Jiezhen}/>
                <Route path="/huizhen" component={Huizhen}/>
            </div>
        </div>
    </Router>
);