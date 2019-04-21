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
    hoverDefault(){
        this.field.style.fill = this.color;
    }
}

class Player{
    constructor(darts, legAverage, matchAverage, first9Average, tons, ton40s, ton80s, highestFinish, doublePercentage, bestLeg){
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
    
    get legAverage(){
        return this.legAverage;
    }

    get matchAverage(){
        return this.matchAverage;
    }
    get first9Average(){
        return this.first9Average;
    }
    get tons(){
        return this.tons;
    }
    get ton40s(){
        return this.ton40s;
    }
    get ton80s(){
        return this.ton80s;
    }
    get highestFinish(){
        return this.highestFinish;
    }
    get doublePercentage(){
        return this.doublePercentage;
    }
    get bestLeg(){
        return this.bestLeg;
    }

    set legAverage(newAverage){
        this.legAverage = newAverage;
    }
}

let score = 501;
let fields = new Array;
let computerLevel = 1;
let you = new Player(0, 0.0, 0.0, 0.0, 0, 0, 0, 0, 0.0, 0);
let component = new Player(0, 0.0, 0.0, 0.0, 0, 0, 0, 0, 0.0, 0);

window.addEventListener('load', start2);

function start2() {
    createFields();
    setTimeout(()=>{
        writeNameOfUser('username');
    }, 2000);
    writeNameOfComputer('computername');
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

function writeNameOfUser(field){
    let userID = firebase.auth().currentUser.uid;
    return firebase.database().ref('/users/' + userID).once('value').then(function(snapshot) {
        let username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
        document.getElementById(field).innerHTML = username;
        document.getElementById(field).style.color = 'white';
      });
}

function writeNameOfComputer(field){
    document.getElementById(field).innerHTML = `Computer ${computerLevel}`;
    document.getElementById(field).style.color = 'white'; 
}