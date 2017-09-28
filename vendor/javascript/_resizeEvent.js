var resizeEvent = {
    var: {
        rdWindow: {
            width: 0,
            height: 0
        },
        mediaquery: {
            xxsMQ: 575,
            xsMQ: 767,
            smMQ: 991,
            mdMQ: 1199
        },
        datamedia: 'lgMQ'
    },
    init: function () {
        this.bindEvents();
        window.dispatchEvent(new Event('resize'));
    },

    bindEvents: function() {
        window.addEventListener('resize', this.throttle(this.resize.bind(this)), false);
    },

    throttle: function (fn, threshold, scope) {
        threshold || (threshold = 250);
        var last, deferTimer;

        return function () {
            var context = scope || this;
            var now = +new Date, args = arguments;

            if (last && now < last + threshold) {
                // Hold on to it
                clearTimeout(deferTimer);
                deferTimer = setTimeout(function () {
                    last = now;
                    fn.apply(context, args);
                }, threshold);
            } else {
                last = now;
                fn.apply(context, args);
            }
        };
    },
    resize: function () {
        var resizeStart = new CustomEvent("resizeStart", {detail: {'mediaQuery': this.var.datamedia}});
        window.dispatchEvent(resizeStart);
        this.var.rdWindow.width = window.outerWidth;
        this.var.rdWindow.height = window.outerHeight;
        this.checkmediaquery();
        var resizeEnd = new CustomEvent("resizeEnd", {detail: {'mediaQuery': this.var.datamedia}});
        window.dispatchEvent(resizeEnd);
    },

    checkmediaquery: function () {
        if (this.var.rdWindow.width <= this.var.mediaquery.xxsMQ) {
            this.var.datamedia = 'xxsMQ';
        } else if (this.var.rdWindow.width <= this.var.mediaquery.xsMQ &&
            this.var.rdWindow.width >= this.var.mediaquery.xxsMQ + 1) {
            this.var.datamedia = 'xsMQ';
        } else if (this.var.rdWindow.width <= this.var.mediaquery.smMQ &&
            this.var.rdWindow.width >= this.var.mediaquery.xsMQ + 1) {
            this.var.datamedia = 'smMQ';
        } else if (this.var.rdWindow.width <= this.var.mediaquery.mdMQ &&
            this.var.rdWindow.width >= this.var.mediaquery.smMQ + 1) {
            this.var.datamedia = 'mdMQ';
        } else {
            this.var.datamedia = 'lgMQ';
        }
    }
};

document.addEventListener("DOMContentLoaded", resizeEvent.init());