'use strict';

chrome.webRequest.onBeforeRequest.addListener(
  function(info) {

    var result = engine.processRequest(info);

    if (result.score < 80 && !result.block) {
      console.log("Allowing Unknown URL: " + info.url);
      console.log("Rules: ");
      console.log("Score: " + result.score);
    }

    if (result.block) {
      return { redirectUrl: "javascript:" };
    } else if (result.redirect) {
      return { redirectUrl: result.redirectURL };
    }
  },
  // filters
  {
      urls: ["<all_urls>"]
  },
  // extraInfoSpec
  ["requestBody", "blocking"]
);

chrome.tabs.onUpdated.addListener(
  function(tabId, changeInfo, tab) {
    if (changeInfo.url) {
      var urlData = {};
      urlExtractor.splitURL(changeInfo.url, urlData);

      // Check to see if domain has changed
      // Could just be different page on same site, etc.
      var session = sessions.get(tabId);
      if (session) {
        // TODO: change to endsWith to catch subdomains?
        // aka changing from test.com to sub.test.com
        if (urlData['url-host'] == session.data['url-host']) {
          return;
        }
      }

      sessions.create(tabId, new Session(tab, urlData));
    }
  }
);

chrome.tabs.onRemoved.addListener(
  function(tabId, info) {
    sessions.delete(tabId);
  }
);

var activeTab = null;
chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
  activeTab = tabs[0].id;
});

chrome.tabs.onActivated.addListener(
  function(info) {
    // todo: set badge, update popup html.
    var session = sessions.get(info.tabId);

    activeTab = info.tabId;

    badge.updateIcon(session);
    messenger.send({type:"session", session:session});
  }
);

