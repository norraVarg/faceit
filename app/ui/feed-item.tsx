import Link from 'next/link'
import { Post, User } from '../lib/definitions'
import { getTimeStamp } from '../lib/utils/getTimeStamp'
import { isNewPost } from '../lib/utils/isNewPost'

interface Params {
  post: Post
  user: User
}

const FeedItem = (params: Params) => {
  const { post, user } = params

  return (
    <Link href={`/post?id=${post.id}`} key={post.id} className={`${isNewPost(post) ? ('animate-background-pulse') : ('')} px-5 py-2 flex justify-between hover:bg-sky-100 sm:px-7`}>
      <article className="flex space-x-4">
        <div className='min-w-min flex flex-col items-center row-start-1 row-end-7 col-start-1 col-end-3'>
          <img alt='user-avatar' src={`https://api.dicebear.com/8.x/avataaars/svg?seed=${user.name}`} className="min-h-12 min-w-12 flex-none rounded-full bg-gray-50" />
          <div className='grow border-l-4 border-slate-200 min-h-5 w-0 mt-2'></div>
        </div>
        <div className='flex flex-col'>
          <div className='h-12 flex flex-col justify-center'>
            {/* todo: add route to author page */}
            <span className='font-semibold text-xs'>{user.name}</span>
            <time className='text-xs leading-5 text-gray-500'>{getTimeStamp(post['created'])}</time>
          </div>
          <p className="mt-2 line-clamp-3 max-h-32 text-wrap overflow-y-hidden text-ellipsis text-xs leading-6 text-gray-700">{post.body}</p>
        </div>
      </article>
    </Link>
  )
}

export default FeedItem

