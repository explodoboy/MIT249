//
var noteInput, noteName, textEntered, target, recordButton, recordText;

noteName = document.getElementById("noteName");
noteInput = document.getElementById("noteInput");
recordButton = document.getElementById("recordButton");

function writeLabel(e) {
    if (!e) {
        e = window.event; //Hah! VS Code marks the .event as deprecated.
    }
    target = e.target || e.srcElement;

    textEntered = target.value;
    noteName.textContent = textEntered;
}

// Record/pause functions
function recorderControls(e) {
    if(!e) {
        e = window.event;
    }
    target = e.target || e.srcElement;

    if (e.preventDefault) {
        e.preventDefault();
    } else {
        e.returnValue = false;
    }

    switch (target.getAttribute("data-state")) {
        case "record":
            record(target);
            break;
        case "stop":
            stop(target);
            break;
    }
}

function record(target) {
    target.setAttribute("data-state", "stop");
    target.textContent = "stop";
}

function stop(target) {
    target.setAttribute("data-state", "record");
    target.textContent = "record";
}

// Event listeners
if (document.addEventListener) {
    recordButton.addEventListener("click", function(e){recorderControls(e);}, false); //WHAT IS THIS FRANKENSTEIN LANGUAGE
    noteInput.addEventListener("input", writeLabel, false);
}
else {
    recordButton.attachEvent("onclick", function(e){recorderControls(e);}); //SERIOUSLY
    noteInput.attachEvent("onkeyup", writeLabel);
}