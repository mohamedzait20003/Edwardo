import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { authApi } from "../apis/authApi";

interface UserData {
    [key: string]: any;
}

interface AuthState {
    Token: string | null;
    UserData: UserData | null;
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    Token: null,
    UserData: null,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(authApi.endpoints.register.matchFulfilled, (state, { payload }) => {
            state.Token = payload.Token;
            state.UserData = payload.user;
            state.isAuthenticated = true;
        })
        .addMatcher(authApi.endpoints.login.matchFulfilled, (state, { payload }) => {
            state.Token = payload.Token;
            state.UserData = payload.UserData;
            state.isAuthenticated = true;
        })
        .addMatcher(authApi.endpoints.googleLogin.matchFulfilled, (state, { payload }) => {
            state.Token = payload.Token;
            state.UserData = payload.UserData;
            state.isAuthenticated = true;
        })
        .addMatcher(authApi.endpoints.refreshToken.matchFulfilled, (state, { payload }) => {
            state.Token = payload;
        })
        .addMatcher(isAnyOf(authApi.endpoints.logout.matchFulfilled, authApi.endpoints.deleteAccount.matchFulfilled, authApi.endpoints.refreshToken.matchRejected), (state) => {
            state.Token = null;
            state.UserData = null;
            state.isAuthenticated = false;
        })
    },
});

export default authSlice.reducer;
