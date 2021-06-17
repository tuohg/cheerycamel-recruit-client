import React, {Component} from 'react'
import {NavBar, WingBlank, List, InputItem,WhiteSpace, Radio, Button, Toast} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import Logo from '../../components/logo/logo'
import { register } from '../../redux/actions'


class Register extends Component { 
    state = {
        username:'',
        password:'',
        password2:'',
        type:'candidate'
    }

    handleChange =(name, value)=>{
        this.setState({[name]:value})
    }

    toLogin=()=>{
        this.props.history.replace('/login')
    }

    register =()=>{
        // console.log(JSON.stringify(this.state))
        this.props.register(this.state)
        setTimeout(()=>{
            const {msg}=this.props
            if (msg) {
                Toast.fail(msg, 2)
            }
        },10)
    }

    render() {
        const {type} =this.state
        const {redirectTo, msg}= this.props
        if (redirectTo) {
            return <Redirect to ={redirectTo}/>
        }

        return ( 
            <div>
                <NavBar>CheeryCamel Recruit</NavBar>
                <Logo/>
                <WingBlank>
                    {/* {msg ? <p className='error-msg'>{msg}</p>:null} */}
                    
                    <List>
                        <InputItem
                            placeholder='Enter username'
                            onChange={val=>this.handleChange('username', val)}
                        >Username: </InputItem>
                        <WhiteSpace/>
                        <InputItem
                            type='password'
                            placeholder='Enter password'
                            onChange={val=>this.handleChange('password', val)}
                        >Password: </InputItem>
                        <WhiteSpace/>
                        <InputItem
                            type='password'
                            placeholder='Confirm password'
                            onChange={val=>this.handleChange('password2',val)}
                            >Password:</InputItem>
                        <WhiteSpace/>
                        <List.Item>
                            <span style={{marginRight:30}}>User type</span>
                            <Radio checked={this.state.type==='candidate'}
                                onClick={()=>{this.handleChange('type','candidate')}}>Candidate</Radio>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Radio checked={this.state.type==='boss'}
                                onClick={()=>{this.handleChange('type','boss')}}>Boss</Radio>
                        </List.Item>
                        <WhiteSpace/>
                        <Button type='primary' onClick={this.register}>Sign Up</Button>
                        <WhiteSpace/>
                        <Button onClick={this.toLogin}>Sign in</Button>

                    </List>
                </WingBlank>
            </div>
        ) 
    }
}

export default connect(
    state => state.user,
    {register}
)(Register)