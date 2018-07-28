/*
 * A mock request class, to create fake website requests that allow for more complex testing.
*/

class TestRequest {
    constructor(url, tab=1) {
        // TODO: Update to support more of the request data that chrome sends.
        this.url = url;
        this.tabId = tab;
    }
}