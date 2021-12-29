import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'

const app = firebase.initializeApp({
  apiKey: "AIzaSyCcyjofEEgncKXm1N7P3iUZ22rPOCOsVh0",
  authDomain: "crud-firebase-9-6aada.firebaseapp.com",
  projectId: "crud-firebase-9-6aada",
  storageBucket: "crud-firebase-9-6aada.appspot.com",
  messagingSenderId: "273018217790",
  appId: "1:273018217790:web:307d897e874bc6741e786f"
})

export const db = app.firestore()
export default app