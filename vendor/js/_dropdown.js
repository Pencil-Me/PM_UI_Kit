$(function() {

    $('.select').each(function() {
        var val = $.map($(this).find('option'), function(option) {return option.value;}),
            element = $(this);
        element.append('<div class="select-field"><div class="text">Select Item</div></div><div class="menu transition hidden"></div>');
        $.each(val, function(index, value) {
            element.find('.menu').append('<div class="item">' + value + '</div>');
        });

    });
    $('body').on('click', function(){
        $('.select .select-field').each(function() {
            $(this).removeClass('open').parent().children('.menu').addClass('hidden');
        });
    });
    $('.select .select-field').on('click', function(event){
        event.stopPropagation();
        $('body').find('.select .select-field').each(function() {
            $(this).removeClass('open').parent().children('.menu').addClass('hidden');
        });
        $(this).addClass('open').parent().children('.menu').toggleClass('hidden');
    });
    $('.select .item').on('click', function(event){
        event.stopPropagation();

        var multival = [];

        if (!$(this).parent().parent().find('select').attr("multiple")) {
            multival = $(this).text();
            $(this).parent().find('.active').removeClass('active');
            $(this).removeClass('active').addClass('active');
        } else {
            var arraylog = [];
            (!$(this).parent().parent().find('select').val()) ? arraylog.length = 0 : arraylog = $(this).parent().parent().find('select').val();
            if ($.inArray($(this).text(),arraylog)==-1) {
                arraylog.push($(this).text());
            } else {
                arraylog.splice(arraylog.indexOf($(this).text()),1)
            }
            multival = arraylog;
            $(this).parent().find('.item').each(function(){
                if ($.inArray($(this).text(),arraylog)>-1) {
                    $(this).removeClass('active').addClass('active');
                } else {
                    $(this).removeClass('active');
                }
            });
        }
        $(this).parent().parent().find('.text').text(multival);
        $(this).parent().parent().find('select').val(multival);
        $(this).parent().parent().removeClass('open').children('.menu').addClass('hidden');
    });

});