import { configureStore } from '@reduxjs/toolkit'
import feed from './feedSlice'

export const makeStore = () => {
  return configureStore({
    reducer: feed.reducer,
  })
}

export type FeedStore = ReturnType<typeof makeStore>
export type FeedState = ReturnType<FeedStore['getState']>
export type FeedDispatch = FeedStore['dispatch']