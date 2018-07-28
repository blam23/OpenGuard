'use strict';

(function() {
    
    // White Listing Rule.
    var whiteListRule = new Rule();
    whiteListRule.score = 50;
    whiteListRule.stop = true;
    whiteListRule.name = "URL/Whitelist";
    whiteListRule.doWork = function(request, data, session) {
        extractor.get('url-host', request, data, session);

        if (data['url-host'] == null) {
            console.log("null url-host for request:");
            console.log("request");
        }

        // Todo: Proper whitelist with caching
        var whitelisted = urlWhiteList.check(data['url-host']);
        if (whitelisted)
        {
            data['whitelisted'] = true;
            return new RuleResult(this.score, this.stop);
        }

        return new RuleResult();
    }

    var adListRule = new Rule();
    adListRule.score = 0;
    // TODO: Should this and tracker rule keep stopping further rules from running?
    adListRule.block = true;
    adListRule.stop = true;
    adListRule.name = "URL/Advert.List";
    adListRule.doWork = function(request, data, session) {
        extractor.get('url-host', request, data, session);

        var blacklisted = urlAdList.check(data['url-host']);

        if (blacklisted) {
            ruleHelper.markAsAdvert(session, data);
            return new RuleResult(this.score, this.stop, null, this.block);
        }

        return new RuleResult();
    }

    var trackerListRule = new Rule();
    trackerListRule.score = 0;
    trackerListRule.block = true;
    trackerListRule.stop = true;
    trackerListRule.name = "URL/Tracker.List";
    trackerListRule.doWork = function (request, data, session) {
        extractor.get('url-host', request, data, session);

        var blacklisted = urlTrackerList.check(data['url-host']);

        if (blacklisted) {
            ruleHelper.markAsTracker(session, data);
            return new RuleResult(this.score, this.stop, null, this.block);
        }

        return new RuleResult();
    }

    // Protocol Rule
    var protocolRule = new Rule();
    protocolRule.score = -5; // http
    protocolRule.unknownScore = -30; // unknown protocol
    protocolRule.stop = false;
    protocolRule.name = "URL/Protocol";
    protocolRule.doWork = function(request, data, session) {
        extractor.get('url-scheme', request, data, session);

        var protocol = data['url-scheme'];
        if (protocol == "chrome" || protocol == "chrome-extension") 
        {
            return new RuleResult(100, this.stop, "chrome");
        }
        if (protocol == "https")
        {
            // https is fine - don't hit
            return new RuleResult();
        }
        else if (protocol == "http")
        {
            // http is slightly less trustworthy
            return new RuleResult(this.score, this.stop, "unsecure");
        }
        else 
        {
            // any other protocol is quite untrustworthy!
            return new RuleResult(this.unknownScore, this.stop, "unknown");
        }
    }

    // Port Rule
    var portRule = new Rule();
    portRule.score = -30;
    portRule.stop = false;
    portRule.name = "URL/Port";
    portRule.doWork = function(request, data, session) {
        extractor.get('url-port', request, data, session);

        var port = data['url-port'];
        if (port)
        {
            // if port is defined in URL treat it as suspicious
            // aka: www.bbc.co.uk -> undefined port
            //      wwww.bad.com:9000 -> defined port -> suspicious
            return new RuleResult(this.score, this.stop, port);
        }

        return new RuleResult();
    }

    /*
     * 
     * Rule Registration - This order determines the order they run in.
     * Base Rules currently load before any other rules.
     * 
     */

    rules.register(protocolRule);
    rules.register(portRule); // Is a whitelisted domain with different port still whitelisted?
    rules.register(whiteListRule);
    rules.register(adListRule);
    rules.register(trackerListRule);

})();
    