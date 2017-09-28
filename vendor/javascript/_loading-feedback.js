var loadingFeedback = {
    var: {
        triggerButton : document.querySelectorAll("[data-pm-action='loading']"),
        fullscreenSpinnerID: 'toogle'
    },

    init: function () {
        this.bindEvents();
    },

    bindEvents: function() {
        for (var i = 0; i < this.var.triggerButton.length; i++) {
            this.var.triggerButton[i].addEventListener("click", function(event) {
                loadingFeedback.addLoading(event.currentTarget,event.currentTarget.dataset.pmType);
            }, false);
        }
        document.getElementById(this.var.fullscreenSpinnerID).addEventListener("click", function(event) {
            loadingFeedback.addLoading(event.currentTarget,'fullscreen');
        }, false);
    },

    addLoading: function(evt,type) {
        switch (type) {
            case 'inline':
                evt.classList.toggle('loading');
                break;
            case 'fullscreen':
                document.getElementById(this.var.fullscreenSpinnerID).classList.toggle('loading');
                break;
        }
    }

};

document.addEventListener("DOMContentLoaded", loadingFeedback.init());