module.exports = function(_restService) {
    var restService = _restService;

    this.fromFile = function(filePath) {
        var descriptor = require(filePath);
        return this.fromJSON(descriptor);
    }

    this.fromJSON = function(JSONTemplate) {
        return restService.post('/database/template', {
            template: JSONTemplate
        })
    }

    return this;
}