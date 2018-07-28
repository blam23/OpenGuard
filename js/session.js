'use strict';

var sessions = (function() {
    var _sessions = {};
    var _sessionList = {};

    _sessions.get = function(tabId) {
        if (tabId in _sessionList) {
            return _sessionList[tabId];
        } else {
            return null;
        }
    }

    _sessions.create = function(tabId, session) {
        if (tabId in _sessionList) {
            // new session w. same tab -> delete old
            this.delete(tabId);
        }
        _sessionList[tabId] = session;
    }

    _sessions.delete = function(tabId) {
        _sessionList[tabId] = null;
        delete _sessionList[tabId];
    }

    _sessions.reset = function() {
        _sessionList = {};
    }

    return _sessions;
})();

var Session = function(tab, data) {
    this.tab = tab;
    this.mainRequest = null;
    this.data = data;
    this.requests = [];
    this.results = [];
    this.score = null;
    this.oldScore = 0;
    this.grade = null;
    this.changed = false;

    this.addResult = function(result) {
        // TODO: Some sort of limit / culling:
        //  Sites like facebook will have thousands and thousands of requests
        //   due to dynamic loading.
        //  Long sessions -> lots of requests to process each time a new one 
        //   is added!
        this.results.push(result);
        this.score = combinator.resolve(this.results);

        var changed = Math.abs(this.score - this.oldScore) > 5;

        //console.log("[Session Update] URL: '%s'\tScore: %d", this.data["url-host"], this.score);

        if (changed) {
            this.changed = true;
            this.oldScore = this.score;
        }
        
        if (changed && activeTab == this.tab.id) {
            badge.updateIcon(this);
            messenger.send({type:"update"});
        }
    }

    this.getGrade = function(result) {
        if (this.grade == null || this.changed) {
            this.grade = combinator.grade(this.score);
            this.changed = false;
        }
        return this.grade;
    }
}