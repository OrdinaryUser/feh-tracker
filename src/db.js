import firebase from 'firebase/app'
import 'firebase/firestore'
import config from './config'

export const db = firebase.initializeApp(config).firestore()
