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
    let ctx1 = document.getElementById('chart1').getContext('2d');
    let myChart1 = new Chart(ctx1, {
        type: 'bar',
        data: {},
        options: {}
    });

    let ctx2 = document.getElementById('chart2').getContext('2d');
    let myChart2 = new Chart(ctx2, {
        type: 'bar',
        data: {},
        options: {}
    });

    let ctx3 = document.getElementById('chart3').getContext('2d');
    let myChart3 = new Chart(ctx3, {
        type: 'bar',
        data: {},
        options: {}
    });
    setTimeout(()=>{
        writeWelcomeBack();
    }, 2000);
    checkLoggedIn();
}

function writeWelcomeBack(){
    let userID = firebase.auth().currentUser.uid;

    return firebase.database().ref('/users/' + userID).once('value').then(function(snapshot) {
        let username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
        document.getElementById('heading').style.color = 'black';
        document.getElementById('heading').innerHTML = `Welcome back ${username}`;
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
            document.getElementById('notLoggedInContent').style.display = 'none';
        } else {
            document.getElementById('notLoggedIn').style.display = 'block';
            document.getElementById('loggedIn').style.display = 'none';
            document.getElementById('content').style.display = 'none';
            document.getElementById('notLoggedInContent').style.display = 'block';
        }
        document.getElementById('placeHolder').style.display = 'none';
    });
}

