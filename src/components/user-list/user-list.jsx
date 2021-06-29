import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Card, WingBlank, WhiteSpace} from 'antd-mobile'
import QueueAnim from 'rc-queue-anim'

import {withRouter} from 'react-router-dom'

const Header = Card.Header
const Body = Card.Body

class UserList extends Component{
    static propTypes ={
        userList: PropTypes.array.isRequired
    }
    render() {
        return (
            <WingBlank style={{marginTop: 50, marginBottom:50}}>
                <QueueAnim type='scale'>
                    {
                        this.props.userList.map(user =>(
                            <div key={user._id}>
                                <WhiteSpace/>
                                <Card onClick={() => this.props.history.push(`/chat/${user._id}`)}>
                                    <Header
                                        thumb={user.avatar?require(`../../assets/images/${user.avatar}.png`):null}
                                        extra={user.username}
                                    />
                                    <Body>
                                        <div>Position: {user.post}</div>
                                        {user.company ? <div>Company: {user.company}</div>:null}
                                        {user.salary ? <div>Salary: {user.salary}</div>:null}
                                        <div>Description: {user.profile}</div>
                                    </Body>
                                </Card>
                            </div>
                        ))
                    }

                </QueueAnim>
            </WingBlank>
        )
    }
}

export default withRouter(UserList)