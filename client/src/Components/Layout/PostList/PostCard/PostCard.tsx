import React from 'react'
import Avatar from '@mui/material/Avatar';
import cl from './post-card.module.scss';
import { useNavigate } from "react-router-dom";

interface PostCardProps {
    postId: number,
    postTitle: string,
    content: string,
    postImage?: string,
    readonly author: string,
    authorAvatar: string,
    readonly publicationDate: string,
    category: string
}

export function PostCard(props: PostCardProps) {

    const navigate = useNavigate();

    return (
            <> 
                <li onClick={() => navigate(`/post/${props.postId}`, { replace: false })} className={cl.post_container}>
                    <div className={cl.post_container__post_header}>
                        <div className={cl.post_container__author_container}>
                                <Avatar sx={{ bgcolor: 'orange' }}>
                                        {props.author[0]}  {/* src={props.authorAvatar} alt="authorAvatar" */}
                                </Avatar>
                            <p className={cl.post_container__author_title}>{props.author}</p>
                        </div>
                        <span>{props.publicationDate}</span>
                    </div>
                    <h2 className={cl.post_container__title}>
                        {props.postTitle}
                    </h2>
                    {props.postImage
                            ? <img className={cl.post_container__post_image} src={props.postImage} alt="postImg" />
                            : ''
                    }
                    <p className={cl.post_container__content}>
                        {props.content}
                    </p>
                </li>
            </>
    )
}
