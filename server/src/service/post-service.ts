import db from "../db.js";

export const getPostList = async () => {

    return (await db.query("SELECT * FROM posts LIMIT 10")).rows;

}

export const getPostById = async (id: number) => {

    const post = await db.query("SELECT * FROM posts WHERE id=$1", [id]);
    const author = await db.query('SELECT * FROM users WHERE id=$1', [post.rows[0].author_id]);

    return {
        post,
        author
    };

}

export const createPost = async (author_id: number, category: string, title: string, content: string) => {

    const createDate = new Date();
    /* 
        Приводим дату и время к значению,
        Которое можно записать в БД
        Формат YYYY-MM-DD HH:MM
        Минуты необходимо привести к строке, для использования padstart, чтобы получать минуты всегда в двухзначном формате
    */
    const dateForBD = createDate.toLocaleDateString().split('.').reverse().join('.') + ' ' + createDate.getHours() + ':' + String(createDate.getMinutes()).padStart(2, '0');

    const categoryId = await db.query("SELECT * FROM categories WHERE category_name=$1", [category]);
    const post = await db.query(`INSERT INTO posts (author_id, category_id, title, content, created_date) VALUES (${author_id}, ${categoryId.rows[0].id}, '${title}', '${content}', '${dateForBD}')`);

    return post;

}
