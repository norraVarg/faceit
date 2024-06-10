import { Socket } from 'socket.io-client'
import { TOTAL_POSTS_COUNT } from '../lib/definitions'
import { generateRandomId } from '../lib/utils/generateRandomId'

let postCount = TOTAL_POSTS_COUNT

interface Pramas {
  socket: Socket
}

const NewPostMock = (params: Pramas) => {
  const { socket } = params

  const addNewPost = () => {
    if (socket.connected) {
      postCount++

      socket.emit('addPost',
        {
          id: postCount,
          title: `New Title ${postCount}`,
          body: `This is a new post ${postCount}`,
          userId: generateRandomId(),
          created: new Date().toISOString(),
        })
    }
  }

  return (
    <button onClick={() => addNewPost()} className='bg-sky-500 hover:bg-sky-700 text-white text-xs font-bold py-1 px-3 rounded self-center capitalize'>
      new post
    </button>
  )

}

export default NewPostMock