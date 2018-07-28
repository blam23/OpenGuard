'use strict';

var combinator = (function() {
    var _combinator = {};

    _combinator.grades = {
        100: "A", // todo: AStar?
        90:  "A",
        80:  "B",
        70:  "C",
        60:  "D",
        50:  "F",
        40:  "F", // todo: E?
    };

    _combinator.UNGRADED = "U";

    _combinator.resolve = function(requestList) {
        // TODO: Needs to be heavily biased towards "main" request.
        // aka: dodgy.website loads assets from trusted CDNs, etc.
        //  and is therefore trusted overall!

        var totalScore = 0;
        var lowestScore = null;
        var scoreCount = 0;

        for (var key in requestList) {
            var score = requestList[key].score;
            totalScore += score;

            if (lowestScore == null || lowestScore > score) {
                lowestScore = score;
            }
            scoreCount++;
        }

        //console.log("Total Score: %d\t Scores: %d", totalScore, scoreCount);

        var avgScore = totalScore / scoreCount;
        var resolved = avgScore;

        if(lowestScore < 50) {
            resolved -= (50 - lowestScore);
        }

        return resolved;
    }

    _combinator.grade = function(score) {

        if (score >= 100) {
            return this.grades[100];
        }

        var nearest = Math.floor(score / 10) * 10;

        if (nearest in this.grades)
            return this.grades[nearest];

        return this.UNGRADED;
    }

    return _combinator;
})();