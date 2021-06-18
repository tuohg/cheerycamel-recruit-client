import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Card, WingBlank, WhiteSpace} from 'antd-mobile'

const Header = Card.Header
const Body = Card.Body

class UserList extends Component{
    static propTypes ={
        userList: PropTypes.array.isRequired
    }
    render() {
        return (
            <WingBlank style={{marginTop: 50, marginBottom:50}}>
                {
                    this.props.userList.map(user =>(
                        <div key={user._id}>
                            <WhiteSpace/>
                            <Card>
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
            </WingBlank>
        )
    }
}

export default UserList