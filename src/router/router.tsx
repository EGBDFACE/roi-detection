import * as React from 'react';
import Loadable from 'react-loadable';
import {Route,BrowserRouter as Router} from 'react-router-dom';
import Shuju from '../pages/Shuju';
import '../index.scss';
// import { HashRouter as Router, Route} from 'react-router-dom';
// import createHistory from 'history/createHashHistory';
// const history = createHistory();
// import TopNav from '../components/TopNav';
// import Jiezhen from '../pages/Jiezhen';
// import Huizhen from '../pages/Huizhen';
const Jiezhen = Loadable({
    loader: () => import('../pages/Jiezhen'),
    loading: () => <div className='loadingPage'><div className='sk-rotating-plane'></div></div>
});
const Huizhen = Loadable({
    loader: () => import('../pages/Huizhen'),
    loading: () => <div className='loadingPage'><div className='sk-rotating-plane'></div></div>
});
// const TopNav = Loadable({
//     loader: () => import('../components/TopNav'),
//     loading: () => <div className='loadingPage'><div className='sk-rotating-plane'></div></div>
// });

export default (
    // <Router>
     <Router basename='/emr'>
        <div className='page'>
            {/* <TopNav/> */}
            <Route exact path="/" component={Shuju}/>
            <Route path="/jiezhen" component={Jiezhen}/>
            <Route path="/huizhen" component={Huizhen}/>
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
