import { useDispatch, useSelector, useStore } from 'react-redux'
import type { UsersDispatch, UsersStore, UsersState } from './usersStore'

export const useUsersDispatch = useDispatch.withTypes<UsersDispatch>()
export const useUsersSelector = useSelector.withTypes<UsersState>()
export const useUsersStore = useStore.withTypes<UsersStore>()