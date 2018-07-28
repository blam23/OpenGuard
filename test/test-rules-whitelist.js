'use strict';

const assert = require('assert');

describe('Rules', function() {
    describe('Whitelist', function() {
        
        beforeEach(function() {
            var session = new Session(activeTab, {});
            sessions.create(activeTab, session); 
        });

        afterEach(function() {
            sessions.reset();
        });

        it('whitelisted site', function() {
            // Setup
            const request = new TestRequest('https://www.bbc.co.uk/news/technology-41306387');
            const result = engine.processRequest(request);

            // Checks
            assert.strictEqual(false, result.block);
            assert.strictEqual(100, result.score, "Expected site to be whitelisted and get score of 100.");
        });
        it('whitelisted site - different subdomain', function() {
            // Setup
            const request = new TestRequest('http://i.bbc.co.uk/media/a234gasd0234.png');
            const result = engine.processRequest(request);

            // Checks
            assert.strictEqual(false, result.block);
            assert.strictEqual(95, result.score, "Expected site to be whitelisted and get score of 95 (http).");
        });
        it('non-whitelisted site', function() {
            // Setup
            const request = new TestRequest('http://badsite.com/#?1234!21');
            const result = engine.processRequest(request);

            // Checks
            assert.strictEqual(false, result.block);
            assert.strictEqual(true, result.score <= 50, "Expected site not to be whitelisted and score to be <= 50, actual: " + result.score);
        });
    });
});