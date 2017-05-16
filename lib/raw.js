/**
 * Execute raw query
 * lambdadb.raw('QUERY')
 */
module.exports = function(raw, restService) {
    return restService.post('/', {
        query: raw
    })
}