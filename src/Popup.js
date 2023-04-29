import React, { useRef, forwardRef, useImperativeHandle, useState} from 'react';
import "./style.css";
import "./button.css"

export const Popup = forwardRef((props, ref) => {
  const [isOpen, setIsOpen] = useState(false);

  function onModelClick() {
    if (!isOpen) {
      setIsOpen(true);
      document.getElementById('main-page').style.display = 'block';
      document.getElementById('popup-screen').style.display = 'block';
      document.getElementById('popup-screen').style.animation = "fadeIn 1s";
      document.getElementById('popup').style.animation = "fadeIn 1s";

    }
  }

  function closePopup() {
    document.getElementById('popup-screen').style.animation = "fadeOut 1s";
    document.getElementById('popup').style.animation = "fadeOut 1s";
    setTimeout(function () {
      document.getElementById('popup-screen').style.display = "none";
      document.getElementById('main-page').style.display = 'none';
      setIsOpen(false);
      console.log("its closed");
    }, 800); // delay for the length of the animation
  }
  
  let count = 1;

  function clicking () {
    console.log(count);
    if (count === 1){
      count++;
      console.log(count);
      onModelClick();
    }

  }

  
  //window.addEventListener('click', clicking);

  useImperativeHandle(ref, () => ({
    onModelClick: onModelClick
  }));

  return (
    
    <div id="main-page" onClick={onModelClick}>
      <div id="popup-screen"  style={{ display: isOpen ? 'block' : 'none' }} >
        <div id="popup">
          <h1> Here is the title</h1>
          <p>This is the content of the pop-up window.</p>
          <img src="path/to/image.jpg" alt="Pop-up Image" />
          <button id="close-btn" onClick={closePopup}>x</button>
        </div>
      </div>
    </div> 

)});
