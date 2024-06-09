import Link from 'next/link'
import { Post, User } from '../lib/definitions'

interface Params {
  post: Post
  user: User
}

const PostDetails = (params: Params) => {
  const { post, user } = params

  return (
    <div className='relative flex flex-col gap-4'>
      <div className='flex flex-col items-center gap-4'>
        <Link href={'/feed'}>
          <svg className="stroke-gray-500 absolute left-0 size-6 hover:stroke-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </Link>
        <img src={`https://api.dicebear.com/8.x/avataaars/svg?seed=${user.name}`}
          className="w-20 h-20 rounded-full bg-gray-50" />
        <span>{user.name}</span>
      </div>
      <article className='flex flex-col gap-4'>
        <h2 className='text-lg font-semibold leading-6 text-gray-900'>{post.title}</h2>
        <p className='text-sm leading-6 text-gray-700'>{post.body} {post.body}{post.body}{post.body}{post.body}{post.body}{post.body}{post.body}{post.body} test long content =====</p>
      </article>
    </div>
  )

}

export default PostDetails