(function($){
    $.scrollVariables = {
        rdWindow : {
            timer: null
        },
        datamedia : 0,

        scroll : function(e) {
            var self = $(this);
            $.scrollVariables.datamedia = self.scrollTop();
            clearTimeout($.scrollVariables.rdWindow.timer);
            $.scrollVariables.rdWindow.timer = setTimeout(function () {
                self.trigger('scrollEvent', [{'scrollTop': $.scrollVariables.datamedia}]);
            },20)
        },

        init : function() {
            $(window).trigger('scroll');
        }
    };
})(jQuery);

$(window).on({scroll: $.scrollVariables.scroll(e)});
$(document).ready($.resizeVariables.init());