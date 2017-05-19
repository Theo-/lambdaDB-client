var table = require('./table.js');

module.exports = function(databaseName, _restService) {
    var restService = _restService;

    this.list = function() {
        return restService.get('/me/db');
    }

    this.tables = function() {
        return restService.get('/db/describe/tables');
    }

    this.table = function(tableName) { 
        return table(tableName, _restService);
    }

    this.create = function() {
        return restService.post('/me/db', {
            name: databaseName
        })
    }

    this.drop = function() {
        return restService.get('/db/drop');
    }

    return this;
}