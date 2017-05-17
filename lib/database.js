var table = require('./table.js');

module.exports = function(databaseName, _restService) {
    var restService = _restService;

    this.list = function() {
        return restService.get('/database');
    }

    this.tables = function() {
        return restService.get('/describe/' + databaseName + '/tables');
    }

    this.table = function(tableName) { 
        return table(tableName, _restService, databaseName);
    }

    this.create = function(name) {
        return restService.post('/database/new', {
            name: name
        })
    }

    return this;
}