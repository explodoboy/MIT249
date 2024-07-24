// Get the second <ul> element in the document; <nav> has a <ul>, so has to skip over that
var list = document.getElementsByTagName("ul")[1];

// Add a new item to the end of the list
var newItemLast = document.createElement("li");
var newTextLast = document.createTextNode("coming");
newItemLast.appendChild(newTextLast);
list.appendChild(newItemLast);

// Add new item at the start of the list
var newItemFirst = document.createElement("li");
var newTextFirst = document.createTextNode("grabnok");
newItemFirst.appendChild(newTextFirst);
list.insertBefore(newItemFirst, list.firstChild);

// Add a class to all list items
var listItems = document.querySelectorAll("li");
var navLength = document.getElementsByTagName("nav")[0].getElementsByTagName("li").length;

// Add a class to all non-nav list items; as long as nav is the first <ul>, it will dynamically be left out of the loop
for (var i = navLength; i < listItems.length; i++) {
    listItems[i].className = "ranking-3";
}

// Add number of list items to the heading
var heading = document.querySelectorAll("h2")[1]; // Skip first h2, it's part of <header>.
var headingText = heading.firstChild.nodeValue;
var totalItems = listItems.length - navLength;
var newHeading = headingText + "<span>" + totalItems + "</span>";
heading.innerHTML = newHeading;