import api from "../http";
import { AxiosResponse } from 'axios';
import { AuthResponse, User } from "../models/response/AuthResponse";

export const login = async (email: string, password: string): Promise<AxiosResponse<AuthResponse>> => {
    return api.post<AuthResponse>('/login', {email, password});
}

export const register = async (email: string, password: string, name: string, surname: string): Promise<AxiosResponse<AuthResponse>> => {
    return api.post<AuthResponse>('/register', {email, password, name, surname});
}

export const logout = async (): Promise<void> => {
    return api.post('/logout');
}

export const checkAuth = async (): Promise<AxiosResponse<User>> => {
    return api.get<User>('/checkAuth');
}
