'use client'

import { useRef } from 'react'

import PostProvider from '../lib/features/post/PostStoreProvider'
import { usePostSelector, usePostStore } from '../lib/features/post/postHooks'
import { fetchPostById } from '../lib/features/post/postSlice'
import { useSearchParams } from 'next/navigation'
import SomethingWentWrong from '../ui/something-went-wrong'
import PostDetails from '../ui/post-details'

const PostPage = () => {
  return (<PostProvider><PostComponent /></PostProvider>)
}

const PostComponent = () => {
  const store = usePostStore()
  const initialized = useRef(false)
  const params = useSearchParams()
  const id = params.get('id')

  if (!id) {
    return (<SomethingWentWrong />)
  }

  if (!initialized.current) {
    store.dispatch(fetchPostById(id))
    initialized.current = true
  }

  const post = usePostSelector((state) => state.post)

  return post && <PostDetails post={post} />
}

export default PostPage