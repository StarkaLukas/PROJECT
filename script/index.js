'use strict'
let config = {
    apiKey: "AIzaSyAWkinQIM4C_2YHjUq1RYr2wk4q_pIX5HY",
    authDomain: "project-c21db.firebaseapp.com",
    databaseURL: "https://project-c21db.firebaseio.com",
    projectId: "project-c21db",
    storageBucket: "project-c21db.appspot.com",
    messagingSenderId: "575431938944"
};
let actualSlide = 1;
let frame = 0;

firebase.initializeApp(config);

function start() {
    slide(actualSlide);
    setInterval(()=>{
        if(frame === 50){
            actualSlide++;
            slide(actualSlide);
            frame = 0;
        }
        frame++;
    }, 100);
    checkLoggedIn();
    document.getElementById('dart_icon').addEventListener('click', () => {
        scroll('#navigation');
    });
    document.getElementById('scrollAbout').addEventListener('click', () =>{
        scroll('#about');
    });
    document.getElementById('scrollFeatures').addEventListener('click', () =>{
        scroll('#features');
    });
    document.getElementById('scrollPractice').addEventListener('click', () =>{
        scroll('#practice');
    });
    document.getElementById('scrollStats').addEventListener('click', () =>{
        scroll('#stats');
    });
    document.getElementById('scrollDart').addEventListener('click', () =>{
        scroll('#dart');
    });
    document.getElementById('scrollTimeline').addEventListener('click', () =>{
        scroll('#timeline');
    });
    document.getElementById('left').addEventListener('click', () =>{
        frame = 0;
        actualSlide--;
        slide(actualSlide);
    });
    document.getElementById('right').addEventListener('click', ()=>{
        frame = 0;
        actualSlide++;
        slide(actualSlide);
    });
    setTimeout(()=>{
        writeWelcomeBack();
    }, 2000);
}

function checkLoggedIn() {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            document.getElementById('notLoggedIn').style.display = 'none';
            document.getElementById('loggedIn').style.display = 'block';
        } else {
            document.getElementById('notLoggedIn').style.display = 'block';
            document.getElementById('loggedIn').style.display = 'none';
        }
        document.getElementById('placeHolder').style.display = 'none';
    });
}

function slide(slide){
    let slides = document.getElementsByClassName('slide');

    if(slide > slides.length){
        actualSlide = 1;
    }
    else if(slide == 0){
        actualSlide = slides.length;
    }
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
    }
    slides[actualSlide - 1].style.display = 'block';
}

function scroll(scrollTo){
    $([document.documentElement, document.body]).animate({
        scrollTop: $(scrollTo).offset().top
    }, 750);
}

function logOut(){
    firebase.auth().signOut();
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