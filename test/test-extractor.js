'use strict';

const assert = require('assert');

describe('Extractor', function() {
    describe('Get', function() {
        it('No Extractor Registered', function() {
            assert.throws(() => extractor.get("!!!!!!!", {}, {}), /Could not extract data named\: \"\!\!\!\!\!\!\!\"/);
            assert.throws(() => extractor.get("", {}, {}), /Could not extract data named\: \"\"/);
            assert.throws(() => extractor.get(23, {}, {}), /Could not extract data named\: \"23\"/);
        });
        it('Valid Data', function() {
            const data = {};
            extractor.get("url-host", {"url":"https://test.test"}, data);
            assert.strictEqual(data["url-host"], "test.test");

            // should early-exit as it already exists
            extractor.get("url-host", {"url":"https://test.test"}, data);
            assert.strictEqual(data["url-host"], "test.test");
        });
    });
    describe('Register', function() {
        // Note that a positive test for registering is covered by 
        //  the "Get.Valid Data" test.
        it('Re-Register', function() {
            var testExtractor = new Extractor();
            testExtractor.dataList = [
                "url-path" // already registered by url extractor
            ];

            assert.throws(() => extractor.register(testExtractor), /Extractor already exists for data\:url-path/);
        });
    })
});