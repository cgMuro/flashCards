export default (state, { type, payload }) => {
    switch (type) {
        case 'LOAD_USER':
            return { 
                ...state, 
                isLoading: true
            }
        case 'USER_LOADED':
            return { 
                ...state, 
                isLoading: false,
                isAuthenticated: true,
                user: payload
            }
        case 'LOGIN_SUCCESS':
        case 'REGISTER_SUCCESS':
            localStorage.setItem('token', payload.token);
            return { 
                isLoading: true,
                isAuthenticated: true,
                ...payload
            }
        case 'AUTH_ERROR':
        case 'AUTH_FAIL':
        case 'LOGOUT_SUCCESS':
        case 'REGISTER_FAIL':
            localStorage.removeItem('token');
            return { 
                ...state, 
                isLoading: false,
                isAuthenticated: false,
                user: null,
                token: null
            }
        case 'UPDATE_USERNAME':
            state.user.username = payload[0].username;
            return {
                ...state
            }
        case 'UPDATE_PASSWORD':
            state.user.password = payload[0].password;
            return {
                ...state
            }
        default:
            return state
    }
}