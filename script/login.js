let users = JSON.parse(localStorage.getItem('user'));
let email = document.getElementById('email');
let emailText = document.getElementById('faultemail');
let password = document.getElementById('password');
let passwordText = document.getElementById('faultpassword');
let button = document.getElementById('button');

function check(){
    if(typeof(localStorage) !== 'undefined'){

        email.addEventListener('keyup', () =>{
            checkEmail(email.value, emailText);
        });
        password.addEventListener('keyup', ()=>{
            checkPassword(password.value, passwordText);
        });
        button.addEventListener('click', submit);
    }
}
function submit(){
    faults = '';
}

function checkEmail(email, emailText){

}

function checkPassword(password, passwordText){

}