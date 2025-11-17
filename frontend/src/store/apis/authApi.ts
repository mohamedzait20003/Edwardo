import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

export const authApi = createApi({
    tagTypes: ['Auth'],
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        credentials: 'include',
        prepareHeaders: (headers, { getState }) => {
            headers.set('Content-Type', 'application/json');

            const state = getState() as { auth: { Token: string | null } };
            const Token = state.auth.Token;
            if (Token) {
                headers.set('Authorization', `Bearer ${Token}`);
            }

            return headers;
        },
    }),
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (userData) => ({
                url: '/auth/register',
                method: 'POST',
                body: userData,
            }),
            transformResponse: (response) => response.Data,
        }),
        login: builder.mutation({
            query: (loginData) => ({
                url: '/auth/login',
                method: 'POST',
                body: loginData,
            }),
            transformResponse: (response) => response.Data,
        }),
        googleLogin: builder.mutation({
            query: (data) => ({
                url: '/auth/google-login',
                method: 'POST',
                body: data,
            }),
            transformResponse: (response) => response.Data,
        }),
        sendOTP: builder.mutation({
            query: () => ({
                url: '/auth/send-otp',
                method: 'POST',
            }),
        }),
        verifyOTP: builder.mutation({
            query: (otp) => ({
                url: '/auth/verify-otp',
                method: 'POST',
                body: { OTP: otp },
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            }),
        }),
        refreshToken: builder.mutation({
            query: () => ({
                url: '/auth/refresh-token',
                method: 'PUT',
                credentials: 'include',
            }),
            transformResponse: (response) => response.Data,
        }),
        deleteAccount: builder.mutation({
            query: () => ({
                url: '/user-profile/delete',
                method: 'PUT',
            }),
        }),
    }),
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useGoogleLoginMutation,
    useLogoutMutation,
    useSendOTPMutation,
    useVerifyOTPMutation,
    useRefreshTokenMutation,
    useDeleteAccountMutation
} = authApi;
