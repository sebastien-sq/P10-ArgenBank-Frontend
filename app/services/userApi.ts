import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userSlice } from "../slices/userSlice";

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
         baseUrl: "http://localhost:3001/api/v1/" ,
         prepareHeaders: (headers, { getState }) => {
            const token = (getState() as any).auth.token;
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getUserProfile: builder.query<any, void>({
            query: () => ({
                url: "user/profile",
                method: "POST",
            }),
            transformResponse: (response: { body: { id: number; firstName: string; lastName: string; email: string } }) => {
                return response.body;
            },
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(userSlice.actions.setUser({
                        id: data.id,
                        firstName: data.firstName,
                        lastName: data.lastName,
                        email: data.email,
                    }));
                } catch (error) {
                    console.error("Erreur lors de la récupération du profil utilisateur:", error);
                }
            }
        }),
        updateUserProfile: builder.mutation<any, { firstName: string; lastName: string }>({
            query: (body) => ({
                url: "user/profile",
                method: "PUT",
                body,
            }),
            transformResponse: (response: { body: { id: number; firstName: string; lastName: string; email: string } }) => {
                return response.body;
            },
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(userSlice.actions.setUser({
                        id: data.id,
                        firstName: data.firstName,
                        lastName: data.lastName,
                        email: data.email,
                    }));
                } catch (error) {
                    console.error("Erreur lors de la mise à jour du profil utilisateur:", error);
                }
            }
        }),
    }),
});
export const { useGetUserProfileQuery, useUpdateUserProfileMutation } = userApi;