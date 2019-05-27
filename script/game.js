'use strict'

class DartField {
    constructor(field, value, color, hoverColor) {
        this.field = field;
        this.value = value;
        this.color = color;
        this.hoverColor = hoverColor;
    }
    subtractScore() {
        score = score - this.value;
        console.log(score);
    }
    hoverSelect() {
        this.field.style.fill = this.hoverColor;
    }
    hoverDefault() {
        this.field.style.fill = this.color;
    }
}

class Player {
    constructor(darts, legAverage, matchAverage, first9Average, tons, ton40s, ton80s, highestFinish, doublePercentage, bestLeg) {
        this.darts = darts;
        this.legAverage = legAverage;
        this.matchAverage = matchAverage;
        this.first9Average = first9Average;
        this.tons = tons;
        this.ton40s = ton40s;
        this.ton80s = ton80s;
        this.highestFinish = highestFinish;
        this.doublePercentage = doublePercentage;
        this.bestLeg;
    }

    //     get legAverage(){
    //         return this.legAverage;
    //     }

    //     get matchAverage(){
    //         return this.matchAverage;
    //     }
    //     get first9Average(){
    //         return this.first9Average;
    //     }
    //     get tons(){
    //         return this.tons;
    //     }
    //     get ton40s(){
    //         return this.ton40s;
    //     }
    //     get ton80s(){
    //         return this.ton80s;
    //     }
    //     get highestFinish(){
    //         return this.highestFinish;
    //     }
    //     get doublePercentage(){
    //         return this.doublePercentage;
    //     }
    //     get bestLeg(){
    //         return this.bestLeg;
    //     }

    //     set legAverage(newAverage){
    //         this.legAverage = newAverage;
    //     }
}

let score, computerLevel, faults, faultsRadio1 = '', faultsRadio2 = '', faultsRadio3 = '', faultsRadio4 = '', faultsAmount = '', faultsOpponent = '', sets, legs, opponent, inMethod, outMethod, startToThrow, nameOfOpponent;
let checkBlankStart1 = false;
let checkBlankStart2 = false;
let opponentNameNeedsToBeChecked = false;
let customScoreNeedsToBeChecked = false;
let amountLegsAndSets = 21;
let fields = new Array;
let you = new Player(0, 0.0, 0.0, 0.0, 0, 0, 0, 0, 0.0, 0);
let component = new Player(0, 0.0, 0.0, 0.0, 0, 0, 0, 0, 0.0, 0);

window.addEventListener('load', start2);

function start2() {
    createFields();
    setTimeout(() => {
        writeNameOfUser('username');

    }, 2000);
    setTimeout(() => {
        prepareOptions();
    }, 10)
    writeNameOfComputer('computername');
    document.getElementById('submitButton').addEventListener('click', checkSettings);
    insertNumbers(document.getElementById('bestOfSets'), amountLegsAndSets, false);
    insertNumbers(document.getElementById('bestOfLegs'), amountLegsAndSets, false);
    // document.getElementById('drawLegs').addEventListener('click', drawLegs);
    // document.getElementById('drawSets').addEventListener('click', drawSets);
    for (let i = 0; i < document.getElementsByClassName('select').length; i++) {
        document.getElementsByClassName('select')[i].addEventListener('click', () => { removeErrorText(document.getElementsByClassName('faultText')[i]) });
    }
    document.getElementsByClassName('select')[0].addEventListener('click', gameTypeFunction);
    document.getElementsByClassName('select')[1].addEventListener('click', opponentFunction);
    document.getElementById('difficulty').addEventListener('input', () => {
        changeLevel(document.getElementById('difficulty'), document.getElementById('difficultyText'));
    });

    for (let i = 0; i < document.getElementsByClassName('radioButton').length; i++) {
        const element = document.getElementsByClassName('radioButton')[i];
        let secondClass, faultPlace;

        element.addEventListener('click', () => {
            switch (i) {
                case 0:
                case 1:
                case 2:
                    secondClass = 'out';
                    faultPlace = 0;
                    break;
                case 3:
                case 4:
                    secondClass = 'in';
                    faultPlace = 1;
                    break;
                case 5:
                case 6:
                    secondClass = 'start1';
                    faultPlace = 2;
                    break;
                case 7:
                case 8:
                    secondClass = 'start2';
                    faultPlace = 3;
                    break;
            }

            radioFunction(element, secondClass);
            radioErrorFunction(secondClass, faultPlace);
        });
    }
    document.getElementById('opponentName').addEventListener('keyup', checkOpponentName);
}
function createFields() {
    for (let i = 1; i <= 20; i++) {
        switch (i) {
            case 20:
            case 18:
            case 13:
            case 10:
            case 2:
            case 3:
            case 7:
            case 8:
            case 14:
            case 12:
                fields.push(new DartField(document.getElementById('inner' + i), i, 'rgba(0%,0%,0%, 0.0)', 'yellow'));
                fields.push(new DartField(document.getElementById('outer' + i), i, 'rgba(0%,0%,0%, 0.0)', 'yellow'));
                fields.push(new DartField(document.getElementById('double' + i), i * 2, 'rgba(100%,0%,0%, 0.0)', 'yellow'));
                fields.push(new DartField(document.getElementById('triple' + i), i * 3, 'rgba(100%,0%,0%, 0.0)', 'yellow'));
                break;
            default:
                fields.push(new DartField(document.getElementById('inner' + i), i, 'rgb(90.588235%,89.411765%,78.039216%)', 'yellow'));
                fields.push(new DartField(document.getElementById('outer' + i), i, 'rgb(90.588235%,89.411765%,78.039216%)', 'yellow'));
                fields.push(new DartField(document.getElementById('double' + i), i * 2, 'rgb(0%,62.745098%,0%)', 'yellow'));
                fields.push(new DartField(document.getElementById('triple' + i), i * 3, 'rgb(0%,62.745098%,0%)', 'yellow'));
                break;
        }
    }
    fields.push(new DartField(document.getElementById('innerBull'), 50, 'rgb(100%,0%,0%)', 'yellow'));
    fields.push(new DartField(document.getElementById('outerBull'), 25, 'rgb(0%,62.745098%,0%)', 'yellow'));
    for (const field in fields) {
        // field.field.addEventListener('click', field.subtractScore);
        fields[field].field.addEventListener('click', () => {
            fields[field].subtractScore();
        });
        fields[field].field.addEventListener('mouseover', () => {
            fields[field].hoverSelect();
        });
        fields[field].field.addEventListener('mouseleave', () => {
            fields[field].hoverDefault();
        });
    }
}

function writeNameOfUser(field) {
    let userID = firebase.auth().currentUser.uid;
    return firebase.database().ref('/users/' + userID).once('value').then(function (snapshot) {
        let username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
        document.getElementById(field).innerHTML = username;
        document.getElementById(field).style.color = 'white';
    });
}

function writeNameOfComputer(field) {
    document.getElementById(field).innerHTML = `Computer ${computerLevel}`;
    document.getElementById(field).style.color = 'white';
}

function prepareOptions() {
    let select, i, j, selElmnt, a, b, c;

    select = document.getElementsByClassName("select");
    for (i = 0; i < select.length; i++) {
        selElmnt = select[i].getElementsByTagName("select")[0];

        a = document.createElement("DIV");
        a.setAttribute("class", "select-selected");
        a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
        select[i].appendChild(a);

        b = document.createElement("DIV");
        b.setAttribute("class", "select-items select-hide");
        for (j = 1; j < selElmnt.length; j++) {

            c = document.createElement("DIV");
            c.innerHTML = selElmnt.options[j].innerHTML;
            c.addEventListener("click", function (e) {

                var y, i, k, s, h;
                s = this.parentNode.parentNode.getElementsByTagName("select")[0];
                h = this.parentNode.previousSibling;
                for (i = 0; i < s.length; i++) {
                    if (s.options[i].innerHTML == this.innerHTML) {
                        s.selectedIndex = i;
                        h.innerHTML = this.innerHTML;
                        y = this.parentNode.getElementsByClassName("same-as-selected");
                        for (k = 0; k < y.length; k++) {
                            y[k].removeAttribute("class");
                        }
                        this.setAttribute("class", "same-as-selected");
                        break;
                    }
                }
                h.click();
            });
            b.appendChild(c);
        }
        select[i].appendChild(b);
        a.addEventListener("click", function (e) {

            e.stopPropagation();
            closeAllSelect(this);
            this.nextSibling.classList.toggle("select-hide");
            this.classList.toggle("select-arrow-active");
        });
    }
    function closeAllSelect(elmnt) {

        var x, y, i, arrNo = [];
        x = document.getElementsByClassName("select-items");
        y = document.getElementsByClassName("select-selected");
        for (i = 0; i < y.length; i++) {
            if (elmnt == y[i]) {
                arrNo.push(i)
            } else {
                y[i].classList.remove("select-arrow-active");
            }
        }
        for (i = 0; i < x.length; i++) {
            if (arrNo.indexOf(i)) {
                x[i].classList.add("select-hide");
            }
        }
    }

    document.addEventListener("click", closeAllSelect);
}

function switchGameMode() {
    document.getElementById('options').style.display = 'none';
    document.getElementById('game').style.display = 'block';
}

function checkSettings() {
    faults = '';
    for (let i = 0; i < document.getElementsByClassName('selectField').length; i++) {
        checkBlank(document.getElementsByClassName('selectField')[i], document.getElementsByClassName('faultText')[i]);
    }
    radioCheckBlank('in', 0);
    radioCheckBlank('out', 1);
    if (checkBlankStart1) {
        radioCheckBlank('start1', 2);
    } else if (checkBlankStart2) {
        radioCheckBlank('start2', 3);
    }
    if(customScoreNeedsToBeChecked){
        pointsCheck();
    }
    if(opponentNameNeedsToBeChecked){
        checkOpponentName();
    }
    if (faults === '' && faultsRadio1 === '' && faultsRadio2 === '' && faultsRadio3 === '' && faultsRadio4 === '' && faultsAmount === '' && faultsOpponent === '') {
        sets = parseInt(document.getElementById('bestOfSets').value);
        legs = parseInt(document.getElementById('bestOfLegs').value);
        opponent = document.getElementById('opponentType').value;
        switchGameMode();
    }
}

function checkBlank(field, faultField) {
    if (field.selectedIndex === 0) {
        faultField.innerHTML = "Field can't be blank!<br>";
        faults = "Field can't be blank";
    }
    else {
        faultField.innerHTML = '';
    }
}

function insertNumbers(field, amount, drawPossible) {

    for (let i = 1; i < amount; i++) {
        if (!drawPossible) {
            if (i % 2 === 1) {
                let option = document.createElement('option');
                option.textContent = i;

                field.appendChild(option);
            }
        } else {
            let option = document.createElement('option');
            option.textContent = i;

            field.appendChild(option);
        }
    }
}


// function drawLegs(){

// }

// function drawSets(){
//     let checkBox = document.getElementById('drawSets');

//     if(checkBox.checked){
//         insertNumbers(document.getElementById('bestOfSets'), amountLegsAndSets, true);
//         console.log('draw');
//         prepareOptions();
//     }
//     else{
//         insertNumbers(document.getElementById('bestOfSets'), amountLegsAndSets, false);
//         prepareOptions();
//     }
// }

function removeErrorText(textField) {
    textField.innerHTML = '';
}

function gameTypeFunction() {
    if (document.getElementById('gameType').selectedIndex === 7) {
        customGameType();
        customScoreNeedsToBeChecked = true;
    }
    else {
        nonCustomGameType();
        score = parseInt(document.getElementById('gameType').value);
        customScoreNeedsToBeChecked = false;
    }
}

function customGameType() {
    showCustomInput(document.getElementById('gameoptions'));
    showGameTypeOptions();
}

function nonCustomGameType() {
    hideCustomInput(document.getElementById('gameoptions'));
    showGameTypeOptions();
}

function showGameTypeOptions() {
    document.getElementById('gameoptions').style.display = 'block';
}

function showCustomInput(fieldToAppend) {
    if (document.getElementById('customPoints') === null) {
        let divbox = document.createElement('div');
        divbox.setAttribute('id', 'customPoints');
        let clear = document.createElement('div');
        clear.setAttribute('class', 'clear');
        let separator = document.createElement('div');
        separator.setAttribute('class', 'separator');

        fieldToAppend.appendChild(clear);
        fieldToAppend.appendChild(separator);
        fieldToAppend.appendChild(divbox);


        let amountText = document.createElement('p');
        amountText.textContent = 'Amount';

        let inputCustomPoints = document.createElement('input');
        inputCustomPoints.setAttribute('type', 'text');
        inputCustomPoints.setAttribute('id', 'customPointsInput');

        let faultText = document.createElement('p');
        faultText.setAttribute('id', 'faultAmount');

        document.getElementById('customPoints').appendChild(amountText);
        document.getElementById('customPoints').appendChild(inputCustomPoints);
        document.getElementById('customPoints').appendChild(faultText);
        document.getElementById('customPointsInput').addEventListener('keyup', pointsCheck);
    }
}

function hideCustomInput(fieldToRemove) {
    if (document.getElementById('customPoints') !== null) {
        fieldToRemove.removeChild(document.getElementsByClassName('separator')[1]);
        fieldToRemove.removeChild(document.getElementById('customPoints'));
    }

}

function opponentFunction() {
    if (document.getElementById('opponentType').selectedIndex === 1) {
        document.getElementById('computerDifficulty').style.display = 'none';
        document.getElementById('localPlayer').style.display = 'none';
        checkBlankStart1 = false;
        checkBlankStart2 = false;
        opponentNameNeedsToBeChecked = false;
    }
    else if (document.getElementById('opponentType').selectedIndex === 2) {
        document.getElementById('computerDifficulty').style.display = 'block';
        document.getElementById('localPlayer').style.display = 'none';
        checkBlankStart1 = true;
        checkBlankStart2 = false;
        opponentNameNeedsToBeChecked = false;
    }
    else if (document.getElementById('opponentType').selectedIndex === 3) {
        document.getElementById('computerDifficulty').style.display = 'none';
        document.getElementById('localPlayer').style.display = 'block';
        nameOfOpponent = document.getElementById('opponentName').value;
        checkBlankStart1 = false;
        checkBlankStart2 = true;
        opponentNameNeedsToBeChecked = true;
    }
}


function changeLevel(field, textField) {
    textField.textContent = field.value;
}

function radioFunction(active, deactive) {
    for (let i = 0; i < document.getElementsByClassName(deactive).length; i++) {
        const element = document.getElementsByClassName(deactive)[i];
        element.checked = false;
        if (element !== active) {
            element.data = '';
        }
        // console.log(element);
    }
    if (active.data === 'checked') {
        active.checked = false;
        active.data = '';
    } else {
        active.checked = true;
        active.data = 'checked';
    }
}

function radioErrorFunction(radioClass, faultTextPlace) {
    let oneChecked = false;

    for (let i = 0; i < document.getElementsByClassName(radioClass).length; i++) {
        const element = document.getElementsByClassName(radioClass)[i];
        if (element.checked) {
            oneChecked = true;
        }
    }

    if (oneChecked) {
        document.getElementsByClassName('faultRadio')[faultTextPlace].textContent = '';
        switch (faultTextPlace) {
            case 0:
                faultsRadio1 = '';
                break;
            case 1:
                faultsRadio2 = '';
                break;
            case 2:
                faultsRadio3 = '';
                break;
            case 3:
                faultsRadio4 = '';
                break;
        }
    }
    else {
        document.getElementsByClassName('faultRadio')[faultTextPlace].textContent = 'One option must be picked!';
        switch (faultTextPlace) {
            case 0:
                faultsRadio1 = 'One option must be picked!';
                break;
            case 1:
                faultsRadio2 = 'One option must be picked!';
                break;
            case 2:
                faultsRadio3 = 'One option must be picked!';
                break;
            case 3:
                faultsRadio4 = 'One option must be picked!';
                break;
        }
    }
}

function checkOpponentName() {
    let pat = /./g;
    let res = pat.test(document.getElementById('opponentName').value);

    if (res) {
        faultsOpponent = '';
        document.getElementById('faultOpponentName').textContent = '';
        document.getElementById('opponentName').style.borderBottomColor = 'black';
    } else {
        faultsOpponent += "Name can't be blank";
        document.getElementById('faultOpponentName').textContent = "Name can't be blank!";
        document.getElementById('opponentName').style.borderBottomColor = 'red';
    }
}

function pointsCheck() {
    let amount = parseInt(document.getElementById('customPointsInput').value);

    if (isNaN(amount)) {
        faultsAmount += 'Please enter a number\n';
        document.getElementById('faultAmount').textContent = 'Please enter a number!';
        document.getElementById('customPointsInput').style.borderBottomColor = 'red';
    }
    else if (amount < 2) {
        if (amount >= 0) {
            faultsAmount += 'This amount is invalid\n';
            document.getElementById('faultAmount').textContent = 'This amount is invalid!';
            document.getElementById('customPointsInput').style.borderBottomColor = 'red';
        }
        else {
            faultsAmount += "Negative amounts aren't allowed\n";
            document.getElementById('faultAmount').textContent = "Negative amounts aren't allowed!";
            document.getElementById('customPointsInput').style.borderBottomColor = 'red';
        }
    }
    else {
        faultsAmount = '';
        document.getElementById('faultAmount').textContent = '';
        document.getElementById('customPointsInput').style.borderBottomColor = 'black';
        score = parseInt(document.getElementById('customPointsInput').value);
    }
}

function radioCheckBlank(classNames, faultField) {
    let oneChecked = false;

    for (let i = 0; i < document.getElementsByClassName(classNames).length; i++) {
        const element = document.getElementsByClassName(classNames)[i];
        if (element.checked) {
            oneChecked = true;
            switch (classNames) {
                case 'in':
                    inMethod = element.id;
                    break;
                case 'out':
                    outMethod = element.id;
                    break;
                case 'start1':
                    if (element.id === 'meStart1') {
                        startToThrow = true;
                    } else {
                        startToThrow = false;
                    }
                    break;
                case 'start2':
                    if (element.id === 'meStart2') {
                        startToThrow = true;
                    }
                    else {
                        startToThrow = false;
                    }
                    break;
            }
            document.getElementsByClassName('faultRadio')[faultField].textContent = '';
        }
    }
    if (!oneChecked) {
        document.getElementsByClassName('faultRadio')[faultField].textContent = 'One option needs to be picked';
        switch (faultField) {
            case 0:
                faultsRadio1 += 'One option needs to be picked\n';
                break;
            case 1:
                faultsRadio2 += 'One option needs to be picked\n';
                break;
            case 2:
                faultsRadio3 += 'One option needs to be picked\n';
                break;
            case 3:
                faultsRadio4 += 'One option needs to be picked\n';
                break;
        }
    }
}