import { User } from '../lib/definitions'
import Link from 'next/link'

interface Props {
  ids: number[]
  entities: Record<number, User>
}

const UsersList = (props: Props) => {
  const { ids, entities } = props

  return (
    <main className='grid grid-rows-12 h-screen '>
      <h1 className="flex items-center text-lg font-semibold leading-6 text-gray-900 px-5 sm:hidden">Users</h1>
      <ul role="list" className="row-start-2 row-span-10 divide-y divide-gray-200 overflow-y-auto sm:row-start-1 sm:row-span-11">
        {ids.map(id => (
          <Link href={`/admin/user-details?id=${id}`} key={id} className="px-5 py-2 flex justify-between hover:bg-sky-100 sm:px-7">
            <div className="flex flex-col gap-1">
              <p className="text-xs font-semibold leading-6 text-gray-900">{entities[id].name}</p>
              <p className="truncate text-xs leading-5 text-gray-500">Company: {entities[id].company.name}</p>
              <p className="truncate text-xs leading-5 text-gray-500">Email: {entities[id].email}</p>
              <p className="truncate text-xs leading-5 text-gray-500">Phone: {entities[id].phone}</p>
            </div>
          </Link>
        ))}
      </ul>
    </main>
  )
}

export default UsersList