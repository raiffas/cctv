import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import oscarImg from './assets/oscarTransparent.png'
import './App.css'

import oscarVideo from './assets/videos/oscar2.mp4'

function LandingPage( {setShowLandingPage} ) {
  return    <div className="container">
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
          </div>
}

function VideoPlayer( {setShowLandingPage} ) {
    const [serverAuth, setServerAuth] = useState(false)
    const [loading, setLoading] = useState()
    
  useEffect( () => {
    (async function() {
      try {
        const res = await fetch('http://laptop.elver-mimosa.ts.net:5000/health');
        if (res.ok) {
          setServerAuth(true);
          setLoading(current => current === false ? false : true);
        } else {
          throw new Error("Server did not respond")
        }
      } catch (error) {
          console.error(error)
          setServerAuth(false)
      }

    })();
  }, [setServerAuth])

  return  <div className='container'>
            <div className='left-vertical-stack'>
              <div className='video-stream'>
                  {loading ? (<img src={oscarImg} /> ) : null}
                  {serverAuth ? ( <img src='http://laptop.elver-mimosa.ts.net:5000/video-feed' onLoad={() => setLoading(false)}/> ) : <video src={oscarVideo} autoPlay loop/> }
              </div>
              <div className='button-container'>
                <button className="play" onClick={ () => { setShowLandingPage(true) } }>← RETURN HOME</button>
              </div>
            </div>
          </div>
}

function App() {
  const [showLandingPage, setShowLandingPage] = useState(true)

  return (
    <>
      { showLandingPage ?  <LandingPage setShowLandingPage={setShowLandingPage} />  : <VideoPlayer setShowLandingPage={setShowLandingPage}  />  }
    </>
  )
}


export default App
