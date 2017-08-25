(function($){
    $.resizeVariables = {
        rdWindow : {
            timer: null,
            width: 0,
            height: 0
        },
        mediaquery : {
            xxsMQ: 575,
            xsMQ: 767,
            smMQ: 991,
            mdMQ: 1199
        },
        datamedia : 'lgMQ',

        checkmediaquery: function() {
            if($.resizeVariables.rdWindow.width <= $.resizeVariables.mediaquery.xxsMQ) {
                $.resizeVariables.datamedia = 'xxsMQ';
            } else if($.resizeVariables.rdWindow.width <= $.resizeVariables.mediaquery.xsMQ &&
                $.resizeVariables.rdWindow.width >= $.resizeVariables.mediaquery.xxsMQ+1) {
                $.resizeVariables.datamedia = 'xsMQ';
            } else if($.resizeVariables.rdWindow.width <= $.resizeVariables.mediaquery.smMQ &&
                $.resizeVariables.rdWindow.width >= $.resizeVariables.mediaquery.xsMQ+1) {
                $.resizeVariables.datamedia = 'smMQ';
            } else if($.resizeVariables.rdWindow.width <= $.resizeVariables.mediaquery.mdMQ &&
                $.resizeVariables.rdWindow.width >= $.resizeVariables.mediaquery.smMQ+1) {
                $.resizeVariables.datamedia = 'mdMQ';
            } else {
                $.resizeVariables.datamedia = 'lgMQ';
            }
        },

        resize : function(e) {
            var self = $(this);
            clearTimeout($.resizeVariables.rdWindow.timer);
            $.resizeVariables.rdWindow.timer = setTimeout(function () {
                self.trigger('resizeStart', [{'mediaQuery': $.resizeVariables.datamedia}]);
                $.resizeVariables.rdWindow.width = self.outerWidth();
                $.resizeVariables.rdWindow.height = self.outerHeight();
                $.resizeVariables.checkmediaquery();
                self.trigger('resizeEnd', [{'mediaQuery': $.resizeVariables.datamedia}]);
            },20)
        },

        init : function() {
            $(window).trigger('resize');
        }
    };
})(jQuery);

$(window).on({resize: $.resizeVariables.resize(e)});
$(document).ready($.resizeVariables.init());