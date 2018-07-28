'use strict';

const assert = require('assert');

describe('Rules', function() {
    describe('Advert', function() {

        afterEach(function() {
            sessions.reset();
        });

        it('known advert', function() {
            // Setup
            const session = new Session(activeTab, {});
            sessions.create(activeTab, session); 
            const request = new TestRequest('https://doubleclick.net/t/advert.webm');
            const result = engine.processRequest(request);

            // Checks
            assert.strictEqual(true, result.isAdvert, "Expected request to be classified as an advert");
            assert.strictEqual(true, result.block, "Expected request to be blocked");
            assert.strictEqual(session.data['advert-count'], 1);
        });

        it('generic advert', function () {
            // Setup
            const session = new Session(activeTab, {});
            sessions.create(activeTab, session);
            const request = new TestRequest('https://ad.server.com/asdfasdr/asdf.js');
            const result = engine.processRequest(request);

            // Checks
            assert.strictEqual(true, result.isAdvert, "Expected request to be classified as an advert");
            assert.strictEqual(true, result.block, "Expected request to be blocked");
            assert.strictEqual(session.data['advert-count'], 1);
        });

        it('not a known advert', function() {
            // Setup
            const session = new Session(activeTab, {});
            sessions.create(activeTab, session); 
            const request = new TestRequest('http://i.bbc.co.uk/media/a234gasd0234.png');
            const result = engine.processRequest(request);

            // Checks
            assert.strictEqual(false, result.isAdvert, "Expected request to not be classified as an advert");
            assert.strictEqual(false, result.block, "Expected request to not be blocked");
        });
    });

    describe('Tracker', function () {

        afterEach(function () {
            sessions.reset();
        });

        it('known tracker', function () {
            // Setup
            const session = new Session(activeTab, {});
            sessions.create(activeTab, session);
            const request = new TestRequest('http://edigitalsurvey.com/pixel.png');
            const result = engine.processRequest(request);

            // Checks
            assert.strictEqual(true, result.isTracker, "Expected request to be classified as a tracker");
            assert.strictEqual(true, result.block, "Expected request to be blocked");
            assert.strictEqual(session.data['tracker-count'], 1);
        });

        it('not a known tracker', function () {
            // Setup
            const session = new Session(activeTab, {});
            sessions.create(activeTab, session);
            const request = new TestRequest('http://i.bbc.co.uk/media/a234gasd0234.png');
            const result = engine.processRequest(request);

            // Checks
            assert.strictEqual(false, result.isTracker, "Expected request to not be classified as a tracker");
            assert.strictEqual(false, result.block, "Expected request to not be blocked");
        });
    });
});
