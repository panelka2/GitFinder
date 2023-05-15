import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { IGitResponse } from './gitSlice';

export const fetchRepos = createAsyncThunk(
  'git/fetchRepos',
  async (text: string) => {
    const response = await axios.get<IGitResponse>(
      `https://api.github.com/search/repositories?q=${text}&sort=stars&order=desc&per_page=100`
    );
    return response.data;
  }
);
 