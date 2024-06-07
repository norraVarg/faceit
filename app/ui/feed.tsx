import Link from 'next/link'
import { Post, User } from '../lib/definitions'

interface Params {
  postIds: number[]
  posts: Record<number, Post>
  users: Record<number, User> | null
}

const Feed = (params: Params) => {
  const { postIds, posts, users } = params

  return (
    <div className='grid grid-rows-12 h-screen '>
      <h1 className="flex items-center text-lg font-semibold leading-6 text-gray-900 px-5 sm:hidden">Feed</h1>
      <ul role="list" className="space-y-4 row-start-2 row-span-10 overflow-y-auto sm:row-start-1 sm:row-span-11">
        {postIds.map(id => (
          <Link href={`/post?id=${id}`} key={id} className="px-5 flex justify-between hover:bg-sky-100 sm:px-7">
            <article className="flex space-x-4">
              <div className='min-w-min flex flex-col items-center row-start-1 row-end-7 col-start-1 col-end-3'>
                <img src={users ?
                  (`https://api.dicebear.com/8.x/avataaars/svg?seed=${users[posts[id].userId].name}`) :
                  ('')}
                  className="min-h-12 min-w-12 flex-none rounded-full bg-gray-50" />
                <div className='grow border-l-4 border-slate-200 min-h-5 w-0 my-2'></div>
              </div>
              <div className='flex flex-col'>
                <div className='h-12 flex flex-col justify-center'>
                  {/* todo: add route to author page */}
                  {!!users && (<span className='font-semibold text-xs'>{users[posts[id].userId].name}</span>)}
                  <time className='text-xs leading-5 text-gray-500'>3 mins ago</time>
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