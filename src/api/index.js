import ajax from './ajax'

export const reqRegister = user => ajax('/api/register', user, 'POST')

export const reqLogin = user => ajax('/api/login', user, 'POST')

export const reqUpdateUser = user => ajax('/api/update', user, 'POST')

export const reqUser = () => ajax('/api/user')

export const reqUserList = type => ajax('/api/list', { type })

export const reqChatMsgList = () => ajax('/api/msglist')

export const reqReadChatMsg = (from) => ajax('/api/readmsg', { from }, 'POST')