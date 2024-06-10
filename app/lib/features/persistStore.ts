import { createEntityAdapter } from '@reduxjs/toolkit'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Post, User } from '../definitions'

export type State = {
  users: {
    ids: number[]
    entities: Record<number, User>
  },
  newPosts: {
    ids: number[]
    entities: Record<number, Post>
  }
}

export type Actions = {
  setUsers: (users: Record<number, User>) => void
  addNewPost: (post: Post) => void
}

const usersAdapter = createEntityAdapter<User>({})
const usersInitialState = usersAdapter.getInitialState()

const newPostsAdapter = createEntityAdapter<Post>({
  sortComparer: (a, b) => b.id - a.id
})
const newPostsInitialState = newPostsAdapter.getInitialState()

export const usePersistlStore = create<State & Actions>()(
  persist(
    set => ({
      users: usersInitialState,
      setUsers: (users: Record<number, User>) => {
        const entityState = usersAdapter.setAll(usersInitialState, users)
        set(() => ({
          users: entityState
        }))
      },
      newPosts: newPostsInitialState,
      addNewPost: (post) => {
        set((state) => ({
          newPosts: newPostsAdapter.addOne(state.newPosts, post)
        }))
      }
    }),
    { name: 'users-store', skipHydration: true }
  )
)