import api from "../http";
import { AxiosResponse } from 'axios';
import { Post, PostData } from '../models/response/PostResponse';

export const getPosts = async (): Promise<AxiosResponse<any>> => {
    return api.get<any>('/getPosts'); // нудно дописать модель Post когда сможем получать также авторов
}

export const getPostById = async (id: number): Promise<AxiosResponse<PostData>> => {
    return api.get<PostData>('/getPost', {
        params: {
          id: id
        }
      });
}

export const createPost = async (author_id: number, category: string, title: string, content: string): Promise<AxiosResponse<Post>> => {
    return api.post<Post>('/createPost', {author_id, category, title, content});
}
