import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { Post, User } from '../lib/definitions'
import { getTimeStamp } from '../lib/getTimeStamp'

interface Params {
  postIds: number[]
  posts: Record<number, Post>
  newPostIds: number[]
  users: Record<number, User> | null
}

const Feed = (params: Params) => {
  const { postIds, posts, newPostIds, users } = params
  const [newPostReceived, setNewPostReceived] = useState(false)
  const previousNewPostIds = useRef(newPostIds)

  useEffect(() => {
    if (newPostIds.length > previousNewPostIds.current.length) {
      setNewPostReceived(true)
    }

    const timeout = setTimeout(() => {
      setNewPostReceived(false)
    }, 3000)

    return () => clearTimeout(timeout)
  }, [newPostIds, previousNewPostIds, setNewPostReceived])

  return (
    <div className='grid grid-rows-12 h-screen '>
      <div className='flex items-center'>
        <h1 className="flex items-center text-lg font-semibold leading-6 text-gray-900 px-5 sm:hidden">Feed</h1>
        {newPostReceived && (
          <div className='animate-scale text-xs text-green-600 sm:w-full sm:absolute sm:top-4 sm:left-72 sm:animate-bounce sm:text-white sm:font-semibold'>New post received</div>
        )}
      </div>
      <ul role="list" className="space-y-4 row-start-2 row-span-10 overflow-y-auto sm:row-start-1 sm:row-span-11">
        {postIds.map(id => (
          <Link href={`/post?id=${id}`} key={id} className={`${newPostIds.includes(id) ? ('animate-background-pulse') : ('')} px-5 py-2 flex justify-between hover:bg-sky-100 sm:px-7`}>
            <article className="flex space-x-4">
              <div className='min-w-min flex flex-col items-center row-start-1 row-end-7 col-start-1 col-end-3'>
                <img src={users ?
                  (`https://api.dicebear.com/8.x/avataaars/svg?seed=${users[posts[id].userId].name}`) :
                  ('')}
                  className="min-h-12 min-w-12 flex-none rounded-full bg-gray-50" />
                <div className='grow border-l-4 border-slate-200 min-h-5 w-0 mt-2'></div>
              </div>
              <div className='flex flex-col'>
                <div className='h-12 flex flex-col justify-center'>
                  {/* todo: add route to author page */}
                  {!!users && (<span className='font-semibold text-xs'>{users[posts[id].userId].name}</span>)}
                  <time className='text-xs leading-5 text-gray-500'>{getTimeStamp(posts[id]['created'])}</time>
                </div>
                <p className="mt-2 line-clamp-3 max-h-32 text-wrap overflow-y-hidden text-ellipsis text-xs leading-6 text-gray-700">{posts[id].body}</p>
              </div>
            </article>
          </Link>
        ))}
      </ul>
    </div>
  )

}

export default Feed