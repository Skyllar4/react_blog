import jwt from 'jsonwebtoken';
import db from '../db.js';

export const generateToken = (payload: object) => {

    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET as string, {expiresIn: '30m'});
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN as string, {expiresIn: '30d'});

    return {
        accessToken,
        refreshToken
    }

}

export const saveToken = async (userID: number, refreshToken: string) => {

    const tokenData = await db.query("SELECT * FROM tokenList WHERE userId=$1", [userID]);

    if (tokenData.rows.length !== 0) {
        await db.query("UPDATE tokenList SET refreshToken=$1 WHERE userId=$2", [refreshToken, userID]);
        return
    }

    const token = await db.query('INSERT INTO tokenList (userId, refreshToken) VALUES ($1, $2) RETURNING *', [userID, refreshToken]);

    return token;

}

export const removeToken = async (refreshToken: string) => {
        const tokenData = await db.query('DELETE FROM tokenlist WHERE refreshToken=$1', [refreshToken]);
        return tokenData
}
