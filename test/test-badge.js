'use strict';

const assert = require('assert');

describe('Badge', function() {
    describe('create', function() {
        it('getSvgFromGrade', function() {
            const data = {
                "A": "../svg/A.svg",
                "B": "../svg/B.svg",
                "D": "../svg/C.svg",
                "D": "../svg/D.svg",
                "F": "../svg/F.svg",
                "F": "../svg/F.svg",
                "U": null,
            }

            for (const grade in data) {
                const expected = data[grade];
                assert.strictEqual(expected, badge.getSvgFromGrade(grade));
            }
        });
        it('getPngFromGrade', function() {
            const data = {
                "A": "../png/A.png",
                "B": "../png/B.png",
                "D": "../png/C.png",
                "D": "../png/D.png",
                "F": "../png/F.png",
                "U": null,
            }

            for (const grade in data) {
                const expected = data[grade];
                assert.strictEqual(expected, badge.getPngFromGrade(grade));
            }
        });

        it('getIcon', function() {
            const data = {};
            const testSession = new Session(1, data);

            // Add two requests, should average to 90 score.
            testSession.addResult(new RequestResult(false, 100, null, null));
            testSession.addResult(new RequestResult(false, 80, null, null));
            assert.strictEqual(testSession.score, 90);

            const icon = badge.getIcon(testSession);
            assert.strictEqual("../png/A.png", icon);

            // currently no ungraded icon -> expect null.
            testSession.addResult(new RequestResult(false, -1000, null, null));
            const icon2 = badge.getIcon(testSession);
            assert.strictEqual(null, icon2);

            // invalid session -> expect null.
            const icon3 = badge.getIcon(null);
            assert.strictEqual(null, icon3);
        });

        // TODO: updateIcon test -> Requires browser level testing.
    });
});