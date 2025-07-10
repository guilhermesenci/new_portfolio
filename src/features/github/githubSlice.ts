import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GithubState {
  currentUsername: string;
}

const initialState: GithubState = {
  currentUsername: "guilhermesenci",
};

const githubSlice = createSlice({
  name: "github",
  initialState,
  reducers: {
    setCurrentUsername: (state, action: PayloadAction<string>) => {
      state.currentUsername = action.payload;
    },
  },
});

export const { setCurrentUsername } = githubSlice.actions;
export default githubSlice.reducer;
