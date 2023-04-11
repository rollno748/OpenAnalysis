import nodeLogo from './assets/node.svg'
import { useState } from 'react'
import './assets/scss/App.scss'


function App() {
  const [count, setCount] = useState(0)
  console.log('[App.tsx]', `Hello world from Electron ${process.versions.electron}!`)
  return (
    <div className='App'>
      <h1>Open Analysis</h1>
      <div className='logo-box'>
        <a href='https://github.com/rollno748/OpenAnalysis' target='_blank'>
          <img src='./vite.svg' className='logo vite' alt='Electron + Vite logo' />
          {/* <img src='./electron.svg' className='logo electron' alt='Electron + Vite logo' /> */}
        </a>
      </div>
      <div className='start-button'>
        <button onClick={() => setCount((count) => count + 1)}>
          Analyze
        </button>
      </div>
      <p className='button-caption'>
        Click the start button to begin
      </p>
      <div className='flex-center'>
        Powered by <img style={{ width: '1.6em' }} src={nodeLogo} alt='Node logo' />
      </div>

      {/* <Update /> */}
    </div>
  )
}

export default App
