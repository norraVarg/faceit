import Link from 'next/link'
import { Post } from '../lib/definitions'

interface Params {
  ids: number[]
  entities: Record<number, Post>
}

const Feed = (params: Params) => {
  const { ids, entities } = params

  return (
    <div className='grid grid-rows-12 h-screen '>
      <h1 className="flex items-center text-lg font-semibold leading-6 text-gray-900 px-5 sm:hidden">Feed</h1>
      <ul role="list" className="space-y-4 row-start-2 row-span-10 overflow-y-auto sm:row-start-1 sm:row-span-11">
        {ids.map(id => (
          <Link href={`/admin/user-details?id=${id}`} key={id} className="px-5 flex justify-between hover:bg-sky-100 sm:px-7">
            <article className="flex space-x-4">
              <div className='min-w-min flex flex-col items-center row-start-1 row-end-7 col-start-1 col-end-3'>
                <img className="min-h-12 min-w-12 flex-none rounded-full bg-gray-50" />
                <div className='grow border-l-4 border-slate-200 min-h-5 w-0 my-2'></div>
              </div>
              <div className='flex flex-col'>
                {/* todo: add route to author page */}
                <span className='font-semibold text-xs'>Author name</span>
                <time className='text-xs leading-5 text-gray-500'>3 mins ago</time>
                <p className="line-clamp-3 max-h-32 text-wrap overflow-y-hidden text-ellipsis text-xs leading-6 text-gray-700">{entities[id].body}</p>
                {/* <p className="max-h-20 max-w-64 truncate text-xs leading-5 text-gray-500">Company: {entities[id].body}</p> */}
              </div>
            </article>
          </Link>
        ))}
      </ul>
    </div>
  )

}

export default Feed