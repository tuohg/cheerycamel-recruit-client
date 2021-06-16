export function getRedirectPath(type, avatar) {
    let path = ''

    path += type === 'boss' ? '/boss' : '/candidate'

    if (!avatar) {
        path = + 'profile'
    }

    return path
}