var Tabs = {

    var: {
        tablinks : document.querySelectorAll("[data-pmtargetclass]")
    },

    init: function() {
        this.bindEvents();
    },

    bindEvents: function() {
        for (var i = 0; i < this.var.tablinks.length; i++) {
            this.var.tablinks[i].addEventListener("click", function (event) {
                this.openTab(event, this.dataset.pmtargetclass)
            });
        }
    },

    openTab: function(evt, tabName) {
        var tabcontent, tablinks;

        tabcontent = document.querySelectorAll('[data-pmtab]');
        for (var i = 0; i < tabcontent.length; i++) {
            if(tabcontent[i].dataset.pmtab === tabName) {
                tabcontent[i].style.display = "block"
            } else {
                tabcontent[i].style.display = "none"
            }
        }

        tablinks = document.querySelectorAll('[data-pmtargetclass]');
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        evt.currentTarget.className += " active";
    }
};

document.addEventListener("DOMContentLoaded", Tabs.init());