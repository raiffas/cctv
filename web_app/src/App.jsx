import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import oscarImg from './assets/oscarTransparent.png'
import './App.css'

import oscarVideo from './assets/videos/oscar2.mp4'

function App() {
  const [count, setCount] = useState(0)
  const [showLandingPage, setShowLandingPage] = useState(true)

  // TODO: maybe consider API not serving imgs so we can use a fetch
  return (
    <>
      { showLandingPage ? (
           <div className="container">
            <div className="right-vertical-stack">
              <div className="horizontal-stack">
                <img src={oscarImg} className='oscar' ></img>
                <div className="text-container" >
                  <h1 className="double-text" data-text="CCTV">CCTV</h1>
                </div>
              </div>

              <div className="text-container">
                <h2 className='emphasis-text'>CHUNKY CAT TELEVISION</h2>
              </div>

              <div className="button-container">
                <button className="play" onClick={ () => { setShowLandingPage(false) }}>
                  <span className="pulse-text">PLAY →</span>
                </button>
              </div>
            </div>
          </div>) 
        : 
          <div className='container'>
            <div className='left-vertical-stack'>
              <div className='video-stream'>
                  {/* <img src='http://laptop.elver-mimosa.ts.net:5000/video-feed'/> */}
                  <video src={oscarVideo} />
              </div>
              <div className='button-container'>
                <button className="play" onClick={ () => { setShowLandingPage(true) } }>← RETURN HOME</button>
              </div>
            </div>
          </div>
      }
    </>
  )
}


export default App
