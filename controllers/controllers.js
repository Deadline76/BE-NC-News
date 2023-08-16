const { selectTopics, selectArticleById, selectAllArticles } = require('../models/models.js')
const fs = require('fs').promises
const path = require('path')
const endpointsFile = require('../endpoints.json')


const getEndpoints = (req, res, next) => {
   
    res.status(200).send(endpointsFile)
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
        res.status(200).send({ msg: article})
    })
    .catch(err => {
        next(err)
    })
}

const getArticles = (req, res, next) => {
    const orderBy = 'created_at'
    console.log('controller 1')

    selectAllArticles(orderBy).then(data => {
        console.log('controller 2')
        res.status(200).send({ articles: data })
    })
}



module.exports = { getTopics, getEndpoints, getArticleById, getArticles }