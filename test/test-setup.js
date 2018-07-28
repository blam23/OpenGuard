'use strict';

const dofile = require('../js/testHelpers/npmExec.js');

dofile('testHelpers/activeTab.js');
dofile('testHelpers/testRequest.js');
dofile('testHelpers/chromeStub.js');
dofile('whitelist/domains.js');
dofile('whitelist/whitelist.js');
dofile('extractors.js');
dofile('extractors/url.js'); 
dofile('engine.js');
dofile('rules.js');
dofile('rules/ruleHelper.js'); 
dofile('rules/baseRules.js'); 
dofile('rules/generic-ad-detect.js'); 
dofile('combinator.js'); 
dofile('session.js'); 
dofile('badge.js'); 
dofile('messenger.js'); 
