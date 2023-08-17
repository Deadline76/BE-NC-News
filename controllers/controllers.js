const { selectTopics, selectArticleById, selectAllArticles, insertComment } = require('../models/models.js')
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

    selectAllArticles(orderBy).then(articles => {
        
        res.status(200).send({ articles })
    })
}
const validatePostComment = (req, res, next) => {
    const { username, body} = req.body
    if(!username || !body || typeof username !== 'string' || typeof body !== 'string') {
        return res.status(400).send({ msg: 'invalid post object'})
    }
    next()
}


const postCommentToArticle = (req, res, next) => {
    const { username, body} = req.body
    const {article_id} = req.params

    insertComment(username, body, article_id).then((comment) => {
        
        res.status(201).send({ comment })
        })
        .catch(err => {
            next(err)
        })
}


module.exports = { getTopics, getEndpoints, getArticleById, getArticles, postCommentToArticle, validatePostComment }