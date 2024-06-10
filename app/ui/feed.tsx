import { useEffect, useRef, useState } from 'react'
import { Post, User } from '../lib/definitions'
import { useInfiniteScroll } from '../lib/hooks/useInfiniteScroll'
import FeedItem from './feed-item'

const PAGE_SIZE = 20

interface Params {
  postIds: number[]
  posts: Record<number, Post>
  newPosts: {
    ids: number[]
    entities: Record<number, Post>
  }
  users: Record<number, User>
}

const Feed = (params: Params) => {
  const { postIds, posts, newPosts, users } = params

  const [newPostReceived, setNewPostReceived] = useState(false)
  const previousNewPostIds = useRef(newPosts.ids)

  const { anchorRef, fetchMore } = useInfiniteScroll()
  const [oldPostIds, setOldPostIds] = useState<number[]>([])
  const hasMorePosts = oldPostIds.length === 0 || oldPostIds.length < postIds.length

  // highlight new post received for 3 seconds
  useEffect(() => {
    if (newPosts.ids.length > previousNewPostIds.current.length) {
      setNewPostReceived(true)
    }

    const timeout = setTimeout(() => {
      setNewPostReceived(false)
    }, 3000)

    return () => clearTimeout(timeout)
  }, [newPosts.ids, previousNewPostIds, setNewPostReceived])

  // handle infinite scroll to fetch more posts
  useEffect(() => {
    if (hasMorePosts && fetchMore) {
      setOldPostIds(postIds.slice(0, oldPostIds.length + PAGE_SIZE))
    }
  }, [fetchMore, postIds, hasMorePosts])

  return (
    <div className='grid grid-rows-12 h-screen'>
      <div className='flex items-center'>
        <h1 className="flex items-center text-lg font-semibold leading-6 text-gray-900 px-5 sm:hidden">Feed</h1>
        {newPostReceived && (
          <div className='z-30 animate-scale text-xs text-green-600 sm:w-full sm:absolute sm:top-4 sm:left-72 sm:animate-bounce sm:text-white sm:font-semibold'>New post received</div>
        )}
      </div>
      <ul role="list" className="py-5 row-start-2 row-span-10 overflow-y-auto sm:row-start-1 sm:row-span-11">
        {newPosts.ids.map((id) => (<FeedItem key={id} post={newPosts.entities[id]} user={users[newPosts.entities[id].userId]} />))}
        {oldPostIds.map((id) => (<FeedItem key={id} post={posts[id]} user={users[posts[id].userId]} />))}
        {hasMorePosts && (
          <div ref={anchorRef} className='flex justify-center mt-2'>{(<span className='text-xs text-gray-600'>Fetching more...</span>)}</div>
        )}
      </ul>
    </div>
  )

}

export default Feed