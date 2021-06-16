import React, {Component} from 'react'
import {List, Grid} from 'antd-mobile'
import PropTypes from 'prop-types'

export default class AvatarSelector extends Component{
    static propTypes={
        setAvatar: PropTypes.func.isRequired
    }

    state={
        icon: null
    }

    constructor(props){
        super(props)
        this.avatarList=[]
        for (let i = 0; i < 20; i++) {
            const text = `avatar${i+1}`;
            this.avatarList.push({text, icon:require(`../../assets/images/${text}.png`)})
        }
    }

    selectAvatar = ({icon, text})=>{
        this.setState({icon})
        this.props.setAvatar(text)
    }

    render() {
        const {icon} = this.state
        const gridAvatar = icon ? <p>Selected avatar: <img src={icon} alt="avatar"/></p>: 'Please select your avatar'
        return (
            <List renderHeader={()=>gridAvatar}>
                <Grid data={this.avatarList}
                    columnNum={5}
                    onClick={this.selectAvatar}/>
            </List>
        )
    }
}