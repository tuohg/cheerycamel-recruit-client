import React, {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import Cookies from 'js-cookie'

import BossInfo from '../boss-info/boss-info'
import CandidateInfo from '../candidate-info/candidate-info'

export default class Main extends Component { 
    render() {
        const userid=Cookies.get('userid')
        if (!userid) {
            this.props.history.replace('/login')
            return null
        }

        return ( 
            <div>
                <Switch>
                    <Route path='/bossinfo' component={BossInfo}/>
                    <Route path='/candidateinfo' component={CandidateInfo}/>
                </Switch>
            </div>
        ) 
    }
}