export const LoginAction = (role, user, token) => {
    return {
        type: 'LOGIN',
        payload: {
            role,
            user,
            token
        }
    }
}

export const LogoutAction = (user, role) => {
    return {
        type: 'LOGOUT',
        payload: {
            user,
            role
        }
    }
}

export const DataIdGlobal = (id) => {
    return {
        type: 'DATA-ID',
        payload: { id }
    }
}