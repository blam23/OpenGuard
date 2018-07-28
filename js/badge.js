'use strict';

var badge = (function() {
    var _badge = {};

    _badge.updateIcon = function(session) {
        var icon = this.getIcon(session);
        if (icon) {
            chrome.browserAction.setIcon({
                path: icon
            });
        }
    }

    _badge.getSvgFromGrade = function(grade) {
        if (grade == combinator.UNGRADED) {
            return null;
        }
        return "../svg/" + grade + ".svg";
    }

    _badge.getPngFromGrade = function(grade) {
        if (grade == combinator.UNGRADED) {
            // TODO: Ungraded icon
            return null;
        }
        return "../png/" + grade + ".png";
    }

    _badge.getIcon = function(session) {
        if (session && session.score) {
            var grade = session.getGrade();
            return this.getPngFromGrade(grade);
        }

        // TODO: unknown / grayed out icon
        return null;
    }
 
    return _badge;
})();
