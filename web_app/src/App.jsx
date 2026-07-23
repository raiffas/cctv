import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

import oscarVideo from './assets/videos/oscar2.mp4'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <video
      src={oscarVideo}
      controls
      autoPlay
      muted
    />
    </>
  )
}

export default App
