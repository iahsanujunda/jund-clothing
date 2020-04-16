import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyByDMhZ7AU2-_XrmVN_Dwn5X-R8DsEh10A",
  authDomain: "jund-clothing.firebaseapp.com",
  databaseURL: "https://jund-clothing.firebaseio.com",
  projectId: "jund-clothing",
  storageBucket: "jund-clothing.appspot.com",
  messagingSenderId: "241783376861",
  appId: "1:241783376861:web:2b114a3385b787d16e4434"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return;

  const userReference = firestore.doc(`users/${userAuth.uid}`);
  const snapshot = await userReference.get();

  if(!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userReference.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log(`error creating user: ${error.message}`);
    }
  }

  return userReference;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;