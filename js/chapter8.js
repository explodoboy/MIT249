$('form').submit(function(e) {
    e.preventDefault();

    var target, val, url;
    target = e.target || e.srcElement;
    val = target.querySelector("input").value.toLowerCase();

    var $content = $('main');

    console.log();

    if(val === "augment") {
        url = "html/augment.html";
    } else if (val === "panacea") {
        url = "html/panacea.html";
    } else if (val === "stasis") {
        url = "html/stasis.html";
    } else {
        url = "html/default.html";
    }
  
    //$('nav a.current').removeClass('current');
    //$(this).addClass('current');
    $('#content').remove();
  
    $.ajax({
      type: "GET",
      url: url,
      timeout: 2000,
      beforeSend: function() {
        $content.append('<section id="load">Loading</section>');
      },
      complete: function() {
        $('#load').remove();
      },
      success: function(data) {
        $content.append( $(data).find('#content') ).hide().fadeIn(400);
      },
      error: function() {
        $content.append('<section class="content">Error accessing file.</section>');
      }
    });
  
});