import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import oscarImg from './assets/oscarTransparent.png'
import oscarLaptopImg from './assets/images/oscarLaptop.jpg'
import './App.css'

import oscarVideo from './assets/videos/oscar2.mp4'

function LandingPage( {setShowLandingPage} ) {
  return    <div className="container">
            <div className="right-vertical-stack">
              <div className="horizontal-stack">
                <img src={oscarImg} className='oscar' ></img>
                <div className="text-container" >
                  <h1 className="double-text" id="title" data-text="CCTV">CCTV</h1>
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

function ServerDownPage( {setShowLandingPage} ) {
  return <div className='container'>
          <div className="center-vertical-stack">
            <div className="text-container" >
              <h1 className="double-text" id="page-header" data-text="uh oh">uh oh</h1>
            </div>
            <img src={oscarLaptopImg} id='laptop-image'/>
            <div className="text-container" >
              <h1 className="double-text" id="page-subheader" data-text="oscar turned off the server">oscar turned off the server</h1>
            </div>
            <div className='button-container'>
              <button className="play" onClick={ () => { setShowLandingPage(true) } }>← RETURN HOME</button>
            </div>
          </div>
        </div>
}

function VideoPlayer( {setShowLandingPage} ) {
  const [loading, setLoading] = useState()

  return <div className='container'>
            <div className='left-vertical-stack'>
              <div className='video-stream'>
                  {/* {loading ? (<img src={oscarImg} /> ) : null} */}

                  {loading ? <p>it is loading</p> : null}
                  <img src='https://pierce-ucf.elver-mimosa.ts.net:5000/video-feed' onLoad={() => setLoading(false)}/> 
              </div>
              <div className='button-container'>
                <button className="play" onClick={ () => { setShowLandingPage(true) } }>← RETURN HOME</button>
              </div>
            </div>
          </div>

}

function VideoPage( {setShowLandingPage, serverAuth} ) {
  return (
    <>
    { serverAuth ? <VideoPlayer setShowLandingPage={setShowLandingPage} /> : <ServerDownPage setShowLandingPage={setShowLandingPage} /> }

    </> )
}

function App() {
  const [showLandingPage, setShowLandingPage] = useState(true)
      const [serverAuth, setServerAuth] = useState(false)
    
    
  useEffect( () => {
    
    (async function() {
      try {
        console.log("use effect called cuz setShowLandingPage changed")
        const res = await fetch('https://pierce-ucf.elver-mimosa.ts.net:5000/health');
        if (res.ok) {
          setServerAuth(true);
          //setLoading(current => current === false ? false : true);
        } else {
          throw new Error("Server did not respond")
        }
      } catch (error) {
          //console.log("server did not respond, serverauth should be false")
         // console.error(error)
          setServerAuth(false)
         // console.log(serverAuth)
      }

    })();
  }, [showLandingPage])


  return (
    <>
      { showLandingPage ?  <LandingPage setShowLandingPage={setShowLandingPage} />  : <VideoPage setShowLandingPage={setShowLandingPage} serverAuth={serverAuth} />  }
    </>
  )
}


export default App
