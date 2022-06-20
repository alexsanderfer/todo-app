const restful = require('node-restful')
const mongoose = require('mongoose')
const { Schema } = mongoose;
// const mongoose = restful.mongoose

const todoScheme = new Schema({
    description: {type: String, require: true},
    done: {type: Boolean, require: true, default: false},
    createdAt: {type: Date, default: Date.now}
})

module.exports = restful.model('Todo', todoScheme)