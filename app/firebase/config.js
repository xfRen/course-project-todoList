import firebase from 'firebase';

try {
  var config = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    storageBucket: process.env.STORAGE_BUCKET
  };
  firebase.initializeApp(config);
} catch (error) {
  console.log('firebase.initializeApp failed.');
}

export var firebaseRef = firebase.database().ref();
export default firebase;
