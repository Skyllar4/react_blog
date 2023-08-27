import { userModel } from "../models/user-model.js";
import db from "../db.js";
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { sendMail } from "./mail-service.js";
import { userDTO } from '../dtos/user-dto.js';
import * as tokenService from './token-service.js';

export const registerUser = async (userModel: userModel) => {

    const isEmpty = await db.query('SELECT * FROM users WHERE user_email=$1', [userModel.userEmail]);

    if (isEmpty.rows[0]) { // чекаем, не зареган ли данный email
        throw new Error(`Пользователь с email ${userModel.userEmail} уже существует`);
    } // здесь тровает ошибку но не завершает запрос

    const salt = await bcrypt.genSalt(6);
    const passwordHash = await bcrypt.hash(userModel.userPass, salt); // хэш пароля

    const activationLink = uuidv4(); // формируем строку для подтверждения по email

    const dateNow = new Date(); // Вычисляем дату регистрации

    await db.query( // создание пользователя
        'INSERT INTO users (user_name, user_surname, user_email, user_pass, activation_link, date_register) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', 
        [userModel.userName, userModel.userSurname, userModel.userEmail, passwordHash, activationLink, dateNow.toLocaleString()]);

    const getUserID = await db.query("SELECT id FROM users WHERE user_email=$1", [userModel.userEmail]);
    // получаем id созданного пользователя, для поиска его в таблице tokenList и присвоения ему jwt токена
    const tokens = tokenService.generateToken(userDTO(userModel, getUserID.rows[0].id));
    await tokenService.saveToken(getUserID.rows[0].id, tokens.refreshToken);

    return {
        ...tokens,
        user: await db.query("SELECT * FROM users WHERE id=$1", [getUserID.rows[0].id])
    }
    
    // sendMail('', ''); сделать подтверждение по почте в перспективе

}

export const login = async (email: string, password: string) => {

    const findUser = await db.query("SELECT * FROM users WHERE user_email=$1", [email]);

    if (!findUser.rows[0]) { // проверяем наличие пользавателя, если такого нет, то редиректим на форму регистрации (на клиенте?)
        throw new Error(`Такого пользователя не существует, пройдите регистрацию`);
    }

    const passEquals = await bcrypt.compare(password, findUser.rows[0].user_pass);
    // проверяем соответсвие введенных паролей, если не так, то троваем ошибку
    if (!passEquals) {
        throw new Error(`Неверный email или пароль`);
    }

    const user = { // формируем объект с нужными данными, для отправки на клиент, можно это пределать на DTO
            name: findUser.rows[0].user_name,
            surname: findUser.rows[0].user_surname,
            email: findUser.rows[0].user_email
    }

    const tokens = tokenService.generateToken(user); 
    await tokenService.saveToken(findUser.rows[0].id, tokens.refreshToken);
    // генерим токены и сохраняем их в БД
    return {
        ...tokens,
        user: await db.query("SELECT * FROM users WHERE id=$1", [findUser.rows[0].id])
    }

}

export const logout = async (refreshToken: string) => {

    const token = await tokenService.removeToken(refreshToken);
    return token;

}

export const refresh = (refreshToken: string) => {

    if (!refreshToken) {
        throw new Error('Токена нет');
    }

}

export const checkAuth = async (refreshToken: string) => {
    
    if (!refreshToken) {
        throw new Error(`Это устройство не авторизированно`);
    }

    const tokenId = await db.query("SELECT userId FROM tokenlist WHERE refreshtoken=$1", [refreshToken]);
    if (tokenId.rows[0]) {

        const userData = await db.query("SELECT * FROM users WHERE id=$1", [tokenId.rows[0].userid]);

        const user = {
            id: userData.rows[0].id,
            userName: userData.rows[0].user_name,
            userSurname: userData.rows[0].user_surname,
            email: userData.rows[0].user_email,
            date_register: userData.rows[0].date_register
        }

        return user
        
    }

}
