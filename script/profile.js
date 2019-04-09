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
    document.getElementById('logOut').addEventListener('click', logOut());
}

function writeWelcomeBack(){
    let userID = firebase.auth().currentUser.uid;

    return firebase.database().ref('/users/' + userID).once('value').then(function(snapshot) {
        let username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
        document.getElementById('heading').innerHTML = `Welcome back ${username}`;
        console.log(username);
      });
}

function logOut(){
    firebase.auth().signOut();
}
