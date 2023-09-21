const stateGlobalProduct = {
    id: null
}

const reducerGlobalCart = (state = stateGlobalProduct, action) => {
    switch (action.type) {
        case 'DATA-ID':
            return {
                ...state,
                id: action.payload.id
            }

        default:
            return state
    }
}

export default reducerGlobalCart