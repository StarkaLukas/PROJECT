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

let dateFrom = '1;1;2019';
let dates = new Array;
let datesStrings = new Array;
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

    prepareOptions();
    checkLoggedIn();
    createStats();
    document.getElementsByClassName('select')[0].addEventListener('click', redoStats);
    document.getElementById('file').addEventListener('change', (event) => {
        let user = firebase.auth().currentUser;
        let path = `users/${user.uid}/${event.target.files[0].name}`

        firebase.storage().ref(path).put(event.target.files[0]).then(() => {
            user.updateProfile({
                photoURL: path
              }).then(() => {
                  console.log('updated');
              }).catch((error) => {
                console.log('%c ' + error, 'color: red');
              });
              
        }).then(() => {
            console.log('uploaded');
        });
    });

    firebase.auth().onAuthStateChanged((user) => {
        if (user.photoURL) {
            firebase.storage().ref(user.photoURL).getDownloadURL().then((url) => {
                let xhr = new XMLHttpRequest();
    
                xhr.responseType = 'blob';
                xhr.addEventListener('load', () => {
                    let canvas = document.createElement('canvas');
    
                    canvas.drawImage(xhr.response, 0, 0);
                    document.getElementById('profilePicture').src = canvas.toDataURL();
                });
                xhr.open('GET', url);
                xhr.send();
            });
        }
    });
}

function writeWelcomeBack() {
    let userID = firebase.auth().currentUser.uid;

    return firebase.database().ref('/users/' + userID).once('value').then(function (snapshot) {
        let username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
        document.getElementById('heading').style.color = 'black';
        document.getElementById('heading').innerHTML = `${username}`;
        document.getElementById('name').innerHTML = username;
        document.getElementById('name').style.color = 'white';
        let day = (snapshot.val() && snapshot.val().day) || 'Anonymous';
        let month = (snapshot.val() && snapshot.val().month) || 'Anonymous';
        let year = (snapshot.val() && snapshot.val().year) || 'Anonymous';
        document.getElementById('pds').innerHTML = `<i class="fas fa-calendar-alt"></i> ${day}.${month}.${year}`;
        let email = (snapshot.val() && snapshot.val().email) || 'Anonymous';
        document.getElementById('email').innerHTML = `<i class="fas fa-envelope"></i> ${email}`;
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
            let dateString = day + '.' + month + '.' + year;

            if (year > parseInt(dateFrom.split(';')[2])) {
                dates.push(part);
                datesStrings.push(dateString);
            } else if (year === parseInt(dateFrom.split(';')[2])) {
                if (month > parseInt(dateFrom.split(';')[1])) {
                    dates.push(part);
                    datesStrings.push(dateString);
                } else if (month === parseInt(dateFrom.split(';')[1])) {
                    if (day >= parseInt(dateFrom.split(';')[0])) {
                        dates.push(part);
                        datesStrings.push(dateString);
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
        document.getElementById('totalCheckout').textContent = parseInt(checkOut * 100) / 100 + '%';
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
        lineChartAverages('chartAverages', datesStrings);
        lineChartCheckouts('chartCheckout', datesStrings);
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

function lineChartCheckouts(chartID, labels) {
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

function redoLoader() {
    document.getElementById('loader').style.display = 'none';
    document.getElementById('all').style.display = 'block';
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

function createStats() {
    setTimeout(() => {
        getEveryDate();
        writeWelcomeBack();
    }, 2000);
    setTimeout(() => {
        redoLoader();
    }, 4000);
}


function redoStats() {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    console.log(day + ' ' + month + ' ' + year);
    switch (document.getElementById('statsPeriod').selectedIndex) {
        case 1:
            dateFrom = day + ';' + month + ';' + year;
            break;
        case 2:
            if (day - 7 < 1) {
                month--;
                switch (month) {
                    case 4:
                    case 6:
                    case 9:
                    case 11:
                        day = 30 + day - 7;
                        break;
                    case 2:
                        day = 28 + day - 7;
                        break;
                    default:
                        day = 31 + day - 7;
                        break;
                }
                dateFrom = day + ';' + month + ';' + year;
            } else {
                dateFrom = day - 7 + ';' + month + ';' + year;
            }
            break;
        case 3:
            if (date.getMonth === 0) {
                month = 12;
            } else {
                month = month - 1;
            }
            dateFrom = day + ';' + month + ';' + year;
            break;
        case 4:
            dateFrom = '1;1;2019';
            break;
    }
    dates = new Array;
    datesStrings = new Array;
    tons = 0;
    ton40s = 0;
    ton80s = 0;
    lost = 0;
    won = 0;
    total = 0;
    highestFinish = 0;
    bestLeg = 0;
    checkOut = 0;
    checkOuts = 0;
    checkOutAttempts = 0;
    bestFirst9Average = 0.0;
    worstFirst9Average = 0.0;
    total9Average = 0.0;
    bestAverage = 0.0;
    worstAverage = 0.0;
    totalAverage = 0.0;
    total9AveragesArray = new Array;
    totalAveragesArray = new Array;
    checkOutArray = new Array;
    doLoader();
    createStats();

}

function doLoader() {
    document.getElementById('loader').style.display = 'block';
    document.getElementById('all').style.display = 'none';
}