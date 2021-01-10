let results = document.getElementById("results");
document.getElementById("searchbox").oninput = function(e) {
    let value = e.target.value;
    if (value.length >= 3) {
        sendAsyncRequest("POST", "/api/search", `search=${value}`, (httpResponse) => {
            if (httpResponse.readyState == 4) {
                results.innerHTML = "";
                if (httpResponse.status == 200) {
                    if (httpResponse.responseText == "null") {
                        results.innerHTML = "<p class=\"noselect\">Sorry, nothing was returned for your request, so here's a cat.</p><img src=\"\" id=\"cat404\" />";
                        cat404();
                    } else {
                        let parsed = JSON.parse(httpResponse.responseText);
                        for (let i = 0; i < parsed.length; i++) {
                            let arrItem = parsed[i], element = document.createElement("div");
                            element.innerHTML = `<click url="${arrItem.url}"><h1 id="title">${arrItem.title}</h1></click><p id="author">${arrItem.author}</p>`;
                            results.appendChild(element);
                        }
                        addClickListeners();
                    }
                } else if (httpResponse.status >= 500) {
                    results.innerHTML = "<p class=\"noselect\">The server had an issue, so here's a cat.</p><img src=\"\" id=\"cat404\" />";
                    cat404();
                }
            }
        })
    }
}