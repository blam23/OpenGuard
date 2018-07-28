'use strict';

var ruleHelper = (function() {
    var helper = {};

    helper.markAsAdvert = function(session, data) {
        // Increment ad count.
        if ('advert-count' in session.data)
            session.data['advert-count']++;
        else
            session.data['advert-count'] = 1;

        data["is-advert"] = true;
    };

    helper.markAsTracker = function(session, data) {
        // Increment ad count.
        if ('tracker-count' in session.data)
            session.data['tracker-count']++;
        else
            session.data['tracker-count'] = 1;

        data["is-tracker"] = true;
    }


    return helper;
})();
    