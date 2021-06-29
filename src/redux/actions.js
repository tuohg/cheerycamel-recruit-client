import io from 'socket.io-client'
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

import {
    reqRegister,
    reqLogin,
    reqUpdateUser,
    reqUser,
    reqUserList,
    reqChatMsgList,
    reqReadChatMsg
} from '../api'


const errorMsg = msg => ({ type: ERROR_MSG, data: msg })

const authSuccess = user => ({ type: AUTH_SUCCESS, data: user })

const receiveUser = user => ({ type: RECEIVE_USER, data: user })

const receiveUserList = users => ({ type: RECEIVE_USER_LIST, data: users })

const receiveMsgList = ({ users, chatMsgs, userid }) => ({ type: RECEIVE_MSG_LIST, data: { users, chatMsgs, userid } })

const receiveMsg = (chatMsg, isToMe) => ({ type: RECEIVE_MSG, data: { chatMsg, isToMe } })

const msgRead = ({ from, to, count }) => ({ type: MSG_READ, data: { from, to, count } })

function initIO(dispatch, userid) {
    if (!io.socket) {
        io.socket = io('ws://localhost:4000')
        io.socket.on('receiveMsg', (chatMsg) => {
            if (chatMsg.from === userid || chatMsg.to === userid) {
                dispatch(receiveMsg(chatMsg, chatMsg.to === userid))
            }
        })
    }
}

async function getMsgList(dispatch, userid) {
    initIO(dispatch, userid)
    const response = await reqChatMsgList()
    const result = response.data
    if (result.code === 0) {
        const { chatMsgs, users } = result.data
        dispatch(receiveMsgList({ users, chatMsgs, userid }))
    }
}

export const sendMsg = ({ from, to, content }) => {
    return dispatch => {
        console.log('send message ', { from, to, content });
        // initIO()
        io.socket.emit('sendMsg', { from, to, content })
    }
}

export const readMsg = userid => {
    return async (dispatch, getState) => {
        const response = await reqReadChatMsg(userid)
        const result = response.data
        if (result.code === 0) {
            const count = result.data
            const from = userid
            const to = getState().user._id
            dispatch(msgRead({ from, to, count }))
        }
    }
}

export const getUserList = type => {
    return async dispatch => {
        const response = await reqUserList(type)
        const result = response.data
        if (result.code === 0) {
            dispatch(receiveUserList(result.data))
        }
    }
}

export const resetUser = msg => ({ type: RESET_USER, data: msg })

export function register({ username, password, password2, type }) {
    if (!username || !password || !type) {
        return errorMsg("username or password shouldn't be empty!")
    }
    if (password !== password2) {
        return errorMsg("password and confirmation password should be same!")
    }
    return async dispatch => {
        const response = await reqRegister({ username, password, type })

        const result = response.data

        if (result.code === 0) {
            getMsgList(dispatch, result.data._id)
            dispatch(authSuccess(result.data))
        } else {
            dispatch(errorMsg(result.msg))
        }
    }
}

export const login = ({ username, password }) => {
    if (!username || !password) {
        return errorMsg('Username or password shouldn\'t empty!')
    }
    return async dispatch => {
        const response = await reqLogin({ username, password })
        const result = response.data
        if (result.code === 0) {
            getMsgList(dispatch, result.data._id)
            dispatch(authSuccess(result.data))
        } else {
            dispatch(errorMsg(result.msg))
        }
    }
}

export const updateUser = user => {
    return async dispatch => {
        const response = await reqUpdateUser(user)
        const result = response.data
        if (result.code === 0) {
            dispatch(receiveUser(result.data))
        } else {
            dispatch(resetUser(result.msg))
        }
    }
}

export const getUser = () => {
    return async dispatch => {
        const response = await reqUser()
        const result = response.data
        if (result.code === 0) {
            getMsgList(dispatch, result.data._id)
            dispatch(receiveUser(result.data))
        } else {
            dispatch(resetUser(result.msg))
        }
    }
}