import { getRepos, searchGit, getAccount, getrepoDetail, getAllorg, getDetailorg } from '../services';
import { createSlice, Action, AnyAction, createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAPI } from '../../util/fetcher';


export const fetchSearch = createAsyncThunk(
  'github/search',
  async (req : object, thunkAPI) => {
    const response = await searchGit(req)
    return response.data
  }
)

export const fetchAccount = createAsyncThunk(
  'github/account',
  async (req : object, thunkAPI) => {
    const response = await getAccount(req)
    return response.data

  }
)


export const fetchAllRepos = createAsyncThunk(
  'github/repos',
  async (req : object, thunkAPI) => {
    const response = await getRepos(req)
    return response.data
  }
)

export const fetchRepoDetail = createAsyncThunk(
  'github/repodetail',
  async (req : object, thunkAPI) => {
    const response = await getrepoDetail(req)
    return response.data

  }
)

export const fetchAllOrganitation = createAsyncThunk(
  'github/orgs',
  async (req, thunkAPI) => {
    const datas = await getAllorg(req)
    return datas.data

  }
)

export const fetchOrgDetail = createAsyncThunk(
  'github/orgdetail',
  async (req : object, thunkAPI) => {
    const response = await getDetailorg(req)
    return response.data

  }
)

interface RejectedAction extends Action {
  error: Error
}

function isRejectedAction(action: AnyAction): action is RejectedAction {
  return action.type.endsWith('rejected')
}


interface githubState {
  search: {},
  organitation: {
    all: [],
    detail: {}
  },
  repos: {
    all: [],
    detail: {}
  },
  account: {}
}


const InitialState = {
  search: {},
  organitation: {
    all: [],
    detail: {}
  },
  repos: {
    all: [],
    detail: {}
  },
  account: {}
} as githubState



const githubAllSlice = createSlice({
  name: 'github',
  initialState: InitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearch.fulfilled, (state, action) => {
        state.search = action.payload
      })
      .addCase(fetchAllRepos.fulfilled, (state, action) => {
          state.repos =  {...state.repos, all: action.payload }
      })
      .addCase(fetchRepoDetail.fulfilled, (state, action) => {
        state.repos =  {...state.repos, detail : action.payload }
      })
      .addCase(fetchAccount.fulfilled, (state, action) => {
        state.account =  {...state.repos, detail : action.payload }
      })
      .addCase(fetchAllOrganitation.fulfilled, (state, action) => {
        state.organitation =  {...state.repos, all: action.payload }
      })
      .addCase(fetchOrgDetail.fulfilled, (state, action) => {
        state.organitation =  {...state.repos, detail : action.payload }
      })
      // You can match a range of action types
      .addMatcher(
        isRejectedAction,
        // `action` will be inferred as a RejectedAction due to isRejectedAction being defined as a type guard
        (state, action) => { }
      )
      .addDefaultCase((state, action) => { })
  },
})





export default githubAllSlice.reducer