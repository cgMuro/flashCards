export default (state, { type, payload }) => {
    switch (type) {
        case 'GET':
            return [ 
                ...payload
            ]
        case 'ADD':
            return [
                ...state,
                payload
            ]
        default:
            return state
    }
}