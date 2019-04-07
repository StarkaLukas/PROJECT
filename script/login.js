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

let email = document.getElementById('email');
let emailText = document.getElementById('faultemail');
let password = document.getElementById('password');
let passwordText = document.getElementById('faultpassword');
let button = document.getElementById('button');
let activeUser, faultemail, faultpassword;
let defaultColor = 'black';
let errorColor = 'red';

let faultPassword = '';
let faultEmail = '';

function check() {
    button.addEventListener('click', submit);
    email.addEventListener('keyup', ()=>{
        email.style.borderBottomColor = defaultColor;
        emailText.innerHTML = '';
    });
    password.addEventListener('keyup', ()=>{
        password.style.borderBottomColor = defaultColor;
        passwordText.innerHTML = '';
    });
    document.getElementById('email').addEventListener('focus', () => {
        focusMethod(document.getElementById('emailText'));
    });
    document.getElementById('email').addEventListener('blur', () => {
        blurMethod(document.getElementById('emailText'), document.getElementById('email'));
    });
    document.getElementById('password').addEventListener('focus', () => {
        focusMethod(document.getElementById('passwordText'));
    });
    document.getElementById('password').addEventListener('blur', () => {
        blurMethod(document.getElementById('passwordText'), document.getElementById('password'));
    });
    document.getElementById('home').addEventListener('click', ()=>{
        window.open('../index.html', '_self');
    });
}

function submit() {
    checkBlank(email.value, 'Email');
    checkBlank(password.value, 'Password');
    checkFaults();
}

// function checkEmail(email, emailText){
//     if(users != null){
//         for(let user of users){
//             if(email === user.email){
//                 faultEmail = '';
//                 emailText.innerHTML = '';
//                 document.getElementById('email').style.borderBottomColor = defaultColor;
//                 activeUser = user;
//             }   
//             else{
//                 faultEmail = 'There is no account using this email!';
//                 emailText.innerHTML = 'There is no account using this email!';
//                 document.getElementById('email').style.borderBottomColor = errorColor;
//             }
//         }
//     }

// }

// function checkPassword(password, passwordText){
//     if(activeUser === undefined){
//         faultPassword = 'There is no email selected!';
//         passwordText.innerHTML = 'There is no email selected!';
//         document.getElementById('password').style.borderBottomColor = errorColor;
//     }
//     else{
//         if(activeUser.password == password){
//             faultPassword = '';
//             passwordText.innerHTML = '';
//             document.getElementById('password').style.borderBottomColor = defaultColor;
//         }
//         else{
//             faultPassword = 'Password is incorrect!';
//             passwordText.innerHTML = 'Password is incorrect!';
//             document.getElementById('password').style.borderBottomColor = errorColor;
//         }
//     }
// }

function checkBlank(field, fieldString) {
    let patt = /./gm;
    let result = patt.test(field);

    if (!result) {
        switch (fieldString) {
            case 'Email':
                faultEmail = `${fieldString} can't be blank!`;
                emailText.innerHTML = `${fieldString} can't be blank!`;
                document.getElementById('email').style.borderBottomColor = errorColor;
                break;
            case 'Password':
                faultPassword = `${fieldString} can't be blank!`;
                passwordText.innerHTML = `${fieldString} can't be blank!`;
                document.getElementById('password').style.borderBottomColor = errorColor;
                break;
        }
    }
}

function checkFaults() {
    if (faultPassword === '' && faultEmail == '') {
        signInUser(document.getElementById('email').value, document.getElementById('password').value);
        setTimeout(() =>{
            window.open('./profile.html', '_self');
        }, 3000);
    }
    faultpassword = '';
    faultEmail = '';
}

function signInUser(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log('%c ' + errorMessage + ' ' + errorCode, 'color: #FF0000');
        switch (errorCode) {
            case 'auth/user-not-found':
                document.getElementById('faultemail').innerHTML = 'Wrong email!';
                email.style.borderBottomColor = errorColor;
                break;
            case 'auth/wrong-password':
                document.getElementById('faultpassword').innerHTML = 'Wrong password!';
                password.style.borderBottomColor = errorColor;
                break;
        }
    });
}

function focusMethod(element) {
    element.style.color = 'black';
}
function blurMethod(element, otherElement) {
    element.style.color = 'lightslategray';
}