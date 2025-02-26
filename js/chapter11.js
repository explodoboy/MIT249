$('.tab-list').each(function(){
    var $this = $(this);
    var $tab = $this.find('li.tab-active');
    var $link = $tab.find('a');
    var $panel = $($link.attr('href'));
  
    $this.on('click', '.tab-control', function(e) {
        e.preventDefault();
        var $link = $(this),
            id = this.hash;
    
        if (id && !$link.is('.tab-active')) {
            $panel.removeClass('tab-active');
            $tab.removeClass('tab-active');
    
            $panel = $(id).addClass('tab-active');
            $tab = $link.parent().addClass('tab-active');
        }
    });
});