import io from 'socket.io-client'

export default (context, inject) => {
  const socket = io(process.env.WS_URL || 'http://localhost:3500/')
  inject('io', socket)
}
