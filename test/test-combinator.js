'use strict';

const assert = require('assert');

describe('Combinator', function() {
    describe('grade', function() {
        it('grade checks', function() {
            const scores = [
                -10, 0,  10, 20, 30, 40, 50, 60, 70, 80, 90, 100,110
            ];
            const expectedScores = [
                "U","U","U","U","U","F","F","D","C","B","A","A","A"
            ];

            for (const key in scores) {
                const grade = combinator.grade(scores[key]);
                const expected = expectedScores[key];
                assert.strictEqual(expected, grade);    
            }

            assert.strictEqual(combinator.grade(-10234923412342), "U");
            assert.strictEqual(combinator.grade(10234923412342), "A");
        });
    });
    describe('resolve', function() {
        it('resolution score checks', function() {
            const scores = [
                100,90,80,70,60,50,51
            ];
            const expected = 71;

            const results = [];

            for (const key in scores) {
                const score = scores[key];
                results.push(new RequestResult(false, score, null, null));
            }

            let resolved = combinator.resolve(results);
            resolved = Math.floor(resolved);
            assert.strictEqual(expected, resolved);
        });
    });
});