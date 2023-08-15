const db =require('../db/connection.js')
const fs = require('fs').promises
const path = require('path')

const readEndpoints = () => {
    return fs.readFile(path.join(__dirname, '../endpoints.json'), 'utf-8')
        .then(contents => {
            return JSON.parse(contents)
    })
}

const selectTopics = () => {
    return db
        .query('SELECT * FROM topics;').then((result) => {
    
            return result.rows
    })
}


module.exports = { selectTopics, readEndpoints }