let users = JSON.parse(localStorage.getItem('user'));
let email = document.getElementById('email');
let emailText = document.getElementById('faultemail');
let password = document.getElementById('password');
let passwordText = document.getElementById('faultpassword');
let button = document.getElementById('button');
let activeUser, faultemail, faultpassword;
let defaultColor = 'yellow';
let errorColor = 'red';

function check(){
    button.addEventListener('click', submit);
    if(typeof(localStorage) !== 'undefined'){

        email.addEventListener('keyup', () => {
            checkEmail(email.value, emailText);
        });
        password.addEventListener('keyup', () => {
            checkPassword(password.value, passwordText);
        });
    }
}
function submit(){
    checkBlank(email.value, 'Email');
    checkBlank(password.value, 'Password');
    checkFaults();
}

function checkEmail(email, emailText){
    if(users != null){
        for(let user of users){
            if(email === user.email){
                faultEmail = '';
                emailText.innerHTML = '';
                document.getElementById('email').style.borderBottomColor = defaultColor;
                activeUser = user;
            }   
            else{
                faultEmail = 'There is no account using this email!';
                emailText.innerHTML = 'There is no account using this email!';
                document.getElementById('email').style.borderBottomColor = errorColor;
            }
        }
    }
    
}

function checkPassword(password, passwordText){
    if(activeUser === undefined){
        faultPassword = 'There is no email selected!';
        passwordText.innerHTML = 'There is no email selected!';
        document.getElementById('password').style.borderBottomColor = errorColor;
    }
    else{
        if(activeUser.password == password){
            faultPassword = '';
            passwordText.innerHTML = '';
            document.getElementById('password').style.borderBottomColor = defaultColor;
        }
        else{
            faultPassword = 'Password is incorrect!';
            passwordText.innerHTML = 'Password is incorrect!';
            document.getElementById('password').style.borderBottomColor = errorColor;
        }
    }
}

function checkBlank(field, fieldString){
    let patt = /./gm;
    let result = patt.test(field);

    if(!result){
        switch(fieldString){
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

function checkFaults(){
    if(faultPassword === '' && faultEmail == ''){
        if(typeof(Storage) !== undefined){
            localStorage.setItem('activeUser', JSON.stringify(activeUser));
            window.open('../html/home.html', '_self')
        }
    }
}