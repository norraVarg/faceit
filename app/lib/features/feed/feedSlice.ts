import { PayloadAction, createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit"
import { FetchStatus, Post } from '../../definitions'

const API_URL = 'https://jsonplaceholder.typicode.com/posts'

const feedAdapter = createEntityAdapter<Post>({
  sortComparer: (a, b) => b.id - a.id
})

const initialState = feedAdapter.getInitialState({
  fetchStatus: null as FetchStatus | null,
  message: null as string | null,
})

export const fetchPosts = createAsyncThunk('fetch-posts', async () => {
  const response = await fetch(API_URL)
  return response.json()
})

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    addNewPost(state, action: PayloadAction<Post>) {
      feedAdapter.addOne(state, action.payload)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
      feedAdapter.setAll(state, action.payload)
      state.fetchStatus = FetchStatus.SUCCESS
      state.message = 'Fetched posts successfully.'
    }).addCase(fetchPosts.pending, (state) => {
      state.fetchStatus = FetchStatus.LOADING
      state.message = 'Fetching posts...'
    }).addCase(fetchPosts.rejected, (state) => {
      state.fetchStatus = FetchStatus.ERROR
      state.message = 'Failed to fetch posts.'
    })
  }
})

export default feedSlice
export const { addNewPost } = feedSlice.actions