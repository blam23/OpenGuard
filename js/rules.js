'use strict';

// Rule aggregator
var rules = (function() {
    var _rules = {};
    var _ruleList = [];

    _rules.get = function() {
        return _ruleList;
    }

    _rules.register = function(rule) {
        _ruleList.push(rule);
    }
    
    return _rules;
})();

// Rule Object
var Rule = function() {
    this.name = "Unamed Rule.";
    this.doWork = null;

    this.run = function(request, data, session) {
        var result = null;
        
        if (this.doWork != null)
            result = this.doWork(request, data, session);

        return result;
    }
};

var RuleResult = function(score=0, stop=false, ammendum=null, block=false) {
    this.score = score;
    this.stop = stop;
    this.takeAction = score != 0 || block || stop;
    this.ammendum = ammendum;
    this.block = block;
}