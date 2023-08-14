const express = require('express');
const app = express();
const { getTopics } = require('./controllers/topics-controllers')

app.use(express.json());



app.get('/api/topics', getTopics);

app.use((req, res) => {
    res.status(404).send({ msg: 'No Such Route'})
})

app.use((err, req, res, next) => {
    res.status(500).send({ msg: 'Internal Server Error'})
})


module.exports = app;