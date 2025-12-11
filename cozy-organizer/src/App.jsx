import { useState } from 'react'

import Home from './pages/Home'
import Profile from './components/ProfileManager'

function App() {

  return (
    <>
      <div id="background-overlay" />
        <Home />
        <Profile />
    </>
  )
}

export default App
