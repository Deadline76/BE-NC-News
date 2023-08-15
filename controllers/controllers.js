const { selectTopics, selectArticleById } = require('../models/models.js')
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

const getArticleById = (req, res, next) => {
    const { article_id } = req.params

    selectArticleById (article_id).then(article => {
        if(article) {
        res.status(200).send({ msg: article})
        } else {
           next({status: 404, msg: 'article does not exist'})
        }
    })
    .catch(err => {
        next({status: 400, msg: 'Invalid id'})
    })
}





module.exports = { getTopics, getEndpoints, getArticleById }