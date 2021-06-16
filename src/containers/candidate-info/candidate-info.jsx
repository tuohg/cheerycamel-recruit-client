import React, {Component} from 'react'
import {NavBar, InputItem, TextareaItem, Button} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import {updateUser} from '../../redux/actions'
import AvatarSelector from '../../components/avatar-selector/avatar-selector'

class CandidateInfo extends Component{
    state={
        avatar:'',
        profile:'',
        post:''
    }

    handleChange = (name,val)=>{
        this.setState({[name]:val})
    }

    setAvatar = avatar =>{
        this.setState({avatar})
    }

    render() {
        const {user} = this.props
        if (user.avatar) {
            return <Redirect to = '/candidate'/>
        }
        return (
            <div>
                <NavBar>Candidate profile</NavBar>
                <AvatarSelector setAvatar={this.setAvatar} />
                <InputItem onChange={val=>this.handleChange('post',val)}>Position:</InputItem>
                <TextareaItem title="Resume:" 
                                rows={3}
                                onChange={val => this.handleChange('info',val)}/>
                <Button type='primary' onClick={()=>this.props.updateUser(this.state)}>Save</Button>
            </div>
        )
    }
}

export default connect(
    state => ({user:state.user}),
    {updateUser}
)(CandidateInfo)