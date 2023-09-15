import React, { useState, useEffect } from 'react';
import nodeLogo from './assets/img/node.svg'
import bg1 from './assets/img/bg1.jpg';
import bg2 from './assets/img/bg2.jpg';
import bg3 from './assets/img/bg3.jpg';
import './assets/scss/App.scss';
import './assets/scss/App.scss'


function App() {
  const [randomImage, setRandomImage] = useState('');

  useEffect(() => {
    const imageFilenames = [bg1, bg2, bg3];
    const randomIndex = Math.floor(Math.random() * imageFilenames.length);
    const randomImageFilename = imageFilenames[randomIndex];
    setRandomImage(randomImageFilename);


    // Set the background image for the body
    document.body.style.backgroundImage = `url(${randomImageFilename})`;

    // Clean up by removing the background image when the component unmounts
    return () => {
      document.body.style.backgroundImage = '';
    };

  }, []);

  const viewDashboard = () => {
    // navigate('./components/dashboard');
  };

  return (
    <div className='App'>
      <div className="main-card">
        <h1>Open Analysis</h1>
        <div className='logo-box'>
          <a href='https://github.com/rollno748/OpenAnalysis' target='_blank'>
            <img src='./src/assets/img/github.svg' className='logo vite' alt='Electron + Vite logo' />
          </a>
        </div>
        <div className='start-button'>
          <button onClick={() => viewDashboard()}>Start</button>
        </div>
        <p className='button-caption'>
          Click the start button to begin
        </p>
        <div className='flex-center'>Powered by <img style={{ width: '1.6em' }} src={nodeLogo} alt='Node logo' />
        </div>
      </div>
    </div>
  )
}

export default App
