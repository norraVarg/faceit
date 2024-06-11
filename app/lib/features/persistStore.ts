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
  },
  posts: {
    ids: number[]
    entities: Record<number, Post>
  }
  scrollPosition: number,
  page: number
}

export type Actions = {
  setUsers: (users: Record<number, User>) => void
  addNewPost: (post: Post) => void
  setPosts: (ids: number[], entities: Record<number, Post>) => void
  setScrollPosition: (position: number) => void
  setPage: (page: number) => void
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
      setUsers: (users) => {
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
      },
      posts: {
        ids: [],
        entities: {}
      },
      setPosts: (ids, entities) => {
        set(() => ({
          posts: { ids, entities }
        }))
      },
      scrollPosition: 0,
      setScrollPosition: (position) => {
        set(() => ({
          scrollPosition: position
        }))
      },
      page: 1,
      setPage: (page) => {
        set(() => ({
          page
        }))
      }
    }),
    { name: 'users-store', skipHydration: true }
  )
)