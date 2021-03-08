import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import PropTypes from 'prop-types'
import { io } from 'socket.io-client'
import Button from '../Button/Button'
import Message from '../Message/Message'
import User from '../User'
import './Chat.css'

const socket = io(process.env.REACT_APP_ENDPOINT, { autoConnect: false })

const Chat = ({ username }) => {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [room, setRoom] = useState('')
  const [rooms, setRooms] = useState([])
  const [users, setUsers] = useState([])
  const inputRef = useRef()

  const handleChange = event => setMessage(event.target.value)
  const handleSubmit = event => {
    event.preventDefault()

    if (message.trim())
      socket.emit('new message', message)

    setMessage('')
    inputRef.current.focus()
  }

  const handleClick = useCallback(item => {
    if (item !== room) {
      socket.emit('new room', item)
      setRoom(item)
    }
  }, [room])

  useEffect(() => {
    socket.connect()
    socket.on('connect', () => socket.emit('new user', username))
    socket.on('users', users => setUsers(users))
    socket.on('rooms', rooms => {
      setRooms(rooms)
      setRoom(rooms[0])
    })
    socket.on('message', msg => setMessages(prev => [msg, ...prev]))
    socket.on('disconnect', () => socket.open())

    inputRef.current.focus()
  }, [username])

  const memoizedUsers = useMemo(() => users.map(user => (
    <User
      key={user.id}
      item={user}
      style={{ fontWeight: user.id === socket.id && 'bold' }}
    />
  )), [users])

  return (
    <div>
      <h1>Messages</h1>

      <div className="chat">
        <div className="block1">
          <div className="block1-content">
            <div className="messages">
              {messages.map((message, i) => (
                <Message
                  key={i}
                  item={message}
                  isAuthor={socket.id === message.client_id}
                />
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="chat-form">
            <input
              ref={inputRef}
              onChange={handleChange}
              value={message}
              type="text"
              className="chat-input"
            />
            <Button>Enter</Button>
          </form>
        </div>

        <div className="block2">
          <div className="block2-content">
            <h2>Rooms</h2>

            <div className="rooms">
              {rooms.map((item, i) => (
                <Button
                  key={i}
                  type="sm"
                  onClick={() => handleClick(item)}
                  active={item === room}
                  className="room"
                >
                  {item}
                </Button>
              ))}
            </div>

            <h2 className="users-title">Users ({users.length})</h2>

            <div className="users">
              {memoizedUsers}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat

Chat.propTypes = {
  username: PropTypes.string.isRequired
}
