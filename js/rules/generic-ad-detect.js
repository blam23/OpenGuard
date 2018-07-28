'use strict';

(function() {

    /*
     * 
     * Generic Advert Request Detection
     * v 0.1
     * 
     */

    var adGenRule = new Rule();
    adGenRule.score = 0;
    adGenRule.block = true;
    adGenRule.stop = true;
    adGenRule.name = "URL/Advert.Generic";
    adGenRule.doWork = function(request, data, session) {
        extractor.get('url-host', request, data, session);

        var probAdvert = 0;

        var host = data['url-host'];

        // TODO: This
        if (host.startsWith("ad.")) {
            probAdvert += 90;
        }

        if (probAdvert >= 90) {
            console.log("Generic Advert Rule Hit. Probability: %d\tURL: %s", probAdvert, data['url']);
            ruleHelper.markAsAdvert(session, data);
            return new RuleResult(this.score, this.stop, null, this.block);
        }

        return new RuleResult();
    }

    // TODO: Add a rule order system?
    rules.register(adGenRule);

})();
    