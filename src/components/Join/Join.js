import { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import Button from '../Button/Button'
import './Join.css'

const Join = ({ setUsername }) => {
  const [input, setInput] = useState('')
  const inputRef = useRef()

  const handleChange = event => setInput(event.target.value)
  const handleClick = () => {
    if (input.trim())
      setUsername(input)
  }

  useEffect(() => inputRef.current.focus(), [])

  return (
    <div className="join">
      <div className="join-content">
        <h1>Join</h1>

        <label htmlFor="username">What's your username?</label>
        <input
          ref={inputRef}
          onChange={handleChange}
          onKeyDown={event => event.key === 'Enter' && handleClick()}
          value={input}
          type="text"
          className="join-input"
          id="username"
        />
        <Button onClick={handleClick}>Log in</Button>
      </div>
    </div>
  )
}

export default Join

Join.propTypes = {
  setUsername: PropTypes.func.isRequired
}
