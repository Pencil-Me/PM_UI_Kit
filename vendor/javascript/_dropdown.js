var dropdown = {

    var: {
        scopeClass: 'select',
        appendHtml: '<div class="select-field"><div class="text">Select Item</div></div><div class="menu transition hidden"></div>'
    },

    init: function(){
        this.buildUI();
        this.bindEvents();
    },

    bindEvents: function(){
        window.addEventListener('click', this.openSelect.bind(this), false);
    },

    openSelect: function(event) {
        var i;
        if(event.path[1].className==='select-field' && event.path[0].className==='text') {
            for(i = 0; i < event.path[2].children.length; i++) {
                if(event.path[2].children[i].classList.contains('menu')) {
                    event.path[2].children[i].classList.toggle('hidden');
                }
            }
        }
        if(event.path[0].className==='item') {
            event.path[1].className += " hidden";
            var clickedvalue = event.path[0].innerHTML;
            for(i = 0; i < event.path[2].children.length; i++) {
                if(event.path[2].children[i].tagName === 'SELECT') {
                    for(ai = 0; ai < event.path[2].children[i].options.length; ai++) {
                        if (event.path[2].children[i].options[ai].innerHTML === clickedvalue) {
                            event.path[2].children[i].options[ai].selected = 'selected';
                        }
                    }
                }
                if(event.path[2].children[i].classList.contains('select-field')) {
                    for(ai = 0; ai < event.path[2].children[i].children.length; ai++) {
                        if(event.path[2].children[i].children[ai].className==='text') {
                            event.path[2].children[i].children[ai].innerHTML = clickedvalue;
                        }
                    }
                }
            }

        }
    },

    buildUI: function(){
        var selectscope = document.getElementsByClassName(this.var.scopeClass);
        var i,ai,aii, childselectscope = [];
        var selectoptions = [];
        var menu;

        //iterate all select menus
        for (i = 0; i < selectscope.length; i++) {
            childselectscope = selectscope[i].children;
            selectscope[i].innerHTML += this.var.appendHtml;

            //iterate children if there is a select
            selectoptions = [];
            for(ai = 0; ai < childselectscope.length; ai++) {
                if(childselectscope[ai].tagName === 'SELECT') {
                    selectoptions.push(childselectscope[ai]);
                }
                if(childselectscope[ai].classList.contains('menu')) {
                    menu = childselectscope[ai];
                }
            }

            for (ai = 0; ai < selectoptions.length; ai++) {
                for (aii = 0; aii < selectoptions[ai].options.length; aii++) {
                    menu.innerHTML += '<div class="item">' + selectoptions[ai].options[aii].innerHTML + '</div>';
                }
            }
        }

    }

};

document.addEventListener("DOMContentLoaded", dropdown.init());