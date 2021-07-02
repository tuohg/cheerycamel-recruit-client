import React, {Component} from 'react'
import {NavBar, WingBlank, List, InputItem,WhiteSpace, Button} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import Logo from '../../components/logo/logo'
import {login} from '../../redux/actions'

class Login extends Component { 
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
        // console.log(this.state)
        this.props.login(this.state)
    }

    render() {
        const {redirectTo,msg}=this.props
        if (redirectTo) {
            return <Redirect to={redirectTo}/>
        }
        return ( 
            <div>
                <NavBar>CheeryCamel Recruit</NavBar>
                <Logo/>
                <WingBlank>
                    {msg?<p className='error-msg'>{msg}</p>:null}
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
                        <Button onClick={this.toRegister}>Sign Up</Button>
                    </List>
                </WingBlank>
            </div>
        ) 
    }
}

export default connect(
    state =>state.user,
    {login}
)(Login)