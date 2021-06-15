import React, {Component} from 'react'
import {NavBar, WingBlank, List, InputItem,WhiteSpace, Radio, Button} from 'antd-mobile'

import Logo from '../../components/logo/logo'

export default class Login extends Component { 
    state={
        username: '',
        password: ''
    }

    // deal with changing with checkbox and radio, and collecting data to state 
    handleChange = (name, value) => {
        this.setState({[name]: value}) 
    }
    // turn to router of register
    toRegister = () => {
        this.props.history.replace('/register') 
    }
    //login
    login = () => { 
        console.log(this.state)
    }

    render() {
        return ( 
            <div>
                <NavBar>CheeryCamel Recruit</NavBar>
                <Logo/>
                <WingBlank>
                    <List>
                        <InputItem
                            placeholder='Enter Username'
                            onChange={val=>this.handleChange('username',val)}
                            >Username:</InputItem>
                        <WhiteSpace/>
                        <InputItem
                            type='password'
                            placeholder='Enter password'
                            onChange={val=>this.handleChange('password',val)}
                        >Password:</InputItem>
                        <WhiteSpace/>
                        <Button type='primary' onClick={this.login}>Sign In</Button>
                        <WhiteSpace/>
                        <Button onClick={this.toRegister}>Create an ancount</Button>
                    </List>
                </WingBlank>
            </div>
        ) 
    }
}