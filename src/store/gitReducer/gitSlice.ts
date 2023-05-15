import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IGit } from "../../types/IGit"
import { fetchRepos } from "./actions"

interface GitState {
    items: IGit[]
    total_count: number
    isLoading: boolean
    error: string, 
}

export interface IGitResponse {
    items: IGit[],
    total_count: number,
    incomplete_results: boolean
}

const initialState: GitState = {
    items: [],
    total_count: 0,
    isLoading: false,
    error: '', 
}

const NAME = 'git'

export const gitSlice = createSlice({
  name: NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRepos.pending, (state) => {
      state.isLoading = true;
      state.error = "";
    })
    .addCase(fetchRepos.fulfilled,
      (state, action: PayloadAction<IGitResponse>) => {
        state.isLoading = false;
        state.error = "";
        state.items = action.payload.items;
        state.total_count = action.payload.total_count;
      }
    )
    .addCase(fetchRepos.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || "Failed to fetch repos";
    });  
  },
});


export default gitSlice.reducer