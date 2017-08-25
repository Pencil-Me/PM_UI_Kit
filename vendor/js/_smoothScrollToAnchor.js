$("a[href*=\\#]:not([href=\\#])").on({
    click :  function(e){
        var self = $(this);
        if (self.hash.offset() !== undefined) {
           e.preventDefault();
           var $hash = this.hash;
           $('html, body'). animate({
               scrollTop: $($hash).offset().top
           },800, function() {
               window.location.hash = $hash;
           })
        }
    }
});