import React, {Component} from 'react'
import {Result, List, WhiteSpace, Button, Modal} from 'antd-mobile'
import {connect} from 'react-redux'
import Cookies from 'js-cookie'

import {resetUser} from '../../redux/actions'

const Item = List.Item
const Brief = Item.Brief

class Personal extends Component{
    handleLogout = () => {
        Modal.alert('Sign Out', 'Do you confirm to quit?',[
            {
                text: 'No',
                onPress:()=> console.log('cancel')
            },
            {
                text: 'Yes',
                onPress:()=>{
                    Cookies.remove('userid')
                    this.props.resetUser()
                }
            }
        ])
    }
    render() {
        const {username, post, profile, salary, company} = this.props.user

        return (
            <div style={{marginTop:50}}>
                <Result
                    img={<img src={require(`../../assets/images/avatar1.png`)} style={{width:50}} alt="avatar"/>}
                    title={username}
                    message={company}


                />

                <List renderHeader={()=> 'Relative info'}>
                    <Item multipleLine 
                        onClick={()=>{
                            // console.log(this.props);
                            this.props.history.replace(`/${this.props.user.type}Info`)
                        }}
                    >
                        <Brief>Position: {post}</Brief>
                        <Brief>Summary: {profile}</Brief>
                        {salary?<Brief>Salary: {salary}</Brief>:null}
                    </Item>
                </List>
                <WhiteSpace/>
                <List>
                    <Button onClick={this.handleLogout} type='warning'>Sign Out</Button>
                </List>

            </div>
        )
    }
}

export default connect(
    state => ({user:state.user}),
    {resetUser}
)(Personal)