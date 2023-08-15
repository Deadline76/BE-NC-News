const { selectTopics } = require('../models/topics.models.js')
const fs = require('fs').promises
const path = require('path')


const getEndpoints = (req, res, next) => {
   
    return fs.readFile(path.join(__dirname, '../endpoints.json'), 'utf-8')
        .then(contents => {
            const endpoints = JSON.parse(contents)
            res.status(200).send(endpoints)
    })
    .catch(next)
}

const getTopics = (req, res, next) => {

    selectTopics()
        .then((topics) => {
            res.status(200).send({ topics })
    })
    .catch(next)
}






module.exports = { getTopics, getEndpoints }