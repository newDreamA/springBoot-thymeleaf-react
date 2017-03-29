/**
 * Created by tangxiewen on 2017/3/12.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import PCIndex from './components/pc_index'
import 'antd/dist/antd.css';

class Root extends React.Component{

    render() {
        return(
            <div>
                <Router history={hashHistory}>
                    <Route path="/" component={PCIndex}></Route>
                </Router>
            </div>
        )
    }

}

ReactDOM.render(<Root/>,document.getElementById("mainContainer"))