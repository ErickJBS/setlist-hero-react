import AuthActionTypes from './auth.types';

export const loginStart = crendentials => ({
    type: AuthActionTypes.LOGIN_START,
    payload: crendentials
});

export const loginSuccess = (user) => ({
    type: AuthActionTypes.LOGIN_SUCCESS,
    payload: user
});

export const loginFailure = (error) => ({
    type: AuthActionTypes.LOGIN_FAILURE,
    payload: AuthActionTypes
});

export const logout = () => ({
    type: AuthActionTypes.LOGOUT
});

export const registerSuccess = (user) => ({
    type: AuthActionTypes.REGISTER_SUCCESS,
    payload: user
});

export const registerFailure = (error) => ({
    type: AuthActionTypes.REGISTER_FAILURE,
    payload: AuthActionTypes
})