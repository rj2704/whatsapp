import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAC9q4BuZFoD5nKtySua1x8JtiswRmhYEo",
    authDomain: "whatsapp-clone-52837.firebaseapp.com",
    projectId: "whatsapp-clone-52837",
    storageBucket: "whatsapp-clone-52837.appspot.com",
    messagingSenderId: "339607302204",
    appId: "1:339607302204:web:1cf804662d710d5c539339"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;