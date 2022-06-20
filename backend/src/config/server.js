// Imports to set the server and encode url to forms
const port = 3003
const bodyparser = require('body-parser')
const express = require('express')
const server = express()

// Import CORS
const allowCors = require('./cors')

// Set imports
server.use(bodyparser.urlencoded({extended: true}))
server.use(bodyparser.json())
server.use(allowCors)

server.listen(port, function () {
    console.log(`BACKEND is running on port ${port}.`)
})

// Export of Modules
module.exports = server