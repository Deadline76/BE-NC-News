const express = require('express');
const app = express();
const { getTopics, getEndpoints, getArticleById, getArticles, postCommentToArticle } = require('./controllers/controllers.js');

app.use(express.json())

app.get('/api', getEndpoints)

app.get('/api/topics', getTopics);

app.get('/api/articles/:article_id', getArticleById)

app.get('/api/articles', getArticles)

app.post('/api/articles/:article_id/comments', postCommentToArticle)

app.use((err, req, res, next) => {
    if (err.status === 404) {
        res.status(404).send({ msg: err.msg })
    } else {
        next(err)
    }
})

app.use((err, req, res, next) => {
    if (err.status === 400 || err.code === '22P02') {
        res.status(400).send({ msg: 'Bad request'})
    } else {
        next(err)
    }
})

app.use((err, req, res, next) => {
    res.status(500).send({ msg: 'Internal Server Error'})
})


module.exports = app;