import {
    createApi,
    fetchBaseQuery,
    BaseQueryApi,
  } from "@reduxjs/toolkit/query/react";
  import { baseurl, user_token } from "../constants";
  
  const thebase = fetchBaseQuery({
    baseUrl: baseurl, // Your API endpoint base URL
    prepareHeaders: (headers: Headers, api: Pick<BaseQueryApi, "getState">) => {
      // If the token exists, set it in the Authorization header
      if (user_token) {
        // console.log("User token:", user_token);
        headers.set("Authorization", `Bearer ${user_token}`);
      }
  
      return headers;
    },
  });
  
  export const accountsSlice = createApi({
    reducerPath: "accounts",
    //   baseQuery: fetchBaseQuery({baseUrl: baseUrl}),
    baseQuery: thebase,
    tagTypes: ["accounts"],
  
    endpoints: (builder) => ({
      createAccount: builder.mutation({
        query: (body) => ({
          url: "/accounts/create-account",
          method: "POST",
          body,
        }),
      }),
      fetchAccounts: builder.query({
        query: () => ({
          url: "/accounts/fetch-accounts",
          method: "GET",
          // body,
        }),
        providesTags : ["accounts"]
        // invalidatesTags removed as it is not valid for query endpoints
      }),
  
      fetchOfficers: builder.query({
        query: () => ({
          url: "/accounts/fetch-officers",
          method: "GET",
          headers: {
            Authorization: `Bearer ${user_token}`, // Add user token here
          },
        }),
      }),
    }),
  });
  
  export const { useCreateAccountMutation, useFetchAccountsQuery, useFetchOfficersQuery } =
    accountsSlice;
  