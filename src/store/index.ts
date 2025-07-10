import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";
import { githubApi } from "@/features/github/githubAPI";
import githubReducer from "@/features/github/githubSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    github: githubReducer,
    [githubApi.reducerPath]: githubApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(githubApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
