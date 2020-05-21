import AuthActionTypes from './auth.types';
import Cookies from 'js-cookie';

let jwt = {};
if (Cookies.get('jwt')) jwt = JSON.parse((Cookies.get('jwt')));

const INITIAL_STATE = {
    user: {
        token : jwt.token,
        ...jwt.user
    } || {},
    error: {}
};

const authReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;
    switch (type) {
        case AuthActionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                user: payload,
            };
        case AuthActionTypes.LOGIN_FAILURE:
            return {
                ...state,
                error: payload
            };
        case AuthActionTypes.LOGOUT:
            return {
                ...state,
                user: null,
                error: null
            };
        case AuthActionTypes.REGISTER_SUCCESS:
            return {
                ...state,
                user: payload
            };
        case AuthActionTypes.REGISTER_FAILURE:
            return {
                ...state,
                error: payload
            }
        default:
            return state;
    }
}

export default authReducer;