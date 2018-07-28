var vm = require("vm");
var fs = require("fs");
var path = require("path");

var alreadyRan = [];

module.exports = function(file) {
    var newPath = path.join(__dirname, "..", file);
    var newPath = path.resolve(newPath);

    if (alreadyRan.indexOf(newPath) == -1) {
        var data = fs.readFileSync(newPath);
        vm.runInThisContext(data.toString(), newPath);
        alreadyRan.push(newPath);
    }
}