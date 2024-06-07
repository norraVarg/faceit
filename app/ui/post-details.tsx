import { Post } from '../lib/definitions'

interface Params {
  post: Post
}

const PostDetails = (params: Params) => {
  const { post } = params

  return (
    <div className='grid grid-rows-12 h-screen'>
      <h1 className="flex items-center text-lg font-semibold leading-6 text-gray-900 px-5 sm:hidden">Post</h1>
      <article className='row-start-2 row-span-10 px-5 sm:px-7'>
        <h2 className='text-lg font-semibold leading-6 text-gray-900'>{post.title}</h2>
        <p className='mt-4 text-sm leading-6 text-gray-700'>{post.body}</p>
      </article>
    </div>
  )

}

export default PostDetails