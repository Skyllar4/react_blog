import { userModel } from "../models/user-model.js"
export const userDTO = (userModel: userModel, userID: number) => {

    const user = {
        email: userModel.userEmail,
        id: userID
    }

    return user;

}
