'use strict'

// Initialize Firebase
let config = {
    apiKey: "AIzaSyAWkinQIM4C_2YHjUq1RYr2wk4q_pIX5HY",
    authDomain: "project-c21db.firebaseapp.com",
    databaseURL: "https://project-c21db.firebaseio.com",
    projectId: "project-c21db",
    storageBucket: "project-c21db.appspot.com",
    messagingSenderId: "575431938944"
};

firebase.initializeApp(config);


let output = document.getElementById('output');
let button = document.getElementById('button');
let countMale = 0;
let countFemale = 0;
let countOther = 0;
let defaultColor = 'yellow';
let errorColor = 'red';
let users = [];
let usersStored = JSON.parse(localStorage.getItem('user'));

let faultUsername = '';
let faultEmail = '';
let faultEmail2 = '';
let faultDay = '';
let faultMonth = '';
let faultYear = '';
let faultPassword = '';
let faultpassword2 = '';
let faultTOU = '';

class User {
    constructor(username, email, password, days, months, years) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.days = days;
        this.months = months;
        this.years = years;
    }
}

function start() {
    document.getElementById('button').addEventListener('click', check);

    innerDay(document.getElementById('birthDay'));
    innerMonth(document.getElementById('birthMonth'));
    innerYear(document.getElementById('birthYear'));

    document.getElementById('firstName').addEventListener('focus', () => {
        focusMethod(document.getElementById('firstNameText'));
    });
    document.getElementById('firstName').addEventListener('blur', () => {
        blurMethod(document.getElementById('firstNameText'), document.getElementById('firstName'));
    });

    document.getElementById('email').addEventListener('focus', () => {
        focusMethod(document.getElementById('emailText'));
    });
    document.getElementById('email').addEventListener('blur', () => {
        blurMethod(document.getElementById('emailText'), document.getElementById('email'));
    });

    document.getElementById('email2').addEventListener('focus', () => {
        focusMethod(document.getElementById('email2Text'));
    });
    document.getElementById('email2').addEventListener('blur', () => {
        blurMethod(document.getElementById('email2Text'), document.getElementById('email2'));
    });
    document.getElementById('password').addEventListener('focus', () => {
        focusMethod(document.getElementById('passwordText'));
    });
    document.getElementById('password').addEventListener('blur', () => {
        blurMethod(document.getElementById('passwordText'), document.getElementById('password'));
    });

    document.getElementById('password2').addEventListener('focus', () => {
        focusMethod(document.getElementById('password2Text'));
    });
    document.getElementById('password2').addEventListener('blur', () => {
        blurMethod(document.getElementById('password2Text'), document.getElementById('password2'));
    });

    document.getElementById('check').addEventListener('click', () => {
        checkBox(document.getElementById('termsText'), document.getElementById('check'));
    });

    document.getElementById('firstName').addEventListener('keyup', () => {
        checkMethod(checkName, document.getElementById('firstName').value, 'First name');
    });
    document.getElementById('email').addEventListener('keyup', () => {
        checkMethod(checkEmail, document.getElementById('email').value, 'Email');
    });
    document.getElementById('email2').addEventListener('keyup', () => {
        checkMethod(checkEmail2, document.getElementById('email2').value, 'Email confirmation');
    });
    document.getElementById('password').addEventListener('keyup', () => {
        checkMethod(checkPassword, document.getElementById('password').value, 'Password');
    });
    document.getElementById('password2').addEventListener('keyup', () => {
        checkMethod(checkPassword2, document.getElementById('password2').value, 'Password confirmation');
    });
    document.getElementById('birthDay').addEventListener('change', () => {
        checkDateOfBirth(document.getElementById('birthDay'), document.getElementById('birthMonth'), document.getElementById('birthYear'));
    });
    document.getElementById('birthMonth').addEventListener('change', () => {
        checkDateOfBirth(document.getElementById('birthDay'), document.getElementById('birthMonth'), document.getElementById('birthYear'));
    });
    document.getElementById('birthYear').addEventListener('change', () => {
        checkDateOfBirth(document.getElementById('birthDay'), document.getElementById('birthMonth'), document.getElementById('birthYear'));
    });
}
function check() {
    checkBlank(document.getElementById('firstName').value, 'First name');
    checkBlank(document.getElementById('email').value, 'Email');
    checkBlank(document.getElementById('email2').value, 'Email confirmation');
    checkBlank(document.getElementById('password').value, 'Password');
    checkBlank(document.getElementById('password2').value, 'Password confirmation');
    checkTermsOfUse(document.getElementById('check'), 'Terms of Use');
    checkDateOfBirth(document.getElementById('birthDay'), document.getElementById('birthMonth'), document.getElementById('birthYear'));
    checkFaults();
    faultUsername = '';
    faultEmail = '';
    faultEmail2 = '';
    faultDay = '';
    faultMonth = '';
    faultYear = '';
    faultPassword = '';
    faultpassword2 = '';
    faultTOU = '';

}
function checkMethod(methodNeeded, field, fieldString) {
    if (!isBlank(field)) {
        switch (fieldString) {
            case 'First name':
                faultUsername += fieldString + " can't be blank!\n";
                document.getElementById('faultfirstName').innerHTML = fieldString + " can't be blank";
                document.getElementById('firstName').style.borderBottomColor = errorColor;
                break;
            case 'Email':
                faultEmail += fieldString + " can't be blank!\n";
                document.getElementById('faultemail').innerHTML = fieldString + " can't be blank";
                document.getElementById('email').style.borderBottomColor = errorColor;
                break;
            case 'Email confirmation':
                faultEmail2 += fieldString + " can't be blank!\n";
                document.getElementById('faultemail2').innerHTML = fieldString + " can't be blank";
                document.getElementById('email2').style.borderBottomColor = errorColor;
                break;
            case 'Password':
                faultPassword += fieldString + " can't be blank!\n";
                document.getElementById('faultpassword').innerHTML = fieldString + " can't be blank";
                document.getElementById('password').style.borderBottomColor = errorColor;
                break;
            case 'Password confirmation':
                faultpassword2 += fieldString + " can't be blank!\n";
                document.getElementById('faultpassword2').innerHTML = fieldString + " can't be blank";
                document.getElementById('password2').style.borderBottomColor = errorColor;
                break;
        }
    }
    else {
        methodNeeded(field, fieldString);
    }
}
function isBlank(field) {
    let patt = /./gm;
    let result = patt.test(field);

    return result;
}
function checkName(name, word) {
    let patt1 = /.{2,}/gm
    let patt2 = /[^A-z0-9\_\.]/gm;
    let result1 = patt1.test(name);
    let result2 = patt2.test(name);

    if (!result1) {
        if (faultUsername !== '') {
            faultUsername += word + ' is too short!\n';
        }
        else {
            faultUsername = word + ' is too short!\n';
        }
        document.getElementById('faultfirstName').innerHTML = word + ' is too short!';
        document.getElementById('firstName').style.borderBottomColor = errorColor;
    }
    else if (result2) {
        if (faultUsername !== '') {
            faultUsername += word + ' contains invalid characters!\n';
        }
        else {
            faultUsername = word + ' contains invalid characters!\n';
        }
        document.getElementById('faultfirstName').innerHTML = word + ' contains invalid characters!';
        document.getElementById('firstName').style.borderBottomColor = errorColor;
    }
    else {
        faultUsername = '';
        document.getElementById('faultfirstName').innerHTML = '';
        document.getElementById('firstName').style.borderBottomColor = defaultColor;
    }
}
function checkEmail(email, word) {
    let patt1 = /.{7,}/gm;
    let patt2 = /^[a-z0-9_\.]+@[a-z]+\.[a-z]{2,}/g;
    let exists = false;

    let result1 = patt1.test(email);
    let result2 = patt2.test(email);

    if (usersStored !== null) {
        for (let user of usersStored) {
            if (user.email === email) {
                if (faultEmail !== '') {
                    faultEmail += 'This email already exists!';
                }
                else {
                    faultEmail = 'This email already exists!';
                }
                document.getElementById('faultemail').innerHTML = 'This email already exists!';
                document.getElementById('email').style.borderBottomColor = errorColor;
                exists = true;
            }
        }
    }

    if (!exists) {
        if (!result1) {
            if (faultEmail !== '') {
                faultEmail += word + ' is too short!\n';
            }
            else {
                faultEmail = word + ' is too short!\n';
            }
            document.getElementById('faultemail').innerHTML = word + ' is too short!';
            document.getElementById('email').style.borderBottomColor = errorColor;
        }
        else if (!result2) {
            if (faultEmail !== '') {
                faultEmail += word + ' is invalid!\n';
            }
            else {
                faultEmail = word + ' is invalid!\n';
            }
            document.getElementById('faultemail').innerHTML = word + ' is invalid!';
            document.getElementById('email').style.borderBottomColor = errorColor;
        }
        else {
            faultEmail = '';
            document.getElementById('faultemail').innerHTML = '';
            document.getElementById('email').style.borderBottomColor = defaultColor;
        }
    }
}
function checkEmail2(email, word) {
    if (document.getElementById('email').value != email) {
        if (faultEmail2 !== '') {
            faultEmail2 += word + ' is not equal to the first E-Mail!\n';
        }
        else {
            faultEmail2 = word + ' is not equal to the first E-Mail!\n';
        }
        document.getElementById('faultemail2').innerHTML = word + ' is not equal to the first E-Mail';
        document.getElementById('email2').style.borderBottomColor = errorColor;
    }
    else {
        faultEmail2 = '';
        document.getElementById('faultemail2').innerHTML = '';
        document.getElementById('email2').style.borderBottomColor = defaultColor;
    }
}
function checkPassword(password, word) {
    let patt1 = /.{8,}/gm;
    let patt2 = /[^A-z0-9#?!]/gm;
    let patt3 = /[A-Z]+/gm;
    let patt4 = /[a-z]+/gm;
    let patt5 = /[0-9]+/gm;

    let result1 = patt1.test(password);
    let result2 = patt2.test(password);
    let result3 = patt3.test(password);
    let result4 = patt4.test(password);
    let result5 = patt5.test(password);

    if (!result1) {
        if (faultPassword !== '') {
            faultPassword += word + ' is too short!\n';
        }
        else {
            faultPassword = word + ' is too short!\n';
        }
        document.getElementById('faultpassword').innerHTML = word + ' is too short!';
        document.getElementById('password').style.borderBottomColor = errorColor;
    }
    else if (result2) {
        if (faultPassword !== '') {
            faultPassword += word + ' contains invalid characters!\n';
        }
        else {
            faultPassword = word + ' contains invalid characters!\n';
        }
        document.getElementById('faultpassword').innerHTML = word + ' contains invalid characters!';
        document.getElementById('password').style.borderBottomColor = errorColor;
    }
    else if (!result3) {
        if (faultPassword !== '') {
            faultPassword += word + ' must contain at least one uppercase letter!\n';
        }
        else {
            faultPassword = word + ' must contain at least one uppercase letter!\n';
        }
        document.getElementById('faultpassword').innerHTML = word + ' must contain at least one uppercase letter!';
        document.getElementById('password').style.borderBottomColor = errorColor;
    }
    else if (!result4) {
        if (faultPassword !== '') {
            faultPassword += word + ' must contain at least one lowercase letter!\n';
        }
        else {
            faultPassword = word + ' must contain at least one lowercase letter!\n';
        }
        document.getElementById('faultpassword').innerHTML = word + ' must contain at least one lowercase letter!';
        document.getElementById('password').style.borderBottomColor = errorColor;
    }
    else if (!result5) {
        if (faultPassword !== '') {
            faultPassword += word + ' must contain at least one special character!\n';
        }
        else {
            faultPassword = word + ' must contain at least one special character!\n';
        }
        document.getElementById('faultpassword').innerHTML = word + ' must contain at least one special character! (0-9)';
        document.getElementById('password').style.borderBottomColor = errorColor;
    }
    else {
        faultPassword = '';
        document.getElementById('faultpassword').innerHTML = '';
        document.getElementById('password').style.borderBottomColor = defaultColor;
    }
}
function checkPassword2(password, word) {
    if (document.getElementById('password').value != password) {
        if (faultpassword2 !== '') {
            faultpassword2 += word + ' is not equal to the first Password!\n';
        }
        else {
            faultpassword2 = word + ' is not equal to the first Password!\n';
        }
        document.getElementById('faultpassword2').innerHTML = word + ' is not equal to the first Password';
        document.getElementById('password2').style.borderBottomColor = errorColor;
    }
    else {
        faultpassword2 = '';
        document.getElementById('faultpassword2').innerHTML = '';
        document.getElementById('password2').style.borderBottomColor = defaultColor;
    }
}
function checkBox(element, checkBox) {
    if (element.style.color == 'white') {
        element.style.color = 'lightslategray';
    }
    else {
        element.style.color = 'white';
    }
    if (!checkBox.checked) {
        document.getElementById('faultcheck').innerHTML = 'Terms of Use need to be agreed';
    }
    else {
        document.getElementById('faultcheck').innerHTML = '';
    }

}
function checkTermsOfUse(checkBox, word) {
    if (!checkBox.checked) {
        if (faultTOU !== '') {
            faultTOU += word + ' need to be agreed!\n';
            document.getElementById('faultcheck').innerHTML = 'Terms of Use need to be agreed';
        }
        else {
            faultTOU = word + ' need to be agreed!\n';
            document.getElementById('faultcheck').innerHTML = 'Terms of Use need to be agreed';
        }
    }
    else {
        faultTOU = '';
    }
}
function innerDay(select) {
    for (let i = 1; i <= 31; i++) {
        let option = document.createElement('option');
        option.text = i;
        select.add(option);
    }
}
function innerMonth(select) {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    for (let i = 0; i < months.length; i++) {
        let option = document.createElement('option');
        option.text = months[i];
        select.add(option);

    }

}
function innerYear(select) {
    for (let i = 1965; i <= 2019; i++) {
        let option = document.createElement('option');
        option.text = i;
        select.add(option);
    }
}
function checkDateOfBirth(day, month, year) {
    if (day.selectedIndex == 0) {
        if (faultDay !== '') {
            faultDay += "Day can't be blank!\n";
        }
        else {
            faultDay = "Day can't be blank!\n";
        }
        document.getElementById('faultbirthday').innerHTML = "Day can't be blank";
    }
    else {
        faultDay = '';
        document.getElementById('faultbirthday').innerHTML = '';
    }
    if (month.selectedIndex == 0) {
        if (faultMonth !== '') {
            faultMonth += "Month can't be blank!\n";
        }
        else {
            faultMonth = "Month can't be blank!\n";
        }
        document.getElementById('faultbirthmonth').innerHTML = "Month can't be blank!";
    }
    else {
        faultMonth = '';
        document.getElementById('faultbirthmonth').innerHTML = '';
    }
    if (year.selectedIndex == 0) {
        if (faultYear !== '') {
            faultYear += "Year can't be blank!\n";
        }
        else {
            faultYear = "Year can't be blank!\n";
        }
        document.getElementById('faultbirthyear').innerHTML = "Year can't be blank!";
    }
    else {
        faultYear = '';
        document.getElementById('faultbirthyear').innerHTML = '';
    }

    switch (month.selectedIndex) {
        case 4:
        case 6:
        case 9:
        case 11:
            if (day.selectedIndex > 30) {
                document.getElementById('faultbirthday').innerHTML = "This day is invalid";
                if (faultDay !== '') {
                    faultDay += 'This day is invalid!\n';
                }
                else {
                    faultDay += 'This day is invalid!\n';
                }

            }
            else {
                faultDay = '';
                document.getElementById('faultbirthday').innerHTML = '';
            }
            break;
        case 2:
            if (year.value % 4 == 0) {
                if (year.value % 100 == 0) {
                    if (year.value % 400 == 0) {
                        if (day.selectedIndex > 29) {
                            document.getElementById('faultbirthday').innerHTML = "This day is invalid";
                            if (faultDay !== '') {
                                faultDay += 'This day is invalid!\n';
                            }
                            else {
                                faultDay = 'This day is invalid!\n';
                            }
                        }
                        else {
                            faultDay = '';
                            document.getElementById('faultbirthday').innerHTML = '';
                        }
                    }
                    else {
                        if (day.selectedIndex > 28) {
                            document.getElementById('faultbirthday').innerHTML = "This day is invalid";
                            if (faultDay !== '') {
                                faultDay += 'This day is invalid!\n';
                            }
                            else {
                                faultDay = 'This day is invalid!\n';
                            }
                        }
                        else {
                            faultDay = '';
                            document.getElementById('faultbirthday').innerHTML = '';
                        }
                    }
                }

            }
            else {
                if (day.selectedIndex > 28) {
                    document.getElementById('faultbirthday').innerHTML = "This day is invalid";
                    if (faultDay !== '') {
                        faultDay += 'This day is invalid!\n';
                    }
                    else {
                        faultDay = 'This day is invalid!\n';
                    }
                }
                else {
                    faultDay = '';
                    document.getElementById('faultbirthday').innerHTML = '';
                }
            }
            break;
    }
    checkIfDayHasAlreadyBeen(day, month, year);
}
function checkBlank(field, fieldString) {
    if (!isBlank(field)) {
        switch (fieldString) {
            case 'First name':
                faultUsername += fieldString + " can't be blank!\n";
                document.getElementById('faultfirstName').innerHTML = fieldString + " can't be blank";
                document.getElementById('firstName').style.borderBottomColor = errorColor;
                break;
            case 'Email':
                faultEmail += fieldString + " can't be blank!\n";
                document.getElementById('faultemail').innerHTML = fieldString + " can't be blank";
                document.getElementById('email').style.borderBottomColor = errorColor;
                break;
            case 'Email confirmation':
                faultEmail2 += fieldString + " can't be blank!\n";
                document.getElementById('faultemail2').innerHTML = fieldString + " can't be blank";
                document.getElementById('email2').style.borderBottomColor = errorColor;
                break;
            case 'Password':
                faultPassword += fieldString + " can't be blank!\n";
                document.getElementById('faultpassword').innerHTML = fieldString + " can't be blank";
                document.getElementById('password').style.borderBottomColor = errorColor;
                break;
            case 'Password confirmation':
                faultpassword2 += fieldString + " can't be blank!\n";
                document.getElementById('faultpassword2').innerHTML = fieldString + " can't be blank";
                document.getElementById('password2').style.borderBottomColor = errorColor;
                break;
        }
    }
}
function focusMethod(element) {
    element.style.color = 'white';
}
function blurMethod(element, otherElement) {
    element.style.color = 'lightslategray';
}
function checkFaults() {
    if ((faultUsername === '') && (faultPassword === '') && (faultpassword2 === '') && (faultEmail === '') && (faultEmail2 === '') && (faultDay === '') && (faultMonth === '') && (faultYear === '') && (faultTOU === '')) {
        // if (typeof (Storage) !== undefined) {

        //     let activeUser = new User(new User(document.getElementById('firstName').value, document.getElementById('email').value, document.getElementById('password').value, document.getElementById('birthDay').value, document.getElementById('birthMonth').value, document.getElementById('birthYear').value))

        //     users.push(activeUser)
        //     localStorage.setItem('user', JSON.stringify(users));
        //     localStorage.setItem('activeUser', JSON.stringify(activeUser));
        //     usersStored = JSON.parse(localStorage.getItem('user'));
        //     window.open('../html/home.html', '_self');
        // }
        createUser(document.getElementById('email').value, document.getElementById('password').value);
        signInUser(document.getElementById('email').value, document.getElementById('password').value);
        saveUser(document.getElementById('firstName').value, document.getElementById('email').value, document.getElementById('birthDay').value, document.getElementById('birthMonth').value, document.getElementById('birthYear').value, document.getElementById('password').value);
    }
}

function saveUser(username, email, day, month, year, password) {
    firebase.database().ref('users/' + firebase.auth().currentUser.uid).set({
        username: username,
        email: email,
        day: day,
        month: month,
        year: year,
        password: password
    }, (error) => {
        if (error) {
            console.log('%c Error!', 'color: #FF0000');
        }
        else {
            console.log('%c Success!', 'color: #008000');
        }
    });
}
function createUser(email, password) {
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
        let errorCode = error.code;
        let errorMessage = error.message;

        document.getElementById('faultcheck').innerHTML = errorMessage;
    });
}
function signInUser(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        let errorCode = error.code;
        let errorMessage = error.message;
      });
}
function checkIfDayHasAlreadyBeen(day, month, year) {
    let date = new Date();

    if (year.value === '2019') {
        if (month.selectedIndex !== 0) {
            if (month.selectedIndex > (date.getMonth() + 1)) {
                faultMonth = 'You have to pick a date from the past!';
                document.getElementById('faultbirthmonth').innerHTML = 'You have to pick a date from the past!';
            }
            else if (month.selectedIndex === (date.getMonth() + 1)) {
                if (day.selectedIndex !== 0) {
                    if (day.selectedIndex > (date.getDay())) {
                        faultDay = 'You have to choose either today or a day of the past!';
                        document.getElementById('faultbirthday').innerHTML = 'You have to choose either today or a day of the past!';
                    }
                    else {
                        faultDay = '';
                        document.getElementById('faultbirthday').innerHTML = '';
                    }
                }
                else {
                    faultDay = "Day can't be blank!\n";
                    document.getElementById('faultbirthday').innerHTML = "Day can't be blank";
                }
            }
            else {
                faultMonth = '';
                document.getElementById('faultbirthmonth').innerHTML = '';
            }
        }

    }
}