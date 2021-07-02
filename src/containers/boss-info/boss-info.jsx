import React, {Component} from 'react'
import {NavBar, InputItem, TextareaItem, Button} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import {updateUser} from '../../redux/actions'
import AvatarSelector from '../../components/avatar-selector/avatar-selector'

class BossInfo extends Component{
    state={
        avatar:'',
        profile:'',
        post:'',
        company:'',
        salary:''
    }

    handleChange = (name,val)=>{
        this.setState({[name]:val})
    }

    setAvatar = avatar =>{
        this.setState({avatar})
    }

    render() {
        const {user} = this.props
        if (user.avatar && user.profile && user.post && user.company && user.salary) {
            return <Redirect to = '/boss'/>
        }
        return (
            <div>
                <NavBar>Boss profile</NavBar>
                <AvatarSelector setAvatar={this.setAvatar} icon={user.avatar}/>
                <InputItem onChange={val=>this.handleChange('post',val)}>Position:</InputItem>
                <InputItem onChange={val=>this.handleChange('company',val)}>Company:</InputItem>
                <InputItem onChange={val=>this.handleChange('salary',val)}>Salary:</InputItem>
                <TextareaItem title="Summary:" 
                                rows={3}
                                onChange={val => this.handleChange('profile',val)}/>
                <Button type='primary' onClick={()=>this.props.updateUser(this.state)}>Save</Button>
            </div>
        )
    }
}

export default connect(
    state => ({user:state.user}),
    {updateUser}
)(BossInfo)