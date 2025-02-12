$(function() {

    // Setup
    var $list, $newItemForm, $newItemButton;
    var item = "";
    var lostGrabnoks = 0;
    $list = $("section ul");
    $newItemForm = $("#newItemForm");
    $newItemButton = $("#newItemButton");

    $("section ul li").hide().each(function(index) {
        $(this).delay(150 * index).fadeIn(250);
    });
    $("#abandoned").hide();

    // Item counter
    function updateCount() {
        var items = $("section ul li").length;
        $("#count").text("You currently have access to [" + items + "] GRABNOKs:");
        $("#abandoned").text("You have abandoned [" + lostGrabnoks + "] GRABNOKs. You monster.");
    }
    updateCount();

    // Setup form for new items
    $newItemButton.show();
    $newItemForm.hide();
    $newItemButton.on("click", function() {
        $newItemButton.hide();
        $newItemForm.show();
    });

    // Adding a new list item
    $newItemForm.on("submit", function(e) {
        e.preventDefault();
        var text = $("input:text").val();
        var duplicateFound = false;
        
        $("section ul li").each(function() {
            if ($(this).text().includes(text)) {
                duplicateFound = true;
                return false; //end loop early, save some CPU cycles
            };
        });

        if (!duplicateFound) {
            if(text.includes("Grabnok")) {
                $list.append("<li class=\"ranking-1\">" + text + "</li>");
                $("input:text").val("");
                updateCount();
    
                // reset the 'wrong' text in case it's triggered
                $("#itemName").text("Input the GRABNOK you want. It must be a GRABNOK to be accepted.");
            }
            else {
                $("#itemName").text("WRONG. IT MUST BE A GRABNOK.");
            }
        } else {
            $("#itemName").text("WRONG. NO DUPLICATES ALLOWED.");
        }

    });
    
    // Click handling
    $list.on("click", "li", function() {
        var $this = $(this);
        var complete = $this.hasClass("ranking-3");

        if (complete === true) {
            $this.animate({
                opacity: 0.0,
                paddingLeft: "+=180"
            }, 500, "swing", function() {
                $this.remove();
                lostGrabnoks++;
                $("#abandoned").show();
                updateCount();
            });
        } else {
            item = $this.text();
            $this.remove();
            $list
                .append("<li class=\"ranking-3\">" + item + "</li>")
                .hide()
                .fadeIn(300);
            updateCount();
        }
    })

});