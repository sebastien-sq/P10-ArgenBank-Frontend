import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { authSlice } from "../slices/authSlice";
import { userApi } from "./userApi";
import { clearUser } from "~/slices/userSlice";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
            baseUrl: "http://localhost:3001/api/v1/" ,
        }),
    endpoints: (builder) => ({
        loginUser: builder.mutation<any, { email: string; password: string; rememberMe: boolean }>({
            query: (body) => ({
                url: "user/login",
                method: "POST",
                body : { email: body.email, password: body.password, rememberMe: body.rememberMe }
            }),
            transformResponse: (response: { body: { token: string } }) => {
                return { token: response.body.token };
            },

                async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    if (arg.rememberMe) {
                        localStorage.setItem('token', data.token);
                    }

                    dispatch(authSlice.actions.setCredentials({ token: data.token }));
                    
                    await dispatch(userApi.endpoints.getUserProfile.initiate(undefined, { forceRefetch: true }));
                } catch (error: any) {
                    dispatch(authSlice.actions.loginFailed(
                        error.error?.data?.message || 'Something went wrong, please try again.'
                    ));
                    if(localStorage.getItem('token')) {
                        localStorage.removeItem('token');
                    }
                    dispatch(clearUser());

                }
            }
        }),
        signUpUser: builder.mutation<any, { firstName: string; lastName: string; email: string; password: string }>({
            query: (body) => ({
                url: "user/signup",
                method: "POST",
                body,
            }),
        }),
    }),
});
export const { useLoginUserMutation, useSignUpUserMutation } = authApi;