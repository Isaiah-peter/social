import * as firebase from "firebase/app";
import * as store from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDxIxv0t4npaPMdzujbogqDR4FNd6aQ_Xg",
  authDomain: "socialground-311b3.firebaseapp.com",
  projectId: "socialground-311b3",
  storageBucket: "socialground-311b3.appspot.com",
  messagingSenderId: "670811354795",
  appId: "1:670811354795:web:cded94af8709e16dc2e9ee",
  measurementId: "G-ZHXMS81TMM",
};

firebase.initializeApp(firebaseConfig);

const storage = store;

export default storage;
