import { Post } from '../definitions'

export const isNewPost = (post: Post) => {
  if (!post.created) {
    return false
  }

  const postTime = new Date(post.created).getTime()
  const currentTime = new Date().getTime()

  return (currentTime - postTime) < 3000
}