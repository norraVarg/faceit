'use client'

import { useRef } from 'react'
import { useUsersSelector, useUsersStore } from '@/app/lib/features/users/usersHooks'
import { fetchUsers } from '../lib/features/users/usersSlice'
import UsersList from '../ui/users-list'
import UsersProvider from '../lib/features/users/UsersStoreProvider'

const UsersPage = () => {
  return (<UsersProvider><UsersListComponent /></UsersProvider>)
}

const UsersListComponent = () => {
  const store = useUsersStore()
  const initialized = useRef(false)

  if (!initialized.current) {
    store.dispatch(fetchUsers())
    initialized.current = true
  }

  const ids = useUsersSelector((state) => state.ids)
  const entities = useUsersSelector((state) => state.entities)

  return <UsersList ids={ids} entities={entities} />
}

export default UsersPage