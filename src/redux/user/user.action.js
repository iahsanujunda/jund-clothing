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
