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

let dateFrom = '1;6;2019';
let dates = new Array;
let tons = 0;
let ton40s = 0;
let ton80s = 0;
let lost = 0;
let won = 0;
let total = 0;
let highestFinish = 0;
let bestLeg = 0;
let checkOut = 0;
let checkOuts = 0;
let checkOutAttempts = 0;
let bestFirst9Average = 0.0;
let worstFirst9Average = 0.0;
let total9Average = 0.0;
let bestAverage = 0.0;
let worstAverage = 0.0;
let totalAverage = 0.0;
let total9AveragesArray = new Array;
let totalAveragesArray = new Array;
let checkOutArray = new Array;

function start() {
    setTimeout(() => {
        getEveryDate();
        writeWelcomeBack();
    }, 2000);
    setTimeout(()=>{
        redoLoader();
    }, 4000);

    checkLoggedIn();
}

function writeWelcomeBack() {
    let userID = firebase.auth().currentUser.uid;

    return firebase.database().ref('/users/' + userID).once('value').then(function (snapshot) {
        let username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
        document.getElementById('heading').style.color = 'black';
        document.getElementById('heading').innerHTML = `${username}`;
        document.getElementById('name').innerHTML = username;
        document.getElementById('name').style.color = 'white';
        console.log(username);
    });
}

function logOut() {
    firebase.auth().signOut();
}

function checkLoggedIn() {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            document.getElementById('notLoggedIn').style.display = 'none';
            document.getElementById('loggedIn').style.display = 'block';
            document.getElementById('content').style.display = 'block';
            document.getElementById('notLoggedInContent').style.display = 'none';
        } else {
            document.getElementById('notLoggedIn').style.display = 'block';
            document.getElementById('loggedIn').style.display = 'none';
            document.getElementById('content').style.display = 'none';
            document.getElementById('notLoggedInContent').style.display = 'block';
        }
        document.getElementById('placeHolder').style.display = 'none';
    });
}

function getEveryDate() {
    firebase.database().ref('/users/' + firebase.auth().currentUser.uid + '/daysStatsMade').once('value').then(function (snapshot) {
        let daysStatsMade = (snapshot.val() && snapshot.val().daysStatsMade) || '';
        let parts = daysStatsMade.split('|');
        for (let i = 0; i < parts.length; i++) {
            const part = parts[i];
            let dayMonthYear = part.split(';');
            let day = parseInt(dayMonthYear[0]);
            let month = parseInt(dayMonthYear[1]);
            let year = parseInt(dayMonthYear[2]);

            if (year > parseInt(dateFrom.split(';')[2])) {
                dates.push(part);
            } else if (year === parseInt(dateFrom.split(';')[2])) {
                if (month > parseInt(dateFrom.split(';')[1])) {
                    dates.push(part);
                } else if (month === parseInt(dateFrom.split(';')[1])) {
                    if (day >= parseInt(dateFrom.split(';')[0])) {
                        dates.push(part);
                    }
                }
            }
        }
    });
    console.log(dates);
    setTimeout(() => {
        writeStats();
    }, 1000);
}

function writeStats() {
    getStats();
    writeTons();
    writeMatches();
    writeBestLegHighestFinishAndCheckout();
    writeAverages();
}

function getStats() {

    for (let i = 0; i < dates.length; i++) {
        firebase.database().ref('/users/' + firebase.auth().currentUser.uid).once('value').then(function (snapshot) {
            let stats = (snapshot.val() && snapshot.val()[dates[i]]) || 'Anonymous';
            totalAveragesArray[i] = (parseInt(stats.matchAverage * 300) / 100);
            total9AveragesArray[i] = (parseInt(stats.nineAverage * 300) / 100);
            checkOutArray[i] = (stats.doublePercentage);
            tons += parseInt(stats.tons);
            ton40s += parseInt(stats.ton40s);
            ton80s += parseInt(stats.ton80s);
            won += parseInt(stats.matchesWon);
            lost += parseInt(stats.matchesLost);
            total += parseInt(stats.matchesPlayed);
            if (highestFinish < parseInt(stats.highestFinish) || highestFinish === 0) {
                highestFinish = parseInt(stats.highestFinish);
            }
            if (bestLeg > parseInt(stats.bestLeg) || bestLeg === 0) {
                bestLeg = parseInt(stats.bestLeg);
            }
            if (checkOut != 0) {
                checkOut = (checkOut + parseFloat(stats.doublePercentage)) / 2;
            }
            else {
                checkOut = parseFloat(stats.doublePercentage);
            }
            checkOuts += parseInt(stats.checkOuts);
            checkOutAttempts += parseInt(stats.checkOutAttempts);

            if (bestAverage < parseFloat(stats.matchAverage) || bestAverage === 0) {
                bestAverage = parseFloat(stats.matchAverage);
            }
            if (worstAverage > parseFloat(stats.matchAverage) || worstAverage === 0) {
                worstAverage = parseFloat(stats.matchAverage);
            }
            if (totalAverage != 0) {
                totalAverage = (totalAverage + parseFloat(stats.matchAverage)) / 2;
            } else {
                totalAverage = parseFloat(stats.matchAverage);
                
            }

            if (bestFirst9Average < parseFloat(stats.nineAverage) || bestFirst9Average === 0) {
                bestFirst9Average = parseFloat(stats.nineAverage);
            }
            if (worstFirst9Average > parseFloat(stats.nineAverage) || worstFirst9Average === 0) {
                worstFirst9Average = parseFloat(stats.nineAverage);
            }
            if (total9Average != 0) {
                total9Average = (total9Average + parseFloat(stats.nineAverage)) / 2;
            } else {
                total9Average = parseFloat(stats.nineAverage);
            }
            
        });
        
    }
}

function writeTons() {
    setTimeout(() => {
        document.getElementById('tons').textContent = tons;
        document.getElementById('ton40s').textContent = ton40s;
        document.getElementById('ton80s').textContent = ton80s;
    }, 1000);
}

function writeMatches() {
    setTimeout(() => {
        document.getElementById('matchesPlayed').textContent = total;
        pieChart('matchesWon', ['Matches won', 'Matches lost'], [won, lost], ['rgba(105, 232, 12, 0.2)']);
        pieChart('matchesLost', ['Matches lost', 'Matches won'], [lost, won], ['rgba(255, 99, 132, 0.2)']);
    }, 1000);
}

function pieChart(chartID, labels, data, backgroundColorArray) {
    let chart = document.getElementById(chartID).getContext('2d');
    let myChart = new Chart(chart, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: backgroundColorArray
            }]
        },
        options: {
            legend: {
                display: false
            }
        }
    });
}

function writeBestLegHighestFinishAndCheckout() {
    setTimeout(() => {
        document.getElementById('highestFinish').textContent = highestFinish;
        document.getElementById('bestLeg').textContent = bestLeg;
        document.getElementById('totalCheckout').textContent = checkOut + '%';
        document.getElementById('checkOuts').textContent = checkOuts + ' / ' + checkOutAttempts;
    }, 1000);
}

function writeAverages() {

    setTimeout(() => {
        document.getElementById('lowestAverage').textContent = parseInt(worstAverage * 300) / 100;
        document.getElementById('highestAverage').textContent = parseInt(bestAverage * 300) / 100;
        document.getElementById('totalAverage').textContent = parseInt(totalAverage * 300) / 100;
        document.getElementById('lowest9Average').textContent = parseInt(worstFirst9Average * 300) / 100;
        document.getElementById('highest9Average').textContent = parseInt(bestFirst9Average * 300) / 100;
        document.getElementById('total9Average').textContent = parseInt(total9Average * 300) / 100;
        lineChartAverages('chartAverages', dates);
        lineChartCheckouts('chartCheckout', dates);
    }, 1000);
}

function lineChartAverages(chartID, labels) {
    let chart = document.getElementById(chartID).getContext('2d');
    let myChart = new Chart(chart, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                data: totalAveragesArray,
                fill: false,
                borderColor: 'rgba(0,0,255,0.2)'
            }, {
                data: total9AveragesArray,
                fill: false,
                borderColor: 'rgba(0,0,0,0.8)'
            }]
        },
        options: {

            legend: {
                display: false
            }
        }
    });
}

function lineChartCheckouts(chartID, labels){
    let chart = document.getElementById(chartID).getContext('2d');
    let myChart = new Chart(chart, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                data: checkOutArray,
                fill: false,
                borderColor: 'rgba(0,0,0,0.8)'
            }]
        },
        options: {
            legend: {
                display: false
            }
        }
    });
}

function redoLoader(){
    document.getElementById('loader').style.display = 'none';
    document.getElementById('all').style.display = 'block';
}