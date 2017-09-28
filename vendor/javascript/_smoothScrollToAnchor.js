var smoothScrollToAnchor = {

    init: function() {
        this.bindEvents();
    },

    bindEvents: function() {
        window.addEventListener('click', this.triggerScrollEvent.bind(this), false);
    },

    triggerScrollEvent: function(e) {
        if (e.target.hash && e.target.pathname.replace(/^\//, '') === location.pathname.replace(/^\//, '')) {
            e.preventDefault();
            var target = document.getElementById(e.target.hash.slice(1)),
                targetY = this.getElementY(target);
            this.smoothScroll(targetY);
        }
    },

    getElementY: function(element) {
        var y = element.offsetTop,
            node = element;
        while (node.offsetParent && node.offsetParent !== document.body) {
            node = node.offsetParent;
            y += node.offsetTop;
        }
        return y;
    },

    getCurrentY: function() {
        // Firefox, Chrome, Opera, Safari
        if (window.self.pageYOffset) {
            return window.self.pageYOffset;
        }
        // Internet Explorer 6 - standards mode
        if (document.documentElement && document.documentElement.scrollTop) {
            return document.documentElement.scrollTop;
        }
        // Internet Explorer 6, 7 and 8
        if (document.body.scrollTop) {
            return document.body.scrollTop;
        }
        return 0;
    },

    smoothScroll: function(targetY) {
        var startY = this.getCurrentY(),
            scrollBy = targetY - startY,
            speed = Math.abs(scrollBy / 100),
            increment = scrollBy / 25;

        // if close just jump
        if (Math.abs(scrollBy) < 100) {
            scrollTo(0, targetY);
            return;
        }
        // otherwise animate the scroll
        var intermediateY;
        for (var i = 0; i <= 25; i++) {
            intermediateY = Math.round(startY + i * increment);
            setTimeout("window.scrollTo(0, " + intermediateY + ")", Math.round(i * speed));
        }
    }
};

document.addEventListener("DOMContentLoaded", smoothScrollToAnchor.init());