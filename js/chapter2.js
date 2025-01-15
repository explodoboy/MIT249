// Create variables for the welcome message
var greeting = 'Greetings, ';
var name = 'Endalia. ';
var message = 'Your firearms order has been approved. Your account has already been charged; details are below.';
// Concatenate the three variables above to create the welcome message
var welcome = greeting + name + message;

// Create variables to hold details about the order
var item = 'T20A5';
var count = 2;
var subtotal = count * 320;
var fee = subtotal * 0.25;
var grandTotal = subtotal + fee;

// Print greeting.
var el_greeting = document.getElementById('greeting');
el_greeting.textContent = welcome;

// Print order details.
var el_descriptor = document.getElementById('descriptor');
el_descriptor.textContent = item;

var el_count = document.getElementById('count');
el_count.textContent = count;

var el_subtotal = document.getElementById('subtotal');
el_subtotal.textContent = 'M.' + subtotal;

var el_extra = document.getElementById('extra');
el_extra.textContent = 'M.' + fee;

var el_total = document.getElementById('total');
el_total.textContent = 'M.' + grandTotal;