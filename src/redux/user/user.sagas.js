import { takeLatest, put, all, call } from 'redux-saga/effects';

import UserActionTypes from "./user.types";

import {
  signinSuccess,
  signinFailed,
  signoutSuccess,
  signoutFailed, signupFailed, signupSuccess
} from "./user.action";

import {
  auth,
  googleProvider,
  createUserProfileDocument,
  getCurrentUser
} from "../../firebase/firebase.utils";

export function* getSnapshotFromUserAuth(userAuth, additionalData) {
  try{
    const userRef = yield call(createUserProfileDocument, userAuth, additionalData);
    const userSnapshot = yield userRef.get();

    yield put(
      signinSuccess({ id: userSnapshot.id, ...userSnapshot.data() })
    );
  } catch(error) {
    yield put(
      signinFailed(error)
    );
  }
}

export function* signinWithGoogle() {
  try{
    const { user } = yield auth.signInWithPopup(googleProvider);
    yield getSnapshotFromUserAuth(user);
  } catch(error) {
    yield put(
      signinFailed(error)
    );
  }
}

export function* signinWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield getSnapshotFromUserAuth(user);
  } catch(error) {
    yield put(signinFailed(error))
  }
}

export function* signUp({payload: { email, password, displayName }}) {
  try {
    const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    yield put(signupSuccess({ user, additionalData: { displayName }}));
  } catch (error) {
    yield put(signupFailed(error));
  }
}

export function* signinAfterSignup({payload: { user, additionalData}}) {
  yield getSnapshotFromUserAuth(user, additionalData)
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser();

    if (!userAuth) return;

    yield getSnapshotFromUserAuth(userAuth);
  } catch (error) {
    yield put(signinFailed(error));
  }
}

export function* signout() {
  try {
    yield auth.signOut();
    yield put(signoutSuccess());
  } catch (error) {
    yield put(signoutFailed(error));
  }
}

export function* onGoogleSigninStart() {
  yield takeLatest(UserActionTypes.GOOGLE_SIGNIN_START, signinWithGoogle)
}

export function* onEmailSigninStart() {
  yield takeLatest(UserActionTypes.EMAIL_SIGNIN_START, signinWithEmail)
}

export function* onCheckUserSession() {
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* onSignoutStart() {
  yield takeLatest(UserActionTypes.SIGNOUT_START, signout)
}

export function* onSignupStart() {
  yield takeLatest(UserActionTypes.SIGNUP_START, signUp)
}

export function* onSignupSuccess() {
  yield takeLatest(UserActionTypes.SIGNUP_SUCCESS, signinAfterSignup)
}

export function* userSagas() {
  yield all([
    call(onGoogleSigninStart),
    call(onEmailSigninStart),
    call(onCheckUserSession),
    call(onSignoutStart),
    call(onSignupStart),
    call(onSignupSuccess)
  ]);
}