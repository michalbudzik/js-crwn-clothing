import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHj_rifvYVt0apxt08y70jqu7HxL5xTRM",
  authDomain: "crwn-clothing-db-f3ec5.firebaseapp.com",
  projectId: "crwn-clothing-db-f3ec5",
  storageBucket: "crwn-clothing-db-f3ec5.appspot.com",
  messagingSenderId: "510285846275",
  appId: "1:510285846275:web:27644093b3c19333b4bb36"
};


// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  // if user data doesn't exist create/set the data from userAuth in database collection
  if (!userSnapshot.exists()) {
    console.log('no prev data');
    const { displayName, email} = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      });
    } catch(error) {
      console.log('error creating the user', error.message);
    }
  }

  return userDocRef;




}