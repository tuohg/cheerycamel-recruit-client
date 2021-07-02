import React, {Component} from 'react'
import {NavBar, List, InputItem, Icon, Grid} from 'antd-mobile'
import {connect} from 'react-redux'
import QueueAnim from 'rc-queue-anim'


import {sendMsg, readMsg} from '../../redux/actions'

const Item = List.Item

class Chat extends Component {

    state = {
        content:'',
        isShow: false
    }
    componentWillMount(){
        const emojis = ['😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀'
        ,'😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣'
        ,'😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣'
        ,'😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣']
      this.emojis = emojis.map(emoji => ({text: emoji}))
    }

    componentDidMount(){
        // console.log('componentDidMount '+document.body.scrollHeight);
        window.scrollTo(0, document.body.scrollHeight)
    }

    componentDidUpdate(){
        // console.log('componentDidUpdate '+document.body.scrollHeight);
        window.scrollTo(0, document.body.scrollHeight)
    }
    

    componentWillUnmount(){
        this.props.readMsg(this.props.match.params.userid, this.props.user._id)
    }


    toggleShow=()=>{
        const isShow = !this.state.isShow
        this.setState({isShow})
        if (isShow) {
            setTimeout(()=>{
                window.dispatchEvent(new Event('resize'))
            },0)
        }
    }

    submit=()=>{
        const content = this.state.content.trim()
        const to = this.props.match.params.userid
        const from = this.props.user._id
        if (content) {
            this.props.sendMsg({from, to ,content})
        }
        this.setState({
            content:'',
            isShow:false
        })
    }

    render(){
        const {user} = this.props
        const {chatMsgs, users} = this.props.chat
        // console.log(this.props);
        // debugger
        const targetId = this.props.match.params.userid
        const meId = user._id
        if (!users[meId]) {
            return null
        }
        const chatId =[targetId, meId].sort().join('_')
        const msgs = chatMsgs.filter(msg => msg.chat_id===chatId)
        const targetIcon = users[targetId].avatar? require(`../../assets/images/${users[targetId].avatar}.png`):null



        return (
            <div id='chat-page'>
                <NavBar
                    className='stick-top'
                    icon={<Icon type='left'/>}
                    onLeftClick={()=>this.props.history.goBack()}
                >
                    {users[targetId].username}
                </NavBar>
                <List style={{marginBottom: 50, marginTop: 50}}>
                    <QueueAnim type='left' delay={100}>
                        {
                            msgs.map(msg => {
                                if (msg.from === targetId) {
                                    return (
                                        <Item
                                            key={msg._id}
                                            thumb={targetIcon}
                                        >
                                            {msg.content}
                                        </Item>
                                    )
                                }else{
                                    return (
                                        <Item
                                            key={msg._id}
                                            className='chat-me'
                                            extra='ME'
                                        >
                                            {msg.content}
                                        </Item>
                                    )
                                }
                            })
                        }

                    </QueueAnim>
                </List>

                <div className='am-tab-bar'>
                    <InputItem
                        placeholder='Please enter'
                        value={this.state.content}
                        onChange={val=>this.setState({content:val})}
                        onFocus={()=>this.setState({isShow:false})}
                        extra={
                            <span>
                                <span onClick={this.toggleShow} style={{marginRight:5}} role='img'>😊</span>
                                <span onClick={this.submit}>Send</span>
                            </span>
                        }
                    />
                    {
                        this.state.isShow ? (
                            <Grid
                                data={this.emojis}
                                columnNum={8}
                                carouselMaxRow={4}
                                isCarousel={true}
                                onClick={(item)=>{
                                    this.setState({content: this.state.content + item.text})
                                }}
                            />
                        ):null
                    }
                </div>
                
            </div>
                                
        )
    }
}


export default connect(
    state =>({user: state.user, chat: state.chat}),
    {sendMsg, readMsg}
)(Chat)