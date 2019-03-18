let faults;
let output = document.getElementById('output');
let button = document.getElementById('button');
let countMale = 0;
let countFemale = 0;
let countOther = 0;

function start(){

    button.addEventListener('click', check);
    document.getElementById('male').addEventListener('click', () =>{
        switchRadio(document.getElementById('male'), 'Male', document.getElementById('maleText'));
    });
    document.getElementById('female').addEventListener('click', ()=>{
        switchRadio(document.getElementById('female'), 'Female', document.getElementById('femaleText'));
    });
    document.getElementById('other').addEventListener('click', ()=>{
        switchRadio(document.getElementById('other'), 'Other', document.getElementById('otherText'));
    });
    innerDay(document.getElementById('birthDay'));
    innerMonth(document.getElementById('birthMonth'));
    innerYear(document.getElementById('birthYear'));
    
    document.getElementById('firstName').addEventListener('focus', ()=>{
        focusMethod(document.getElementById('firstNameText'));
    });
    document.getElementById('firstName').addEventListener('blur', ()=>{
        blurMethod(document.getElementById('firstNameText'), document.getElementById('firstName'));
    });

    document.getElementById('lastName').addEventListener('focus', ()=>{
        focusMethod(document.getElementById('lastNameText'));
    });
    document.getElementById('lastName').addEventListener('blur', ()=>{
        blurMethod(document.getElementById('lastNameText'), document.getElementById('lastName'));
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

    document.getElementById('number').addEventListener('focus', ()=>{
        focusMethod(document.getElementById('numberText'));
    });
    document.getElementById('number').addEventListener('blur', ()=>{
        blurMethod(document.getElementById('numberText'), document.getElementById('number'));
    });

    document.getElementById('show-text').addEventListener('focus', ()=>{
        focusMethod(document.getElementById('show-textText'));
    });
    document.getElementById('show-text').addEventListener('blur', ()=>{
        blurMethod(document.getElementById('show-textText'), document.getElementById('show-text'));
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
        checkBox(document.getElementById('termsText'));
    });
    document.getElementById('mailCheck').addEventListener('click', ()=>{
        checkBox(document.getElementById('mailText'));
    });
}
function check(){
    faults = '';
    checkMethod(checkName, document.getElementById('firstName').value, 'First name');
    checkMethod(checkName, document.getElementById('lastName').value, 'Last name');
    checkMethod(checkEmail, document.getElementById('email').value, 'Email');
    checkMethod(checkEmail2, document.getElementById('email2').value, 'Email confirmation');
    checkMethod(checkNumber, document.getElementById('number').value, 'Telephone number');
    checkDateOfBirth(document.getElementById('birthDay'), document.getElementById('birthMonth'), document.getElementById('birthYear'));
    checkSex();
    checkMethod(checkShowText, document.getElementById('show-text').value, 'Show-Text');
    checkMethod(checkPassword, document.getElementById('password').value, 'Password');
    checkMethod(checkPassword2, document.getElementById('password2').value, 'Password confirmation');
    checkTermsOfUse(document.getElementById('check'), 'Terms of Use');
    
    checkFaults();
}
function checkMethod(methodNeeded, field, fieldString){
    if(!isBlank(field)){
      faults += fieldString + " can't be blank!\n";
      switch(fieldString){
          case 'First name':
            document.getElementById('faultfirstName').innerHTML = fieldString + " can't be blank";
            document.getElementById('firstName').style.borderBottomColor = 'red';
            break;
          case 'Last name':
            document.getElementById('faultlastName').innerHTML = fieldString + " can't be blank";
            document.getElementById('lastName').style.borderBottomColor = 'red';
            break;
          case 'Email':
            document.getElementById('faultemail').innerHTML = fieldString + " can't be blank";
            document.getElementById('email').style.borderBottomColor = 'red';
            break;
          case 'Email confirmation':
            document.getElementById('faultemail2').innerHTML = fieldString + " can't be blank";
            document.getElementById('email2').style.borderBottomColor = 'red';
            break;
          case 'Telephone number':
            document.getElementById('faultnumber').innerHTML = fieldString + " can't be blank";
            document.getElementById('number').style.borderBottomColor = 'red';
            break;
          case 'Show-Text':
            document.getElementById('faultshowtext').innerHTML = fieldString + " can't be blank";
            document.getElementById('show-text').style.borderColor = 'red';
            break;
          case 'Password':
            document.getElementById('faultpassword').innerHTML = fieldString + " can't be blank";
            document.getElementById('password').style.borderBottomColor = 'red';
            break;
          case 'Password confirmation':
            document.getElementById('faultpassword2').innerHTML = fieldString + " can't be blank";
            document.getElementById('password2').style.borderBottomColor = 'red';
            break;
      }
    }
    else{
        methodNeeded(field, fieldString);
    }
}
function isBlank(field){
    let patt = /./gm;
    let result = patt.test(field);

    return result;
}
function checkName(name, word, field){
    let patt1 = /.{2,}/gm
    let patt2 = /[^A-z]/gm;
    let result1 = patt1.test(name);
    let result2 = patt2.test(name);

    if(!result1 || result2){
        faults += word + ' is invalid!\n';
        if(word === 'First name'){
            document.getElementById('faultfirstName').innerHTML = word + ' is invalid';
            document.getElementById('firstName').style.borderBottomColor = 'red';
        }
        else{
            document.getElementById('faultlastName').innerHTML = word + ' is invalid';
            document.getElementById('lastName').style.borderBottomColor = 'red';
        }
        
    }
}
function checkEmail(email, word){
    let patt1 = /.{7,}/gm;
    let patt2 = /^[a-z0-9_]+@[a-z]+\.[a-z]{2,}/g;

    let result1 = patt1.test(email);
    let result2 = patt2.test(email);

    if(!result1 || !result2){
        faults += word + ' is invalid!\n';
        document.getElementById('faultemail').innerHTML = word + ' is invalid';
        document.getElementById('email').style.borderBottomColor = 'red';
    }
}
function checkEmail2(email, word){
    if(document.getElementById('email').value != email){
        faults += word + ' is not equal to the first E-Mail!\n';
        document.getElementById('faultemail2').innerHTML = word + ' is not equal to the first E-Mail';
        document.getElementById('email2').style.borderBottomColor = 'red';
    }
}
function checkPassword(password, word){
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


    if(!result1 || result2 || (!result3 || !result4 || !result5)){
        faults += word + ' is invalid!\n';
        document.getElementById('faultpassword').innerHTML = word + ' is invalid';
        document.getElementById('password').style.borderBottomColor = 'red';
    }
}
function checkPassword2(password, word){
    if(document.getElementById('password').value != password){
        document.getElementById('faultpassword2').innerHTML = word + ' is not equal to the first Password';
        faults += word + ' is not equal to the first Password!\n';
        document.getElementById('password2').style.borderBottomColor = 'red';
    }
}
function checkNumber(number, word){
    let patt = /[^0-9_\/\-+\(\)\[\]\,\' ]/gm;

    let result = patt.test(number);

    if(result){
        faults += word + ' is invalid!\n';
        document.getElementById('faultnumber').innerHTML = word + ' is invalid';
        document.getElementById('number').style.borderBottomColor = 'red';
    }
}
function switchRadio(sex, count, element){
    let counter;
    
    switch(count){
        case 'Male':
            countMale++;
            counter = countMale;
            document.getElementById('femaleText').style.color = 'lightslategray';
            document.getElementById('otherText').style.color = 'lightslategray';
            break;
        case 'Female':
            countFemale++;
            counter = countFemale;
            document.getElementById('maleText').style.color = 'lightslategray';
            document.getElementById('otherText').style.color = 'lightslategray';
            break;
        case 'Other': 
            countOther++;
            counter = countOther;
            document.getElementById('maleText').style.color = 'lightslategray';
            document.getElementById('femaleText').style.color = 'lightslategray';
            break;
    }
    
    if(counter % 2 == 0){
        sex.checked = false;
        element.style.color = 'lightslategray';
    }
    else{
        element.style.color = 'white';
    }


}
function checkSex(){
    let selected = false;
    
    for(let option of document.getElementsByClassName('gender')){
        if(option.checked){
            selected = true;
        }
    }
    if(!selected){
        document.getElementById('faultgender').innerHTML = 'A gender needs to be selected';
        faults += 'A gender needs to be selected!\n';
    }
}
function checkBox(element){
    if(element.style.color == 'white'){
        element.style.color = 'lightslategray';
    }
    else{
        element.style.color = 'white';
    }
}
function checkTermsOfUse(checkBox, word){
    if(!checkBox.checked){
        faults += word + ' need to be agreed!\n';
        document.getElementById('faultcheck').innerHTML = word + ' need to be agreed';
        document.getElementById('termsText').style.color = 'red';
    }
}
function checkShowText(text, word){
    let patt = /.{2,}/gm;

    let result = patt.test(text);

    if(!result){
        faults += word + ' is too short!\n';
        document.getElementById('faultshowtext').innerHTML = word + ' is too short';
        document.getElementById('show-text').style.borderColor = 'red';
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
    for (let i = 1965; i <= 2002; i++) {
        let option = document.createElement('option');
        option.text = i;
        select.add(option);  
    }
}
function checkDateOfBirth(day, month, year){
    if(day.selectedIndex == 0){
        faults += "Birthday can't be blank!\n";
        document.getElementById('faultbirthday').innerHTML = "Birthday can't be blank";
    }
    if(month.selectedIndex == 0){
        faults += "Birth month can't be blank!\n";
        document.getElementById('faultbirthmonth').innerHTML = "Birth month can't be blank!";
    }
    if(year.selectedIndex == 0){
        faults += "Year of birth can't be blank!\n";
        document.getElementById('faultbirthyear').innerHTML = "Year of birth can't be blank!";
    }

    switch(month.selectedIndex){
        case 4:
        case 6:
        case 9:
        case 11:
            if(day.selectedIndex > 30){
                document.getElementById('faultbirthday').innerHTML = "This day is invalid";
                faults += 'This day is invalid!\n';
            }
            break;
        case 2:
            if(year.value % 4 == 0){
                if(year.value % 100 == 0){
                    if(year.value % 400 == 0){
                        if(day.selectedIndex > 29){
                            document.getElementById('faultbirthday').innerHTML = "This day is invalid";
                            faults += 'This day is invalid!\n';
                        }
                    }
                    else{
                        if(day.selectedIndex > 28){
                            document.getElementById('faultbirthday').innerHTML = "This day is invalid";
                            faults += 'This day is invalid!\n';
                        }
                    }   
                }
                
            }
            else{
                if(day.selectedIndex > 28){
                    document.getElementById('faultbirthday').innerHTML = "This day is invalid";
                    faults += 'This day is invalid!\n';
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
    if(otherElement === document.getElementById('show-text')){
        otherElement.style.borderColor = 'yellow';
    }
    else{
        otherElement.style.borderBottomColor = 'yellow';
    }
}
function checkFaults(){
    if(faults == ''){
        window.open('submit.html', '_self');
    }
}