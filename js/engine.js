'use strict';

var engine = (function() {
    var _engine = {};

    var BLOCK_REQUEST = true;
    var ALLOW_REQUEST = false;
    
    _engine.blockThreshold = 40;
    _engine.happyThreshold = 80;
    _engine.max = 100;
    _engine.nonDetermined = ALLOW_REQUEST;

    _engine.processRequest = function(request) {

        var data = {};
        extractor.get('url-host', request, data);

        var tabId = request.tabId;
        var discovered = false;

        if (tabId >= 0) {
            var session = sessions.get(tabId);
            if (session) {
                //session.addRequest(request);
            } else {
                // "discovered" tabs
                // pretty sure this is very unthread safe.
                // needs some sort of lock on session map.
                chrome.tabs.get(tabId, function(tab) {
                    sessions.create(tabId, new Session(tab, data));
                });
            }
        }
        var score = 50;
        var rulesHit = [];

        var allow = null;

        var ruleList = rules.get();
        for (var index in ruleList) {
            var rule = ruleList[index];
            var result = rule.run(request, data, session);

            if (result.takeAction) {
                score += result.score;
                var ruleName = rule.name;
                if (rule.ammendum != null) 
                    ruleName += "." + rule.ammendum;
                rulesHit.push({name: ruleName, score: result.score});

                if (result.block) {
                    allow = BLOCK_REQUEST;
                    break;
                }

                if (result.stop)
                    break;
            }
        }

        if (score > _engine.max) {
            score = _engine.max;
        }

        if (allow == null) {
            if (score >= _engine.happyThreshold)
                allow = ALLOW_REQUEST;
            else if(score <= _engine.blockThreshold)
                allow = BLOCK_REQUEST;
            else 
                allow = this.nonDetermined;
        }

        var result = new RequestResult(allow, score, data, rulesHit);

        if (tabId >= 0) {
            var session = sessions.get(tabId);
            if (session) {
                session.addResult(result);
            }
        }
        return result;
    }

    return _engine;
})();

// TODO: Convert to ES2015 class
var RequestResult = function(block, score, data, rulesHit) {
    this.block = block;
    this.score = score;
    this.isAdvert = false;
    this.isTracker = false;

    // Keep only specific data we might need, saves memory.
    // TODO: Worth it?
    if (data) {

        // Store the URL.
        if ("url" in data) {
            this.url = data["url"];
        }

        // Rule Behaviours
        if ("redirect" in data) {
            this.redirect = data["redirect"];
            this.redirectURL = data["redirectURL"];
        }
        
        // Classifiers
        if ("is-advert" in data) {
            this.isAdvert = true;
        }
        if ("is-tracker" in data) {
            this.isTracker = true;
        }
    }
    this.rulesHit = rulesHit;
}