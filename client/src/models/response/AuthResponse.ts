export interface User {
    id: number,
    userName: string,
    userSurname: string
    email: string,
    isActivated?: boolean,
    date_register: string
} 

export interface AuthResponse {
    accessToken: string,
    refreshToken: string,
    user: User
}
