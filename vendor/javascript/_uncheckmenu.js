var uncheckmenu = {
    var : {
        scope: document.getElementById('menu').children,
        target: document.getElementById('show-menu')
    },
    init: function() {
        this.bindEvents();
    },

    bindEvents: function() {
        for (var i = 0; i < this.var.scope.length; i++) {
            if(this.var.scope[i].tagName === 'LI') {
                this.var.scope[i].addEventListener("click", function (event) {
                    uncheckmenu.var.target.checked = false;
                });
            }

        }
    }
};

document.addEventListener("DOMContentLoaded", uncheckmenu.init());