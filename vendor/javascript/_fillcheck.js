var fillcheck = {
    var : {
        inputs : document.getElementsByTagName("input"),
        textareas : document.getElementsByTagName("textarea")
    },

    init : function() {
        this.bindEvents();
    },

    bindEvents: function(){
        var i;
        for (i = 0; i < this.var.inputs.length; i++) {
            this.var.inputs[i].addEventListener("keyup", this.checkIfFilled.bind(this), false);
        }
        for (i = 0; i < this.var.textareas.length; i++) {
            this.var.textareas[i].addEventListener("keyup", this.checkIfFilled.bind(this), false);
        }
    },

    checkIfFilled: function(event) {
        var value = event.path[0].value;
        if(value!="" && value!=undefined) {
            if(!event.path[0].classList.contains('filled')) {
                event.path[0].className += "filled";
            }
        } else {
            console.log('empty');
            this.removeClass(event.path[0],"filled");
        }
    },

    removeClass: function(ele,cls) {
        var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
        ele.className = ele.className.replace(reg,' ');
    }

};

document.addEventListener("DOMContentLoaded", fillcheck.init());