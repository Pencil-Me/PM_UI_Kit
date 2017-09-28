var scrollEvent = {
    var : {
        datamedia : 0
    },

    throttle : function(fn, threshold, scope) {
        threshold || (threshold = 250);
        var last, deferTimer;

        return function() {
            var context = scope || this;
            var now = +new Date, args = arguments;

            if (last && now < last + threshold) {
                // Hold on to it
                clearTimeout(deferTimer);
                deferTimer = setTimeout(function() {
                    last = now;
                    fn.apply(context, args);
                }, threshold);
            } else {
                last = now;
                fn.apply(context, args);
            }
        };
    },

    scroll : function() {
        this.var.datamedia = window.scrollY;
        var resizeStart = new CustomEvent("scrollEvent", {detail:{'scrollTop': this.var.datamedia}});
        window.dispatchEvent(resizeStart);
    },

    init : function() {
        this.bindEvents();
        window.dispatchEvent(new Event('scroll'));
    },

    bindEvents: function() {
        window.addEventListener('scroll', this.throttle(this.scroll.bind(this)), false);
    }
};

document.addEventListener("DOMContentLoaded", scrollEvent.init());