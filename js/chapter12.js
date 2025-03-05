// Sorting method
var sort = {
    title: function(a, b) {
        if (a.title < b.title) {
            return -1;
        } else if (a.title > b.title) { // I split the last else for readability.
            return 1
        } else {
            return 0;
        }
    },
    category: function(a, b) {
        if (a.category < b.category) {
            return -1;
        } else if (a.category > b.category) { // I split the last else for readability.
            return 1
        } else {
            return 0;
        }
    }
};

// Documents table
var docs = [
    {
        title: "Antimatter Economics",
        link: "https://explodoboy.github.io/RoleplayArchive/html/economy/economic_utilization_of_antimatter.html",
        category: "Archiving"
    },
    {
        title: "Administrative Structure",
        link: "https://explodoboy.github.io/RoleplayArchive/html/society/government_structure.html",
        category: "Administration"
    },
    {
        title: "Mandatory Citizen Enhancements",
        link: "https://explodoboy.github.io/RoleplayArchive/html/society/mandatory_enhancements.html",
        category: "Populace Administration"
    },
    {
        title: "Summary of History",
        link: "https://explodoboy.github.io/RoleplayArchive/html/history/grandhold_history.html",
        category: "Archiving"
    },
    {
        title: "Fractal Complexity Computation",
        link: "https://explodoboy.github.io/RoleplayArchive/html/technology/fractal_complexity_computation.html",
        category: "Digital Engineering"
    },
]

// Should be self-explanatory. Filters, searches, and sorts.
function filter_search_sort() {

    var filter = $("#filterForm").find(":selected").val();
    var order = $("#orderForm").find(":selected").val();
    var search = $("#searchInput").val();
    
    // Create copy of table; safe to work with.
    var results = docs.slice();

    // Perform filtering.
    
    // Perform title search.
    for(i = 0; i < results.length; i++) {
        if(!results[i].title.includes(search)) {
            results.splice(i, 1);
        }
    }
    
    // Sort what is left. Elements are grouped (in terms of importance) by category, then lettering.
    results.sort(sort.title);
    results.sort(sort.category);
    if(order === "descending") { results.reverse(); }
    
    // Print results.
    var $output = $("#output");
    $output.empty(); // Clear table, since it'll probably be refreshed repeatedly.
    $output.append("<tr><th>Title</th><th>Category</th></tr>");
    
    for(var i = 0; i < results.length; i++) {
        $output.append("<tr><td><a class=\"active-link\" href=\"" + results[i].link + "\">" + results[i].title + "</a></td><td>" + results[i].category +"</td></tr>");
    }
}

// Initialize table once after page load.
$(function() {

    filter_search_sort();

})

// Handle instant search
$("#searchForm").submit(function(e) {
    e.preventDefault();
})

$("#searchForm").on('keyup', function(e) {
    filter_search_sort();
})