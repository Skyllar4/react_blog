import { Response, Request } from "express";
import * as userService from '../service/user-service.js';

export const registration = async (req: Request, res: Response) => {
    try {
        const userModel = {
            userName: req.body.name,
            userSurname: req.body.surname,
            userEmail: req.body.email,
            userPass: req.body.password,
            activationLink: ''
        }
        // тут зарефакторить по возможности, как с логином
        const userData = await userService.registerUser(userModel);

        if (userData) {
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true});
        }

        res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true});

        res.json({
            userData
        });

    } catch (e) {
        console.log(e);
        res.status(400);
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        
        const {email, password} = req.body;

        const userData = await userService.login(email, password);

        if (userData) {
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true});
        }

        return res.json({
            userData
        });

    } catch (e) {
        console.log(e);
        return res.status(400);
    }
}

export const logout = async (req: Request, res: Response) => {
    try {
        
        const {refreshToken} = req.cookies;
        const token = await userService.logout(refreshToken);
        res.clearCookie('refreshToken');
        
        return res.json({
            token
        });

    } catch (e) {
        console.log(e);
        res.status(400);
    }
}

export const refresh = async (req: Request, res: Response) => {
    try {

        const {refreshToken} = req.cookies;

        const userData = await userService.refresh(refreshToken);
        
        return res.json(userData);
        
    } catch (e) {
        console.log(e);
        res.status(400);
    }
}

export const checkAuth = async (req: Request, res: Response) => {
    try {

        const {refreshToken} = req.cookies;

        const userData = await userService.checkAuth(refreshToken)

        return res.json(userData);

    } catch (e) {
        console.log(e);
        res.status(400);
    }
}
