import { PayloadAction, createAsyncThunk, createSlice, createEntityAdapter } from "@reduxjs/toolkit"
import { FetchStatus, User } from '../../definitions'

const API_URL = 'https://jsonplaceholder.typicode.com/users'

const usersAdapter = createEntityAdapter<User>({
  sortComparer: (a, b) => a.name.localeCompare(b.name),
})

const initialState = usersAdapter.getInitialState({
  fetchStatus: null as FetchStatus | null,
  message: null as string | null,
})

export const fetchUsers = createAsyncThunk('fetch-users', async () => {
  const response = await fetch(API_URL)
  return response.json()
})

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
      state.fetchStatus = FetchStatus.SUCCESS
      state.message = 'Fetched users successfully.'
      usersAdapter.setAll(state, action.payload)
    }).addCase(fetchUsers.pending, (state) => {
      state.fetchStatus = FetchStatus.LOADING
      state.message = 'Fetching users...'
    }).addCase(fetchUsers.rejected, (state) => {
      state.fetchStatus = FetchStatus.ERROR
      state.message = 'Failed to fetch users.'
    })
  }
})

export default usersSlice
