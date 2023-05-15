import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IGit, RepoLanguages } from "../../types/IGit";
import { generatePath } from "react-router-dom";

const API_URL = 'https://api.github.com/repos/:owner/:name'

export const getRepo = createAsyncThunk(
    'git/getRepo',
    async ({ owner, name }: { owner: string | undefined; name: string | undefined}) => {
        const response = await axios.get<IGit>(
          generatePath(API_URL,{owner:owner || null,name: name || null}),
        )
    return response.data
    }
);

export const getRepoLanguages = createAsyncThunk(
    'git/getRepoLanguages',
    async ({ owner, name }: { owner: string | undefined; name: string | undefined }) => {
      const response = await axios.get<RepoLanguages>(
        `${generatePath(API_URL,{owner:owner || null,name: name || null})}/languages`
        );
      return response.data;
    }
  );
  