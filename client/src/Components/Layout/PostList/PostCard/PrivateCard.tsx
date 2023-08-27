import React from 'react'
import { useParams } from 'react-router-dom';
import { Layout } from '../../Layout';
import { getPostById } from '../../../../services/post-service';
import Avatar from '@mui/material/Avatar';
import cl from './post-card.module.scss';
import { Post } from '../../../../models/response/PostResponse';

export function PrivateCard() {

    const params = useParams();

    const [post, setPost] = React.useState<Post | undefined>();
    const [author, setAuthor] = React.useState('');

    React.useEffect(() => {
        const fetchPost = async () => {
            const postData = (await getPostById(Number(params.id))).data;
            setPost(postData.post);
            setAuthor(postData.author)
        }
        fetchPost();
    }, []);

    return <Layout>
            <div className={cl.post_container}>
                <h2 className={cl.post_container__title}>{post?.title}</h2>
                <img className={cl.post_container__post_image} src='/client/public/visa.jpeg' alt="postImg" />
                <p className={cl.post_container__content}>{post?.content}</p>
                    <div className={cl.post_container__footer_conteiner}>
                        <div className={cl.post_container__author_container}>
                            <Avatar sx={{ bgcolor: 'orange' }}>
                                                    {author[0]}  {/* src={props.authorAvatar} alt="authorAvatar" */}
                            </Avatar>
                            <p className={cl.post_container__author_title}>{author}</p>
                        </div>
                    <p>{post?.created_date}</p>
                </div>
            </div>
        </Layout>

}
