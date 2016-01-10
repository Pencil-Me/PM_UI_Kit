$(function() {

    var fillcheck = function() {
        var value = $( this ).val();
        if(value!="" && value!=undefined) {
            if (!$(this).hasClass("filled")) {
                $(this).addClass("filled");
            }
        } else {
            $(this).removeClass("filled");
        }
    };

    $("input").on('keyup',fillcheck);
    $("textarea").on('keyup',fillcheck);

});