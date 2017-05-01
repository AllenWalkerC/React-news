import React from 'react';
import PCHeader from './pc_Header.js';
import PCFooter from './pc_Footer.js';
import PCNewsCt from './pc_NewsCt.js';
import {BackTop } from 'antd';
class PCIndex extends React.Component{
  render(){
    return(
      <div>
       <PCHeader />
       <PCNewsCt />
       <PCFooter />
       <BackTop />
      </div>
    )
  }
}
export default PCIndex
