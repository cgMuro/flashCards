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
        case 'UPDATE':
            state.forEach((item, idx) => {
                if (item.id == payload.id) {
                    state[idx] = payload;
                } 
            });
            return state;
        case 'DELETE':
            return state.filter(item => item.id != payload.id);
        default:
            return state
    }
}