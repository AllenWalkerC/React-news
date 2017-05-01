import React from 'react';
import ReactDom from 'react-dom';
import PCIndex from './components/pc_Index.js';
import MobileIndex from './components/mobile_Index.js';
import PCDetails from './components/pc_Details.js';
import MobileDetails from './components/mobile_Details.js';
import PCpersonalcenter from './components/pc_personal_center.js';
import Mobilepersonalcenter from './components/mobile_personal_center.js';
import '../css/pc.css';
import '../css/mobile.css';
import MediaQuery from 'react-responsive';
import {Router,Route,hashHistory} from 'react-router';
class Root extends React.Component{
  render(){
     return(
       <div>
       <MediaQuery query="(min-device-width: 1224px)">
       <Router history={hashHistory}>
         <Route path="/" component={PCIndex}></Route>
         <Route path="/details/:uniquekey" component={PCDetails}></Route>
          <Route path="/personalcenter" component={PCpersonalcenter}></Route>
       </Router>
       </MediaQuery>
       <MediaQuery query="(max-device-width: 1224px)">
         <Router history={hashHistory}>
           <Route path="/" component={MobileIndex}></Route>
           <Route path="/details/:uniquekey" component={MobileDetails}></Route>
           <Route path="/personalcenter" component={Mobilepersonalcenter}></Route>
         </Router>
       </MediaQuery>
      </div>
     )
  }
}

ReactDom.render(<Root/>,document.querySelector('#main-ct'));
