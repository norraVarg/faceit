import { configureStore } from '@reduxjs/toolkit'
import users from './usersSlice'

export const makeStore = () => {
  return configureStore({
    reducer: users.reducer,
  })
}

export type UsersStore = ReturnType<typeof makeStore>
export type UsersState = ReturnType<UsersStore['getState']>
export type UsersDispatch = UsersStore['dispatch']