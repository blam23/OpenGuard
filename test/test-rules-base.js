'use strict';

const assert = require('assert');

describe('Rules', function() {
    describe('Port', function() {
        
        beforeEach(function() {
            var session = new Session(activeTab, {});
            sessions.create(activeTab, session); 
        });

        afterEach(function() {
            sessions.reset();
        });

        it('port present + whitelisted', function() {
            // Setup
            const request = new TestRequest('https://www.bbc.co.uk:9000/news/technology-41306387');
            const result = engine.processRequest(request);

            // Checks
            assert.strictEqual(false, result.block);
            assert.strictEqual(70, result.score);
        });
        it('port present + unknown', function () {
            // Setup
            const request = new TestRequest('https://fake.news:9000/top/story.js');
            const result = engine.processRequest(request);

            // Checks
            assert.strictEqual(true, result.block);
            assert.strictEqual(20, result.score);
        });
        it('no port + whitelisted', function() {
            // Setup
            const request = new TestRequest('https://i.bbc.co.uk/media/a234gasd0234.png');
            const result = engine.processRequest(request);

            // Checks
            assert.strictEqual(false, result.block);
            assert.strictEqual(100, result.score);
        });
        it('no port + unknown', function () {
            // Setup
            const request = new TestRequest('https://fake.news/top/story.js');
            const result = engine.processRequest(request);

            // Checks
            assert.strictEqual(false, result.block);
            assert.strictEqual(50, result.score);
        });
    });
    describe('Protocol', function () {

        beforeEach(function () {
            var session = new Session(activeTab, {});
            sessions.create(activeTab, session);
        });

        afterEach(function () {
            sessions.reset();
        });

        it('https + unknown', function () {
            // Setup
            const request = new TestRequest('https://unknown.site');
            const result = engine.processRequest(request);

            // Checks
            assert.strictEqual(false, result.block);
            assert.strictEqual(50, result.score);
        });
        it('http + unknown', function () {
            // Setup
            const request = new TestRequest('http://unknown.site');
            const result = engine.processRequest(request);

            // Checks
            assert.strictEqual(false, result.block);
            assert.strictEqual(45, result.score);
        });
        it('chrome site', function () {
            // Setup
            const request = new TestRequest('chrome://extensions');
            const result = engine.processRequest(request);

            // Checks
            assert.strictEqual(false, result.block);
            assert.strictEqual(100, result.score);
        });
        it('unknown protocol + whitelisted', function () {
            // Setup
            const request = new TestRequest('badger://bbc.co.uk/');
            const result = engine.processRequest(request);

            // Checks
            assert.strictEqual(false, result.block);
            assert.strictEqual(70, result.score);
        });
        it('unknown protocol + unknown site', function () {
            // Setup
            const request = new TestRequest('??://unknown.site/as45f?aa=3453&sdfg=345');
            const result = engine.processRequest(request);

            // Checks
            assert.strictEqual(true, result.block);
            assert.strictEqual(20, result.score);
        });
    });
});