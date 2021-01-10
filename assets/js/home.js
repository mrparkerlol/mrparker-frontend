 window.addEventListener("load", () => {
    let postTitle = document.getElementById("postTitle")
    let pageHeader = document.getElementById("pageHeader")
    let setHeaderText = function(originalText, text, element, delay) {
        element.append(text);
        setTimeout(function() {
            element.innerText = originalText
        }, delay)
    }

    document.getElementById("addPost").onclick = (function(){
        sendAsyncRequest("POST", "/api/admin/add_post", "postTitle=" + postTitle.value + "&postBody=" + document.getElementById("postBody").innerText, function(h) {
            if (h.readyState == 4) {
                if (h.status == 200) {
                    setHeaderText("New Post", " (Success!)", postHeader, 1000)
                    postTitle.value = ""
                    document.getElementById("postBody").innerText = ""
                    
                    return
                }
                setHeaderText("New Post", " (Failure!)", postHeader, 1000)
            }
        })
    })

    document.getElementById("postBody").onclick = (function(){
        if (this.innerText == "Post content") { this.innerText = "" }
    })

    document.getElementById("addPage").onclick = (function(){
        sendAsyncRequest("POST", "/api/admin/add_page", "pageTitle=" + document.getElementById("pageTitle").value + "&pageBody=" + document.getElementById("pageBody").innerText, function(h) {
            if (h.readyState == 4) {
                if (h.status == 200) {
                    setHeaderText("New Page", " (Success!)", pageHeader, 1000)
                    document.getElementById("pageTitle").value = ""
                    document.getElementById("pageBody").innerText = ""
                    return;
                }
                setHeaderText("New Page", " (Failure!)", pageHeader, 1000)
            }
        })
    })

    document.getElementById("pageBody").onclick = (function(){
        if (this.innerText == "Page content") { this.innerText = "" }
    })
 })