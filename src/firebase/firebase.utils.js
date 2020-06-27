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

export const addItemsCollection = async (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = (collections) => {
   const transformedCollection = collections.docs.map(doc => {
     const { title, items } = doc.data();

     return {
       routeName: encodeURI(title.toLowerCase()),
       id: doc.id,
       title,
       items
     }
   });

   return transformedCollection.reduce((accumulator, collection) => {
     accumulator[collection.title.toLowerCase()] = collection;
     return accumulator;
   }, {});
}

export const getCurrentUser = () => {
  return new Promise(((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject)
  }))
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;