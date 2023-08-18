const { selectTopics, 
        selectArticleById, 
        selectAllArticles, 
        selectCommentsByArticle, 
        updateArticleVotes,
        insertComment,
        selectUsers,
        deleteComment } = require('../models/models.js')
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
    const request = req

    selectAllArticles(request).then(articles => {
        res.status(200).send({ articles })
    })
  .catch(err => {
      next(err)
    })
}

const getUsers = (req, res, next) => {

    selectUsers ().then((users) => {
        res.status(200).send({users})
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

const patchArticleVotes = (req, res, next) => {
    const {article_id} = req.params
    const {inc_votes} = req.body

    updateArticleVotes (article_id, inc_votes).then(article => {
        res.status(200).send({article})
    })
    .catch(err => {
        next(err)
      })    
}

const removeComment = (req, res, next) => {
    const {comment_id} = req.params

    deleteComment(comment_id).then(() => {
        res.status(204).send()
    })
    .catch(err => {
        next(err)
    })
}


module.exports = { getTopics, 
                   getEndpoints, 
                   getArticleById, 
                   getArticles, 
                   getCommentsByArticle, 
                   patchArticleVotes,
                   postCommentToArticle,
                   getUsers,
                   removeComment }