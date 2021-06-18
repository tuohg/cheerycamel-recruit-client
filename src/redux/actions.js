import { AUTH_SUCCESS, ERROR_MSG, RECEIVE_USER, RESET_USER, RECEIVE_USER_LIST } from './action-types'

import { reqRegister, reqLogin, reqUpdateUser, reqUser, reqUserList } from '../api'

const errorMsg = msg => ({ type: ERROR_MSG, data: msg })

const authSuccess = user => ({ type: AUTH_SUCCESS, data: user })

const receiveUser = user => ({ type: RECEIVE_USER, data: user })

const receiveUserList = users => ({ type: RECEIVE_USER_LIST, data: users })

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
            dispatch(receiveUser(result.data))
        } else {
            dispatch(resetUser(result.msg))
        }
    }
}