import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const githubApi = createApi({
  reducerPath: "githubApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_GITHUB ?? "https://api.github.com/",
  }),
  endpoints: (builder) => ({
    getProfile: builder.query<any, string>({
      query: (username) => `users/${username}`,
    }),
    getRepos: builder.query<any[], string>({
      query: (username) => `users/${username}/repos`,
    }),
  }),
});

export const { useGetProfileQuery, useGetReposQuery } = githubApi;
