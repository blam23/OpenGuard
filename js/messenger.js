
var messenger = (function(name) {
    var _messenger = {};
    _messenger.callback = null;
    
    _messenger.register = function(callback) {
        this.callback = callback
    }

    _messenger.send = function(message) {
        if (this.callback) {
            this.callback(message);
        }
    }

    return _messenger;
})();