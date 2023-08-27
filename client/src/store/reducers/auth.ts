import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    isAuth: false,
    userName: '',
    userSurname: '',
    userId: 0
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth(state, action: PayloadAction<boolean>) {
            state.isAuth = action.payload;
        },
        setUsername(state, action: PayloadAction<string>) {
            state.userName = action.payload;
        },
        setUserSurname(state, action: PayloadAction<string>) {
            state.userSurname = action.payload;
        },
        setUserId(state, action: PayloadAction<number>) {
            state.userId = action.payload;
        }
    }
})

export default authSlice.reducer;
