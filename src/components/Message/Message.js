import { memo } from 'react'
import PropTypes from 'prop-types'
import MessageInfo from '../MessageInfo/MessageInfo'
import './Message.css'

const Message = ({ item: { msg, username, date }, isAuthor }) => {
  const status = isAuthor ? 'flex-end' : 'flex-start'
  const styles = !username ? {
    border: 0,
    padding: 0,
    background: 0
  } : null

  return (
    <div
      className="message"
      style={{ justifyContent: username ? status : 'center' }}
    >
      <div className="message-content" style={styles}>
        <span
          className="msg"
          style={{ justifyContent: status, alignItems: status }}
        >
          {msg}
        </span>

        {username && <MessageInfo username={username} date={date} />}
      </div>
    </div>
  )
}

export default memo(Message)

Message.propTypes = {
  item: PropTypes.object.isRequired,
  isAuthor: PropTypes.bool
}
