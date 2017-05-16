var request = require('request'),
    table = require('./lib/table.js'),
    raw = require('./lib/raw.js'),
    restService = require('./lib/restService.js');

var lambdaClient = function(config) {
    var _restService = restService(config);

    this.table = function(tableName) {
        return table(tableName, _restService);
    }

    this.raw = function(query) {
        return raw(query, _restService);
    }

    return this;
}

module.exports = lambdaClient;