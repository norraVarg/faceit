import { Socket } from 'socket.io-client'
import { generateRandomId } from '../lib/utils/generateRandomId'

interface Pramas {
  socket: Socket
  postCount: number
}

const NewPostMock = (params: Pramas) => {
  const { socket, postCount } = params
  let newPostIndex = postCount
  let newPostId = postCount

  const addNewPost = () => {
    if (socket.connected) {
      newPostIndex++
      newPostId++
      socket.emit('addPost', { id: newPostId, title: `New Title ${newPostIndex}`, body: `This is a new post ${newPostIndex}`, userId: generateRandomId() })
    }
  }

  return (
    <button onClick={() => addNewPost()} className='bg-sky-500 hover:bg-sky-700 text-white text-xs font-bold py-1 px-3 rounded self-center capitalize'>
      new post
    </button>
  )

}

export default NewPostMock