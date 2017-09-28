function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.querySelectorAll('[data-pmtab]');
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.querySelectorAll('[data-pmtargetclass]');
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.querySelectorAll('[data-pmtab='+tabName+']').style.display = "block";
    evt.currentTarget.className += " active";
}

document.querySelectorAll("[data-pmtargetclass]").addEventListener("click", openTab());