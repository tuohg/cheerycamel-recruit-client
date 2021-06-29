import { combineReducers } from 'redux'
import { getRedirectPath } from '../utils'

import {
    AUTH_SUCCESS,
    ERROR_MSG,
    RECEIVE_USER,
    RESET_USER,
    RECEIVE_USER_LIST,
    RECEIVE_MSG_LIST,
    RECEIVE_MSG,
    MSG_READ
} from './action-types'

const initUser = {
    username: '',
    type: '',
    msg: '',
    redirectTo: ''
}

const initChat = {
    chatMsgs: [],
    users: {},
    unReadCount: 0
}

const initUserList = []

function user(state = initUser, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            const redirectTo = getRedirectPath(action.data.type, action.data.avatar)
            console.log(redirectTo);
            return { ...action.data, redirectTo }
        case ERROR_MSG:
            return { ...state, msg: action.data }
        case RECEIVE_USER:
            return action.data
        case RESET_USER:
            return { ...initUser, msg: action.data }
        default:
            return state
    }
}

function userList(state = initUserList, action) {
    switch (action.type) {
        case RECEIVE_USER_LIST:

            return action.data

        default:
            return state
    }
}

function chat(state = initChat, action) {
    switch (action.type) {
        case RECEIVE_MSG_LIST:
            const { chatMsgs, users, userid } = action.data
            return {
                chatMsgs,
                users,
                unReadCount: chatMsgs.reduce((preTotal, msg) => {
                    return preTotal + (!msg.read && msg.to === userid ? 1 : 0)
                }, 0)
            }
        case RECEIVE_MSG:
            const { chatMsg } = action.data
            return {
                chatMsgs: [...state.chatMsgs, chatMsg],
                users: state.users,
                unReadCount: state.unReadCount + (!chatMsg.read && chatMsg.to === userid ? 1 : 0)
            }
        case MSG_READ:
            const { count, from, to } = action.data
            return {
                chatMsgs: state.chatMsgs.map(msg => {
                    if (msg.from === from && msg.to === to && !msg.read) {
                        return { ...msg, read: true }
                    } else {
                        return msg
                    }
                }),
                users: state.users,
                unReadCount: state.unReadCount - count
            }
        default:
            return state
    }
}


export default combineReducers({
    user,
    userList,
    chat
})