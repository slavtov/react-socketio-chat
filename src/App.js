import { useState } from 'react'
import Chat from './components/Chat/Chat'
import Join from './components/Join/Join'
import logo from './logo.svg'
import './App.css'

const App = () => {
  const [username, setUsername] = useState('')

  return (
    <div className="container">
      <div className="brand">
        <img src={logo} className="App-logo" alt="logo" />
        Chat
      </div>

      {username ? <Chat username={username} /> : <Join setUsername={setUsername} />}
    </div>
  )
}

export default App
