function randString(n)
{
    if(!n)n=5;
    var text='';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for(var i=0; i < n; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

$(function() {

    $('[data-rating]').each(function() {
        var idcode=randString(4);
        $(this).hide();
        $(this).attr('data-id',idcode).parent().append('<div id="'+idcode+'" class="rating '+$(this).attr('data-rating')+'"></div>');
        $(this).find('option').each(function(){
            $(this).parent().parent().find('.rating').append('<div class="rate"></div>');
        })
    });
    $('.rating').on('click','.rate', function(){

        var rating = 1;
        $(this).addClass('active').prevAll().addClass('active').each(function() {
            rating = rating + 1;
        });
        $(this).parent().parent().find('select').find('option').each(function() {
            if ($(this).index() === rating-1) {
                $(this).parent().parent().find('select').val($(this).val());
            }
        });
        $(this).nextAll().removeClass('active');

    }).on('hover','.rate', function(){
        var counter = 0;
        $(this).parent().find('active').each(function() {
            counter = counter + 1;
        });
        $(this).addClass('active').prevAll().addClass('active');
        $(this).nextAll().removeClass('active');

    });

});