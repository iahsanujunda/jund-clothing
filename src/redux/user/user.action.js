import UserActionTypes from './user.types';

export const googleSigninStart = () => ({
  type: UserActionTypes.GOOGLE_SIGNIN_START
});

export const emailSigninStart = (credentials) => ({
  type: UserActionTypes.EMAIL_SIGNIN_START,
  payload: credentials
});

export const signinSuccess = (user) => ({
  type: UserActionTypes.SIGNIN_SUCCESS,
  payload: user
});

export const signinFailed = (error) => ({
  type: UserActionTypes.SIGNIN_SUCCESS,
  payload: error
});

export const checkUserSession = () => ({
  type: UserActionTypes.CHECK_USER_SESSION
});

export const signoutStart = () => ({
  type: UserActionTypes.SIGNOUT_START
});

export const signoutSuccess = () => ({
  type: UserActionTypes.SIGNOUT_SUCCESS
});

export const signoutFailed = (error) => ({
  type: UserActionTypes.SIGNOUT_FAILED,
  payload: error
});
