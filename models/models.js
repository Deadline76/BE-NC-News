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


const selectCommentsByArticle = (article_id) => {
        return db
            .query(`
            SELECT *
            FROM articles
            WHERE article_id = $1`, [article_id])
            .then(({rows}) => {
                if (rows.length === 0) {
                    return Promise.reject({status: 404, msg: 'article does not exist'})
                }

        return db
            .query(`
                SELECT *
                FROM comments
                WHERE article_id = $1
                ORDER BY created_at DESC
                `, [article_id])
            })
            .then(({rows}) => {
                
              return rows
        })
    }

const selectAllArticles = (request) => {
    let sort_by = request.query.sort_by || 'created_at'
    let order_by = request.query.order_by || 'desc'
    let filter_by = request.query.filter_by
    let whereString = ''
    let queryTemplate = []

    let orderByClause = '';
    if (sort_by === 'comment_count') {
        orderByClause = `ORDER BY ${sort_by} ${order_by}`;
    } else {
        orderByClause = `ORDER BY articles.${sort_by} ${order_by}`;
    }

    if(filter_by) {
       whereString = `WHERE articles.topic = $1`
       queryTemplate.push(filter_by)
    }
    
    const acceptedSortBy = ['author', 'title', 'article_id', 'topic', 'created_at', 'votes', 'comment_count']
    if (!acceptedSortBy.includes(sort_by)) {
    return Promise.reject({status: 400, msg: 'Bad request'})
    }

    const acceptedorderBy = ['asc', 'desc']
    if (!acceptedorderBy.includes(order_by)) {
    return Promise.reject({status: 400, msg: 'Bad request'})
    }
    
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
            ${whereString}
            GROUP BY articles.article_id  
            ${orderByClause};
            `, queryTemplate)
        .then(({rows}) => {
      return rows
    })
  }

const selectUsers = () => {
    
    return db
        .query('SELECT * FROM users')
        .then(({rows}) => {
            return rows
        })
}

const insertComment = (newComment, article_id) => {
    
    const {username, body} = newComment
    
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

const updateArticleVotes = (article_id, inc_votes) => {
    
    if(!inc_votes) {
        return Promise.reject({status: 400, msg: 'Bad request'})
    }
    return db
        .query(`
            UPDATE articles 
            SET votes = votes + $2
            WHERE article_id = $1 
            RETURNING *`,
            [article_id, inc_votes]
            )
        .then(({rows}) => {
            if (rows.length === 0) {
                return Promise.reject({status: 404, msg: 'article does not exist'})
            }
            return rows[0]
        })
}

const deleteComment = (comment_id) => {
    return db
        .query(`
        DELETE FROM comments
        WHERE comment_id = $1
        RETURNING *
        `, [comment_id])
        .then(({rows}) => {
            if(rows.length === 0) {
                return Promise.reject({status: 400, msg: 'comment does not exist'})
            }
        })
}


module.exports = { selectTopics, 
                   selectArticleById,
                   selectAllArticles,
                   selectCommentsByArticle,
                   updateArticleVotes,
                   insertComment,
                   selectUsers,
                   deleteComment }