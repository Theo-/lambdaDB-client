var request = require('request'),
    chalk = require('chalk')
    path = require('path')
    os = require('os');

module.exports = function(config) {
    var host = config.host;
    var secretToken = config.secretToken;

    if(secretToken == 'system') {
        // Grab secret token from config directory
        try {
            var lambdadbPath = path.resolve(os.homedir(), '.lambdadb');
            var configSystem = require(path.resolve(lambdadbPath, 'credentials.json'));
            secretToken = configSystem.secretToken;
        } catch(e) {
            console.log(chalk.red('You set ') + chalk.underline('secretToken') + chalk.red(' to system but no config file found on this computer.'));
        }
    }

    var identifier = config.identifier;
    this.databaseName = config.database;
    var me = this;

    if(!host) {
        throw new Error('LambdaDB: Missing host in configuration object')
    }

    if(!secretToken) {
        throw new Error('LambdaDB: Missing secretToken is configuration object')
    }

    /** 
     * GET a request to the API
     * @param {URL} url to get
     */
    this.get = function(url) {
        return new Promise(function(resolve, reject) {
            request({
                method: 'GET',
                url: host + url,
                headers: {
                    'x-access-token': secretToken,
                    'x-database-name': me.databaseName
                }
            }, function(err, res) {
                if(err) {
                    return reject(err);
                }
                resolve(JSON.parse(res.body));
            })
        });
    }

    /**
     * POST a request to the API
     * @param {URL} url to post to
     * @param {JSON} body parameters
     */
    this.post = function(url, body) {
        return new Promise(function(resolve, reject) {
            request({
                method: 'POST',
                url: host + url,
                headers: {
                    'content-type': 'application/json',
                    'x-access-token': secretToken,
                    'x-database-name': me.databaseName,
                    'x-id': identifier
                },
                body: JSON.stringify(body)
            }, function(err, res) {
                if(err) {
                    return reject(err);
                }
                resolve(JSON.parse(res.body));
            })
        });
    }

    return this;
}