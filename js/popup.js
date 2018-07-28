'use strict';

var popup = (function() {
    const MAX_URL_LENGTH = 40;
    var _popup = {};

    _popup.setSession = function(session) {
        this.currentSession = session;
    }

    _popup.generateResultTable = function() {
        const newTable = document.createElement("tbody");
        let hasUnknownResults = false;

        for (var i in this.currentSession.results) {
            var result = this.currentSession.results[i];

            if (result.score >= 60 || result.isAdvert || result.isTracker) {
                continue;
            }

            hasUnknownResults = true;

            const row = document.createElement("tr");
            
            const firstElem = document.createElement("td");

            let url = result.url;
            if (url.length > MAX_URL_LENGTH) {
                url = url.substring(0,MAX_URL_LENGTH-3) + "...";
            }
            firstElem.innerText = url;

            const secondElem = document.createElement("td");
            secondElem.innerText = result.score;

            row.appendChild(firstElem);
            row.appendChild(secondElem);
            newTable.appendChild(row);
        }
        
        if (hasUnknownResults) {
            this.resultTableBody.parentNode.replaceChild(newTable, this.resultTableBody);
            this.resultTableBody = newTable;
            this.resultDiv.className = "box";
        } else {
            this.resultDiv.className = "hidden";
        }
    }

    _popup.updateColours = function() {
        for (var i in this.backColourChanges) {
            if (this.backColourChanges.hasOwnProperty(i)) {
                var element = this.backColourChanges[i];
                element.style.backgroundColor = this.badgeColour;
            }
        }
    }

    _popup.updateCounts = function() {
        var adCount = 0;
        var trackerCount = 0;

        if ('advert-count' in this.currentSession.data) {
            adCount = this.currentSession.data['advert-count'];
        }

        if ('tracker-count' in this.currentSession.data) {
            trackerCount = this.currentSession.data['tracker-count'];
        }

        this.advertText.innerText = adCount;
        this.trackerText.innerText = trackerCount;
    }

    _popup.update = function() {
        if (!this.currentSession) {
            this.setSession(this.bg.sessions.get(this.bg.activeTab));
        }
        var score = this.currentSession.score
        this.scoreText.innerText = score;
        this.grade = this.currentSession.getGrade();
        this.badge = this.bg.badge.getSvgFromGrade(this.grade);
        this.badgeImage.alt = this.grade + " Rated";

        if (this.badge) {
            this.badgeImage.src = this.badge;
        }

        // TODO: Move colour into badge.js?
        this.badgeColour = "red";

        if (score >= 80) {
            this.badgeColour = "white"; // "#00ffb8";
            this.sessionType.innerText = "is safe.";
        } else if (score > 60) {
            this.badgeColour = "orange";
            this.sessionType.innerText = "is unknown.";
        } else if (score > 40) {
            this.badgeColour = "orangered";
            this.sessionType.innerText = "is unknown.";
        } else {
            this.sessionType.innerText = "is likely malicious!";
        }

        this.updateCounts();
        this.updateColours();
        this.generateResultTable();
    }

    _popup.onMessage = function(message) {
        if (message.type == "update") {
            _popup.update();
        }
    };

    _popup.init = function() {
        this.bg = chrome.extension.getBackgroundPage();
        this.bg.messenger.register(this.onMessage);

        this.resultDiv = document.getElementById("results");
        this.scoreText = document.getElementById("scoreText");
        this.trackerText = document.getElementById("trackerText");
        this.advertText = document.getElementById("advertText");
        this.sessionType = document.getElementById("sessionType");
        this.badgeImage = document.getElementById("badgeImage");
        this.resultTableBody = document.getElementById("resultTableBody");
        this.backColourChanges = document.getElementsByClassName("matchBackColour");
        this.body = document.body;

        this.update();
    }

    _popup.init();
})();