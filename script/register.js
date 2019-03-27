let output = document.getElementById('output');
let button = document.getElementById('button');
let countMale = 0;
let countFemale = 0;
let countOther = 0;
let defaultColor = 'yellow';
let errorColor = 'red';
let users = JSON.parse(localStorage.getItem('user'));
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

class User{
    constructor(username, email, password, days, months, years){
        this.username = username;
        this.email = email;
        this.password = password;
        this.days = days;
        this.months = months;
        this.years = years;
    }
}

function start(){
    document.getElementById('button').addEventListener('click', check);

    innerDay(document.getElementById('birthDay'));
    innerMonth(document.getElementById('birthMonth'));
    innerYear(document.getElementById('birthYear'));
    
    document.getElementById('firstName').addEventListener('focus', ()=>{
        focusMethod(document.getElementById('firstNameText'));
    });
    document.getElementById('firstName').addEventListener('blur', ()=>{
        blurMethod(document.getElementById('firstNameText'), document.getElementById('firstName'));
    });

    document.getElementById('email').addEventListener('focus', ()=>{
        focusMethod(document.getElementById('emailText'));
    });
    document.getElementById('email').addEventListener('blur', ()=>{
        blurMethod(document.getElementById('emailText'), document.getElementById('email'));
    });

    document.getElementById('email2').addEventListener('focus', ()=>{
        focusMethod(document.getElementById('email2Text'));
    });
    document.getElementById('email2').addEventListener('blur', ()=>{
        blurMethod(document.getElementById('email2Text'), document.getElementById('email2'));
    });
    document.getElementById('password').addEventListener('focus', ()=>{
        focusMethod(document.getElementById('passwordText'));
    });
    document.getElementById('password').addEventListener('blur', ()=>{
        blurMethod(document.getElementById('passwordText'), document.getElementById('password'));
    });

    document.getElementById('password2').addEventListener('focus', ()=>{
        focusMethod(document.getElementById('password2Text'));
    });
    document.getElementById('password2').addEventListener('blur', ()=>{
        blurMethod(document.getElementById('password2Text'), document.getElementById('password2'));
    });

    document.getElementById('check').addEventListener('click', ()=>{
        checkBox(document.getElementById('termsText'), document.getElementById('check'));
    });

    document.getElementById('firstName').addEventListener('keyup', ()=>{
        checkMethod(checkName, document.getElementById('firstName').value, 'First name', faultUsername);
    });
    document.getElementById('email').addEventListener('keyup', ()=>{
        checkMethod(checkEmail, document.getElementById('email').value, 'Email', faultEmail);
    });
    document.getElementById('email2').addEventListener('keyup', ()=>{
        checkMethod(checkEmail2, document.getElementById('email2').value, 'Email confirmation', faultEmail2);
    });
    document.getElementById('password').addEventListener('keyup', ()=>{
        checkMethod(checkPassword, document.getElementById('password').value, 'Password', faultPassword);
    });
    document.getElementById('password2').addEventListener('keyup', ()=>{
        checkMethod(checkPassword2, document.getElementById('password2').value, 'Password confirmation', faultpassword2);
    });
    document.getElementById('birthDay').addEventListener('change', ()=>{
        checkDateOfBirth(document.getElementById('birthDay'), document.getElementById('birthMonth'), document.getElementById('birthYear'));
    });
    document.getElementById('birthMonth').addEventListener('change', ()=>{
        checkDateOfBirth(document.getElementById('birthDay'), document.getElementById('birthMonth'), document.getElementById('birthYear'));
    });
    document.getElementById('birthYear').addEventListener('change', ()=>{
        checkDateOfBirth(document.getElementById('birthDay'), document.getElementById('birthMonth'), document.getElementById('birthYear'));
    });
}
function check(){
    checkFaults();
    faults = '';
    /*checkMethod(checkName, document.getElementById('firstName').value, 'First name');
    checkMethod(checkEmail, document.getElementById('email').value, 'Email');
    checkMethod(checkEmail2, document.getElementById('email2').value, 'Email confirmation');
    checkDateOfBirth(document.getElementById('birthDay'), document.getElementById('birthMonth'), document.getElementById('birthYear'));
    checkMethod(checkPassword, document.getElementById('password').value, 'Password');
    checkMethod(checkPassword2, document.getElementById('password2').value, 'Password confirmation');
    
    */checkTermsOfUse(document.getElementById('check'), 'Terms of Use');

}
function checkMethod(methodNeeded, field, fieldString, faults){
    if(!isBlank(field)){
        if(faults === ''){
            faults = fieldString + " can't be blank!\n"
        }
        else{
            faults += fieldString + " can't be blank!\n";
        }
      switch(fieldString){
          case 'First name':
            document.getElementById('faultfirstName').innerHTML = fieldString + " can't be blank";
            document.getElementById('firstName').style.borderBottomColor = errorColor;
            break;
          case 'Email':
            document.getElementById('faultemail').innerHTML = fieldString + " can't be blank";
            document.getElementById('email').style.borderBottomColor = errorColor;
            break;
          case 'Email confirmation':
            document.getElementById('faultemail2').innerHTML = fieldString + " can't be blank";
            document.getElementById('email2').style.borderBottomColor = errorColor;
            break;
          case 'Password':
            document.getElementById('faultpassword').innerHTML = fieldString + " can't be blank";
            document.getElementById('password').style.borderBottomColor = errorColor;
            break;
          case 'Password confirmation':
            document.getElementById('faultpassword2').innerHTML = fieldString + " can't be blank";
            document.getElementById('password2').style.borderBottomColor = errorColor;
            break;
      }
    }
    else{
        methodNeeded(field, fieldString, faults);
    }
}
function isBlank(field){
    let patt = /./gm;
    let result = patt.test(field);

    return result;
}
function checkName(name, word, faults){
    let patt1 = /.{2,}/gm
    let patt2 = /[^A-z0-9\_\.]/gm;
    let result1 = patt1.test(name);
    let result2 = patt2.test(name);

    if(!result1){
        if(faults !== ''){
            faults += word + ' is too short!\n';
        }
        else{
            faults = word + ' is too short!\n';
        }
            document.getElementById('faultfirstName').innerHTML = word + ' is too short!';
            document.getElementById('firstName').style.borderBottomColor = errorColor;
    }
    else if(result2){
        if(faults !== ''){
            faults += word + ' contains invalid characters!\n';
        }
        else{
            faults = word + ' contains invalid characters!\n';
        }
        document.getElementById('faultfirstName').innerHTML = word + ' contains invalid characters!';
        document.getElementById('firstName').style.borderBottomColor = errorColor;
    }
    else{
        document.getElementById('faultfirstName').innerHTML = '';
        document.getElementById('firstName').style.borderBottomColor = defaultColor;
    }
}
function checkEmail(email, word, faults){
    let patt1 = /.{7,}/gm;
    let patt2 = /^[a-z0-9_\.]+@[a-z]+\.[a-z]{2,}/g;
    let exists = false;

    let result1 = patt1.test(email);
    let result2 = patt2.test(email);

    for(let user of usersStored){
        if(user.email === email){
            if(faults !== ''){
                faults += 'This email already exists!';
            }
            else{
                faults = 'This email already exists!';
            }
            document.getElementById('faultemail').innerHTML = 'This email already exists!';
            document.getElementById('email').style.borderBottomColor = errorColor;
            exists = true;
        }
    }
    if(!exists){
        if(!result1){
            if(faults !== ''){
                faults += word + ' is too short!\n';
            }
            else{
                faults = word + ' is too short!\n';
            }
            document.getElementById('faultemail').innerHTML = word + ' is too short!';
            document.getElementById('email').style.borderBottomColor = errorColor;
        }
        else if(!result2){
            if(faults !== ''){
                faults += word + ' is invalid!\n';
            }
            else{
                faults = word + ' is invalid!\n';
            }
            document.getElementById('faultemail').innerHTML = word + ' is invalid!';
            document.getElementById('email').style.borderBottomColor = errorColor;
        }
        else{
            document.getElementById('faultemail').innerHTML = '';
            document.getElementById('email').style.borderBottomColor = defaultColor;
        }
    }
}
function checkEmail2(email, word, faults){
    if(document.getElementById('email').value != email){
        if(faults !== ''){
            faults += word + ' is not equal to the first E-Mail!\n';
        }
        else{
            faults = word + ' is not equal to the first E-Mail!\n';
        }
        document.getElementById('faultemail2').innerHTML = word + ' is not equal to the first E-Mail';
        document.getElementById('email2').style.borderBottomColor = errorColor;
    }
    else{
        document.getElementById('faultemail2').innerHTML = '';
        document.getElementById('email2').style.borderBottomColor = defaultColor;
    }
}
function checkPassword(password, word, faults){
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

    if(!result1){
        if(faults !== ''){
            faults += word + ' is too short!\n';
        }
        else{
            faults = word + ' is too short!\n';
        }
        document.getElementById('faultpassword').innerHTML = word + ' is too short!';
        document.getElementById('password').style.borderBottomColor = errorColor;
    }
    else if(result2){
        if(faults !== ''){
            faults += word + ' contains invalid characters!\n';
        }
        else{
            faults = word + ' contains invalid characters!\n';
        }
        document.getElementById('faultpassword').innerHTML = word + ' contains invalid characters!';
        document.getElementById('password').style.borderBottomColor = errorColor;
    }
    else if(!result3){
        if(faults !== ''){
            faults += word + ' must contain at least one uppercase letter!\n';
        }
        else{
            faults = word + ' must contain at least one uppercase letter!\n';
        }
        document.getElementById('faultpassword').innerHTML = word + ' must contain at least one uppercase letter!';
        document.getElementById('password').style.borderBottomColor = errorColor;
    }
    else if(!result4){
        if(faults !== ''){
            faults += word + ' must contain at least one lowercase letter!\n';
        }
        else{
            faults = word + ' must contain at least one lowercase letter!\n';
        }
        document.getElementById('faultpassword').innerHTML = word + ' must contain at least one lowercase letter!';
        document.getElementById('password').style.borderBottomColor = errorColor;
    }
    else if(!result5){
        if(faults !== ''){
            faults += word + ' must contain at least one special character!\n';
        }
        else{
            faults = word + ' must contain at least one special character!\n';
        }
        document.getElementById('faultpassword').innerHTML = word + ' must contain at least one special character! (0-9)';
        document.getElementById('password').style.borderBottomColor = errorColor;
    }
    else{
        document.getElementById('faultpassword').innerHTML = '';
        document.getElementById('password').style.borderBottomColor = defaultColor;
    }
}
function checkPassword2(password, word, faults){
    if(document.getElementById('password').value != password){
        if(faults !== ''){
            faults += word + ' is not equal to the first Password!\n';
        }
        else{
            faults = word + ' is not equal to the first Password!\n';
        } 
        document.getElementById('faultpassword2').innerHTML = word + ' is not equal to the first Password';
        document.getElementById('password2').style.borderBottomColor = errorColor;
    }
    else{
        document.getElementById('faultpassword2').innerHTML = '';
        document.getElementById('password2').style.borderBottomColor = defaultColor;
    }
}
function checkBox(element, checkBox){
    if(element.style.color == 'white'){
        element.style.color = 'lightslategray';
    }
    else{
        element.style.color = 'white';
    }
    if(!checkBox.checked){
        document.getElementById('faultcheck').innerHTML = 'Terms of Use need to be agreed';
    }
    else{
        document.getElementById('faultcheck').innerHTML = '';
    }
    
}
function checkTermsOfUse(checkBox, word){
    if(!checkBox.checked){
        if(faults !== ''){
            faults += word + ' need to be agreed!\n';
        }
        else{
            faults = word + ' need to be agreed!\n';
        } 
    }
}
function innerDay(select){
    for (let i = 1; i <= 31; i++) {
        let option = document.createElement('option');
        option.text = i;
        select.add(option);   
    }
}
function innerMonth(select){
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    for (let i = 0; i < months.length; i++) {
        let option = document.createElement('option');
        option.text = months[i];
        select.add(option);
        
    }

}
function innerYear(select){
    for (let i = 1965; i <= 2010; i++) {
        let option = document.createElement('option');
        option.text = i;
        select.add(option);  
    }
}
function checkDateOfBirth(day, month, year){
    if(day.selectedIndex == 0){
        if(faults !== ''){
            faults += "Day can't be blank!\n";
        }
        else{
            faults = "Day can't be blank!\n";
        } 
        document.getElementById('faultbirthday').innerHTML = "Day can't be blank";
    }
    else{
        document.getElementById('faultbirthday').innerHTML = '';
    }
    if(month.selectedIndex == 0){
        if(faults !== ''){
            faults += "Birth can't be blank!\n";
        }
        else{
            faults = "Birth can't be blank!\n";
        } 
        document.getElementById('faultbirthmonth').innerHTML = "Month can't be blank!";
    }
    else{
        document.getElementById('faultbirthmonth').innerHTML = '';
    }
    if(year.selectedIndex == 0){
        if(faults !== ''){
            faults += "Year can't be blank!\n";
        }
        else{
            faults = "Year can't be blank!\n";
        } 
        document.getElementById('faultbirthyear').innerHTML = "Year can't be blank!";
    }
    else{
        document.getElementById('faultbirthyear').innerHTML = '';
    }

    switch(month.selectedIndex){
        case 4:
        case 6:
        case 9:
        case 11:
            if(day.selectedIndex > 30){
                document.getElementById('faultbirthday').innerHTML = "This day is invalid";
                if(faults !== ''){
                    faults += "Year can't be blank!\n";
                }
                else{
                    faults = "Year can't be blank!\n";
                } 
                faults += 'This day is invalid!\n';
            }
            else{
                document.getElementById('faultbirthday').innerHTML = '';
            }
            break;
        case 2:
            if(year.value % 4 == 0){
                if(year.value % 100 == 0){
                    if(year.value % 400 == 0){
                        if(day.selectedIndex > 29){
                            document.getElementById('faultbirthday').innerHTML = "This day is invalid";
                            if(faults !== ''){
                                faults += 'This day is invalid!\n';
                            }
                            else{
                                faults = 'This day is invalid!\n';
                            }
                        }
                        else{
                            document.getElementById('faultbirthday').innerHTML = '';
                        }
                    }
                    else{
                        if(day.selectedIndex > 28){
                            document.getElementById('faultbirthday').innerHTML = "This day is invalid";
                            if(faults !== ''){
                                faults += 'This day is invalid!\n';
                            }
                            else{
                                faults = 'This day is invalid!\n';
                            } 
                        }
                        else{
                            document.getElementById('faultbirthday').innerHTML = '';
                        }
                    }   
                }
                
            }
            else{
                if(day.selectedIndex > 28){
                    document.getElementById('faultbirthday').innerHTML = "This day is invalid";
                    if(faults !== ''){
                        faults += 'This day is invalid!\n';
                    }
                    else{
                        faults = 'This day is invalid!\n';
                    } 
                }
                else{
                    document.getElementById('faultbirthday').innerHTML = '';
                }
            }
            break;
    }
}
function focusMethod(element){
    element.style.color = 'white';
}
function blurMethod(element, otherElement){
    element.style.color = 'lightslategray';
}
function checkFaults(){
    if(faults === ''){
        if(typeof(Storage) !== 'undefined'){
        users.push(new User(document.getElementById('firstName').value, document.getElementById('email').value, document.getElementById('password').value, document.getElementById('birthDay').value, document.getElementById('birthMonth').value, document.getElementById('birthYear').value))
        localStorage.setItem('user', JSON.stringify(users));
        usersStored = JSON.parse(localStorage.getItem('user'));
        }
    }
}