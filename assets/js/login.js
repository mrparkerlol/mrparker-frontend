document.getElementById("loginSubmit").onclick = function() {
    sendAsyncRequest("POST", "/api/login", "username=" + document.getElementById("username").value + "&password=" + document.getElementById("password").value, function(h) {
        if (h.readyState == 4) {
            if (h.status == 200) {
                window.location.href = "/home";
            } else if (h.status == 403) {
                let errField = document.getElementById("err");
                errField.innerText = "Incorrect username/password";
                errField.setAttribute("style", "display:block; color:red;");
            }
        }
    });
}