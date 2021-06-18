import React, {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import {connect} from 'react-redux'
import {NavBar} from 'antd-mobile'

import BossInfo from '../boss-info/boss-info'
import CandidateInfo from '../candidate-info/candidate-info'
import Candidate from '../candidate/candidate'
import Boss from '../boss/boss'
import Message from '../message/message'
import Personal from '../personal/personal'
import NotFound from '../../components/not-found/not-found'
import NavFooter from '../../components/nav-footer/nav-footer'

import {getUser} from '../../redux/actions'
import {getRedirectPath} from '../../utils'

class Main extends Component { 
    navList=[
        {
            path: '/boss',
            component: Boss,
            title:'Candidate List',
            icon: 'candidate',
            text:'Candidate'
        },
        {
            path:'/candidate',
            component: Candidate,
            title:"Boss List",
            icon:'boss',
            text:'Boss'
        },
        {
            path:'/message',
            component: Message,
            title:"Message List",
            icon:'message',
            text:'Message'
        },
        {
            path:'/personal',
            component: Personal,
            title:"Personal Center",
            icon:'personal',
            text:'Personal'
        }
    ]

    componentDidMount(){
        const userid = Cookies.get('userid')
        const {user} = this.props
        if (userid && !user._id) {
            this.props.getUser()
        }
    }
    render() {
        const pathname = this.props.location.pathname
        const userid = Cookies.get('userid')
        if (!userid) {
            // this.props.history.replace('/login')
            return <Redirect to = '/login'/>
        }
        const {user}=this.props
        if (!user._id) {
            return null
        }else{
            if (pathname === '/') {
                const path = getRedirectPath(user.type, user.avatar)
                return <Redirect to={path}/>
            }
            if (user.type==='boss') {
                this.navList[1].hide = true
            }else{
                this.navList[0].hide =true
            }
        }

        const currentNav = this.navList.find(nav => nav.path === pathname)

        return ( 
            <div>
                {currentNav ? <NavBar className='stick-top'>{currentNav.title}</NavBar>:null}
                <Switch>
                    <Route path='/bossinfo' component={BossInfo}/>
                    <Route path='/candidateinfo' component={CandidateInfo}/>
                    <Route path='/candidate' component={Candidate}/>
                    <Route path='/boss' component={Boss}/>
                    <Route path='/message' component={Message}/>
                    <Route path='/personal' component={Personal}/>
                    <Route component={NotFound}></Route>
                </Switch>

                {currentNav?<NavFooter unReadCount={this.props.unReadCount} navList={this.navList}/>:null}
            </div>
        ) 
    }
}

export default connect(
    state => ({user:state.user}),
    {getUser}
)(Main)