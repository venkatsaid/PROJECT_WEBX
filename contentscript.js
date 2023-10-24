chrome.webRequest.onBeforeRequest.addListener(function(details) {
    // Get the page's URL.
    var url = details.url;

    // Call the Google Safe Browsing API to validate the site.
    var request = new XMLHttpRequest();
    request.open("GET", "https://safebrowsing.googleapis.com/v4/lookup?key=AIzaSyBwiYXak3p5dwGoNgWL5hR0nW0UW0hs82s&url=" + url);
    request.onload = function() {
        if (request.status === 200) {
            // The site is valid.
            chrome.tabs.update(details.tabId, { badgeText: "Valid" });
        } else {
            // The site is invalid.
            chrome.tabs.update(details.tabId, { badgeText: "Invalid" });
        }
    };
    request.send();
}, { urls: ["*://*/*"] });