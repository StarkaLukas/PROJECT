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

let score = 501;
let fields = new Array;
window.addEventListener('load', start2);

function start2() {
    createFields();
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