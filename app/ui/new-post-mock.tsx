import { Socket } from 'socket.io-client'
import { generateRandomId } from '../lib/utils/generateRandomId'

interface Pramas {
  socket: Socket
  idsCount: number
}

const NewPostMock = (params: Pramas) => {
  const { socket, idsCount } = params
  let index = idsCount
  let id = idsCount

  const addNewPost = () => {
    if (socket.connected) {
      index++
      id++
      socket.emit('addPost', { id, title: `New Title ${index}`, body: `This is a new post ${index}`, userId: generateRandomId() })
    }
  }

  return (
    <button onClick={addNewPost} className='bg-sky-500 hover:bg-sky-700 text-white text-xs font-bold py-1 px-3 rounded self-center capitalize'>
      add new post
    </button>
  )

}

export default NewPostMock