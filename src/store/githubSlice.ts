import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GithubState {
  currentUsername: string;
  page: number;
  perPage: number;
  sort: "created" | "updated" | "pushed" | "full_name";
  direction: "asc" | "desc";
}

const initialState: GithubState = {
  currentUsername: "guilhermesenci",
  page: 1,
  perPage: 5,
  sort: "updated",
  direction: "desc",
};

const githubSlice = createSlice({
  name: "github",
  initialState,
  reducers: {
    setCurrentUsername: (state, action: PayloadAction<string>) => {
      state.currentUsername = action.payload;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    nextPage(state) {
      state.page += 1;
    },
    prevPage(state) {
      if (state.page > 1) state.page -= 1;
    },
    setPerPage(state, action: PayloadAction<number>) {
      state.perPage = action.payload;
    },
    setSort(state, action: PayloadAction<GithubState["sort"]>) {
      state.sort = action.payload;
    },
    setDirection(state, action: PayloadAction<GithubState["direction"]>) {
      state.direction = action.payload;
    },
    resetPagination(state) {
      state.page = 1;
    },
  },
});

export const {
  setCurrentUsername,
  setPage,
  nextPage,
  prevPage,
  setPerPage,
  setSort,
  setDirection,
  resetPagination,
} = githubSlice.actions;
export default githubSlice.reducer;
