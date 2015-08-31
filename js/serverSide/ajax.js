var req;

function createAJAXObj() {
    try {
        return new XMLHttpRequest();
    } catch (er1) {
        try {
            return new ActiveXObject("Msxml3.XMLHTTP");
        } catch (er2) {
            try {
                return new ActiveXObject("Msxml2.XMLHTTP.6.0");
            } catch (er3) {
                try {
                    return new ActiveXObject("Msxml2.XMLHTTP.3.0");
                } catch (er4) {
                    try {
                        return new ActiveXObject("Msxml2.XMLHTTP");
                    } catch (er5) {
                        try {
                            return new ActiveXObject("Microsoft.XMLHTTP");
                        } catch (er6) {
                            return false;
                        }
                    }
                }
            }
        }
    }
}
function sendRequest(url, callback, postData) {
    req = createAJAXObj(), method = (postData) ? "POST" : "GET";
    if (!req) {
        return;
    }
    req.open(method, url, true);
    //req.setRequestHeader('User-Agent', 'XMLHTTP/1.0');
    if (postData) {
        req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    }
    req.onreadystatechange = function () {
        if (req.readyState !== 4) {
            return;
        }
        if (req.status !== 200 && req.status !== 304) {
            return;
        }
        callback(req);
    }
    req.send(postData);
}