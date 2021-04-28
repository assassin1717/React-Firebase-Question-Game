import firebase from 'firebase'
import Rebase from 're-base'

const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyANynM5oCbsehN05cGJGu81c4ZXcaI_GnQ",
  authDomain: "quiizz-estyleoflife.firebaseapp.com",
  databaseURL: "https://quiizz-estyleoflife-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "quiizz-estyleoflife",
  storageBucket: "quiizz-estyleoflife.appspot.com",
  messagingSenderId: "797768274973",
  appId: "1:797768274973:web:6152c1c0c95fa9d3afa2f4",
  measurementId: "G-0H37M1FVPB"
})
// Initialize Firebase
const db = firebase.database(firebaseConfig)
const config = Rebase.createClass(db)

export const providers={
  'facebook': new firebase.auth.FacebookAuthProvider(),
  'twitter': new firebase.auth.TwitterAuthProvider(),
  'google': new firebase.auth.GoogleAuthProvider()
}

export const auth=firebaseConfig.auth()
export default config