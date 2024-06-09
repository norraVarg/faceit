'use client'

import { useRef } from 'react'
import { User } from '../definitions'
import { usePersistlStore } from './persistStore'
import { isEmptyObject } from '../utils/isEmptyObject'
import Spinner from '@/app/ui/spinner'

const PersistStoreProvider = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const initialized = useRef(false)
  const setUsers = usePersistlStore(state => state.setUsers)
  const users = usePersistlStore(state => state.users.entities)

  if (!initialized.current) {
    fetchData().then(data => {
      if (data instanceof Error) {
        throw data
      }

      setUsers(data)
    }).catch(error => {
      console.error('Error fetching users', error)
    })

    initialized.current = true
  }

  if (isEmptyObject(users)) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <Spinner text='Fetching data...' />
      </div>
    )
  }

  return <div>{children}</div>
}

export default PersistStoreProvider

const API_URL = 'https://jsonplaceholder.typicode.com/users'

export const fetchData = async (): Promise<User[] | Error> => {
  const response = await fetch(API_URL)

  if (response.ok) {
    return response.json() satisfies Promise<User[]>
  }

  return new Error('Failed to fetch users')
}