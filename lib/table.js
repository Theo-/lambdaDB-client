var _ = require('underscore');

/**
 * The structure returned by 
 * lambdadb.table('tablename')
 */
module.exports = function(_tableName, _restService, databaseName) {
    var table = this.tableName = _tableName;
    var restService = this.restService = _restService;

    this.insert = function(object) {
        var keys = _.keys(object);
        var values = _.values(object);

        var columns = _.reduce(keys, function(memo, key) {
            return memo + key + ',';
        }, '');

        columns = columns.slice(0, -1);

        var values = _.reduce(values, function(memo, value) {
            if(typeof value == 'string') {
                value = '\'' + value + '\'';
            }

            return memo + value + ',';
        }, '');

        values = values.slice(0, -1);

        var queryString = 'INSERT INTO ' + tableName + ' (' + columns + ') VALUES(' + values + ')';
        return restService.post('/', {
            query: queryString
        })
    }

    this.describe = function() {
        if(!!databaseName) {
            return restService.get('/describe/' + databaseName + '/' + tableName);
        }
        return restService.get('/describe/' + tableName);
    }

    return this;
}