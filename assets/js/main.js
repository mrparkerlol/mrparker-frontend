/*if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js', { scope: '/' });
}*/

let w = window, d = document, loc = w.location;
let prs = JSON.parse;
let sendAsyncRequest = function(m,u,o,f) {
    var h = new XMLHttpRequest();
    h.open(m, u, true);
    if (m == "POST") { h.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); }
    h.addEventListener("readystatechange", function() { f(h); });
    h.send(o);
}
let navClickHandler = function(e) { 
    let b = e.button, url = this.getAttribute("url");
    if (b != 2 && b != 3 && b != 4) {
        if (b != 1) {
            w.location = url;
            return;
        }
        open(url);
    }
}
let addClickListeners = function() {
    let ele = d.getElementsByTagName("click");
    for (let i = 0; i < ele.length; i++) {
        let e = ele[i];
        let url = e.getAttribute("url");
        if (loc.pathname != url) {
            e.addEventListener("click", navClickHandler);
            e.addEventListener("auxclick", navClickHandler);
        } else { e.setAttribute("class", "defaultCursor"); }
        if (loc.pathname == url && e.parentElement != d.getElementById("nav-header")) {
            e.setAttribute("class", "underline defaultCursor");
        }
    }
}

let cat404 = function() {
    let cat404 = d.getElementById("cat404")
    if (cat404) {
        sendAsyncRequest("GET", "https://api.thecatapi.com/v1/images/search", null, function(h) {
            if (h.readyState == 4 && h.status == 200) {
                cat404.setAttribute("src", prs(h.responseText)[0].url);
            }
        });
    }
}

w.addEventListener("load", () => {
    addClickListeners();

    if (d.getElementById("cat404")) {
        cat404();
    }
});