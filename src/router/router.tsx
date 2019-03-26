import * as React from 'react';
import Loadable from 'react-loadable';
// import {Route,BrowserRouter as Router} from 'react-router-dom';
import Shuju from '../pages/Shuju';
import { HashRouter as Router, Route} from 'react-router-dom';
// import createHistory from 'history/createHashHistory';
// const history = createHistory();
// import TopNav from '../components/TopNav';
// import Jiezhen from '../pages/Jiezhen';
// import Huizhen from '../pages/Huizhen';
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
            <div>
                <Route exact path="/" component={Shuju}/>
                <Route path="/jiezhen" component={Jiezhen}/>
                <Route path="/huizhen" component={Huizhen}/>
            </div>
        </div>
    </Router>
);
// export default(
//     // <Router history={history}>
//     <Router>
//         <div className='page'>
//             <TopNav/>
//             <Route render={({location})=>{
//                 return(
//                     <div>
//                         <Route location={location} exact path="/" component={Shuju}/>
//                         <Route location={location} path="/jiezhen" component={Jiezhen}/>
//                         <Route location={location} path="/huizhen" component={Huizhen}/>
//                     </div>
//                 )
//             }}/>
//         </div>
//     </Router>
// )
