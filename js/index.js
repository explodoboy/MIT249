// 'session' welcome message
var session_greeting = "Welcome, ";
var session_name = "Endalia";
var session_message = ". As a non-administration citizen, you have the following session attributes:";
var session_text = session_greeting + session_name + session_message;

// 'session' table details
var session_ranking_text = 0.0 + 0.1; //totally unnecessary and definitely inefficient but im covering myself to ensure i meet objectives
var session_ranking_class = "ranking-open";

var session_special_access_text = "Dhatri Tsardom MK2 Supersoldier Intel";

// 'privileges' welcome message
var privileges_greeting = "As a citizen of the ";
var privilges_nation = "Grandhold of Abyss";
var privileges_message = ", you have the following session attributes:";
var privileges_text = privileges_greeting + privilges_nation + privileges_message;

// 'privileges'
var privileges_ai_usage_text = "Full";
var privileges_ai_connections_text = "Full (including direct neural interfacing)";


// Get all elements
var session = document.getElementById("session");
var ranking = document.getElementById("ranking");
var special_access = document.getElementById("special_access");

var privileges = document.getElementById("privileges");
var ai_usage = document.getElementById("ai_usage");
var ai_connections = document.getElementById("ai_connections");


// Replace relevant elements' contents.
session.textContent = session_text;

ranking.textContent = session_ranking_text;
ranking.className = session_ranking_class;

special_access.textContent = session_special_access_text;

privileges.textContent = privileges_text;

ai_usage.textContent = privileges_ai_usage_text;
ai_connections.textContent = privileges_ai_connections_text;