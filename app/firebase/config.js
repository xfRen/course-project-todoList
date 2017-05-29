import firebase from 'firebase';

try {
  var config = {
    apiKey: "AIzaSyBEIYWXDuLT3QrxXgxHQzokKofNMX4-aqc",
    authDomain: "course-project-todo-list.firebaseapp.com",
    databaseURL: "https://course-project-todo-list.firebaseio.com",
    projectId: "course-project-todo-list",
    storageBucket: "course-project-todo-list.appspot.com",
    messagingSenderId: "466251089861"
  };
  firebase.initializeApp(config);
} catch (error) {
  console.log('firebase.initializeApp failed.');
}

export var firebaseRef = firebase.database().ref();
export default firebase;
