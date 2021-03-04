import { memo } from 'react'
import PropTypes from 'prop-types'
import './MessageInfo.css'

const MessageInfo = ({ username, date }) => (
  <div className="message-info">
    <span className="message-username">{username}</span>
    <span className="message-time">{date}</span>
  </div>
)

export default memo(MessageInfo)

MessageInfo.propTypes = {
  username: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired
}
