/**
 * Created by tangxiewen on 2017/3/15.
 */
import React from 'react';
import PCHeader from './pc_header'
import PCNewsContainer from './pc_news_container'
export default class PCIndex extends React.Component{
    render(){
        return(
            <div>
                <PCHeader></PCHeader>
                <PCNewsContainer></PCNewsContainer>
            </div>
        )
    }
}