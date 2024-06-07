import { useDispatch, useSelector, useStore } from 'react-redux'
import { PostDispatch, PostState, PostStore } from './postStore'

export const usePostDispatch = useDispatch.withTypes<PostDispatch>()
export const usePostSelector = useSelector.withTypes<PostState>()
export const usePostStore = useStore.withTypes<PostStore>()