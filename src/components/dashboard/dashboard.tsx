import { useState } from 'react'
import './../../assets/scss/dashboard.scss'

console.log('[App.tsx]', `Hello world from Electron ${process.versions.electron}!`)

function Dashboard() {
  
  return (
    <div className='App'>
      <div className='logo-box'>
        <a href='https://github.com/electron-vite/electron-vite-react' target='_blank'>
          <img src='./vite.svg' className='logo vite' alt='Electron + Vite logo' />
          <img src='./electron.svg' className='logo electron' alt='Electron + Vite logo' />
        </a>
      </div>
      <h1>Electron + Vite + React</h1>
      <div className='card'>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className='read-the-docs'>
        Click on the Electron + Vite logo to learn more
      </p>
      <div className='flex-center'>
        Place static files into the<code>/public</code> folder <img style={{ width: '5em' }} src={nodeLogo} alt='Node logo' />
      </div>
    </div>
  )
}

export default Dashboard
