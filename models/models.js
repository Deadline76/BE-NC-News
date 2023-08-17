const db =require('../db/connection.js')


const selectTopics = () => {
    return db
        .query('SELECT * FROM topics;').then((result) => {
    
            return result.rows
    })
}

const selectArticleById = (article_id) => {
    
    return db
        .query('SELECT * FROM articles WHERE article_id = $1;', [article_id])
        .then(result => {
            if (result.rows.length === 0) {
                return Promise.reject({status: 404, msg: 'article does not exist'})
            }
    
            return result.rows[0];
        })
    }

const selectAllArticles = (orderBy) => {
    
    return db
        .query(`
            SELECT
            articles.author, 
            articles.title, 
            articles.article_id, 
            articles.topic, 
            articles.created_at, 
            articles.votes, 
            articles.article_img_url, 
            CAST(COUNT(comments.comment_id) AS INTEGER) AS comment_count
            FROM articles
            LEFT JOIN comments ON articles.article_id = comments.article_id
            GROUP BY articles.article_id  
            ORDER BY articles.${orderBy} DESC;
            `)
        .then(({rows}) => {
      return rows
    })
  }

// const checkForArticle = (article_id) => {
//     return db
//         .query(`SELECT * FROM articles WHERE article_id = $1`, [article_id])
//         .then(({rows}) => {
//             if (rows.length === 0) {
//                 return Promise.reject({status: 404, msg: 'article does not exist'})
//             }
//         })
// }

const insertComment = (username, body, article_id) => {

    return db
        .query(
            `INSERT INTO comments (author, body, article_id)
             VALUES
             ($1, $2, $3)
             RETURNING *`,
             [username, body, article_id]
        )
        .then(({rows}) => {
            return rows[0]
        })
}
    

module.exports = { selectTopics, selectArticleById, selectAllArticles, insertComment }