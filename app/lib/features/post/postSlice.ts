import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { FetchStatus, Post } from '../../definitions'

const BASE_URL = 'https://jsonplaceholder.typicode.com/posts'

type PostState = {
  post: Post | null
  fetchStatus: FetchStatus | null
}

const initialState: PostState = {
  post: null,
  fetchStatus: null
}

export const fetchPostById = createAsyncThunk('fetch-post-by-id', async (id: string) => {
  const response = await fetch(`${BASE_URL}/${id}`)
  return response.json()
})

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPostById.fulfilled, (state, action: PayloadAction<Post>) => {
      state.post = action.payload
      state.fetchStatus = FetchStatus.SUCCESS
    }).addCase(fetchPostById.pending, (state) => {
      state.fetchStatus = FetchStatus.LOADING
    }).addCase(fetchPostById.rejected, (state) => {
      state.fetchStatus = FetchStatus.ERROR
    })
  }
})

export default postSlice