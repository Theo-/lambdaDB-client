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
        me[tableName] = table(tableName, _restService, null);
        return me[tableName];
    }.bind(this);

    this.tables = function() {
        return database('', _restService).tables();
    }

    this.raw = function(query) {
        return raw(query, _restService);
    }

    this.create = function() {
        return database(_restService.databaseName, _restService).create();
    }

    this.drop = function() {
        return database(_restService.databaseName, _restService).drop();
    }

    this.me = function() {
        return _restService.get('/me');
    }

    this.database = function(databaseName) {
        _restService.databaseName = databaseName;
        return this;
    }

    this.databases = function() {
        return database('', _restService).list();
    }

    this.template = template(_restService);

    return this;
}

module.exports = lambdaClient;