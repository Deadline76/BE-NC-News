const { selectTopics, readEndpoints } = require('../models/topics.models.js')


const getEndpoints = (req, res, next) => {
    console.log('controller 1')
    readEndpoints ()
        .then(endpoints => {
            console.log('controller 2')
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