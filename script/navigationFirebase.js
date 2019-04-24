'use strict'

let config = {
    apiKey: "AIzaSyAWkinQIM4C_2YHjUq1RYr2wk4q_pIX5HY",
    authDomain: "project-c21db.firebaseapp.com",
    databaseURL: "https://project-c21db.firebaseio.com",
    projectId: "project-c21db",
    storageBucket: "project-c21db.appspot.com",
    messagingSenderId: "575431938944"
};

firebase.initializeApp(config);

function start() {
    setTimeout(()=>{
        writeWelcomeBack();
    }, 2000);
    checkLoggedIn();
}

function writeWelcomeBack(){
    let userID = firebase.auth().currentUser.uid;

    return firebase.database().ref('/users/' + userID).once('value').then(function(snapshot) {
        let username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
        document.getElementById('name').innerHTML = username;
        document.getElementById('name').style.color = 'white';
        console.log(username);
      });
}

function logOut(){
    firebase.auth().signOut();
}

function checkLoggedIn() {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            document.getElementById('notLoggedIn').style.display = 'none';
            document.getElementById('loggedIn').style.display = 'block';
            document.getElementById('content').style.display = 'block';
            document.getElementById('contentNotLoggedIn').style.display = 'none';
        } else {
            document.getElementById('notLoggedIn').style.display = 'block';
            document.getElementById('loggedIn').style.display = 'none';
            document.getElementById('content').style.display = 'none';
            document.getElementById('contentNotLoggedIn').style.display = 'block';
        }
        document.getElementById('placeHolder').style.display = 'none';
    });
}
