// Declare and initialize variables.
var input, story, intro, title1, title2, textEntered, target, recordButton, recordText, index, trigger;

textEntered = ["world", "greatness", "barren", "billions of years ago", "war", "darkness"];
trigger = false;

intro = document.getElementById("intro");
title1 = document.getElementById("title1");
title2 = document.getElementById("title2");

story = [];
story[0] = document.getElementById("story1");
story[1] = document.getElementById("story2");
story[2] = document.getElementById("story3");

input = [];
input[0] = document.getElementById("input1");
input[1] = document.getElementById("input2");
input[2] = document.getElementById("input3");
input[3] = document.getElementById("input4");
input[4] = document.getElementById("input5");
input[5] = document.getElementById("input6");

// Get text input from <input> object.
function getInput(e, index) {
    if (!e) {
        e = window.event; //Hah! VS Code marks the .event as deprecated.
    }
    target = e.target || e.srcElement;

    // When input is empty, put...emptiness. Like, the word.
    if(target.value === "") {
        textEntered[index] = "emptiness"
    } else {
        textEntered[index] = target.value;
    }

    // Flag for if a field has been edited by the user. Fires each character the user types; probably inefficient.
    input[index].edited = true;

    writeLabel();
}

// Event listeners; calls input function each time a character is pressed in a field.
if (document.addEventListener) {
    input[0].addEventListener("input", function(e) {getInput(e, 0);}, false);
    input[1].addEventListener("input", function(e) {getInput(e, 1);}, false);
    input[2].addEventListener("input", function(e) {getInput(e, 2);}, false);
    input[3].addEventListener("input", function(e) {getInput(e, 3);}, false);
    input[4].addEventListener("input", function(e) {getInput(e, 4);}, false);
    input[5].addEventListener("input", function(e) {getInput(e, 5);}, false);
}

// Print the user's input on the page.
// I bet this is super inefficient, but I'm not gonna spend another hour or more trying to make it optimized.
function writeLabel() {
    // Use the right a/an. Because putting a(n) just felt wrong.
    if(textEntered[0][0] === "a" || textEntered[0][0] === "e" || textEntered[0][0] === "i" ||textEntered[0][0] === "o" || textEntered[0][0] === "u") {
        story[0].textContent = "This is a story of an ";
    } else {
        story[0].textContent = "This is a story of a ";
    }
    story[0].textContent += textEntered[0] + ". Once, it stood at the precipice of " + textEntered[1] + ", and now it is " + textEntered[2] + ". As with most stories, it began " + textEntered[3] + ". And, at one point, it involved " + textEntered[4] + ".";
    
    story[1].textContent = "In that time, both genius and foolish choices were made. And those choices battled. Long or short, close or not...only one thing matters in the end; that " + textEntered[0] + " is " + textEntered[2] + " now.";

    story[2].textContent = "There is but one thing left to come in the wake of this; " + textEntered[5] + ".";

    // Replaces the text at the top of the page. Only fires once, after the user has edited each field.
    if(!trigger) {
        for(i = 0; i < input.length; i++) {
            if(input[i].edited !== true) {
                break;
            }
            if (i === input.length - 1) {
                intro.textContent = "This page is complete. Well done.";
                title1.textContent = "YOUR";
                title2.textContent = "STORY PORTAL";
                trigger = true;
            }
        }
    }
}