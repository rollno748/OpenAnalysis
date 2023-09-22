import React, { useState, useEffect } from 'react';
import nodeLogo from '../../assets/img/node.svg';
import bg1 from '../../assets/img/bg1.jpg';
import bg2 from '../../assets/img/bg2.jpg';
import bg3 from '../../assets/img/bg3.jpg';
import '../../assets/scss/LandingPage.scss';
import Popup from '../Popup/Popup';
type Option = 'JMeter' | 'K6' | 'Neoload' | 'LoadRunner';

function LandingPage(){
    const [randomImage, setRandomImage] = useState('');
    const [showPopup, setShowPopup] = useState(false);

    const handleOpenPopup = () => {
      setShowPopup(true);
    };

    const handleSelect = (selectedOption: Option) => {
      // Do something with the selected option
      console.log('Selected option:', selectedOption);
    };
  


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

      return (
        <div className='App'>
        <div className="main-card">
            <h1>Open Analysis</h1>
            <div className='logo-box'>
            <a href='https://github.com/rollno748/OpenAnalysis' target='_blank' rel="noopener noreferrer">
                <img src={nodeLogo} className='logo vite' alt='Electron + Vite logo' />
            </a>
            </div>
            <div className='start-button'>
            <button onClick={handleOpenPopup}>Let's Begin</button>
            <Popup
              show={showPopup}
              onHide={() => setShowPopup(false)}
              options={['JMeter', 'K6', 'Neoload', 'LoadRunner']}
              onSelect={handleSelect}
            />
            {/* <button onClick={() => console.log("Button Clicked")}>Let's Begin</button> */}
            </div>
            <p className='button-caption'>An Universal anlaysis tool</p>
            <div className='flex-center'>Powered by <img style={{ width: '1.6em' }} src={nodeLogo} alt='Node logo' /></div>
        </div>
        </div>
      );


}

export default LandingPage;