'use strict'

class DartField {
    constructor(field, value, color, hoverColor) {
        this.field = field;
        this.value = value;
        this.color = color;
        this.hoverColor = hoverColor;
    }
    hoverSelect() {
        this.field.style.fill = this.hoverColor;
    }
    hoverDefault() {
        this.field.style.fill = this.color;
    }
}

class Player {
    constructor(remainingPoints, darts, legAverage, matchAverage, first9Average, tons, ton40s, ton80s, highestFinish, doublePercentage, bestLeg, lastScore, legsWon, setsWon, totalDarts, finished, first9darts, checkOutAttempts, checkOuts, haveToAsk) {
        this._remainingPoints = remainingPoints;
        this._darts = darts;
        this._legAverage = legAverage;
        this._matchAverage = matchAverage;
        this._first9Average = first9Average;
        this._tons = tons;
        this._ton40s = ton40s;
        this._ton80s = ton80s;
        this._highestFinish = highestFinish;
        this._doublePercentage = doublePercentage;
        this._bestLeg = bestLeg;
        this._lastScore = lastScore;
        this._legsWon = legsWon;
        this._setsWon = setsWon;
        this._totalDarts = totalDarts;
        this._finished = finished;
        this._first9darts = first9darts;
        this._checkOutAttempts = checkOutAttempts;
        this._checkOuts = checkOuts;
        this._haveToAsk = haveToAsk;
    }

    gameFunction(field) {
        if (this._darts === 0) {
            this._finished = false;
            this._remainingPoints = score;
        }
        if (this._darts % 3 === 0) {
            this._lastScore = this._remainingPoints;
        }
        if (this._remainingPoints === score) {
            this.firstDartFunction(field);
        } else if (this._remainingPoints <= 170) {
            this.finishFunction(field, this._darts % 3);
        }
        else {
            this.subtractScore(field.value);
        }
        if (!this._finished) {
            this._darts++;
            this._totalDarts++;
            if (this._darts <= 9) {
                this._first9darts++;
            }
            if (this._darts % 3 === 0) {
                if (this._haveToAsk && (opponent !== 'Trainer (computer)')) {
                    this.askHowManyDarts('missedDoubles');
                    this._haveToAsk = false;
                }
                this._legAverage = (((this._legAverage * (this._darts - 3)) + this._lastScore - this._remainingPoints) / this._darts);
                this._matchAverage = (((this._matchAverage * (this._totalDarts - 3)) + this._lastScore - this._remainingPoints) / this._totalDarts)
                this.checkTon();
                if (this.data === 'you') {
                    this.turnMethod();
                    changeBackgroundColor(yourTurn);
                }
                if (this._darts <= 9) {
                    this._first9Average = (((this._first9Average * (this._first9darts - 3)) + this._lastScore - this._remainingPoints) / this._first9darts);
                }
            }
        } else {
            this._matchAverage = (((this._matchAverage * (this._totalDarts - 3)) + this._lastScore) / this._totalDarts)
        }
    }
    firstDartFunction(field) {
        if (inMethod === 's_in') {
            this.subtractScore(field.value);
        }
        else {
            if (field.data === 'double') {
                this.subtractScore(field.value);
            }
        }
    }

    finishFunction(field, remainingDarts) {
        if (this._remainingPoints - field.value <= 1) {
            if (this._remainingPoints - field.value === 0) {
                if (outMethod === 'd_out') {
                    if (field.data === 'double') {
                        if(opponent !== 'Trainer (computer)'){
                            this.askHowManyDarts('notMissedDoubles');
                        }
                    } else {
                        this._remainingPoints = this._lastScore;
                        this.setDartsHigher(remainingDarts);
                        this._haveToAsk = true;
                        if (this.data === 'you') {
                            this.turnMethod();
                            changeBackgroundColor(yourTurn);
                        }
                    }
                } else if (outMethod === 'm_out') {
                    if (field.data === 'double' || field.data === 'triple') {
                        this.setLegWin(remainingDarts);
                    } else {
                        this._remainingPoints = this._lastScore;
                        this.setDartsHigher(remainingDarts);
                        if (this.data === 'you') {
                            this.turnMethod();
                            changeBackgroundColor(yourTurn);
                        }
                    }
                } else {
                    this.setLegWin(remainingDarts);
                }
            } else {
                if (outMethod === 's_out' && this._remainingPoints - field.value === 1) {
                    this.subtractScore(field.value);
                }
                else {
                    this._remainingPoints = this._lastScore;
                    this.setDartsHigher(remainingDarts);
                    if (this.data === 'you') {
                        this.turnMethod();
                        changeBackgroundColor(yourTurn);
                    }
                }
            }
        } else {
            if (outMethod === 'd_out') {
                this._haveToAsk = true;
            }
            this.subtractScore(field.value);
        }
    }
    setDartsHigher(remainingDarts) {
        if (remainingDarts === 0) {
            this._darts += 2;
        } else if (remainingDarts === 1) {
            this._darts += 1;
        }
    }

    setLegWin() {
        this._finished = true;
        you._remainingPoints = score;
        versus._remainingPoints = score;
        writeInformation(document.getElementById('remainingPoints1'), you.remainingPoints);
        writeInformation(document.getElementById('remainingPoints2'), versus.remainingPoints);
        this._legsWon++;
        this._darts++;
        this._totalDarts++;
        if (this._darts < this._bestLeg || this._bestLeg === 0) {
            this._bestLeg = this._darts;
        }
        if (this._lastScore > this._highestFinish || this._highestFinish === 0) {
            this._highestFinish = this._lastScore;
        }
        this._darts = 0;
        this._legAverage = 0;
        writeLegWinToScoreboard(this);
        this.checkWon();
    }

    subtractScore(amount) {
        this._remainingPoints -= amount;
        console.log(this._remainingPoints);
    }

    checkWon() {
        if (this._legsWon === parseInt(legs / 2) + 1) {
            this._setsWon++;
            startToThrow = !setStart;
            setStart = !setStart;
            this._legsWon = 0;
            writeSetWinToScoreboard(this);
        }
        if (this._setsWon === parseInt(sets / 2) + 1) {
            winningFunction(this.data);
        }
    }

    turnMethod() {
        if (opponent === 'Trainer (computer)') {
            computerTurn = true;
            makeComputerTurn();
        } else if (opponent === 'Guest (local opponent)') {
            yourTurn = !yourTurn;
        }
    }

    checkTon() {
        if (this._lastScore - this._remainingPoints === 180) {
            this._ton80s++;
        }
        else if (this._lastScore - this._remainingPoints >= 140) {
            this._ton40s++;
        }
        else if (this._lastScore - this._remainingPoints >= 100) {
            this._tons++;
        }
    }

    askHowManyDarts(fieldId) {
        document.getElementById(fieldId).style.display = 'block';
        document.getElementById('game').style.display = 'none';

        let interval = setInterval(() => {
            if (clicked) {
                for (let i = 0; i < document.getElementsByClassName('missedDoubleChoice').length; i++) {
                    const element = document.getElementsByClassName('missedDoubleChoice')[i];
                    if (element.data === 'clicked') {
                        if (element.textContent != 'None') {
                            this._checkOutAttempts += parseInt(element.textContent);
                        }
                        if (fieldId === 'notMissedDoubles') {
                            this._checkOuts += 1;
                            this.setLegWin();
                        }
                        element.data = '';
                        clicked = false;
                        clearInterval(interval);
                        document.getElementById(fieldId).style.display = 'none';
                        document.getElementById('game').style.display = 'block';
                    }
                }
            }
        }, 100);
    }

    get legAverage() {
        return this._legAverage;
    }
    get matchAverage() {
        return this._matchAverage;
    }
    get first9Average() {
        return this._first9Average;
    }
    get tons() {
        return this._tons;
    }
    get ton40s() {
        return this._ton40s;
    }
    get ton80s() {
        return this._ton80s;
    }
    get highestFinish() {
        return this._highestFinish;
    }
    get doublePercentage() {
        return this._doublePercentage;
    }
    get bestLeg() {
        return this._bestLeg;
    }
    get remainingPoints() {
        if (this._darts === 0) {
            return score;
        }
        return this._remainingPoints;
    }
    get legsWon() {
        return this._legsWon;
    }
    get setsWon() {
        return this._setsWon;
    }
    get lastScore() {
        return this._lastScore;
    }
    get totalDarts() {
        return this._totalDarts;
    }
    get finished() {
        return this._finished;
    }
    get first9darts() {
        return this._first9darts;
    }
    get checkOutAttempts() {
        return this._checkOutAttempts;
    }
    get checkOuts() {
        return this._checkOuts;
    }
    get haveToAsk() {
        return this._haveToAsk;
    }
    set lastScore(lastScore) {
        this._lastScore = lastScore;
    }
    set remainingPoints(remainingPoints) {
        this._remainingPoints = remainingPoints;
    }
    set legAverage(legAverage) {
        this._legAverage = legAverage;
    }
    set matchAverage(matchAverage) {
        this._matchAverage = matchAverage;
    }
    set first9Average(first9Average) {
        this._first9Average = first9Average;
    }
    set tons(tons) {
        this._tons = tons;
    }
    set ton40s(ton40s) {
        this._ton40s = ton40s;
    }
    set ton80s(ton80s) {
        this._ton80s = ton80s;
    }
    set highestFinish(highestFinish) {
        this._highestFinish = highestFinish;
    }
    set doublePercentage(doublePercentage) {
        this._doublePercentage = doublePercentage;
    }
    set bestLeg(bestLeg) {
        this._bestLeg = bestLeg;
    }

    set legsWon(legsWon) {
        this._legsWon = legsWon;
    }

    set setsWon(setsWon) {
        this._setsWon = setsWon;
    }
    set totalDarts(totalDarts) {
        this._totalDarts = totalDarts;
    }
    set finished(finished) {
        this._finished = finished;
    }
    set first9darts(first9darts) {
        this._first9darts = first9darts;
    }
    set checkOutAttempts(checkOutAttempts) {
        this._checkOutAttempts = checkOutAttempts;
    }
    set checkOuts(checkOuts) {
        this._checkOuts = checkOuts;
    }
    set haveToAsk(haveToAsk) {
        this._haveToAsk = haveToAsk;
    }
}

let score, computerLevel, computerTurn, faults, faultsRadio1 = '', faultsRadio2 = '', faultsRadio3 = '', faultsRadio4 = '', faultsAmount = '', faultsOpponent = '', sets, legs, opponent, inMethod, outMethod, startToThrow, nameOfOpponent, yourTurn, setStart, clicked = false;
let checkBlankStart1 = false;
let checkBlankStart2 = false;
let opponentNameNeedsToBeChecked = false;
let customScoreNeedsToBeChecked = false;
let amountLegsAndSets = 21;
let fields = new Array;
let you = new Player(0, 0, 0.0, 0.0, 0.0, 0, 0, 0, 0, 0.0, 0, 0, 0, 0, 0, false, 0, 0, 0, false);
you.data = 'you';
let versus = new Player(0, 0, 0.0, 0.0, 0.0, 0, 0, 0, 0, 0.0, 0, 0, 0, 0, 0, false, 0, 0, 0, false);
versus.data = 'opponent';

window.addEventListener('load', start2);

function start2() {
    createFields();
    setTimeout(() => {
        writeNameOfUser('username');

    }, 2000);
    setTimeout(() => {
        prepareOptions();
    }, 10)
    document.getElementById('submitButton').addEventListener('click', checkSettings);
    insertNumbers(document.getElementById('bestOfSets'), amountLegsAndSets, false);
    insertNumbers(document.getElementById('bestOfLegs'), amountLegsAndSets, false);
    // document.getElementById('drawLegs').addEventListener('click', drawLegs);
    // document.getElementById('drawSets').addEventListener('click', drawSets);
    document.getElementById('finishLink').addEventListener('click', finishLink);
    document.getElementById('statsLink').addEventListener('click', statsLink);
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
    let innerField, outerField, doubleField, tripleField, innerBull, outerBull, outside;
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
                innerField = new DartField(document.getElementById('inner' + i), i, 'rgba(0%,0%,0%, 0.0)', 'yellow');
                outerField = new DartField(document.getElementById('outer' + i), i, 'rgba(0%,0%,0%, 0.0)', 'yellow');
                doubleField = new DartField(document.getElementById('double' + i), i * 2, 'rgba(100%,0%,0%, 0.0)', 'yellow');
                tripleField = new DartField(document.getElementById('triple' + i), i * 3, 'rgba(100%,0%,0%, 0.0)', 'yellow');
                break;
            default:
                innerField = new DartField(document.getElementById('inner' + i), i, 'rgb(90.588235%,89.411765%,78.039216%)', 'yellow');
                outerField = new DartField(document.getElementById('outer' + i), i, 'rgb(90.588235%,89.411765%,78.039216%)', 'yellow');
                doubleField = new DartField(document.getElementById('double' + i), i * 2, 'rgb(0%,62.745098%,0%)', 'yellow');
                tripleField = new DartField(document.getElementById('triple' + i), i * 3, 'rgb(0%,62.745098%,0%)', 'yellow');
                break;
        }
        innerField.data = 'single';
        outerField.data = 'single';
        doubleField.data = 'double';
        tripleField.data = 'triple';

        fields.push(innerField);
        fields.push(outerField);
        fields.push(doubleField);
        fields.push(tripleField);
    }
    innerBull = new DartField(document.getElementById('innerBull'), 50, 'rgb(100%,0%,0%)', 'yellow');
    outerBull = new DartField(document.getElementById('outerBull'), 25, 'rgb(0%,62.745098%,0%)', 'yellow');
    outside = new DartField(document.getElementById('outside'), 0, 'rgb(0%,0%,0%)', 'red');

    innerBull.data = 'double';
    outerBull.data = 'single';
    outside.data = 'outside';

    fields.push(innerBull);
    fields.push(outerBull);
    fields.push(outside);

    for (const field in fields) {
        // field.field.addEventListener('click', field.subtractScore);
        fields[field].field.addEventListener('click', () => {
            gameMethod(fields[field]);
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
    if (customScoreNeedsToBeChecked) {
        pointsCheck();
    }
    if (opponentNameNeedsToBeChecked) {
        checkOpponentName();
    }
    if (faults === '' && faultsRadio1 === '' && faultsRadio2 === '' && faultsRadio3 === '' && faultsRadio4 === '' && faultsAmount === '' && faultsOpponent === '') {
        sets = parseInt(document.getElementById('bestOfSets').value);
        legs = parseInt(document.getElementById('bestOfLegs').value);
        opponent = document.getElementById('opponentType').value;
        yourTurn = startToThrow;
        setStart = yourTurn;
        switchOpponent();
        checkDoubleText();
        switchGameMode();
        if (opponent === 'Trainer (computer)' && !yourTurn) {
            makeComputerTurn();
        }
        changeBackgroundColor(yourTurn);
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
        startToThrow = true;
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
        nameOfOpponent = document.getElementById('opponentName').value;
    } else {
        faultsOpponent += "Name can't be blank";
        document.getElementById('faultOpponentName').textContent = "Name can't be blank!";
        document.getElementById('opponentName').style.borderBottomColor = 'red';
        nameOfOpponent = '';
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

function gameMethod(field) {
    if (!computerTurn) {
        if (yourTurn) {
            makeTurn(you, field, '1');
        } else {
            makeTurn(versus, field, '2');
        }
    }
}

function makeTurn(player, field, playerString) {
    player.gameFunction(field);
    writeInformation(document.getElementById('remainingPoints' + playerString), player.remainingPoints, 'black');
    writeInformation(document.getElementById('legAverage' + playerString), parseInt(player.legAverage * 300) / 100, 'black');
    writeInformation(document.getElementById('matchAverage' + playerString), parseInt(player.matchAverage * 300) / 100, 'black');
    writeInformation(document.getElementById('first9Average' + playerString), parseInt(player.first9Average * 300) / 100, 'black');
    writeInformation(document.getElementById('tons' + playerString), player.tons, 'black');
    writeInformation(document.getElementById('ton40s' + playerString), player.ton40s, 'black');
    writeInformation(document.getElementById('ton80s' + playerString), player.ton80s, 'black');
    if (player.highestFinish !== 0) writeInformation(document.getElementById('highestFinish' + playerString), player.highestFinish, 'black');
    if (outMethod === 'd_out') {
        writeInformation(document.getElementById('doubles' + playerString), player.doublePercentage, 'black');
    }
    if (player.bestLeg !== 0) writeInformation(document.getElementById('bestLeg' + playerString), player.bestLeg, 'black');
}

function switchOpponent() {
    if (opponent === 'Single (no opponent)') {
        hideOpponent();
        writeInformation(document.getElementById('remainingPoints1'), score, 'black');
    }
    else {
        if (opponent === 'Trainer (computer)') {
            computerLevel = document.getElementById('difficulty').value;
            showOpponent(`Computer level ${computerLevel}`);
        } else {
            showOpponent(nameOfOpponent);
        }
        writeInformation(document.getElementById('remainingPoints1'), score, 'black');
        writeInformation(document.getElementById('remainingPoints2'), score, 'black');
    }
}

function hideOpponent() {
    document.getElementById('player2').style.display = 'none';
}

function showOpponent(stringName) {
    document.getElementById('player2').style.display = 'block';
    document.getElementById('nameOfOpponent').textContent = stringName;
    document.getElementById('nameOfOpponent').style.color = 'white';
}

function writeInformation(field, content, color) {
    field.style.color = color;
    field.textContent = content;
}

function winningFunction(playerWon) {
    console.log(playerWon);
    saveStatsToFireBase(you, firebase.auth().currentUser.uid, playerWon);
    popupWinner(playerWon);

}

function checkDoubleText() {
    if (outMethod !== 'd_out') {
        for (let i = 0; i < document.getElementsByClassName('double').length; i++) {
            const element = document.getElementsByClassName('double')[i];
            if (i === 1 || i === 3) {
                element.textContent = 'not available in this game mode';
            }
            element.style.color = 'red';
        }
    }
}

function makeComputerTurn() {
    setInterval(() => {
        if (computerTurn) {
            changeBackgroundColor(false);

            if (versus.remainingPoints <= 170) {
                computerFinishFunction();

            } else {
                computerNormalFunction();
            }
            writeInformation(document.getElementById('remainingPoints2'), versus._remainingPoints, 'black');
            writeInformation(document.getElementById('legAverage2'), parseInt(versus.legAverage * 300) / 100, 'black');
            writeInformation(document.getElementById('matchAverage2'), parseInt(versus.matchAverage * 300) / 100, 'black');
            writeInformation(document.getElementById('first9Average2'), parseInt(versus.first9Average * 300) / 100, 'black');
            writeInformation(document.getElementById('tons2'), versus.tons, 'black');
            writeInformation(document.getElementById('ton40s2'), versus.ton40s, 'black');
            writeInformation(document.getElementById('ton80s2'), versus.ton80s, 'black');
            if (versus.highestFinish !== 0) writeInformation(document.getElementById('highestFinish2'), versus.highestFinish, 'black');
            if (outMethod === 'd_out') {
                writeInformation(document.getElementById('doubles2'), versus.doublePercentage, 'black');
            }
            if (versus.bestLeg !== 0) writeInformation(document.getElementById('bestLeg2'), versus.bestLeg, 'black');
            if (versus._darts % 3 === 0) {
                computerTurn = false;
                changeBackgroundColor(true);
            }
        }
    }, 1500);
}

function computerFinishFunction() {
    switch (computerLevel) {
        case '1':
            computerGetFinish(10);
            break;
        case '2':
            computerGetFinish(15);
            break;
        case '3':
            computerGetFinish(20);
            break;
        case '4':
            computerGetFinish(25);
            break;
        case '5':
            computerGetFinish(30);
            break;
        case '6':
                computerGetFinish(35);
            break;
        case '7':
                computerGetFinish(40);
            break;
        case '8':
            computerGetFinish(45);
            break;
        case '9':
                computerGetFinish(50);
            break;
        case '10':
            computerGetFinish(60);
            break;
    }
}

function computerGetFinish(percentage){
    let number = Math.floor(Math.random() * 100) + 1;

    if(parseInt(versus.remainingPoints) >= 100){
        switch (computerLevel) {
            case '1':
                computerGetPoints(5, 16, 5, 14, 5, 10, 1, 3, 5, 3, 14, 4, 15, 3);
                break;
            case '2':
                computerGetPoints(4, 14, 7, 13, 5, 10, 2, 5, 5, 11, 7, 13, 4);
                break;
            case '3':
                computerGetPoints(3, 15, 10, 12, 8, 8, 2, 3, 5, 5, 12, 8, 9, 5);
                break;
            case '4':
                computerGetPoints(3, 13, 10, 10, 10, 6, 6, 5, 5, 5, 11, 9, 7, 7);
                break;
            case '5':
                computerGetPoints(2, 13, 15, 8, 12, 6, 5, 4, 5, 8, 9, 10, 3, 9);
                break;
            case '6':
                computerGetPoints(2, 10, 20, 7, 16, 3, 3, 3, 3, 10, 7, 14, 2, 13);
                break;
            case '7':
                computerGetPoints(1, 7, 26, 7, 16, 2, 1, 1, 2, 12, 5, 17, 3, 17);
                break;
            case '8':
                computerGetPoints(0, 7, 33, 6, 18, 1, 1, 1, 1, 6, 3, 18, 5, 24);
                break;
            case '9':
                computerGetPoints(0, 5, 37, 5, 12, 2, 1, 3, 2, 7, 3, 22, 1, 31);
                break;
            case '10':
                computerGetPoints(0, 3, 40, 3, 15, 1, 0, 3, 1, 7, 2, 25, 0, 40);
                break;
        }
    }
    else if(parseInt(versus.remainingPoints) >= 40){
        versus.gameFunction(new DartField(null, 20, 'red', 'yellow'));
    }else{
        switch(parseInt(versus.remainingPoints)){
            case 40:
                if(number <= percentage){
                    let field = new DartField(null, 40, 'red', 'yellow');
                    field.data = 'double';
                    versus.gameFunction(field);
                }
                break;
                case 39:
                if(number <= percentage){
                    let field = new DartField(null, 19, 'red', 'yellow');
                    field.data = 'single';
                    versus.gameFunction(field);
                }
                break;
                case 38:
                if(number <= percentage){
                    let field = new DartField(null, 38, 'red', 'yellow');
                    field.data = 'double';
                    versus.gameFunction(field);
                }
                break;
                case 37:
                if(number <= percentage){
                    let field = new DartField(null, 17, 'red', 'yellow');
                    field.data = 'single';
                    versus.gameFunction(field);
                }
                break;
                case 36:
                if(number <= percentage){
                    let field = new DartField(null, 36, 'red', 'yellow');
                    field.data = 'double';
                    versus.gameFunction(field);
                }
                break;
                case 35:
                if(number <= percentage){
                    let field = new DartField(null, 15, 'red', 'yellow');
                    field.data = 'single';
                    versus.gameFunction(field);
                }
                break;
                case 34:
                if(number <= percentage){
                    let field = new DartField(null, 34, 'red', 'yellow');
                    field.data = 'double';
                    versus.gameFunction(field);
                }
                break;
                case 33:
                if(number <= percentage){
                    let field = new DartField(null, 1, 'red', 'yellow');
                    field.data = 'single';
                    versus.gameFunction(field);
                }
                break;
                case 32:
                if(number <= percentage){
                    let field = new DartField(null, 32, 'red', 'yellow');
                    field.data = 'double';
                    versus.gameFunction(field);
                }
                break;
                case 31:
                if(number <= percentage){
                    let field = new DartField(null, 7, 'red', 'yellow');
                    field.data = 'single';
                    versus.gameFunction(field);
                }
                break;
                case 30:
                if(number <= percentage){
                    let field = new DartField(null, 30, 'red', 'yellow');
                    field.data = 'double';
                    versus.gameFunction(field);
                }
                break;
                case 29:
                if(number <= percentage){
                    let field = new DartField(null, 5, 'red', 'yellow');
                    field.data = 'single';
                    versus.gameFunction(field);
                }
                break;
                case 28:
                if(number <= percentage){
                    let field = new DartField(null, 28, 'red', 'yellow');
                    field.data = 'double';
                    versus.gameFunction(field);
                }
                break;
                case 27:
                if(number <= percentage){
                    let field = new DartField(null, 3, 'red', 'yellow');
                    field.data = 'single';
                    versus.gameFunction(field);
                }
                break;
                case 26:
                if(number <= percentage){
                    let field = new DartField(null, 26, 'red', 'yellow');
                    field.data = 'double';
                    versus.gameFunction(field);
                }
                break;
                case 25:
                if(number <= percentage){
                    let field = new DartField(null, 9, 'red', 'yellow');
                    field.data = 'single';
                    versus.gameFunction(field);
                }
                break;
                case 24:
                if(number <= percentage){
                    let field = new DartField(null, 24, 'red', 'yellow');
                    field.data = 'double';
                    versus.gameFunction(field);
                }
                case 23:
                if(number <= percentage){
                    let field = new DartField(null, 7, 'red', 'yellow');
                    field.data = 'single';
                    versus.gameFunction(field);
                }
                break;
                case 22:
                if(number <= percentage){
                    let field = new DartField(null, 22, 'red', 'yellow');
                    field.data = 'double';
                    versus.gameFunction(field);
                }
                break;
                case 21:
                if(number <= percentage){
                    let field = new DartField(null, 5, 'red', 'yellow');
                    field.data = 'single';
                    versus.gameFunction(field);
                }
                break;
                case 20:
                if(number <= percentage){
                    let field = new DartField(null, 20, 'red', 'yellow');
                    field.data = 'double';
                    versus.gameFunction(field);
                }
                break;
                case 19:
                if(number <= percentage){
                    let field = new DartField(null, 3, 'red', 'yellow');
                    field.data = 'single';
                    versus.gameFunction(field);
                }
                break;
                case 18:
                if(number <= percentage){
                    let field = new DartField(null, 18, 'red', 'yellow');
                    field.data = 'double';
                    versus.gameFunction(field);
                }
                break;
                case 17:
                if(number <= percentage){
                    let field = new DartField(null, 1, 'red', 'yellow');
                    field.data = 'single';
                    versus.gameFunction(field);
                }
                break;
                case 16:
                if(number <= percentage){
                    let field = new DartField(null, 16, 'red', 'yellow');
                    field.data = 'double';
                    versus.gameFunction(field);
                }
                break;
                case 15:
                if(number <= percentage){
                    let field = new DartField(null, 7, 'red', 'yellow');
                    field.data = 'single';
                    versus.gameFunction(field);
                }
                break;
                case 14:
                if(number <= percentage){
                    let field = new DartField(null, 14, 'red', 'yellow');
                    field.data = 'double';
                    versus.gameFunction(field);
                }
                break;
                case 13:
                if(number <= percentage){
                    let field = new DartField(null, 5, 'red', 'yellow');
                    field.data = 'single';
                    versus.gameFunction(field);
                }
                break;
                case 12:
                if(number <= percentage){
                    let field = new DartField(null, 12, 'red', 'yellow');
                    field.data = 'double';
                    versus.gameFunction(field);
                }
                break;
                case 11:
                if(number <= percentage){
                    let field = new DartField(null, 3, 'red', 'yellow');
                    field.data = 'single';
                    versus.gameFunction(field);
                }
                break;
                case 10:
                if(number <= percentage){
                    let field = new DartField(null, 10, 'red', 'yellow');
                    field.data = 'double';
                    versus.gameFunction(field);
                }
                break;
                case 9:
                if(number <= percentage){
                    let field = new DartField(null, 1, 'red', 'yellow');
                    field.data = 'single';
                    versus.gameFunction(field);
                }
                break;
                case 8:
                if(number <= percentage){
                    let field = new DartField(null, 8, 'red', 'yellow');
                    field.data = 'double';
                    versus.gameFunction(field);
                }
                break;
                case 7:
                if(number <= percentage){
                    let field = new DartField(null, 3, 'red', 'yellow');
                    field.data = 'single';
                    versus.gameFunction(field);
                }
                break;
                case 6:
                if(number <= percentage){
                    let field = new DartField(null, 6, 'red', 'yellow');
                    field.data = 'double';
                    versus.gameFunction(field);
                }
                break;
                case 5:
                if(number <= percentage){
                    let field = new DartField(null, 1, 'red', 'yellow');
                    field.data = 'single';
                    versus.gameFunction(field);
                }
                break;
                case 4:
                if(number <= percentage){
                    let field = new DartField(null, 4, 'red', 'yellow');
                    field.data = 'double';
                    versus.gameFunction(field);
                }
                break;
                case 3:
                if(number <= percentage){
                    let field = new DartField(null, 1, 'red', 'yellow');
                    field.data = 'single';
                    versus.gameFunction(field);
                }
                break;
                case 2:
                if(number <= percentage){
                    let field = new DartField(null, 2, 'red', 'yellow');
                    field.data = 'double';
                    versus.gameFunction(field);
                }
                break;
        }
    }
}

function computerNormalFunction() {
    switch (computerLevel) {
        case '1':
            computerGetPoints(5, 16, 5, 14, 5, 10, 1, 3, 5, 3, 14, 4, 15, 3);
            break;
        case '2':
            computerGetPoints(4, 14, 7, 13, 5, 10, 2, 5, 5, 11, 7, 13, 4);
            break;
        case '3':
            computerGetPoints(3, 15, 10, 12, 8, 8, 2, 3, 5, 5, 12, 8, 9, 5);
            break;
        case '4':
            computerGetPoints(3, 13, 10, 10, 10, 6, 6, 5, 5, 5, 11, 9, 7, 7);
            break;
        case '5':
            computerGetPoints(2, 13, 15, 8, 12, 6, 5, 4, 5, 8, 9, 10, 3, 9);
            break;
        case '6':
            computerGetPoints(2, 10, 20, 7, 16, 3, 3, 3, 3, 10, 7, 14, 2, 13);
            break;
        case '7':
            computerGetPoints(1, 7, 26, 7, 16, 2, 1, 1, 2, 12, 5, 17, 3, 17);
            break;
        case '8':
            computerGetPoints(0, 7, 33, 6, 18, 1, 1, 1, 1, 6, 3, 18, 5, 24);
            break;
        case '9':
            computerGetPoints(0, 5, 37, 5, 12, 2, 1, 3, 2, 7, 3, 22, 1, 31);
            break;
        case '10':
            computerGetPoints(0, 3, 40, 3, 15, 1, 0, 3, 1, 7, 2, 25, 0, 40);
            break;
    }
}

function computerGetPoints(twelveChance, fiveChance, twentyChance, oneChance, eighteenChance, fourChance, thirteenChance, fifteenChance, twoChance, seventeenChance, threeChance, nineTeenChance, sevenChance, tripleChance) {
    if (twelveChance + fiveChance + twentyChance + oneChance + eighteenChance + fourChance + thirteenChance + fifteenChance + twoChance + seventeenChance + threeChance + nineTeenChance + sevenChance === 100) {
        console.log('Success');
        let number = Math.floor(Math.random() * 100) + 1;
        let tripleNumber = Math.floor(Math.random() * 100) + 1;
        if (number <= twelveChance) {
            if (tripleNumber <= tripleChance) {
                versus.gameFunction(new DartField(null, 12 * 3, 'red', 'yellow'));
            } else {
                versus.gameFunction(new DartField(null, 12, 'red', 'yellow'));
            }
        } else if (number <= (twelveChance + fiveChance)) {
            if (tripleNumber <= tripleChance) {
                versus.gameFunction(new DartField(null, 5 * 3, 'red', 'yellow'));
            } else {
                versus.gameFunction(new DartField(null, 5, 'red', 'yellow'));
            }
        }
        else if (number <= (twelveChance + fiveChance + twentyChance)) {
            if (tripleNumber <= tripleChance) {
                versus.gameFunction(new DartField(null, 20 * 3, 'red', 'yellow'));
            } else {
                versus.gameFunction(new DartField(null, 20, 'red', 'yellow'));
            }
        } else if (number <= (twelveChance + fiveChance + twelveChance + oneChance)) {
            if (tripleNumber <= tripleChance) {
                versus.gameFunction(new DartField(null, 1 * 3, 'red', 'yellow'));
            } else {
                versus.gameFunction(new DartField(null, 1, 'red', 'yellow'));
            }
        } else if (number <= (twelveChance + fiveChance + twelveChance + oneChance + eighteenChance)) {
            if (tripleNumber <= tripleChance) {
                versus.gameFunction(new DartField(null, 18 * 3, 'red', 'yellow'));
            } else {
                versus.gameFunction(new DartField(null, 18, 'red', 'yellow'));
            }
        } else if (number <= (twelveChance + fiveChance + twelveChance + oneChance + eighteenChance + fourChance)) {
            if (tripleNumber <= tripleChance) {
                versus.gameFunction(new DartField(null, 4 * 3, 'red', 'yellow'));
            } else {
                versus.gameFunction(new DartField(null, 4, 'red', 'yellow'));
            }
        } else if (number <= (twelveChance + fiveChance + twelveChance + oneChance + eighteenChance + fourChance + thirteenChance)) {
            if (tripleNumber <= tripleChance) {
                versus.gameFunction(new DartField(null, 13 * 3, 'red', 'yellow'));
            } else {
                versus.gameFunction(new DartField(null, 13, 'red', 'yellow'));
            }
        } else if (number <= (twelveChance + fiveChance + twelveChance + oneChance + eighteenChance + fourChance + thirteenChance + fifteenChance)) {
            if (tripleNumber <= tripleChance) {
                versus.gameFunction(new DartField(null, 15 * 3, 'red', 'yellow'));
            } else {
                versus.gameFunction(new DartField(null, 15, 'red', 'yellow'));
            }
        } else if (number <= (twelveChance + fiveChance + twelveChance + oneChance + eighteenChance + fourChance + thirteenChance + fifteenChance + twoChance)) {
            if (tripleNumber <= tripleChance) {
                versus.gameFunction(new DartField(null, 2 * 3, 'red', 'yellow'));
            } else {
                versus.gameFunction(new DartField(null, 2, 'red', 'yellow'));
            }
        } else if (number <= (twelveChance + fiveChance + twelveChance + oneChance + eighteenChance + fourChance + thirteenChance + fifteenChance + twoChance + seventeenChance)) {
            if (tripleNumber <= tripleChance) {
                versus.gameFunction(new DartField(null, 7 * 3, 'red', 'yellow'));
            } else {
                versus.gameFunction(new DartField(null, 7, 'red', 'yellow'));
            }
        } else if (number <= (twelveChance + fiveChance + twelveChance + oneChance + eighteenChance + fourChance + thirteenChance + fifteenChance + twoChance + seventeenChance + threeChance)) {
            if (tripleNumber <= tripleChance) {
                versus.gameFunction(new DartField(null, 3 * 3, 'red', 'yellow'));
            } else {
                versus.gameFunction(new DartField(null, 3, 'red', 'yellow'));
            }
        } else if (number <= (twelveChance + fiveChance + twelveChance + oneChance + eighteenChance + fourChance + thirteenChance + fifteenChance + twoChance + seventeenChance + threeChance + nineTeenChance)) {
            if (tripleNumber <= tripleChance) {
                versus.gameFunction(new DartField(null, 19 * 3, 'red', 'yellow'));
            } else {
                versus.gameFunction(new DartField(null, 19, 'red', 'yellow'));
            }
        } else {
            if (tripleNumber <= tripleChance) {
                versus.gameFunction(new DartField(null, 7 * 3, 'red', 'yellow'));
            } else {
                versus.gameFunction(new DartField(null, 7, 'red', 'yellow'));
            }
        }

    } else {
        console.log(twelveChance + fiveChance + twentyChance + oneChance + eighteenChance + fourChance + thirteenChance + fifteenChance + twoChance + seventeenChance + threeChance + nineTeenChance + sevenChance);
    }
}

function saveStatsToFireBase(player, userID, playerWon) {
    let date = new Date();
    let string = date.getDate() + ';' + (date.getMonth() + 1) + ';' + date.getFullYear();
    console.log(string);

    return firebase.database().ref('/users/' + userID).once('value').then(function (snapshot) {
        let stats = (snapshot.val() && snapshot.val()[string]) || 'Anonymous';
        if (stats === 'Anonymous') {
            writeNewStats(player, userID, string, playerWon);
        }
        else {
            updateStats(player, userID, string, playerWon);
        }
    });
}

function writeNewStats(player, userID, string, playerWon) {
    let daysStatsMade, matchesLost, matchesWon, doublePercentage;

    if (playerWon === 'you') {
        matchesLost = 0;
        matchesWon = 1;
    } else {
        matchesLost = 1;
        matchesWon = 0;
    }

    if (player.checkOuts != 0) {
        doublePercentage = (player.checkOuts / player.checkOutAttempts) * 100;
    }
    else {
        doublePercentage = 0;
    }

    firebase.database().ref('users/' + userID + '/' + string).set({
        matchAverage: player.matchAverage,
        nineAverage: player.first9Average,
        tons: player.tons,
        ton40s: player.ton40s,
        ton80s: player.ton80s,
        highestFinish: player.highestFinish,
        checkOuts: player.checkOuts,
        checkOutAttempts: player.checkOutAttempts,
        doublePercentage: doublePercentage,
        bestLeg: player.bestLeg,
        matchesPlayed: 1,
        matchesLost: matchesLost,
        matchesWon: matchesWon
    }, (error) => {
        if (error) {
            console.log('%c Fail', 'color: red');
        }
        else {
            console.log('%c Success', 'color: green');
        }

    });
    firebase.database().ref('/users/' + userID + '/daysStatsMade').once('value').then(function (snapshot) {
        daysStatsMade = (snapshot.val() && snapshot.val().daysStatsMade) || '';
        console.log(daysStatsMade);
    });
    setTimeout(() => {
        firebase.database().ref('users/' + userID + '/daysStatsMade').set({
            daysStatsMade: daysStatsMade + string + '|'
        }, (error) => {
            if (error) {
                console.log('%c Fail', 'color: red');
            }
            else {
                console.log('%c Success', 'color: green');
            }
        });
    }, 1000);

    // return firebase.database().ref('users/' + userID).once('value').then(function(snapshot){
    //     let daysStatsMade = (snapshot.val() && snapshot.val().daysStatsMade) || '';
    //     daysStatsMade += string + '|';
    //     firebase.database().ref('users/' + userID + '/daysStatsMade').set({
    //         daysStatsMade: daysStatsMade
    //     }
    // });
}

function updateStats(player, userID, string, playerWon) {

    let matchAverage, nineAverage, tons, ton40s, ton80s, doublePercentage, highestFinish, bestLeg, matchesLost, matchesWon, checkOutAttempts, checkOuts;


    return firebase.database().ref('/users/' + userID).once('value').then(function (snapshot) {
        let stats = (snapshot.val() && snapshot.val()[string]) || 'Anonymous';
        matchAverage = (parseInt(stats.matchAverage) + player.matchAverage) / 2;
        nineAverage = (parseInt(stats.nineAverage) + player.first9Average) / 2;
        tons = parseInt(stats.tons) + player.tons;
        ton40s = parseInt(stats.ton40s) + player.ton40s;
        ton80s = parseInt(stats.ton80s) + player.ton80s;
        matchesLost = parseInt(stats.matchesLost);
        matchesWon = parseInt(stats.matchesWon);
        checkOutAttempts = parseInt(stats.checkOutAttempts) + player.checkOutAttempts;
        checkOuts = parseInt(stats.checkOuts) + player.checkOuts;
        console.log(checkOuts);
        console.log(checkOutAttempts);

        if (playerWon === 'you') {
            matchesWon += 1;
        } else {
            matchesLost += 1;
        }

        if (stats.highestFinish < player.highestFinish) {
            highestFinish = player.highestFinish;
        } else {
            highestFinish = stats.highestFinish;
        }
        if (stats.bestLeg > player.bestLeg) {
            bestLeg = player.bestLeg;
        } else {
            bestLeg = stats.bestLeg;
        }
        if (parseInt(stats.checkOuts) != 0) {
            doublePercentage = (parseInt(stats.checkOuts) / parseInt(stats.checkOutAttempts)) * 100;
        }
        else {
            doublePercentage = 0;
        }


        firebase.database().ref('users/' + userID + '/' + string).set({

            matchAverage: matchAverage,
            nineAverage: nineAverage,
            tons: tons,
            ton40s: ton40s,
            ton80s: ton80s,
            highestFinish: highestFinish,
            bestLeg: bestLeg,
            matchesPlayed: stats.matchesPlayed + 1,
            matchesLost: matchesLost,
            matchesWon: matchesWon,
            checkOuts: checkOuts,
            checkOutAttempts: checkOutAttempts,
            doublePercentage: doublePercentage
        }, (error) => {
            if (error) {
                console.log('%c Fail', 'color: red');
            }
            else {
                console.log('%c Success', 'color: green');
            }
        });
    });
}

function popupWinner(playerWon) {
    if (playerWon === 'you') {
        document.getElementById('wonIcon').style.display = 'block';
        document.getElementById('cheer').textContent = 'Congratulation';
        document.getElementById('winningText').textContent = 'You won the match';
    }
    else {
        document.getElementById('lostIcon').style.display = 'block';
        document.getElementById('cheer').textContent = 'What a pity';
        document.getElementById('winningText').textContent = 'You lost the match';
    }

    document.getElementById('game').style.display = 'none';
    document.getElementById('popUpWinner').style.display = 'block';
}

function finishLink() {
    window.open('../html/game.html', '_self');
}

function statsLink() {
    document.getElementById('stats').style.display = 'block';
    document.getElementById('game').style.display = 'none';
    document.getElementById('popUpWinner').style.display = 'none';

    document.getElementById('tons').textContent = you.tons;
    document.getElementById('ton40s').textContent = you.ton40s;
    document.getElementById('ton80s').textContent = you.ton80s;

    document.getElementById('bestLeg').textContent = you.bestLeg;
    document.getElementById('totalCheckout').textContent = you.doublePercentage;
    document.getElementById('highestFinish').textContent = you.highestFinish;
    document.getElementById('checkOuts').textContent = you.checkOuts + ' / ' + you.checkOutAttempts;

    document.getElementById('threeDartAverage').textContent = parseInt(you.matchAverage * 300) / 100;
    document.getElementById('nineDartAverage').textContent = parseInt(you.first9Average * 300) / 100;
}

function changeDataDouble(field) {
    field.data = 'clicked';
    clicked = true;
}

function writeLegWinToScoreboard(player) {
    if (player.data === 'you') {
        document.getElementsByClassName('legs')[0].textContent = player.legsWon;
    } else {
        document.getElementsByClassName('legs')[1].textContent = player.legsWon;
    }
}

function writeSetWinToScoreboard(player) {
    if (player.data === 'you') {
        document.getElementsByClassName('sets')[0].textContent = player.setsWon;
    } else {
        document.getElementsByClassName('sets')[1].textContent = player.setsWon;
    }
}

function changeBackgroundColor(turn) {
    if (turn) {
        document.getElementById('playerInfo1').style.backgroundColor = 'black';
        document.getElementById('playerInfo2').style.backgroundColor = '#e5e5e5';
    } else {
        document.getElementById('playerInfo2').style.backgroundColor = 'black';
        document.getElementById('playerInfo1').style.backgroundColor = '#e5e5e5';
    }
}