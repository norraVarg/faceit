'use client'

import { usePersistlStore } from '../lib/features/persistStore'
import UsersList from '../ui/users-list'

const UsersPage = () => {
  const users = usePersistlStore(state => state.users)

  return (
    <main className='users-page'>
      <UsersList ids={users.ids} entities={users.entities} />
    </main>
  )
}

export default UsersPage