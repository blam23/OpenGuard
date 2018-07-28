'use strict';

var urlExtractor = new Extractor();
urlExtractor.dataList = [
    "url",
    // Names based on wikipedia!
    "url-scheme",
    "url-host",
    "url-port",
    "url-path",
    "url-query",
    "url-fragment"
];
// Also used in monitor.js
urlExtractor.splitURL = function(url, data) {
       
        data["url"] = url;

        var hash = null;
        if (url.includes("#")) {
            // url such as https://a.com/!#https://a.com breaks the regex
            // so need to split it here.
            var parts = url.split("\#", 2);
            url = parts[0];
            hash = "#" + parts[1];
        }

        // TODO: replace with something I wrote.
        // Borrowed from https://stackoverflow.com/questions/736513/how-do-i-parse-a-url-into-hostname-and-path-in-javascript
        var match = url.match(/^(.*)\:\/\/(([^:\/?#]*)(?:\:([0-9]+))?)([\/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/);

        if(match) {
            data["url-scheme"] = match[1] == undefined ? null : match[1];
            data["url-host"] = match[3] == undefined ? null : match[3];
            data["url-port"] = match[4] == undefined ? null : match[4];
            data["url-path"] = match[5] == undefined ? null : match[5];
            data["url-query"] = match[6] == undefined ? null : match[6];

            if (hash) {
                data["url-hash"] = hash;
            } else {
                data["url-hash"] = match[7] == undefined ? null : match[7];
            }

            return true;
        }
        return false;
}
urlExtractor.doWork = function(name, request, data) {
    try {
        return this.splitURL(request.url, data);
    }
    catch (e) {
        console.log("URL Extractor Failure: " + e);
        return false;
    }
}
urlExtractor.register();
    