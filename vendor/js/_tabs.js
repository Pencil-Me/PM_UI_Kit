$(function() {

    $('.tabs').on('click','.tab', function(){
        var target=$(this).attr('data-pmtargetclass');
        $(this).parent().find('[data-pmtargetclass]')
            .each(function() {
                $(this).removeClass('active');
                if($(this).attr('data-pmtargetclass')===target) {
                    $(this).addClass('active');
                }
            });
        $(this).parent().parent().find('[data-pmtab]')
            .each(function() {
                $(this).removeClass('selected');
                if($(this).attr('data-pmtab')===target) {
                    $(this).addClass('selected');
                }
            });
    });

});