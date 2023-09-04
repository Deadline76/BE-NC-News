const express = require('express');
const app = express();
const { getTopics, 
        getEndpoints, 
        getArticleById, 
        getArticles, 
        getCommentsByArticle, 
        patchArticleVotes,
        postCommentToArticle,
        getUsers,
        removeComment } = require('./controllers/controllers.js');

const cors = require('cors')

app.use(cors())

app.use(express.json())

app.get('/api', getEndpoints)

app.get('/api/topics', getTopics);

app.get('/api/articles/:article_id', getArticleById)

app.get('/api/articles/:article_id/comments', getCommentsByArticle)

app.get('/api/articles', getArticles)

app.get('/api/users', getUsers)

app.patch('/api/articles/:article_id', patchArticleVotes)

app.delete('/api/comments/:comment_id', removeComment)

app.post('/api/articles/:article_id/comments', postCommentToArticle)



app.use((err, req, res, next) => {
    if (err.status === 404 || err.code === '23503' ) {
        res.status(404).send({ msg: err.msg || 'Not Found' })
    } else {
        next(err)
    }
})

app.use((err, req, res, next) => {
    if (err.status === 400 || err.code === '22P02' || err.code === '23502') {
        res.status(400).send({ msg: err.msg || 'Bad request'})
    } else {
        next(err)
    }
})

app.use((err, req, res, next) => {
    res.status(500).send({ msg: 'Internal Server Error'})
})


module.exports = app;