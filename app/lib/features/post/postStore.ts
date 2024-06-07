import { configureStore } from '@reduxjs/toolkit'
import post from './postSlice'

export const makeStore = () => {
  return configureStore({
    reducer: post.reducer,
  })
}

export type PostStore = ReturnType<typeof makeStore>
export type PostState = ReturnType<PostStore['getState']>
export type PostDispatch = PostStore['dispatch']