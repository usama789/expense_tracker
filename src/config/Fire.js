import firebase from 'firebase';
const config ={

    apiKey: "AIzaSyA_bi5zT0kBh9t9urs7ilm2VPLc0QdiV6M",
    authDomain: "expense-tracker-900dd.firebaseapp.com",
    projectId: "expense-tracker-900dd",
    storageBucket: "expense-tracker-900dd.appspot.com",
    messagingSenderId: "764109047590",
    appId: "1:764109047590:web:29eb7b013babd3d35023e7",
    measurementId: "G-EECVPPR326"
}

const fire = firebase.initializeApp(config);

export default fire;