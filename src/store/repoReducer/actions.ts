import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IGit, RepoLanguages } from "../../types/IGit";

const API_URL = 'https://api.github.com/repos/:owner/:name'

export const getRepo = createAsyncThunk(
  'git/getRepo',
  async ({ owner, name }: { owner: string | undefined; name: string | undefined }) => {
    const url = API_URL.replace(':owner', owner || '').replace(':name', name || '');
    const response = await axios.get<IGit>(url);
    return response.data;
  }
);

export const getRepoLanguages = createAsyncThunk(
  'git/getRepoLanguages',
  async ({ owner, name }: { owner: string | undefined; name: string | undefined }) => {
    const url = `${API_URL.replace(':owner', owner || '').replace(':name', name || '')}/languages`;
    const response = await axios.get<RepoLanguages>(url);
    return response.data;
  }
);
  