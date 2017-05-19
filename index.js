var request = require('request'),
    table = require('./lib/table.js'),
    database = require('./lib/database.js'),
    raw = require('./lib/raw.js')
    template = require('./lib/template.js'),
    restService = require('./lib/restService.js');

var lambdaClient = function(config) {
    var _restService = restService(config);
    var me = this;

    me.db = {};

    this.t = this.table = function(tableName) {
        this[tableName] = table(tableName, _restService, null);
        return this[tableName];
    }.bind(this);

    this.raw = function(query) {
        return raw(query, _restService);
    }

    this.database = function(databaseName) {
        _restService.databaseName = databaseName;
        return me;
    }

    this.template = template(_restService);

    return this;
}

module.exports = lambdaClient;