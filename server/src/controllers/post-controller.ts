import { Response, Request } from "express";
import * as postService from '../service/post-service.js';

export const getPosts = async (req: Request, res: Response) => {
        try {

            const postList = await postService.getPostList();

            return res.json({
                postList
            })

        } catch (e) {
            console.log(e);
            return res.status(500);
        }
}

export const getPostById = async (req: Request, res: Response) => {
       try {
        
            const post = await postService.getPostById(Number(req.query.id));
            const author = post.author.rows[0].user_name + ' ' + post.author.rows[0].user_surname;

            // if (!post) { // Проверить условие на срабатывание
            //     throw new Error(`Пост не найден`);
            // }

            return res.json({
                post: post.post.rows[0],
                author: author
            });



       } catch (e) {
        console.log(e);
        return res.status(500);
       }
}

export const createPost = async (req: Request, res: Response) => {
    try {

        const {author_id, category, title, content} = req.body;

        const createPost = await postService.createPost(author_id, category, title, content);

        return res.json({
            createPost
        })

    } catch (e) {
        console.log(e);
        res.status(404);
    }
}
