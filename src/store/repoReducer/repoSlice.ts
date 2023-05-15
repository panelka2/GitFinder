import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IGit } from "../../types/IGit";
import { getRepo, getRepoLanguages } from "./actions";

interface RepoState {
    repo: IGit
    isLoading: boolean
    error: string,
    languages: Record<string, number>
} 
export const initialState: RepoState = {
    repo: {
        name: '',
        stargazers_count: 0,
        pushed_at: '',
        html_url: '',
        id: 0,
        languages_url: '',
        description: '',
        owner: {
            pushed_at: '',
            avatar_url: '',
            login: '',
            html_url: '',
        }
    },
    isLoading:false,
    error: '',
    languages: {}
}

const NAME = 'repo' 

export const repoSlice = createSlice({
    name: NAME,
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(getRepo.pending, (state) => {
            state.isLoading = true;
            state.error = ''
        })
        .addCase(getRepo.fulfilled, 
            (state, action: PayloadAction<IGit>) => {
            state.isLoading = false;
            state.error = '';
            state.repo = action.payload
        })
        .addCase(getRepo.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message || 'Failed to fetch repo'
        })
        .addCase(getRepoLanguages.pending, (state) => {
            state.isLoading = true;
            state.error = '';
        })
        .addCase(getRepoLanguages.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = '';
            state.languages = action.payload;
        })
        .addCase(getRepoLanguages.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message || 'Failed to fetch languages';
        });
    },
})

export default repoSlice.reducer
