$(function() {

    $("[data-pm-action='loading']").on('click', function(){
        switch($(this).attr('data-pm-type')){
            case 'inline':
                $(this).toggleClass('loading');
                break;
            case 'fullscreen':
                $('body').append('<div id="toogle" class="loading fullscreen"><div class="spinner"></div></div>');
                break;
        }
    });


    $("body").on('click','#toogle',function(){
        $(this).remove();
    });

});