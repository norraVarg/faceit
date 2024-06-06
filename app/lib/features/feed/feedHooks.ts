import { useDispatch, useSelector, useStore } from 'react-redux'
import type { FeedDispatch, FeedStore, FeedState } from './feedStore'

export const useFeedDispatch = useDispatch.withTypes<FeedDispatch>()
export const useFeedSelector = useSelector.withTypes<FeedState>()
export const useFeedStore = useStore.withTypes<FeedStore>()