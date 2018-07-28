'use strict';

const assert = require('assert');

const splitURLCheck = function(url) {
    const data = {};
    const res = urlExtractor.splitURL(url, data);
    if (!res) {
        throw Error("Unable to split.");
    }
    return data;
}

describe('Extractor', function() {
    describe('URL', function() {

        it('host check', function() {
            
            // URLs given by Chrome will always be prefixed with a protocol
            //  such as https, http, etc.

            // TODO: Punycode decoder?

            const testCases = {
                "https://www.test.com":"www.test.com",
                "http://www.test.com":"www.test.com",
                "http://www.test.com:8000/terasedt?asdf=234#asdfasdf23?df=234":"www.test.com",
                "test://test.test":"test.test",
                "a://b.c":"b.c",
                "a://b":"b",
                "http://www.reddit.com/r/programming":"www.reddit.com",
                "http://www.bbc.co.uk/sport":"www.bbc.co.uk",
                "http://i.bbc.co.uk/iplayer":"i.bbc.co.uk",
                "https://www.xn--e1awd7f.com/":"www.xn--e1awd7f.com",

                // These will equate to the same website
                // xn--wxa is the unicode lambda symbol in punycode.
                "https://λ.pw":"λ.pw",
                "https://xn--wxa.pw/":"xn--wxa.pw",
                "https://xn--wxa.pw#23423":"xn--wxa.pw",
            };

            for (const url in testCases) {
                const expected = testCases[url];
                const domain = splitURLCheck(url)["url-host"];
                assert.strictEqual(expected, domain);
            }
        });

        it('scheme check', function() {
            const testCases = {
                "https://www.test.com":"https",
                "http://www.test.com":"http",
                "http://www.test.com:8000/terasedt?asdf=234#asdfasdf23?df=234":"http",
                "test://test.test":"test",
                "a://b.c":"a",
                "a://b":"a",
                "http://www.reddit.com/r/programming":"http",
                "http://www.bbc.co.uk/sport":"http",
                "http://i.bbc.co.uk/iplayer":"http",
                "https://www.xn--e1awd7f.com/":"https",

                // These will equate to the same website
                // xn--wxa is the unicode lambda symbol in punycode.
                "https://λ.pw":"https",
                "https://xn--wxa.pw/":"https",
            };

            for (const url in testCases) {
                const expected = testCases[url];
                const scheme = splitURLCheck(url)["url-scheme"];
                assert.strictEqual(expected, scheme);
            }
        });

        it('port check', function() {
            const testCases = {
                "https://www.test.com":null,
                "http://www.test.com:8080":"8080",
                "http://www.test.com:8000/terasedt?asdf=234#asdfasdf23?df=234":"8000",
                "test://test:123412341234":"123412341234",
                "http://localhost:20":"20",
                "a://b:c":null,
                "https://λ.pw":null,
                "https://xn--wxa.pw/":null,
            };

            for (const url in testCases) {
                const expected = testCases[url];
                const port = splitURLCheck(url)["url-port"];
                assert.strictEqual(expected, port);
            }
        });

        it('path check', function() {
            const testCases = {
                "https://www.test.com":"",
                "http://www.test.com:8000/terasedt?asdf=234#asdfasdf23?df=234":"/terasedt",
                "https://xn--wxa.pw":"",
                "https://xn--wxa.pw/":"/",
                "https://xn--wxa.pw#23423":"",
                "https://λ.pw":"",
                "https://λ.pw/λ/λ/λ/λ/":"/λ/λ/λ/λ/",
                "https://λ.pw/λ/λ/?λ/λ/#λ/λ/":"/λ/λ/",
                "https://λ.pw/λ/λ/#λ/λ/?λ/λ/":"/λ/λ/",
            };

            for (const url in testCases) {
                const expected = testCases[url];
                const path = splitURLCheck(url)["url-path"];
                assert.strictEqual(expected, path);
            }
        });

        it('query check', function() {
            const testCases = {
                "https://www.test.com":"",
                "http://www.test.com:8000/terasedt?asdf=234#asdfasdf23?df=234":"?asdf=234",
                "https://xn--wxa.pw":"",
                "https://xn--wxa.pw/":"",
                "https://xn--wxa.pw#23423":"",
                "https://λ.pw":"",
                "https://λ.pw/λ/λ/λ/λ/":"",
                "https://λ.pw/λ/λ/?λ/λ/":"?λ/λ/",
                "https://λ.pw/λ/λ/?λ/λ/#λ/λ/":"?λ/λ/",
                "https://λ.pw/λ/λ/#λ/λ/?λ/λ/":"",
            };

            for (const url in testCases) {
                const expected = testCases[url];
                const path = splitURLCheck(url)["url-query"];
                assert.strictEqual(expected, path);
            }
        });

        it('hash check', function() {
            const testCases = {
                "https://www.test.com":"",
                "http://www.test.com:8000/terasedt?asdf=234#asdfasdf23?df=234":"#asdfasdf23?df=234",
                "https://xn--wxa.pw":"",
                "https://xn--wxa.pw/":"",
                "https://xn--wxa.pw#23423":"#23423",
                "https://λ.pw":"",
                "https://λ.pw/λ/λ/λ/λ/":"",
                "https://λ.pw/λ/λ/?λ/λ/":"",
                "https://λ.pw/λ/λ/?λ/λ/#λ/λ/":"#λ/λ/",
                "https://λ.pw/λ/λ/#λ/λ/?λ/λ/":"#λ/λ/?λ/λ/",
            };

            for (const url in testCases) {
                const expected = testCases[url];
                const hash = splitURLCheck(url)["url-hash"];
                assert.strictEqual(expected, hash);
            }
        });

        it('bad url', function() {
            const testCase = "a";

            assert.throws(() => splitURLCheck(testCase), "Unable to split.");
        });
    });
});