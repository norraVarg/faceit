import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User } from '../definitions'
import { createEntityAdapter } from '@reduxjs/toolkit'

export type State = {
  users: {
    ids: number[]
    entities: Record<number, User>
  },
}

export type Actions = {
  setUsers: (users: Record<number, User>) => void
}

const usersAdapter = createEntityAdapter<User>({
  sortComparer: (a, b) => a.name.localeCompare(b.name),
})

const initialState = usersAdapter.getInitialState()

export const usePersistlStore = create<State & Actions>()(
  persist(
    set => ({
      users: initialState,
      setUsers: (users: Record<number, User>) => {
        const entityState = usersAdapter.setAll(initialState, users)
        set(() => ({
          users: entityState
        }))
      },
    }),
    { name: 'users-store', skipHydration: true }
  )
)