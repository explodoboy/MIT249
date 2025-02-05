// Get the second <ul> element in the document; <nav> has a <ul>, so has to skip over that
var list = document.getElementsByTagName("ul")[1];

// Add new item at the start of the list
var newItemFirst = document.createElement("li");
var newTextFirst = document.createTextNode("Grabnok is coming");
newItemFirst.appendChild(newTextFirst);
list.insertBefore(newItemFirst, list.firstChild);

// Add a new item to the end of the list
var newItemLast = document.createElement("li");
var newTextLast = document.createTextNode("Grabnok is here");
newItemLast.appendChild(newTextLast);
list.appendChild(newItemLast);

// Add a class to all list items
var listItems = document.querySelectorAll("li");
var navLength = document.getElementsByTagName("nav")[0].getElementsByTagName("li").length;

// Add a class to all non-nav list items; as long as nav is the first <ul>, it will dynamically be left out of the loop
for (var i = navLength; i < listItems.length; i++) {
    listItems[i].className = "ranking-3";
}

// Add number of list items to the heading
var heading = document.getElementById("count");
var totalItems = listItems.length - navLength;
var newHeading = "You currently have access to [" + "<span>" + totalItems + "</span>" + "] GRABNOKs:";
heading.innerHTML = newHeading;