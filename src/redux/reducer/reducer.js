const stateGlobal = {
    isAuthorization: false,
    user: null,
    role: null,
    token: null
}

const reducerLogin = (state = stateGlobal, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                isAuthorization: true,
                role: action.payload.role,
                user: action.payload.user,
                token: action.payload.token
            }

        case 'LOGOUT':
            localStorage.clear()
            return {
                ...state,
                isAuthorization: false,
                role: null,
                user: null,
                token: null
            }

        default:
            return state
    }
}

export default reducerLogin