var started = false;
var textEl = document.getElementById("questionText");
var startButtonEl = document.getElementById("startButton");
var yesButtonEl = document.getElementById("yesButton");
var noButtonEl = document.getElementById("noButton");
var yes;

var questions = {
    init: "Do you have a fever?",
    yes: "Are you experiencing shortness of breath?",
    no: "Do you have itchy eyes?",
};

var end = false;
var answers = [];

yesButtonEl.onclick = function () {
    next(true, !end);
    end = true;
};

noButtonEl.onclick = function () {
    next(false, !end);
    end = true;
};

function next(answer, notEnd) {
    if (answer && notEnd) {
        textEl.innerHTML = questions.yes+"<br/><br/>";
        answers.push(answer);
    } else if (notEnd) {
        textEl.innerHTML = questions.no+"<br/><br/>";
        answers.push(answer);
    } else if (!notEnd) {
        answers.push(answer);
        if (answers[0]) {
            if (answers[1]) {
                // Covid
                textEl.innerHTML = "<br/>You MAY have the novel coronavirus. Some other symptoms you may have are <ul><li>Cough</li><li>Fatigue</li><li>Weakness</li><li>Exhaustion</li></ul>";
            } else {
                // Flu
                textEl.innerHTML = "<br/>You MAY have the flu. Some other symptoms you may have are <ul><li>Cough</li><li>Fatigue</li><li>Weakness</li><li>Exhaustion</li></ul>";
            }
        } else {
            if (answers[1]) {
                // Allergies
                textEl.innerHTML = "<br/>You MAY have allergies. Some other symptoms you may have are <ul><li>Sneezing</li><li>Running nose</li></ul>";
            } else {
                // Common cold
                textEl.innerHTML = "<br/>You MAY have the common cold. Some other symptoms you may have are <ul><li>Sneezing</li><li>Running nose</li><li>Mild chest discomfort</li></ul>";
            }
        }
        yesButtonEl.style.display = "none";
        noButtonEl.style.display = "none";
        startButtonEl.style.display = "initial";
        startButtonEl.innerText = "Restart";
        answers = [];
        startButtonEl.onclick = start;
    }
}

function start() {
    end = false;
    textEl.style.display = "initial";
    startButtonEl.style.display = "none";

    yesButtonEl.style.display = "initial";
    noButtonEl.style.display = "initial";

    // main code
    textEl.innerHTML = questions.init+"<br/><br/>";
}
/* 
 */
function main() {
    if (started) {
        // run the program
        start();
    } else {
        textEl.style.display = "none";
        requestAnimationFrame(main);
    }
}

main();