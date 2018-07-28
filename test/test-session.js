'use strict';

const assert = require('assert');

describe('Session', function() {
    describe('create', function() {
        it('variable check', function() {

            const data = {};
            const testSession = new Session({id:1}, data);
            assert.strictEqual(testSession.tab.id, 1);
            assert.strictEqual(testSession.data, data);
            assert.strictEqual(testSession.requests.length, 0);
            assert.strictEqual(testSession.results.length, 0);
            assert.strictEqual(testSession.score, null);
            assert.strictEqual(testSession.oldScore, 0);
            assert.strictEqual(testSession.oldScore, 0);
            assert.strictEqual(testSession.grade, null);
            assert.strictEqual(testSession.changed, false);

            data["url-host"] = "bbc.co.uk";
            assert.strictEqual(testSession.data, data);
        });
    });
    describe('addResult', function() {
        it('score and array check', function() {
            const data = {};
            const testSession = new Session(1, data);

            // Add two requests, should average to 70 score.
            testSession.addResult(new RequestResult(false, 50, null, null));
            testSession.addResult(new RequestResult(false, 60, null, null));
            testSession.addResult(new RequestResult(false, 70, null, null));
            testSession.addResult(new RequestResult(false, 80, null, null));
            testSession.addResult(new RequestResult(false, 90, null, null));
            testSession.addResult(new RequestResult(false, 100, null, null));
            assert.strictEqual(testSession.score, 75);
            assert.strictEqual(testSession.results.length, 6);

            testSession.addResult(new RequestResult(false, -100, null, null));
            assert.strictEqual(testSession.score, -100);
            assert.strictEqual(testSession.results.length, 7);
            
        });
    });
    describe('getGrade', function() {
        it('score and grade check', function() {
            const data = {};
            const testSession = new Session({id:1}, data);

            let changes = 0;
            messenger.register((m) => changes++);

            // Add two requests, should average to 90 score.
            testSession.addResult(new RequestResult(false, 100, null, null));
            testSession.addResult(new RequestResult(false, 80, null, null));
            assert.strictEqual(testSession.score, 90);

            // Test that 90 score gives an 'A'
            let grade = testSession.getGrade();
            assert.strictEqual(grade, 'A');

            // Add a bad result, the lowest score (if below 50) 
            //  is extra weighted and therefore we expect 50.
            testSession.addResult(new RequestResult(false, 30, null, null));
            assert.strictEqual(testSession.score, 50);

            grade = testSession.getGrade();
            assert.strictEqual(grade, 'F');

            assert.strictEqual(3, changes);
        });
        it('ungraded', function() {
            const data = {};
            const testSession = new Session(1, data);

            // Add two requests, should average to 90 score.
            testSession.addResult(new RequestResult(false, 0, null, null));
            assert.strictEqual(testSession.score, -50);

            // Test that -50 score gives a 'U'
            let grade = testSession.getGrade();
            assert.strictEqual(grade, 'U');


        });
        it('get, create, and delete', function() {

            
            assert.strictEqual(null, sessions.get(1));

            const data = {};
            const testSession = new Session({id:1}, data);
            const testSession2 = new Session({id:2}, data);
            sessions.create(1, testSession);
            sessions.create(2, testSession2);

            assert.strictEqual(testSession, sessions.get(1));
            assert.strictEqual(testSession2, sessions.get(2));

            sessions.create(2, testSession);
            assert.strictEqual(testSession, sessions.get(2));
        });
    });
});