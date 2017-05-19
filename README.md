# LambdaDB Client

This package is a client for the [LambdaDB](https://github.com/Theo-/lambdaDB) server.

## Secret Token

Get your secret token by running `lambdadb info` in your terminal:

![secretToken](assets/secretToken.png)

## Examples

### Insert into a table

```js
var lambdaDB = require('lambdadb')({
    host: 'localhost',
    secretToken: 'my secret token',
    database: 'databasename'
})

lambdaDB.table('users').insert({
    username: 'user',
    password: 'pass'
}).then(function(response) {
    console.log(response.data) // => logging the trace of the SQL query 
})
```

### Raw SQL queries

```js
var lambdaDB = require('lambdadb')({
    host: 'localhost',
    secretToken: 'my secret token',
    database: 'databasename'
})

lambdaDB.raw('SELECT * FROM users').then(function(response) {
    console.log(response.data) // => logging the rows
})
```

### Describe a table

```js
var lambdaDB = require('lambdadb')({
    host: 'localhost',
    secretToken: 'my secret token',
    database: 'databasename'
})

lambdaDB.table('users').describe().then(function(response) {
    console.log(response.data) // => logging the structure of the database
})
```