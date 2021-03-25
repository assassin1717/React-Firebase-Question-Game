import firebase from 'firebase'
import Rebase from 're-base'

const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyB2iD8w2ZgehSvtY2bGUtMObWJA64x7R4g",
  authDomain: "reactquizz-assassin1717.firebaseapp.com",
  databaseURL: "https://reactquizz-assassin1717-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "reactquizz-assassin1717",
  storageBucket: "reactquizz-assassin1717.appspot.com",
  messagingSenderId: "145512113717",
  appId: "1:145512113717:web:93bd6ea8720e959873737c",
  measurementId: "G-CPNZE4BQC1"
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