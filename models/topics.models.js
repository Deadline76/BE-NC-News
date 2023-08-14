const db =require('../db/connection.js')


const selectTopics = () => {
    console.log('in models 1')

    return db.query('SELECT * FROM topics;').then((result) => )
}


module.exports = { selectTopics }