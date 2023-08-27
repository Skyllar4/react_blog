import React from 'react';
import { PostCard } from './PostCard/PostCard';
import { getPosts } from '../../../services/post-service';

// interface PostCardProps {
//     postTitle: string,
//     content: string,
//     postImage?: string,
//     readonly author: string,
//     authorAvatar: string,
//     readonly publicationDate: string,
//     category: string
// }

export function PostList() {

    const [posts, setPostList] = React.useState<Array<any>>([]);

    React.useEffect(() => {

        const fetchPosts = async () => {
            setPostList((await getPosts()).data.postList);
        }
        fetchPosts();
        
    }, [])

    const postItems = posts.map(item => <PostCard
        key={item.id} 
        postId={item.id}
        postTitle={item.title} 
        content={item.content}  
        postImage='visa.jpeg'
        author='Андрей Андреев'
        authorAvatar=''
        publicationDate={item.created_date}
        category='Техника'
        />
        );

    return <ul>
            {postItems}
        </ul>

}
