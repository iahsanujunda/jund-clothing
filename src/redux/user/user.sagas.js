import { takeLatest, put, all, call } from 'redux-saga/effects';

import UserActionTypes from "./user.types";

import {
  googleSigninSuccess,
  googleSigninFailed,
  emailSigninSuccess,
  emailSigninFailed
} from "./user.action";

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

export function* signinWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    const userRef = yield call(createUserProfileDocument, user);
    const userSnapshot = yield userRef.get();

    yield put(
      emailSigninSuccess({ id: userSnapshot.id, ...userSnapshot.data() })
    );
  } catch(error) {
    yield put(emailSigninFailed(error))
  }
}

export function* onGoogleSigninStart() {
  yield takeLatest(UserActionTypes.GOOGLE_SIGNIN_START, signinWithGoogle)
}

export function* onEmailSigninStart() {
  yield takeLatest(UserActionTypes.EMAIL_SIGNIN_START, signinWithEmail)
}

export function* userSagas() {
  yield all([
    call(onGoogleSigninStart),
    call(onEmailSigninStart)
  ]);
}