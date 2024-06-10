'use client'

import { useRef } from 'react'

import PostProvider from '../lib/features/post/PostStoreProvider'
import { usePostSelector, usePostStore } from '../lib/features/post/postHooks'
import { fetchPostById } from '../lib/features/post/postSlice'
import { useSearchParams } from 'next/navigation'
import SomethingWentWrong from '../ui/something-went-wrong'
import PostDetails from '../ui/post-details'
import { usePersistlStore } from '../lib/features/persistStore'
import { isEmptyObject } from '../lib/utils/isEmptyObject'

const PostPage = () => {
  return (<PostProvider><PostComponent /></PostProvider>)
}

const PostComponent = () => {
  const store = usePostStore()
  const post = usePostSelector((state) => state.post)
  const users = usePersistlStore(state => state.users.entities)
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

  return post && !isEmptyObject(post) && (
    <main className='py-4 px-5 overflow-y-auto h-[85vh]'>
      <PostDetails post={post} user={users[post.userId]} />
    </main>
  )
}

export default PostPage