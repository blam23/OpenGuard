'use strict';

var urlWhiteList = (function() {
    var _whitelist = {};

    _whitelist.check = function(host) {
        
        // TODO: Optimise?
        // Try to find "proper" host (aka i.bbc.co.uk -> bbc.co.uk)
        //  then match against a hash set, should change time to O(1)
        //  for large whitelist would be quicker, not for small whitelist.
        for (var domain in whitelistDomains)
            if (host.endsWith(whitelistDomains[domain]))
                return true;

        return false;
    }
    
    return _whitelist;
})();


var urlAdList = (function() {
    var _blacklist = {};

    _blacklist.check = function(host) {
        
        for (var domain in adSites)
            if (host.endsWith(adSites[domain]))
                return true;

        return false;
    }
    
    return _blacklist;
})();

var urlTrackerList = (function () {
    var _blacklist = {};

    _blacklist.check = function (host) {

        for (var domain in trackerSites)
            if (host.endsWith(trackerSites[domain]))
                return true;

        return false;
    }

    return _blacklist;
})();
