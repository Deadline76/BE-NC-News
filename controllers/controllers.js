const { selectTopics, selectArticleById, selectAllArticles, selectCommentsByArticle, insertComment } = require('../models/models.js')
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

const getCommentsByArticle = (req, res, next) => {
    const { article_id } = req.params
 
     selectCommentsByArticle(article_id).then(comments => {
         res.status(200).send({ msg: comments})
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
  .catch(err => {
      next(err)
    })
}


const postCommentToArticle = (req, res, next) => {
    const newComment = req.body
    const {article_id} = req.params
    
    insertComment(newComment, article_id).then((comment) => {
        
        res.status(201).send({ comment })
        })
        .catch(err => {
            next(err)
        })
}



module.exports = { getTopics, getEndpoints, getArticleById, getArticles, getCommentsByArticle, postCommentToArticle }