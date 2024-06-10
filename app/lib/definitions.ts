export type Post = {
  id: number
  userId: number
  title: string
  body: string
  created?: string
}

export type User = {
  id: number
  name: string
  username: string
  email: string
  phone: string
  website: string
  address: { street: string, suite: string, city: string, zipcode: string, geo: { lat: string, lng: string } }
  company: { name: string, catchPhrase: string, bs: string }
}

export type Photo = {
  id: number
  albumId: number
  title: string
  url: string
  thumbnailUrl: string

}

export enum FetchStatus {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export const TOTAL_POSTS_COUNT = 100