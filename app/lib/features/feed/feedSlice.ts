import { PayloadAction, createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit"
import { FetchStatus, Post } from '../../definitions'
import { usePersistlStore } from '../persistStore'

const API_URL = 'https://jsonplaceholder.typicode.com/posts'

const feedAdapter = createEntityAdapter<Post>({
  sortComparer: (a, b) => b.id - a.id
})

const initialState = feedAdapter.getInitialState({
  fetchStatus: null as FetchStatus | null,
})

export const fetchPosts = createAsyncThunk('fetch-posts', async () => {
  const response = await fetch(API_URL)
  return response.json()
})

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
      feedAdapter.setAll(state, action.payload)
      state.fetchStatus = FetchStatus.SUCCESS
    }).addCase(fetchPosts.pending, (state) => {
      state.fetchStatus = FetchStatus.LOADING
    }).addCase(fetchPosts.rejected, (state) => {
      state.fetchStatus = FetchStatus.ERROR
    })
  }
})

export default feedSlice