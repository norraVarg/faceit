'use client'

import { useSearchParams } from 'next/navigation'
import { useRef } from 'react'
import { TOTAL_POST_COUNT } from '../lib/definitions'
import { usePersistlStore } from '../lib/features/persistStore'
import PostProvider from '../lib/features/post/PostStoreProvider'
import { usePostSelector, usePostStore } from '../lib/features/post/postHooks'
import { fetchPostById } from '../lib/features/post/postSlice'
import { isEmptyObject } from '../lib/utils/isEmptyObject'
import PostDetails from '../ui/post-details'
import SomethingWentWrong from '../ui/something-went-wrong'

const PostPage = () => {
  return (<PostProvider><PostComponent /></PostProvider>)
}

const PostComponent = () => {
  const store = usePostStore()
  const oldPost = usePostSelector((state) => state.post)
  const users = usePersistlStore(state => state.users.entities)
  const newPosts = usePersistlStore(state => state.newPosts)
  const initialized = useRef(false)
  const params = useSearchParams()
  const id = params.get('id')

  if (!id) {
    return (<SomethingWentWrong message={'No valid ID in search params'} />)
  }

  // fetch post by id when the page is loaded
  // do not fetch if the post id is greater than the total post count (100)
  if (!initialized.current && Number(id) <= TOTAL_POST_COUNT) {
    store.dispatch(fetchPostById(id))
    initialized.current = true
  }

  const post = newPosts.entities[Number(id)] || oldPost

  return post && !isEmptyObject(post) && (
    <main className='py-4 px-5 overflow-y-auto h-[85vh]'>
      <PostDetails post={post} user={users[post.userId]} />
    </main>
  )
}

export default PostPage