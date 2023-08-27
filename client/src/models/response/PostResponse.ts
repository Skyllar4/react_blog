export interface Post {
    id: number,
    author_id: number,
    category_id: number,
    title: string,
    content: string,
    created_date: string,
    likes_count: string | null,
    comments_count: Array<string> | null
}

export interface PostData {
    author: string,
    post: Post
}
