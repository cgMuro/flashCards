export default (state, { type, payload }) => {
    switch (type) {
        case 'SET_ERROR':
            return {
                msg: payload.msg,
                status: payload.status,
                id: payload.id
            }
        case 'CLEAR_ERROR':
            return {
                msg: null,
                status: null,
                id: null
            }
        default:
            return state
    }
}