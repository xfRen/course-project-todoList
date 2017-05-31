import firebase from 'firebase';

// Initialize Firebase: copied from https://console.firebase.google.com/project/course-project-todo-list/overview
var config = {
  apiKey: "AIzaSyBEIYWXDuLT3QrxXgxHQzokKofNMX4-aqc",
  authDomain: "course-project-todo-list.firebaseapp.com",
  databaseURL: "https://course-project-todo-list.firebaseio.com",
  projectId: "course-project-todo-list",
  storageBucket: "course-project-todo-list.appspot.com",
  messagingSenderId: "466251089861"
};
firebase.initializeApp(config);

var firebaseRef = firebase.database().ref(); // this is the root reference
firebaseRef.set({
  app: {
    name: 'todo app',
    version: '1.0.0'
  },
  isRunning: true,
  user: {
    name: 'xiaofei',
    age: 32
  }
}).then(function() {
  console.log('set worked!');
}, function(error) {
  console.log('set failed!');
});

// ---------------- for arrays -----------------------
var todosRef = firebaseRef.child('todos');

todosRef.on('child_added', (snapshot) => { // child_added event is fired everytime a new child is added
  console.log('child_added', snapshot.key, snapshot.val());
});

todosRef.on('child_changed', (snapshot) => {
  console.log('child_changed', snapshot.key, snapshot.val());
});

todosRef.on('child_removed', (snapshot) => {
  console.log('child_removed', snapshot.key, snapshot.val());
});

todosRef.push().set({
  text: 'Walk the cat'
});

todosRef.push({
  text: 'Walk the cat again'
});
// Differences between push({...}) and push().set({...}):
// When you call .set() a promise gets returned.
// This is not a firebase reference so there is not going to be a key prop available.
//
// When you call .push() you're going to get a combined reference and promise.
// That means you will be able to add a call to .then() to wait for it to complete.
// You'll also be able to fetch the key using the key prop.

todosRef.child('003').set({ // this is how to add an item with an ID not generated by firebase
  text: 'Walk the cat once again'
});


// ---------------------------- About set() ---------------------------
// set() wipes the existing data and then sets the data you passed in.
// set() returns a promise so you can do something after your data has been saved in firebase.

// wipe the whole data and replace it with something else
// firebaseRef.set({
//   firstName: 'Xiaofei',
//   lastName: 'Ren'
// });

// wipe a subset of data 'user' and replace it with new user
// firebaseRef.child('app').set({
//   name: 'Click play'
// });


// ----------------------------- update() ----------------------
// update() only update the first level of properties
// update() also returns a promise
// multi-path updates
firebaseRef.update({
  isRunning: false,
  'app/name': 'update name property only via multi-path updates'
});

firebaseRef.child('app').update({
  name: 'update name alone once again'
}).then(() => {
  console.log('update worked!');
}, (error) => {
  console.log('update failed!');
});


// ----------------------- remove -----------------------
// remove() also returns a promise
// firebaseRef.child('app/name').remove();

// another way is to update() to null
// firebaseRef.update({
//   'app/name': null
// });


// ----------------- fetching data -------------------------
// once() lets us trigger and listen for an event; it will get called only once
firebaseRef.once('value').then((snapshot) => {
  console.log('Got entire database', snapshot.val());
}, (error) => {
  console.log('Unable to fetch value', error);
});
// when you use child(), you can also fetch the key
firebaseRef.child('app').once('value').then((snapshot) => {
  console.log('Got a subset -', snapshot.key, snapshot.val());
}, (error) => {
  console.log('Unable to fetch value', error);
});
// listen to changes on firebase database
// it will get called once right away and then it will be called once the data is changed
var logData = (snapshot) => {
  console.log('Got value', snapshot.val());
};
firebaseRef.on('value', logData);
// you can not remove the once() listener but you can remove the on() listener
// firebaseRef.off(); will remove all on() listeners
firebaseRef.off('value', logData);

firebaseRef.child('app').update({
  version: '2.0.0'
});
// the below code will only listen to a specific ref - 'user'
firebaseRef.child('user').on('value', (snapshot) => {
  console.log('User has been changed', snapshot.val());
});

firebaseRef.child('user').update({
  name: 'Xiang Li'
});

firebaseRef.child('app').update({
  name: 'Shuijiao'
});