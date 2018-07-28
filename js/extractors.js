'use strict';

// Extractor aggregator
var extractor = (function() {
    var _extractor = {};

    // Dictionary mapping data => extractor
    var _list = {};

    _extractor.register = function(extractor) {
        for (var dataName in extractor.dataList) {
            if (extractor.dataList.hasOwnProperty(dataName)) {
                var element = extractor.dataList[dataName];

                if(element in _list)
                    throw Error('Extractor already exists for data:' + element);
                else
                    _list[element] = extractor;
            }
        }
    }

    _extractor.get = function(name, request, data, session) {
        if (name in data)
            return new ExtractorResult(true, true);

        if (name in _list) {
            var res = _list[name].get(name, request, data, session);
            return new ExtractorResult(res, false);
        }

        throw Error('Could not extract data named: "' + name + '"');
    }
    
    return _extractor;
})();

// Extractor Object
var Extractor = function() {
    this.dataList = [];
    this.doWork = null;

    this.register = function() {
        extractor.register(this);
    }

    this.get = function(name, request, data, session) {
        if (this.doWork != null)
           var result = this.doWork(name, request, data, session);

        return result;
    }
};

var ExtractorResult = function(success=true, cached=false) {
    this.success=success;
    this.cached=cached;
}