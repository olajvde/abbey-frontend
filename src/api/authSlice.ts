import {
  createApi,
  fetchBaseQuery
} from "@reduxjs/toolkit/query/react";
import { baseurl, user_token } from "../constants";

const thebase = fetchBaseQuery({
  baseUrl: baseurl, // Your API endpoint base URL
  prepareHeaders: (headers: Headers) => {
    // If the token exists, set it in the Authorization header
    if (user_token) {
      headers.set("Authorization", `Bearer ${user_token}`);
    }

    return headers;
  },
});

export const authSlice = createApi({
  reducerPath: "auth",
  //   baseQuery: fetchBaseQuery({baseUrl: baseUrl}),
  baseQuery: thebase,
  tagTypes: ["auth"],

  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),
    register: builder.mutation({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } =
  authSlice;
