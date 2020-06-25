import { takeLatest, put, all, call } from 'redux-saga/effects';

import UserActionTypes from "./user.types";

import { googleSigninSuccess, googleSigninFailed } from "./user.action";

import {
  auth,
  googleProvider,
  createUserProfileDocument
} from "../../firebase/firebase.utils";

export function* signinWithGoogle() {
  try{
    const { user } = yield auth.signInWithPopup(googleProvider);
    const userRef = yield call(createUserProfileDocument, user);
    const userSnapshot = yield userRef.get();

    yield put(
      googleSigninSuccess({ id: userSnapshot.id, ...userSnapshot.data() })
    );
  } catch(error) {
    yield put(
      googleSigninFailed(error)
    );
  }
}

export function* onGoogleSigninStart() {
  yield takeLatest(UserActionTypes.GOOGLE_SIGNIN_START, signinWithGoogle)
}

export function* userSagas() {
  yield all([call(onGoogleSigninStart)]);
}